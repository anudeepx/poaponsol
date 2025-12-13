import { useEffect, useRef } from "react";
import { Calendar } from "lucide-react";
import { StepProps } from "../types";
import { format } from "date-fns";

const EventDateStep = ({
  scheduled,
  formData,
  updateFormData,
  onNext,
  isValid,
}: StepProps) => {
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dateRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      onNext();
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      updateFormData({ [scheduled === "start" ? "startDate" : "endDate"]: new Date(dateValue) });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <span className="text-primary text-sm font-medium tracking-wide uppercase">
          When is it?
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
          Pick a event {scheduled} date
        </h2>
        <p className="text-muted-foreground text-lg">
          {
            scheduled === "start"
              ? "Set the date when your event begins."
              : "Set the date when your event ends."
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            ref={dateRef}
            type="date"
            value={formData[scheduled === "start" ? "startDate" : "endDate"] ? format(formData[scheduled === "start" ? "startDate" : "endDate"], "yyyy-MM-dd") : ""}
            onChange={handleDateChange}
            onKeyDown={handleKeyDown}
            className="w-full pl-12 pr-6 py-5 text-lg bg-secondary/50 border border-border rounded-xl text-foreground input-glow focus:outline-none focus:border-primary/50 scheme-dark"
            aria-label="Event date"
          />
        </div>
      </div>

      {formData[scheduled === "start" ? "startDate" : "endDate"] && (
        <p className="text-primary/80 text-sm">
          Your event is scheduled for {format(formData[scheduled === "start" ? "startDate" : "endDate"], "MMMM do, yyyy")}
        </p>
      )}
    </div>
  );
};

export default EventDateStep;
