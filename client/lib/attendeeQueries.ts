// import { PublicKey } from "@solana/web3.js";
// import { getAnchorClient } from "./anchorClient";

// export const fetchAttendees = async (eventPda: PublicKey) => {
//     const { program } = getAnchorClient(null);

//     const all = await program.account.claimRecord.all();

//     return all
//         .map((c) => ({ pubkey: c.publicKey, data: c.account }))
//         .filter((c) => c.data.event.toBase58() === eventPda.toBase58())
//         .map((c) => ({
//             wallet: c.data.wallet.toBase58(),
//             mint: c.data.mint.toBase58(),
//             claimedAt: Number(c.data.claimedAt),
//         }));
// };

import { PublicKey } from "@solana/web3.js";

export const fetchAttendees = async (eventPda: PublicKey) => {
    // Placeholder implementation
    return [
        {
            wallet: "ExampleWalletPublicKey1",
            mint: "ExampleMintPublicKey1",
            claimedAt: 1625247600,
        },
        {
            wallet: "ExampleWalletPublicKey2",
            mint: "ExampleMintPublicKey2",
            claimedAt: 1625334000,
        },
    ];
}