"use client";

import React from "react";

export default function EmeraldGradient() {
  return (
    <>
      <div className="
        top-60 md:top-0
        left-[0%]
        z-0
        absolute
        bg-linear-to-t
        from-emerald-400/60
        to-emerald-600/40
        blur-[10em]
        rounded-xl
        opacity-50 dark:opacity-100
        transition-all duration-700 ease-out
        translate-x-[-50%]
        w-40 md:w-40
        h-80 md:h-200
        rotate-40
      "></div>

      <div className="
        top-60 md:top-0
        right-[0%]
        z-0
        absolute
        bg-linear-to-t
        from-emerald-400/60
        to-emerald-600/40
        blur-[10em]
        rounded-xl
        opacity-50 dark:opacity-100
        transition-all duration-700 ease-out
        translate-x-[-50%]
        w-40 md:w-40
        h-80 md:h-200
        -rotate-40
      "></div>
    </>
  );
}
