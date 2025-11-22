"use client";

import { motion } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1] as any,
  },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full mt-32 px-6 flex flex-col items-center "
    >
      <motion.h2
        {...fadeInUp}
        className="text-center text-4xl md:text-5xl font-headline font-bold tracking-tight mb-16"
      >
        WHAT IS{" "}
        <span className="text-emerald-400 bg-linear-to-tr from-emerald-400 to-white bg-clip-text text-transparent">
          POAPonSOL?
        </span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
        <motion.div {...fadeInUp}>
          <CardSpotlight className="rounded-3xl bg-black/20 border-none h-full">
            <div className="flex flex-col h-full relative z-20">
              <h3 className="text-2xl md:text-3xl font-semibold text-neutral-200 mb-4 text-center">
                PoaponSol: A Protocol
              </h3>

              <p className="text-neutral-600 text-base md:text-lg leading-relaxed text-center">
                PoaponSol is a POAP-style attendance protocol on Solana.
                Organizers create on-chain event collections, and attendees mint
                attendance NFTs tied to those events.
              </p>

              <button className="mx-auto mt-6 mb-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-all text-white font-medium">
                About the Protocol
              </button>
            </div>
          </CardSpotlight>
        </motion.div>

        <motion.div {...fadeInUp}>
          <CardSpotlight className="rounded-3xl bg-black/20 border-none h-full">
            <div className="flex flex-col h-full relative z-20">
              <h3 className="text-2xl md:text-3xl font-semibold text-neutral-200 mb-4 text-center">
                PoaponSol: A Platform
              </h3>

              <p className="text-neutral-600 text-base md:text-lg leading-relaxed text-center">
                Your event badges live permanently on-chain, visible anytime in
                your wallet. A growing ecosystem of tools and apps brings your
                POAPonSOL badges to life.
              </p>

              <button className="mx-auto mt-auto mb-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-all text-white font-medium">
                How It Works
              </button>
            </div>
          </CardSpotlight>
        </motion.div>
      </div>
    </section>
  );
}
