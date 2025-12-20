"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import Celebration from "@/components/Celebration";
import { mintBadge } from "@/lib/badges";
import { useRouter } from "next/navigation";

export default function ClaimBadgePage() {
  const { eventId } = useParams<{ eventId: string }>();
  const searchParams = useSearchParams();
  const collectionMint = searchParams.get("collection");

  const { wallet, connected } = useWallet();

  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleClaim = async () => {
    if (!wallet || !connected || !collectionMint) return;

    try {
      setLoading(true);
      setError(null);
      const eventPubkey = new anchor.web3.PublicKey(eventId.trim());
      const collectionPubkey = new anchor.web3.PublicKey(
            collectionMint.trim()
      );

      await mintBadge(
        wallet.adapter as any,
        eventPubkey,
        collectionPubkey,
      );
      router.push("/badges");
      setClaimed(true);
    } catch (e: any) {
      setError(e.message ?? "Failed to claim badge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B0B0B] text-white px-6">
      {claimed && <Celebration show={true} />}

      <div className="max-w-md w-full bg-[#111] border border-neutral-800 rounded-xl p-6 text-center space-y-5">
        <h1 className="text-2xl font-semibold">Claim Your Badge</h1>

        <p className="text-neutral-400 text-sm break-all">
          Event PDA:
          <br />
          {eventId}
        </p>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          disabled={loading || !connected}
          onClick={handleClaim}
          className="
            w-full py-3 rounded-xl font-semibold
            bg-linear-to-tr from-emerald-500 to-emerald-400
            text-black transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? "Claiming…" : "Claim Badge"}
        </button>

        {!connected && (
          <p className="text-xs text-neutral-500">
            Connect wallet to claim
          </p>
        )}
      </div>
    </main>
  );
}
