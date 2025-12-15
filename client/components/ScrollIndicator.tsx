"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-8 left-8 flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <motion.div
        className="w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={16} className="text-foreground/60" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
