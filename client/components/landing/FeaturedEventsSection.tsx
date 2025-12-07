"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const events = [
  {
    id: 1,
    title: "Solana Breakpoint 2024",
    year: "2024",
    color: "from-emerald-500/20 to-emerald-900/20",
  },
  {
    id: 2,
    title: "DeFi Summit Amsterdam",
    year: "2024",
    color: "from-primary/20 to-emerald-800/20",
  },
  {
    id: 3,
    title: "Hacker House Tokyo",
    year: "2024",
    color: "from-emerald-400/20 to-primary/20",
  },
  {
    id: 4,
    title: "Web3 Conference Berlin",
    year: "2023",
    color: "from-emerald-600/20 to-emerald-400/20",
  },
];

export const FeaturedEventsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Section header */}
      <div className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary">
            Featured Events
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>
      </div>

      {/* Horizontal scroll gallery */}
      <motion.div style={{ x }} className="flex gap-8 pl-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setHoveredId(event.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative flex-shrink-0 w-[400px] md:w-[500px] aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group"
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${event.color}`}
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 protocol-grid opacity-20" />

            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow:
                  hoveredId === event.id
                    ? "inset 0 0 60px hsl(160 84% 52% / 0.2)"
                    : "inset 0 0 0px transparent",
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <motion.div
                animate={{
                  y: hoveredId === event.id ? -10 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-xs tracking-widest uppercase text-primary">
                    Minted on Solana
                  </span>
                  <span className="text-muted-foreground">{event.year}</span>
                </div>
              </motion.div>
            </div>

            {/* Emerald lens effect on hover */}
            {hoveredId === event.id && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm"
              />
            )}

            {/* Border */}
            <div className="absolute inset-0 rounded-2xl border border-primary/20 group-hover:border-primary/40 transition-colors" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
