"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import * as anchor from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";

import { EventFormData } from "./types";
import StepIndicator from "./StepIndicator";
import StepWrapper from "./StepWrapper";

import EventNameStep from "./steps/EventNameStep";
import EventUriStep, { isValidUri } from "./steps/EventUriStep";
import EventDateStep from "./steps/EventDateStep";
import MaxClaimsStep from "./steps/EventClaims";
import ReviewStep from "./steps/ReviewStep";

import { createEvent } from "@/lib/events";
import { useRouter } from "next/navigation";

interface EventCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_STEPS = 6;

const initialFormData: EventFormData = {
  name: "",
  uri: "",
  startDate: new Date(),
  endDate: new Date(),
  maxClaims: 1,
};

const EventCreationModal = ({ isOpen, onClose }: EventCreationModalProps) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const { wallet } = useWallet();

  const updateFormData = (updates: Partial<EventFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const isStepValid = useCallback((): boolean => {
    switch (step) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return isValidUri(formData.uri);
      case 3:
        return true;
      case 4:
        return formData.startDate <= formData.endDate;
      case 5:
        return formData.maxClaims >= 0;
      case 6:
        return true;
      default:
        return false;
    }
  }, [step, formData]);

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
      toast.error("Connect your wallet first");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const today = new Date().toISOString().split("T")[0];
      if (formData.startDate.toISOString().split("T")[0] < today) {
        toast.error("Start date cannot be in the past");
        return;
      }

      const args = {
        name: formData.name,
        uri: formData.uri,
        startTimestamp: new anchor.BN(
          Math.floor(formData.startDate.getTime() / 1000)
        ),
        endTimestamp: new anchor.BN(
          Math.floor(formData.endDate.getTime() / 1000)
        ),
        maxClaims: new anchor.BN(formData.maxClaims),
      };

      await createEvent(wallet.adapter as any, args);

      toast.success("Event created successfully 🎉");
      setFormData(initialFormData);
      setStep(1);
      onClose();
      router.push("/events");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to create event");
      setErrorMessage(err.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const stepProps = {
    formData,
    updateFormData,
    onNext: goNext,
    onBack: goBack,
    isValid: isStepValid(),
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EventNameStep {...stepProps} />;
      case 2:
        return <EventUriStep {...stepProps} />;
      case 3:
        return <EventDateStep {...stepProps} scheduled="start" />;
      case 4:
        return <EventDateStep {...stepProps} scheduled="end" />;
      case 5:
        return <MaxClaimsStep {...stepProps} />;
      case 6:
        return (
          <ReviewStep
            formData={formData}
            onSubmit={handleSubmit}
            isWalletConnected={!!wallet?.adapter}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background backdrop-blur-xl" />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl glass-panel rounded-2xl overflow-hidden"
          >
            <div className="px-6 pt-6">
              <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
            </div>

            {errorMessage && (
              toast.error(errorMessage)
            )}

            <div className="p-6 min-h-[420px] flex flex-col">
              <StepWrapper stepKey={step} direction={direction}>
                {renderStep()}
              </StepWrapper>
            </div>

            {step < TOTAL_STEPS && (
              <div className="p-6 border-t border-border/50 flex items-center justify-between">
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
                      ? "bg-[#6cac95] text-primary-foreground btn-glow"
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

export default EventCreationModal;
