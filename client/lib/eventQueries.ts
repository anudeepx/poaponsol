import { PublicKey } from "@solana/web3.js";
import { getAnchorClient } from "./anchorClient";

// @fetch events by organizer
export const fetchEventsByOrganizer = async (wallet: any, organizer: PublicKey) => {
    const { program } = getAnchorClient(wallet);

    const allEvents = await program.account.event.all();

    return allEvents
        .map((e) => ({ pubkey: e.publicKey, data: e.account }))
        .filter((e) => e.data.organizer.toBase58() === organizer.toBase58());
};

// @fetch event by pda
export const fetchEventByPda = async (wallet: any, eventPda: PublicKey) => {
    const { program } = getAnchorClient(wallet);

    const account = await program.account.event.fetch(eventPda);
    return { pubkey: eventPda, data: account };
};

// @fetch events by date range
export const fetchEventsByDate = async (wallet: any, start: number, end: number) => {
    const { program } = getAnchorClient(wallet);

    const allEvents = await program.account.event.all();

    return allEvents
        .map((e) => ({ pubkey: e.publicKey, data: e.account }))
        .filter((e) => {
            const s = Number(e.data.startTimestamp);
            const t = Number(e.data.endTimestamp);
            return (s >= start && s <= end) || (t >= start && t <= end);
        });
};

// @fetch active events
export const fetchActiveEvents = async (wallet: any) => {
    const { program } = getAnchorClient(wallet);

    const allEvents = await program.account.event.all();

    const now = Math.floor(Date.now() / 1000);

    return allEvents
        .map((e) => ({ pubkey: e.publicKey, data: e.account }))
        .filter((e) => {
            return e.data.isActive &&
                now >= Number(e.data.startTimestamp) &&
                now <= Number(e.data.endTimestamp);
        });
};

// @fetch events by name
export const fetchEventsByName = async (wallet: any, name: string) => {
    const { program } = getAnchorClient(wallet);

    const allEvents = await program.account.event.all();

    return allEvents
        .map((e) => ({ pubkey: e.publicKey, data: e.account }))
        .filter((e) => e.data.name.toLowerCase().includes(name.toLowerCase()));
};
