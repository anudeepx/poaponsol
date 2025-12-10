import { prisma } from "@/lib/clients/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const event = await prisma.event.create({
            data: {
                eventPda: body.eventPda,
                name: body.name,
                organizer: body.organizer,
                collectionMint: body.collectionMint,
                uri: body.uri,
                startTimestamp: BigInt(body.startTimestamp),
                endTimestamp: BigInt(body.endTimestamp),
                maxClaims: body.maxClaims,
                isActive: body.isActive,
                bump: body.bump,
                claimRecords: [],
            },
        });

        return NextResponse.json(event, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
    }
}
