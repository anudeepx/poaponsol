"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

export function EventHoverCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
      }}
      className="relative rounded-2xl overflow-hidden border-none
                 bg-black/40 backdrop-blur-xl p-0 transition-all duration-300"
    >
      <div
        className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none p-10"
      >
      </div>
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  );
}
