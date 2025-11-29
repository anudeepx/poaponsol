"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchEventByPda } from "@/lib/eventQueries";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
// import Link from "next/link";
import {
  Calendar,
  Clock,
  Users,
  // ArrowUpRight,
  QrCode,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import * as anchor from "@coral-xyz/anchor";
import { CornerHoverCard } from "@/components/ui/CornerHoverCard";
import { EventHoverCard } from "@/components/EventHoverCard";
import { QRCodeCanvas } from "qrcode.react";
import { X } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/BreadCrumb";


export default function EventDetailsPage() {
  const params = useParams();
  const eventId = Array.isArray(params?.eventId) ? params?.eventId[0] : params?.eventId;
  const { wallet, connected, publicKey } = useWallet();
  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [isOrganizerWallet, setIsOrganizerWallet] = useState<boolean>(false);


  const loadEvent = async () => {
    if (!wallet?.adapter || !eventId) return;
    setLoading(true);

    const pubkey = new anchor.web3.PublicKey(eventId);
    const result = await fetchEventByPda(wallet.adapter as unknown as Wallet, pubkey);

    setEventData(result);
    setLoading(false);
  };

  useEffect(() => {
    if (connected) loadEvent();
    setIsOrganizerWallet(publicKey?.toBase58() === eventData?.data.organizer.toBase58());
  }, [connected, publicKey]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-500">
        Loading event…
      </div>
    );

  if (!eventData)
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-500">
        Event not found.
      </div>
    );

  const e = eventData.data;

  const readableStart = new Date(Number(e.startTimestamp) * 1000).toDateString();
  const readableEnd = new Date(Number(e.endTimestamp) * 1000).toDateString();

  const now = Math.floor(Date.now() / 1000);
  const status =
    now < e.startTimestamp
      ? "Upcoming"
      : now > e.endTimestamp
      ? "Ended"
      : "Active";

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white pt-10 px-6">
      <Breadcrumb
        homeElement={"Home"}
        separator={<span> | </span>}
        activeClasses="text-emerald-400"
        containerClasses="flex py-2 bg-[#0B0B0B] md:mb-12"
        listClasses="hover:underline mx-2 font-bold"
        capitalizeLinks
      />
      {showQR && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">
          <div className="bg-[#111] p-6 rounded-xl border border-neutral-700 text-center relative">
            <button
              className="absolute top-3 right-3 text-neutral-400 hover:text-white hover:cursor-pointer"
              onClick={() => setShowQR(false)}
            >
              <X size={30} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Share Event QR</h2>

            <QRCodeCanvas
              value={`https://poaponsol.vercel.app/events/${eventId}`}
              size={300}
              bgColor="#111"
              fgColor="#00d386"
              includeMargin={true}
            />

            <div className="mt-5 flex gap-3 justify-center">
              <button
                onClick={async () => {
                  const canvas = document.querySelector("canvas")!;
                  const pngUrl = canvas.toDataURL("image/png");

                  if (navigator.share) {
                    const file = await fetch(pngUrl)
                      .then((res) => res.blob())
                      .then(
                        (blob) =>
                          new File([blob], "event-qr.png", {
                            type: "image/png",
                          })
                      );

                    navigator.share({
                      title: "Event Link",
                      text: "Scan this QR to view the event",
                      files: [file],
                    });
                  } else {
                    alert("Sharing not supported on this device.");
                  }
                }}
                className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold hover:cursor-pointer transition-all"
              >
                Share
              </button>

              <button
                onClick={() => {
                  const canvas = document.querySelector("canvas")!;
                  const pngUrl = canvas.toDataURL("image/png");

                  const link = document.createElement("a");
                  link.href = pngUrl;
                  link.download = "event-qr.png";
                  link.click();
                }}
                className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 font-semibold hover:cursor-pointer transition-all"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-semibold">{e.name}</h1>

          <p className="text-neutral-400 max-w-2xl mx-auto mt-3">
            Your on-chain POAP event hosted on Solana.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center"
        >
          <span
            className={`px-5 py-2 rounded-full text-sm font-semibold ${
              status === "Active"
                ? "bg-emerald-500/20 text-emerald-400"
                : status === "Upcoming"
                ? "bg-blue-500/20 text-blue-300"
                : "bg-neutral-700 text-neutral-400"
            }`}
          >
            {status}
          </span>
        </motion.div>
        <CornerHoverCard>
          <EventHoverCard key={eventId}>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-emerald-300">
                    Event Info
                  </h3>
                  <a
                    href={e.uri}
                    className="text-neutral-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {e.uri}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-neutral-300">
                  <Calendar className="text-emerald-400" size={20} />
                  <span>From: {readableStart}</span>
                </div>

                <div className="flex items-center gap-3 text-neutral-300">
                  <Clock className="text-emerald-400" size={20} />
                  <span>To: {readableEnd}</span>
                </div>

                <div className="flex items-center gap-3 text-neutral-300">
                  <Users className="text-emerald-400" size={20} />
                  <span>Max Claims: {e.maxClaims}</span>
                </div>

                <div className="text-sm text-neutral-400 break-all">
                  <strong className="text-neutral-300">Organizer:</strong>
                  <br />
                  {e.organizer.toBase58()}
                </div>
                {!isOrganizerWallet && (
                  <Link
                    href={`/badges/${eventId}?collection=${e.collectionMint.toBase58()}`}
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-4 flex items-center justify-center gap-3 px-5 py-3 
                        rounded-xl bg-linear-to-tr from-emerald-500 to-emerald-400 text-black 
                        font-semibold shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]
                        transition-all"
                    >
                      Claim Badge
                      <ArrowUpRight size={18} />
                    </motion.button>
                  </Link>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                    Collection Mint
                  </h3>
                  <p className="text-neutral-400 break-all">
                    {e.collectionMint.toBase58()}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                    Event PDA
                  </h3>
                  <p className="text-neutral-400 break-all">{eventId}</p>
                </div>

                <a
                  href={`https://explorer.solana.com/address/${eventId}?cluster=devnet`}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200"
                >
                  View on Explorer <ExternalLink size={16} />
                </a>

                <button
                  onClick={() => setShowQR(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-neutral-700 hover:border-emerald-400 hover:text-emerald-300 transition-all"
                >
                  <QrCode size={16} />
                  Share Event QR
                </button>
                {isOrganizerWallet && (
                  <Link href={`/events/${eventId}/attendees`}>
                    <button
                      className="w-full mt-4 flex items-center justify-center gap-3 px-5 py-3 
                    rounded-xl bg-linear-to-tr from-emerald-500 to-emerald-400 text-black 
                    font-semibold shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]
                    transition-all"
                    >
                      View Attendees
                      <ExternalLink size={18} />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </EventHoverCard>
        </CornerHoverCard>
      </div>
    </main>
  );
}
