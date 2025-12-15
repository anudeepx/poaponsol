"use client";

import WalletWrapper from "./WalletWrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";

const navItems = [
  { label: "EVENTS", href: "/events" },
  { label: "BADGES", href: "/badges" },
  { label: "X", href: "https://x.com/poaponsolana" },
];

const Navbar = () => {
  const { connected, publicKey } = useWallet();
  useEffect(() => {
    console.log("Wallet connected:", connected);
    console.log("Public Key:", publicKey ? publicKey.toBase58() : "No public key");
  },[connected, publicKey]);
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-12 font-tiny5"
    >
      <motion.div
        className="flex items-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <Image
            src="/logo.svg"
            alt="PoaponSol Logo"
            width={40}
            height={40}
            className="grayscale-75"
          />
          </div>
      </motion.div>

      <div className="glass-panel px-2 py-2 flex items-center gap-1">
        {navItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            className="px-4 py-2 text-lg text-foreground/80 hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {item.label}
          </motion.a>
        ))}
      </div>

      <div className="hidden md:block font-tiny5">
          <WalletWrapper />
        </div>
        {/* <div className="md:hidden h-10 md:w-auto md:h-auto">
          <WalletWrapper />
        </div> */}
    </motion.nav>
  );
};

export default Navbar;
