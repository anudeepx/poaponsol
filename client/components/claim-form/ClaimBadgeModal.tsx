"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { toast } from "sonner";
import StepIndicator from "@/components/event-form/StepIndicator";
import StepWrapper from "@/components/event-form/StepWrapper";
import CelebrationOverlay from "@/components/Celebration";
import { mintBadge } from "@/lib/badges";
import InputStep from "./InputStep";
import ReviewStep from "./ReviewStep";
import { useRouter } from "next/navigation";

const TOTAL_STEPS = 3;

interface ClaimFormData {
  eventPda: string;
  collectionMint: string;
}

const initialFormData: ClaimFormData = {
  eventPda: "",
  collectionMint: "",
};

const ClaimBadgeModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { wallet, connected, publicKey } = useWallet();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState<ClaimFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const router = useRouter();

  const updateFormData = (updates: Partial<ClaimFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const isValidPubkey = (value: string) => {
    try {
      new anchor.web3.PublicKey(value);
      return true;
    } catch {
      return false;
    }
  };

  const isStepValid = useCallback(() => {
    switch (step) {
      case 1:
        return isValidPubkey(formData.eventPda);
      case 2:
        return isValidPubkey(formData.collectionMint);
      case 3:
        return connected;
      default:
        return false;
    }
  }, [step, formData, connected]);

  const goNext = () => {
    if (isStepValid() && step < TOTAL_STEPS) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    if (!wallet?.adapter) {
      toast.error("Connect wallet first");
      return;
    }

    try {
      setLoading(true);

      const eventPubkey = new anchor.web3.PublicKey(formData.eventPda.trim());
      const collectionPubkey = new anchor.web3.PublicKey(
        formData.collectionMint.trim()
      );

      await mintBadge(
        wallet.adapter as any,
        eventPubkey,
        collectionPubkey
      );

      toast.success(`Badge minted successfully 🎉`);
      setShowCelebration(true);
      await new Promise((r) => setTimeout(r, 1500));
      setFormData(initialFormData);
      setStep(1);
      onClose();
      router.push("/badges");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to claim badge");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <InputStep
            label="Event PDA"
            value={formData.eventPda}
            placeholder="Enter event PDA"
            onChange={(v) => updateFormData({ eventPda: v })}
          />
        );
      case 2:
        return (
          <InputStep
            label="Collection Mint"
            value={formData.collectionMint}
            placeholder="Enter collection mint"
            onChange={(v) => updateFormData({ collectionMint: v })}
          />
        );
      case 3:
        return (
          <ReviewStep
            formData={formData}
            wallet={publicKey?.toBase58()}
            onSubmit={handleSubmit}
            loading={loading}
            connected={connected}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <CelebrationOverlay
            show={showCelebration}
            onFinish={() => setShowCelebration(false)}
          />

          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg glass-panel rounded-2xl overflow-hidden"
          >
            <div className="px-6 pt-6">
              <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
            </div>

            <div className="p-6 min-h-[360px]">
              <StepWrapper stepKey={step} direction={direction}>
                {renderStep()}
              </StepWrapper>
            </div>

            {step < TOTAL_STEPS && (
              <div className="p-6 border-t border-border/50 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={goBack}
                  disabled={step === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition ${
                    step === 1
                      ? "text-muted-foreground/50 cursor-not-allowed"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={goNext}
                  disabled={!isStepValid()}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition ${
                    isStepValid()
                      ? "bg-emerald-400 text-primary-foreground btn-glow"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClaimBadgeModal;
