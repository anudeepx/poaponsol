import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ReviewStep = ({
  formData,
  wallet,
  onSubmit,
  loading,
  connected,
}: any) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">Review & Claim</h2>

      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          <strong>Event PDA:</strong> {formData.eventPda}
        </p>
        <p>
          <strong>Collection:</strong> {formData.collectionMint}
        </p>
        <p>
          <strong>Wallet:</strong> {wallet ?? "Not connected"}
        </p>
      </div>

      <motion.button
        onClick={onSubmit}
        disabled={!connected || loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 rounded-xl font-semibold flex justify-center gap-2 ${
          connected
            ? "bg-emerald-400 text-black"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {loading ? "Claiming..." : "Claim Badge"}
        <ArrowUpRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

export default ReviewStep;
