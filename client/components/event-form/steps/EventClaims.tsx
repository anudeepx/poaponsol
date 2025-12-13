import { useEffect, useRef } from "react";
import { StepProps } from "../types";

const isValidMaxClaims = (value: number | null) => {
  if (value === null) return false;
  if (!Number.isInteger(value)) return false;
  if (value < 0) return false;
  return true;
};

const MaxClaimsStep = ({ formData, updateFormData, onNext }: StepProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const value = formData.maxClaims;
  const isTouched = value !== null;
  const isValid = isValidMaxClaims(value);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      onNext();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === "") {
      updateFormData({ maxClaims: 0 });
      return;
    }

    const num = Number(raw);

    if (Number.isNaN(num)) return;

    updateFormData({ maxClaims: num });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <span className="text-primary text-sm uppercase tracking-wide">
          Max Claims
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold">
          How many attendees can claim this?
        </h2>
        <p className="text-muted-foreground text-lg">
          Set a cap on total claims.
        </p>
      </div>

      <div className="relative">
        <input
          ref={inputRef}
          type="number"
          inputMode="numeric"
          min={1}
          step={1}
          value={value ?? ""}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-invalid={isTouched && !isValid}
          className="w-full bg-transparent border border-neutral-700 rounded-xl px-4 py-3 text-lg focus:border-emerald-400 transition"
          placeholder="e.g. 500"
        />

        {/* {isValid && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-sm">
            Press Enter ↵
          </span>
        )} */}

        {isTouched && !isValid && (
          <p className="mt-2 text-sm text-red-400">
            Enter a valid non-negative integer
          </p>
        )}
      </div>
    </div>
  );
};

export default MaxClaimsStep;
