// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();

//         const event = await prisma.claimRecord.create({
//             data: {
//                 claimPda: body.claimPda,
//                 wallet: body.wallet,
//                 eventPda: body.eventPda,
//                 mint: body.mint,
//                 collectionMint: body.collectionMint,
//                 claimedAt: BigInt(body.claimedAt),
//                 eventName: body.eventName,
//                 eventUri: body.eventUri,
//                 event: {
//                     connect: { eventPda: body.eventPda }
//                 }
//             },
//         });

//         return NextResponse.json(event, { status: 201 });
//     } catch (err) {
//         console.error(err);
//         return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
//     }
// }

export {};