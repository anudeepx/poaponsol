import { useEffect, useRef } from "react";
import { StepProps } from "../types";

export const isValidUri = (uri: string) => {
  try {
    new URL(uri);
    return true;
  } catch {
    return false;
  }
};

const EventUriStep = ({ formData, updateFormData, onNext }: StepProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isTouched = formData.uri.length > 0;
  const isValid = isValidUri(formData.uri);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <span className="text-primary text-sm uppercase tracking-wide">
          Event URI
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold">
          What is the URI for your event?
        </h2>
        <p className="text-muted-foreground text-lg">
          A public link with event metadata.
        </p>
      </div>

      <div className="relative">
        <input
          ref={inputRef}
          type="url"
          value={formData.uri}
          onChange={(e) => updateFormData({ uri: e.target.value })}
          onKeyDown={handleKeyDown}
          aria-invalid={isTouched && !isValid}
          className="w-full bg-transparent border border-neutral-700 rounded-xl px-4 py-3 focus:border-emerald-400 transition"
          placeholder="https://example.com/metadata.json"
        />

        {isValid && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-sm">
            Press Enter ↵
          </span>
        )}

        {isTouched && !isValid && (
          <p className="mt-2 text-sm text-red-400">Enter a valid URL</p>
        )}
      </div>
    </div>
  );
};

export default EventUriStep;
