"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { ExternalLink, Calendar, Ticket } from "lucide-react";
import { fetchUserBadges } from "@/lib/badgeQueries";
import Link from "next/link";
import Breadcrumb from "@/components/BreadCrumb";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CornerHoverCard } from "@/components/ui/CornerHoverCard";
import { EventHoverCard } from "@/components/EventHoverCard";

export default function BadgesPage() {
  const { publicKey, wallet } = useWallet();
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadBadges = async () => {
    setLoading(true);

    const list = await fetchUserBadges(wallet!, publicKey!);
    setBadges(list);

    setLoading(false);
  };

  useEffect(() => {
    if (!publicKey) {
      toast.error("Please connect your wallet to view your badges.");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      router.push("/");
      return;
    }
    loadBadges();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white pt-12 px-6">
      <div className="max-w-6xl mx-auto space-y-14">
        <Breadcrumb
          homeElement={"Home"}
          separator={<span> | </span>}
          activeClasses="text-emerald-400"
          containerClasses="flex py-2 bg-[#0B0B0B] md:mb-2"
          listClasses="hover:underline mx-2 font-bold"
          capitalizeLinks
        />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            Your{" "}
            <span className="bg-linear-to-tr from-emerald-400 to-white bg-clip-text text-transparent">
              Badges
            </span>
          </h1>

          <p className="text-neutral-400 mt-3 max-w-xl mx-auto">
            All POAP badges you&apos;ve claimed across POAPonSOL.
          </p>
        </motion.div>

        {loading && (
          <div className="text-center py-20 text-neutral-500">
            Loading badges…
          </div>
        )}

        {!loading && badges.length === 0 && (
          <div className="text-center py-20 text-neutral-500">
            You don’t have any badges yet.
          </div>
        )}

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        >
          {badges.map((b, i) => (
            <CornerHoverCard key={i}>
              <EventHoverCard>
              <div className="relative z-10 flex flex-col items-center space-y-5">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-linear-to-br from-emerald-600/20 to-emerald-400/10 border border-emerald-500/20 flex items-center justify-center">
                  <Ticket size={48} className="text-emerald-400" />
                </div>

                <h3 className="text-xl font-semibold text-white">{b.name}</h3>
                <p className="font-mono text-xs text-neutral-400 break-all text-center">
                  {b.mint}
                </p>

                <div className="flex items-center gap-2 text-neutral-300 text-sm">
                  <Calendar size={16} className="text-emerald-300" />
                  {new Date(b.claimedAt * 1000).toLocaleString()}
                </div>

                <a
                  href={`https://explorer.solana.com/address/${b.mint}?cluster=devnet`}
                  target="_blank"
                  className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm mt-2"
                >
                  View on Explorer <ExternalLink size={14} />
                </a>

                <Link
                  href={`/badges/${b.mint}`}
                  className="mt-3 text-sm px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all"
                >
                  View Details
                </Link>
              </div>
              </EventHoverCard>
            </CornerHoverCard>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
