"use client";

import { motion } from "framer-motion";

const LightStreaks = () => {
  const streaks = [
    { x: "48%", delay: 0, height: 80 },
    { x: "50%", delay: 0.8, height: 120 },
    { x: "52%", delay: 1.6, height: 100 },
  ];

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-none">
      {streaks.map((streak, i) => (
        <motion.div
          key={i}
          className="relative"
          style={{ height: streak.height }}
        >
          <motion.div
            className="w-0.5 bg-linear-to-b from-foreground/40 via-foreground/20 to-transparent rounded-full"
            style={{ height: "100%" }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0.6, 0],
              scaleY: [0, 1, 1, 1],
              y: [0, 0, 50, 100]
            }}
            transition={{
              duration: 3,
              delay: streak.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-foreground/60 rounded-full blur-sm"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              y: [0, streak.height, streak.height + 50]
            }}
            transition={{
              duration: 3,
              delay: streak.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default LightStreaks;
