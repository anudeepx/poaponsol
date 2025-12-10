"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const StatementSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const fillProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight max-w-5xl mx-auto"
          style={{
            background: `linear-gradient(90deg, hsl(160 84% 52%) ${fillProgress.get()}%, transparent ${fillProgress.get()}%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <motion.span
            style={{
              backgroundImage: useTransform(
                fillProgress,
                (v) =>
                  `linear-gradient(90deg, hsl(160 84% 52%) ${v}%, hsl(0 0% 100% / 0.2) ${v}%)`
              ),
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Proof of participation minted on Solana, owned forever.
          </motion.span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-8 mt-16"
        >
          {["Immutable", "Verifiable", "Decentralized"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="text-xs tracking-[0.3em] uppercase text-primary/60"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
