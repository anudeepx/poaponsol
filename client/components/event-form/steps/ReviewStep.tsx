import { motion } from "framer-motion";
import { Calendar, Globe, Check } from "lucide-react";
import { format } from "date-fns";
import { EventFormData } from "../types";

interface ReviewStepProps {
  formData: EventFormData;
  onSubmit: () => void;
  isWalletConnected: boolean;
  loading?: boolean;
}

const ReviewStep = ({
  formData,
  onSubmit,
  isWalletConnected,
  loading,
}: ReviewStepProps) => {
  const items = [
    {
      icon: <Globe className="w-5 h-5 text-primary" />,
      label: "Event Name",
      value: formData.name,
    },
    {
      icon: <Globe className="w-5 h-5 text-primary" />,
      label: "Event URI",
      value: formData.uri,
    },
    {
      icon: <Calendar className="w-5 h-5 text-primary" />,
      label: "Start Date",
      value: format(formData.startDate, "MMMM do, yyyy"),
    },
    {
      icon: <Calendar className="w-5 h-5 text-primary" />,
      label: "End Date",
      value: format(formData.endDate, "MMMM do, yyyy"),
    },
    {
      icon: <Check className="w-5 h-5 text-primary" />,
      label: "Max Claims",
      value: formData.maxClaims === 0 ? "Unlimited" : formData.maxClaims,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <span className="text-primary text-sm uppercase tracking-wide">
          Review
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold">
          Confirm your event
        </h2>
        <p className="text-muted-foreground text-lg">
          Double-check everything before creating
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border"
          >
            <div className="p-2 rounded-lg bg-secondary">{item.icon}</div>
            <div className="flex-1">
              <span className="text-xs text-muted-foreground uppercase">
                {item.label}
              </span>
              <p className="font-medium">{item.value}</p>
            </div>
            <Check className="w-5 h-5 text-primary" />
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSubmit}
        disabled={!isWalletConnected}
        className={`w-full py-5 rounded-xl text-lg font-semibold transition ${
          isWalletConnected
            ? "bg-linear-to-r from-primary to-emerald-400 text-primary-foreground btn-glow"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        {isWalletConnected ? (loading ? "Creating..." : "Create Event") : "Connect Wallet to Create"}
      </motion.button>
    </div>
  );
};

export default ReviewStep;
