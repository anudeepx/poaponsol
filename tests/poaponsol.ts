import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Poaponsol } from "../target/types/poaponsol";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Connection,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { MPL_CORE_PROGRAM_ID } from "@metaplex-foundation/mpl-core";
import assert from "assert";

describe("POAPonSOL — Anchor Tests", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Poaponsol as Program<Poaponsol>;
  const connection = provider.connection;

  const organizer = provider.wallet;
  const attendee = Keypair.generate();
  const collection = Keypair.generate();
  const badgeMint = Keypair.generate();

  const eventName = "SolanaConf 2025";
  let eventPda: PublicKey;
  let collectionAuthorityPda: PublicKey;

  before(async () => {
    console.log("Starting POAPonSOL test suite...");
    await connection.requestAirdrop(attendee.publicKey, 2 * LAMPORTS_PER_SOL);
    await new Promise((r) => setTimeout(r, 1000));
  });


  it("Creates an event and collection NFT", async () => {
    const [pda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("event"),
        organizer.publicKey.toBuffer(),
        Buffer.from(eventName),
      ],
      program.programId
    );
    eventPda = pda;

    const tx = await program.methods
      .createEvent({
        name: eventName,
        uri: "https://arweave.net/sample-event.json",
        startTimestamp: new anchor.BN(Date.now() / 1000),
        endTimestamp: new anchor.BN(Date.now() / 1000 + 86400),
        maxClaims: 500,
      })
      .accounts({
        organizer: organizer.publicKey,
        event: eventPda,
        collection: collection.publicKey,
        coreProgram: MPL_CORE_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      } as any)
      .signers([collection])
      .rpc();

    console.log("Create Event Tx:", tx);

    const eventAccount = await program.account.event.fetch(eventPda);
    assert.equal(eventAccount.name, eventName);
    assert.equal(eventAccount.organizer.toBase58(), organizer.publicKey.toBase58());
    assert.equal(eventAccount.collectionMint.toBase58(), collection.publicKey.toBase58());
    assert.ok(eventAccount.isActive, "Event should be active");

    console.log("Event successfully initialized and active.");
  });

  it("Allows attendee to mint a badge under collection", async () => {
    const [collectionAuthority] = PublicKey.findProgramAddressSync(
      [Buffer.from("collection_authority"), collection.publicKey.toBuffer()],
      program.programId
    );
    collectionAuthorityPda = collectionAuthority;

    const tx = await program.methods
      .mintBadge()
      .accounts({
        claimer: attendee.publicKey,
        badgeMint: badgeMint.publicKey,
        event: eventPda,
        collection: collection.publicKey,
        collectionAuthority: collectionAuthorityPda,
        coreProgram: MPL_CORE_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      } as any)
      .signers([attendee, badgeMint])
      .rpc();

    console.log("Mint Badge Tx:", tx);

    const eventAccount = await program.account.event.fetch(eventPda);
    assert.ok(eventAccount.isActive, "Event should still be active after mint");

    console.log("Attendee successfully minted badge NFT.");
  });

  it("Allows organizer to close the event", async () => {
    const tx = await program.methods
      .closeEvent()
      .accounts({
        organizer: organizer.publicKey,
        event: eventPda,
      })
      .rpc();

    console.log("Close Event Tx:", tx);

    const eventAccount = await program.account.event.fetch(eventPda);
    assert.ok(!eventAccount.isActive, "Event should be marked inactive");
  });

  it("Prevents badge minting after event is closed", async () => {
    const newBadgeMint = Keypair.generate();

    try {
      await program.methods
        .mintBadge()
        .accounts({
          claimer: attendee.publicKey,
          badgeMint: newBadgeMint.publicKey,
          event: eventPda,
          collection: collection.publicKey,
          collectionAuthority: collectionAuthorityPda,
          coreProgram: MPL_CORE_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        } as any)
        .signers([attendee, newBadgeMint])
        .rpc();

      assert.fail("Mint should fail because event is closed");
    } catch (err) {
      const message = err.error?.errorMessage || err.toString();
      console.log("❌ Expected failure:", message);
      assert.ok(message.includes("EventNotActive"));
    }
  });
});
