"use client";

import { motion } from "framer-motion";

const Star = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-foreground/60"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
    }}
    animate={{
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.3, 1],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const stars = [
  { x: "15%", y: "20%", size: 2, delay: 0 },
  { x: "25%", y: "35%", size: 1.5, delay: 0.5 },
  { x: "10%", y: "60%", size: 2, delay: 1 },
  { x: "5%", y: "45%", size: 1, delay: 1.5 },
  { x: "30%", y: "15%", size: 1.5, delay: 2 },
  { x: "85%", y: "25%", size: 2, delay: 0.3 },
  { x: "75%", y: "55%", size: 1.5, delay: 0.8 },
  { x: "90%", y: "40%", size: 1, delay: 1.2 },
  { x: "80%", y: "70%", size: 2, delay: 1.8 },
  { x: "70%", y: "20%", size: 1.5, delay: 2.2 },
  { x: "45%", y: "80%", size: 1, delay: 0.6 },
  { x: "55%", y: "85%", size: 1.5, delay: 1.1 },
  { x: "35%", y: "75%", size: 2, delay: 1.6 },
  { x: "60%", y: "15%", size: 1, delay: 2.5 },
  { x: "40%", y: "10%", size: 1.5, delay: 0.9 },
];

const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main radial gradient glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 65% 35%, hsl(160 20% 18% / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 70% 40%, hsl(160 25% 22% / 0.3) 0%, transparent 40%),
            radial-gradient(ellipse 40% 30% at 20% 60%, hsl(160 15% 12% / 0.2) 0%, transparent 50%),
            hsl(0 0% 4%)
          `,
        }}
      />
      
      {/* Subtle animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(ellipse 70% 50% at 60% 40%, hsl(160 20% 20% / 0.4) 0%, transparent 50%)",
            "radial-gradient(ellipse 70% 50% at 70% 35%, hsl(160 20% 20% / 0.4) 0%, transparent 50%)",
            "radial-gradient(ellipse 70% 50% at 65% 45%, hsl(160 20% 20% / 0.4) 0%, transparent 50%)",
            "radial-gradient(ellipse 70% 50% at 60% 40%, hsl(160 20% 20% / 0.4) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Stars */}
      {stars.map((star, i) => (
        <Star key={i} {...star} />
      ))}
    </div>
  );
};

export default BackgroundEffects;
