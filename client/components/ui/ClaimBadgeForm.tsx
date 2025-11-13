import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hash, Image, Wallet } from "lucide-react";
import { toast } from "sonner";

interface ClaimBadgeFormProps {
  walletConnected?: boolean;
  walletAddress?: string;
}

const ClaimBadgeForm = ({ 
  walletConnected = true, 
  walletAddress = "7xKW...9Xyz" 
}: ClaimBadgeFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventId: "",
    collectionMint: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletConnected) {
      toast.error("Wallet not connected", {
        description: "Please connect your Solana wallet to claim badges",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Badge claimed successfully!", {
        description: "Your NFT has been minted to your wallet",
      });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Event ID / PDA */}
      <div className="space-y-2">
        <Label htmlFor="eventId" className="text-foreground font-medium">
          Event ID / Event PDA
        </Label>
        <div className="relative group">
          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
          <Input
            id="eventId"
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            placeholder="5Gy7x...3Abc"
            className="glass border-muted hover:border-emerald/50 focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all duration-300 pl-10 pr-4 font-mono"
            required
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300 glow-emerald" />
        </div>
      </div>

      {/* Collection Mint Address */}
      <div className="space-y-2">
        <Label htmlFor="collectionMint" className="text-foreground font-medium">
          Collection Mint Address
        </Label>
        <div className="relative group">
          <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
          <Input
            id="collectionMint"
            name="collectionMint"
            value={formData.collectionMint}
            onChange={handleChange}
            placeholder="8Qx9...4Def"
            className="glass border-muted hover:border-emerald/50 focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all duration-300 pl-10 pr-4 font-mono"
            required
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300 glow-emerald" />
        </div>
      </div>

      {/* Wallet Address (Read-only) */}
      <div className="space-y-2">
        <Label htmlFor="walletAddress" className="text-foreground font-medium">
          Wallet Address
        </Label>
        <div className="relative group">
          <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald z-10" />
          <Input
            id="walletAddress"
            name="walletAddress"
            value={walletAddress}
            readOnly
            className="glass border-emerald/30 bg-emerald/5 pl-10 pr-4 font-mono text-emerald cursor-not-allowed"
          />
        </div>
      </div>

      {/* Claim Button */}
      <Button
        type="submit"
        disabled={isLoading || !walletConnected}
        className={`w-full group relative overflow-hidden font-semibold py-6 rounded-xl transition-all duration-300 ${
          walletConnected
            ? "bg-gradient-to-r from-emerald to-emerald-dark hover:from-emerald-dark hover:to-emerald text-primary-foreground hover:scale-[1.02] animate-pulse-glow"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        {isLoading && <div className="absolute inset-0 shimmer" />}
        <span className="relative flex items-center justify-center gap-2">
          {isLoading ? "Minting Badge..." : walletConnected ? "Mint Badge" : "Connect Wallet to Claim"}
        </span>
      </Button>

      {!walletConnected && (
        <p className="text-sm text-muted-foreground text-center">
          Connect your Solana wallet to claim your badge
        </p>
      )}
    </form>
  );
};

export default ClaimBadgeForm;
