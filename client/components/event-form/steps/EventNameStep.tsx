import { useEffect, useRef } from "react";
import { StepProps } from "../types";

const EventNameStep = ({
  formData,
  updateFormData,
  onNext,
  isValid,
}: StepProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
        <span className="text-primary text-sm font-medium tracking-wide uppercase">
          Let&apos;s start
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
          What&apos;s your event called?
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose a name that captures the essence of your event
        </p>
      </div>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          onKeyDown={handleKeyDown}
          placeholder="Enter event name..."
          className="w-full px-6 py-5 text-xl bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 input-glow focus:outline-none focus:border-primary/50"
          aria-label="Event name"
        />
        {formData.name && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-sm">
            Press Enter ↵
          </span>
        )}
      </div>
    </div>
  );
};

export default EventNameStep;
