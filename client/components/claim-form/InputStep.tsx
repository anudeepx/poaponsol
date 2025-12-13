"use client";

import { useEffect, useRef } from "react";

const InputStep = ({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">{label}</h2>
      <input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border border-neutral-700 rounded-xl px-4 py-3 focus:border-emerald-400 transition"
      />
    </div>
  );
};

export default InputStep;
