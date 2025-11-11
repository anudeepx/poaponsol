import * as anchor from "@coral-xyz/anchor";
import { SystemProgram, Keypair } from "@solana/web3.js";
import { getAnchorClient } from "./anchorClient";
import { getEventPda } from "./pdas";
import { PublicKey } from "@solana/web3.js";
import { MPL_CORE_PROGRAM_ID } from "@metaplex-foundation/mpl-core";

export const createEvent = async (wallet: anchor.Wallet, args: any) => {
    const { program, connection } = getAnchorClient(wallet);
    const eventName = args.name;

    const [eventPda] = getEventPda(wallet.publicKey, eventName, program.programId);
    const collection = Keypair.generate();

    const txSig = await program.methods
        .createEvent(args)
        .accounts({
            organizer: wallet.publicKey,
            event: eventPda,
            collection: collection.publicKey,
            coreProgram: MPL_CORE_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
        } as any)
        .signers([collection])
        .rpc();

    console.log("✅ Event created:", eventName);
    console.log("Event PDA:", eventPda.toBase58());
    console.log("Collection Mint:", collection.publicKey.toBase58());
    console.log("Tx:", txSig);

    return { eventPda, collectionMint: collection.publicKey, txSig };
};

export const closeEvent = async (wallet: anchor.Wallet, eventPda: PublicKey) => {
    const { program } = getAnchorClient(wallet);

    const txSig = await program.methods
        .closeEvent()
        .accounts({
            organizer: wallet.publicKey,
            event: eventPda,
        })
        .rpc();

    console.log("✅ Event closed:", eventPda.toBase58());
    console.log("Tx:", txSig);
};

