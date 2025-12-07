"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Twitter, FileText, Mail, ExternalLink, ArrowUpRight } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";
import ClaimForm from "../ClaimForm";
import Form from "../Form";

export default function Footer() {
  const [time, setTime] = useState("");
  const { connected, wallet } = useWallet();
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [claimOpen, setClaimOpen] = useState(false);

  const handleFormOpen = async () => {
    if (!connected || !wallet?.adapter)
      return toast.error("Connect wallet first!");
    setFormOpen(true);
  };

  const handleClaimOpen = async () => {
    if (!connected || !wallet?.adapter)
      return toast.error("Connect wallet first!");
    setClaimOpen(true);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utcTime = now.toUTCString().split(" ")[4];
      setTime(utcTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const links = {
    product: [
      { label: "Documentation", href: "#", icon: FileText },
      { label: "GitHub", href: "#", icon: Github },
      { label: "API Reference", href: "#", icon: ExternalLink },
    ],
    community: [
      { label: "Twitter", href: "#", icon: Twitter },
      { label: "Discord", href: "#", icon: ExternalLink },
      { label: "Support", href: "#", icon: Mail },
    ],
    protocol: [
      { label: "Whitepaper", href: "#", icon: FileText },
      { label: "Security", href: "#", icon: ExternalLink },
      { label: "Audits", href: "#", icon: ExternalLink },
    ],
  };

  return (
    <footer className="relative bg-[#0B0B0B] overflow-hidden">
      <div className="abosolute z-99">
        <Form open={formOpen} onClose={() => setFormOpen(false)} />
        <ClaimForm open={claimOpen} onClose={() => setClaimOpen(false)} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] to-[#0B0B0B]" />

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
                className="flex items-center gap-2 bg-emerald-400 h-16 md:-auto border-2 hover:bg-white hover:text-black border-emerald-400 rounded-full px-2 md:px-5 py-3 text-lg font-subtitle font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/30 group hover:cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFormOpen}
                disabled={loading}
              >
                {/* <span>Create Event</span> */}
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

              <motion.button
                className="flex items-center gap-2 border-2 h-16 bg-white text-black hover:bg-emerald-400 hover:text-white border-emerald-400 rounded-full px-2 md:px-5 py-2 text-lg font-subtitle font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20 group hover:cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClaimOpen}
                disabled={loading}
              >
                {loading ? "Processing..." : "Claim Badge"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-[#2E2E2E] pt-16 pb-8">
          <div className=" gap-12 mb-16">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#34D399]">
                  POAPONSOL
                </h3>
                <p className="text-[#4B4B4B] mt-2 text-sm">
                  The On-Chain Attendance Protocol
                </p>
              </motion.div>

              <div className="flex items-center gap-4 text-[#34D399] text-sm">
                <div className="w-2 h-2 bg-[#34D399] rounded-full animate-pulse" />
                <span className="text-[#4B4B4B]">UTC</span>
                <span className="font-mono">{time}</span>
              </div>

              <div className="mt-6 flex gap-4">
                {[Github, Twitter, Mail].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
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

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#4B4B4B] text-sm border-t border-[#2E2E2E] pt-8">
            <div>
              © {new Date().getFullYear()} POAPONSOL. All rights reserved.
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#34D399] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#34D399] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#34D399] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#34D399] to-transparent opacity-50" />
    </footer>
  );
}
