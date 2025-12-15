"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star, StarIcon } from "lucide-react";
import LightStreaks from "./LightStreaks";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
    <motion.a
      href="https://github.com/anudeepx/poaponsol"
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center justify-center
        text-xl mb-2
        font-tiny5
        text-white/80
        hover:text-white
        transition-colors
      "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.8 }}
    >
      GitHub
      <StarIcon className="ml-1 mb-[2px]" size={16} />
    </motion.a>
      <motion.h1
        className="text-5xl md:text-6xl lg:text-7xl text-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <span className="font-tiny5 text-foreground">
          Proof of Attendance
        </span>{" "}
        <span className="font-tiny5 text-[#6cac95]">
          Protocol
        </span>
      </motion.h1>
      
      <motion.p
        className="text-muted-foreground text-lg md:text-xl text-center max-w-2xl mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <span className="font-tiny5">
          Your on-chain proof of attendance, the Solana way.
        </span>
      </motion.p>
        <div className="flex gap-5 justify-center">
        <Link href="/events/create" prefetch>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="
              group
              flex items-center gap-2
              h-14 px-6
              rounded-full
              bg-[#6cac95] text-black
              font-tiny5 text-lg
              transition-all duration-300
              focus:outline-none
            "
          >
            Create Event
            <motion.span
              className="inline-flex items-center justify-center"
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 2.5, duration: 1 }}
            >
              <ArrowUpRight size={18} />
            </motion.span>
          </motion.button>
        </Link>

        <Link href="/badges/claim" prefetch>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="
              flex items-center justify-center
              h-14 px-6
              rounded-full
              bg-white/5 text-white
              font-tiny5 text-lg
              border border-white/15
              backdrop-blur
              transition-all duration-300
              hover:bg-white/10
              hover:border-white/25
            "
          >
            Claim Badge
          </motion.button>
        </Link>
      </div>

      <LightStreaks />
      
      <motion.div
        className="absolute bottom-24 right-8 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
      </motion.div>
    </div>
  );
};

export default Hero;
