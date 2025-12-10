"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Link from "next/link";
import Image from "next/image";
import WalletWrapper from "../WalletWrapper";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 py-6"
    >
      <div className="container mx-auto p-6 flex items-center justify-between bg-black/1 backdrop-blur-xs rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="PoaponSol Logo"
              width={40}
              height={40}
            />
          </div>
          <span className="font-display text-lg hidden sm:block">
            POAPONSOL
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#protocol"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Protocol
          </Link>
          <Link
            href="/events"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Events
          </Link>
          <Link
            href="/badges"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Badges
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <WalletWrapper />
        </div>
        <div className="md:hidden h-10 md:w-auto md:h-auto">
          <WalletWrapper />
        </div>
      </div>
    </motion.nav>
  );
};
