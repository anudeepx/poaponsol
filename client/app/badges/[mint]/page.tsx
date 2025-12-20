"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as anchor from "@coral-xyz/anchor";
import {
  Calendar,
  User,
  ExternalLink,
  Ticket,
  QrCode,
  Fingerprint,
  Hash,
  X,
} from "lucide-react";
import { fetchBadgeDetails } from "@/lib/queries/badgeQueries";
import { useParams } from "next/navigation";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import Breadcrumb from "@/components/BreadCrumb";
import { QRCodeCanvas } from "qrcode.react";

export default function BadgeDetailsPage() {
  const { mint } = useParams<{ mint: string }>()!;
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const { wallet, publicKey } = useWallet();

  const loadDetails = async () => {
    setLoading(true);

    const mintKey = new anchor.web3.PublicKey(mint);
    const info = await fetchBadgeDetails(
      wallet!.adapter as unknown as Wallet,
      mintKey
    );

    setDetails(info);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <main className="min-h-screen bg-[#0B0B0B] text-white flex justify-center items-center">
        <p className="text-neutral-500">Loading...</p>
      </main>
    );

  if (!details)
    return (
      <main className="min-h-screen bg-[#0B0B0B] text-white flex justify-center items-center">
        <p className="text-neutral-500">Badge not found or Event has ended.</p>
      </main>
    );

  const {
    badgeMint,
    claimedAt,
    eventName,
    eventPda,
    eventUri,
    collectionMint,
  } = details;

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white pt-10 px-6">
      <Breadcrumb
        homeElement={"Home"}
        separator={<span> | </span>}
        activeClasses="text-[#6cac95]"
        containerClasses="flex py-2 bg-[#0B0B0B] md:mb-12"
        listClasses="hover:underline mx-2 font-bold"
        capitalizeLinks
      />
      {showQR && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-999">
          <div className="bg-[#111] p-6 rounded-xl border border-neutral-700 text-center relative">
            <button
              className="absolute top-3 right-3 text-neutral-400 hover:text-white cursor-pointer"
              onClick={() => setShowQR(false)}
            >
              <X size={30} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Share Badge QR</h2>

            <QRCodeCanvas
              value={`${process.env.NEXT_PUBLIC_CLIENT_URL}/badges/claim/${mint}`}
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
                          new File([blob], "badge-qr.png", {
                            type: "image/png",
                          })
                      );

                    navigator.share({
                      title: "Badge Link",
                      text: "Scan to view the badge",
                      files: [file],
                    });
                  } else {
                    alert("Sharing not supported on this device.");
                  }
                }}
                className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold transition-all cursor-pointer"
              >
                Share
              </button>

              <button
                onClick={() => {
                  const canvas = document.querySelector("canvas")!;
                  const pngUrl = canvas.toDataURL("image/png");

                  const link = document.createElement("a");
                  link.href = pngUrl;
                  link.download = "badge-qr.png";
                  link.click();
                }}
                className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 font-semibold transition-all cursor-pointer"
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
          <h1 className="text-4xl md:text-6xl font-semibold">
            Badge{" "}
            <span className="bg-linear-to-tr from-emerald-400 to-white bg-clip-text text-transparent">
              Details
            </span>
          </h1>

          <p className="text-neutral-400 mt-3">
            Complete on-chain information about this attendance badge.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-14"
        >
          <div className="flex flex-col items-center">
            <div className="h-56 w-56 rounded-3xl bg-linear-to-br from-emerald-600/20 to-emerald-400/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.2)]">
              <Ticket size={90} className="text-[#6cac95]" />
            </div>

            <p className="text-neutral-400 text-sm mt-3 break-all">
              NFT Mint: {badgeMint.length > 30
                ? badgeMint.slice(0, 6) +
                  "..." +
                  badgeMint.slice(
                    badgeMint.length - 4,
                    badgeMint.length
                  )
                : badgeMint}
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold">{eventName}</h2>
              <p className="text-neutral-400 text-sm break-all">
                Collection Mint: {collectionMint.length > 30
                  ? collectionMint.slice(0, 6) +
                    "..." +
                    collectionMint.slice(
                      collectionMint.length - 4,
                      collectionMint.length
                    )
                  : collectionMint}
              </p>
            </div>

            <div className="space-y-5 bg-black/30 border border-emerald-500/20 p-6 rounded-xl backdrop-blur-lg shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <div className="flex items-center gap-3 text-neutral-300">
                <Calendar size={18} className="text-emerald-300" />
                <span>
                  Claimed At: {new Date(claimedAt * 1000).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-3 text-neutral-300">
                <User size={18} className="text-emerald-300" />
                  <span>Owner: { publicKey?.toBase58() }</span>
                </div>

              <div className="flex items-center gap-3 text-neutral-300 break-all">
                <Fingerprint size={18} className="text-emerald-300" />
                <span>Event PDA: {eventPda}</span>
              </div>

              <div className="flex items-center gap-3 text-neutral-300 break-all">
                <Hash size={18} className="text-emerald-300" />
                <a
                  href={eventUri}
                  target="_blank"
                  className="text-[#6cac95] hover:text-emerald-300 text-sm"
                >
                  View Metadata
                </a>
              </div>

              <a
                href={`https://explorer.solana.com/address/${badgeMint}?cluster=devnet`}
                target="_blank"
                className="flex items-center gap-2 text-[#6cac95] hover:text-emerald-300 text-sm pt-2"
              >
                View NFT on Explorer <ExternalLink size={14} />
              </a>
            </div>

            <button
              onClick={() => setShowQR(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-neutral-700 hover:border-emerald-400 hover:text-emerald-300 transition-all"
            >
              <QrCode size={16} />
              Share Badge QR
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
