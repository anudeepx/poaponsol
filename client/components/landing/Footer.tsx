"use client";

import { motion } from "framer-motion";
import { Github, Twitter, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {

  const socialLinks = [
    {
      icon: Github,
      url: "https://github.com/anudeepx/poaponsol",
    },
    {
      icon: Twitter,
      url: "https://x.com/poaponsolana",
    },
  ];

  return (
    <footer className="relative bg-[#0B0B0B] overflow-hidden">
      <div className="abosolute z-99">
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-[#1A1A1A] to-[#0B0B0B]" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl md:text-8xl font-serif text-white mb-8 leading-tight">
              Launch Your
              <br />
              On-Chain Event Today
            </h2>
            <p className="text-[#4B4B4B] text-xl mb-12">
              Join the future of attendance verification. Start minting proof of
              participation on Solana.
            </p>

            <div className="flex gap-6 justify-center">
              <motion.button
                className="flex items-center gap-2 text-black bg-emerald-400 h-14 md:-auto border-2 hover:bg-white hover:text-black border-emerald-400 rounded-lg px-2 md:px-5 py-3 text-lg font-subtitle transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/30 group hover:cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link prefetch={true} href="/events/create">
                  Create Event
                </Link>
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

              <motion.button
                className="flex items-center gap-2 border-2 h-14 bg-white text-black hover:bg-emerald-400 hover:text-white border-emerald-400 rounded-lg px-2 md:px-5 py-2 text-lg font-subtitle transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20 group hover:cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link prefetch={true} href="/badges/claim">
                  Claim Badge
                </Link>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#4B4B4B] text-sm border-t border-[#2E2E2E] pt-8">
          <div>
            © {new Date().getFullYear()} POAPONSOL. All rights reserved.
          </div>
          <div className="mt-6 flex gap-4">
            {socialLinks.map(({ icon: Icon, url }, i) => (
              <motion.a
                key={i}
                href={url}
                target="_blank"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#34D399] rounded-xl flex items-center justify-center transition-colors group"
              >
                <Icon
                  size={18}
                  className="text-[#4B4B4B] group-hover:text-[#34D399] transition-colors"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#34D399] to-transparent opacity-50" />
    </footer>
  );
}
