import { PublicKey } from "@solana/web3.js";
import { utils } from "@coral-xyz/anchor";

export const getEventPda = (organizer: PublicKey, name: string, programId: PublicKey) => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from("event"), organizer.toBuffer(), Buffer.from(name)],
        programId
    );
};

export const getCollectionAuthorityPda = (collection: PublicKey, programId: PublicKey) => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from("collection_authority"), collection.toBuffer()],
        programId
    );
};
