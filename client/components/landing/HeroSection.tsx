"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowUpRight } from "lucide-react";
import Form from "../Form";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const { connected, wallet } = useWallet();
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const handleFormOpen = async () => {
    if (!connected || !wallet?.adapter)
      return toast.error("Connect wallet first!");
    setFormOpen(true);
  };

  const maskScale = useTransform(scrollYProgress, [0, 0.5], [1, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] overflow-hidden"
    >
      <div className="abosolute z-99">
        <Form open={formOpen} onClose={() => setFormOpen(false)} />
      </div>
      {/* Background gradient */}
      <div className="fixed inset-0 bg-linear-to-b from-background via-background to-graphite" />

      {/* Animated grid */}
      <div className="fixed inset-0 protocol-grid opacity-30" />

      {/* Particle effect background */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -1000],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Central glow */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(160 84% 52% / 0.08) 0%, transparent 70%)",
          scale: maskScale,
        }}
      />

      {/* Hero content */}
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center z-10"
        style={{ opacity, y: textY }}
      >
        {/* Protocol label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <span className="px-4 py-2 rounded-full border border-primary/30 text-xs tracking-[0.3em] uppercase text-primary">
            Solana Native Protocol
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-7xl md:text-9xl font-bold text-center tracking-tight"
        >
          <span className="text-gradient-emerald">POAPON</span>
          <span className="text-foreground">SOL</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-md text-center"
        >
          The On-Chain Attendance Protocol
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12"
        >
            <motion.button
              className="flex items-center gap-2 bg-emerald-400 h-16 md:-auto border-2 hover:bg-white hover:text-black border-emerald-400 rounded-full px-2 md:px-5 py-3 text-lg font-subtitle font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/30 group hover:cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFormOpen}
              disabled={loading}
            >
              {loading ? "Processing..." : "Create Event"}
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  duration: 1,
                }}
                className="bg-white text-black bg-opacity-30 rounded-full p-0.5"
              >
                <ArrowUpRight size={18} />
              </motion.div>
            </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-32 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase text-muted-foreground">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border border-primary/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
