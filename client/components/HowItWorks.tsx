"use client";

import { motion } from "framer-motion";
import { CheckCircle, BadgeCheck, Users, ArrowRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1] as any,
  },
};

export default function HowItWorks() {
  return (
    <section className="mt-32 w-full px-6 flex flex-col items-center">
      <motion.h2
        {...fadeInUp}
        className="text-4xl md:text-6xl font-headline font-bold text-center mb-16"
      >
        HOW IT{" "}
        <span className="text-emerald-400 bg-linear-to-tr from-emerald-400 to-white bg-clip-text text-transparent">
          WORKS
        </span>
      </motion.h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl w-full">
        <motion.div
          {...fadeInUp}
          className="relative rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl p-8 w-full md:w-80 text-center"
        >
          <div className="flex justify-center mb-4">
            <Users className="w-12 h-12 text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Create Event
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Organizer initializes an on-chain event using a verified Solana NFT
            collection (Metaplex).
          </p>
        </motion.div>

        <div className="hidden md:flex text-emerald-400">
          <ArrowRight size={40} className="opacity-60" />
        </div>

        <motion.div
          {...fadeInUp}
          className="relative rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl p-8 w-full md:w-80 text-center"
        >
          <div className="flex justify-center mb-4">
            <BadgeCheck className="w-12 h-12 text-emerald-400" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">
            Attendees Mint
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Participants claim a unique badge NFT linked to that event, stored
            permanently on-chain.
          </p>
        </motion.div>

        <div className="hidden md:flex text-emerald-400">
          <ArrowRight size={40} className="opacity-60" />
        </div>

        <motion.div
          {...fadeInUp}
          className="relative rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl p-8 w-full md:w-80 text-center"
        >
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">
            Verified Proof
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Badge NFTs act as verifiable proof of participation — usable across
            apps in the Solana ecosystem.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
