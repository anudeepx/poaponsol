'use client';

import { useEffect } from "react";
import type { CSSProperties } from "react";
import Lottie from "lottie-react";
import celebrationAnimation from "@/public/celebration.json";

export default function CelebrationOverlay({ show, onFinish }:{show: boolean, onFinish?: () => void}) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onFinish?.();
    }, 3000); // match animation length

    return () => clearTimeout(timer);
  }, [show, onFinish]);

  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <Lottie 
        animationData={celebrationAnimation}
        loop={false}
        style={styles.lottie}
      />
    </div>
  );
}
const styles: { overlay: CSSProperties; lottie: CSSProperties } = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",  
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  lottie: {
    width: "60%",
    height: "60%",
  },
};
