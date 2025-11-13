import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Calendar, Hash, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

const CreateEventForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    eventURI: "",
    startTimestamp: "",
    endTimestamp: "",
    maxClaims: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Event created successfully!", {
        description: `${formData.eventName} is now live on Solana`,
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
      {/* Event Name */}
      <div className="space-y-2">
        <Label htmlFor="eventName" className="text-foreground font-medium">
          Event Name
        </Label>
        <div className="relative group">
          <Input
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            placeholder="ETHGlobal Hackathon 2025"
            className="glass border-muted hover:border-emerald/50 focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all duration-300 pl-4 pr-4"
            required
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300 glow-emerald" />
        </div>
      </div>

      {/* Event URI */}
      <div className="space-y-2">
        <Label htmlFor="eventURI" className="text-foreground font-medium">
          Event URI
        </Label>
        <div className="relative group">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
          <Input
            id="eventURI"
            name="eventURI"
            value={formData.eventURI}
            onChange={handleChange}
            placeholder="https://arweave.net/...json"
            className="glass border-muted hover:border-emerald/50 focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all duration-300 pl-10 pr-4"
            required
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300 glow-emerald" />
        </div>
      </div>

      {/* Start and End Timestamps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTimestamp" className="text-foreground font-medium">
            Start Timestamp
          </Label>
          <div className="relative group">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
            <Input
              id="startTimestamp"
              name="startTimestamp"
              type="datetime-local"
              value={formData.startTimestamp}
              onChange={handleChange}
              className="glass border-muted hover:border-emerald/50 focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all duration-300 pl-10 pr-4"
              required
            />
            <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300 glow-emerald" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endTimestamp" className="text-foreground font-medium">
            End Timestamp
          </Label>
          <div className="relative group">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
            <Input
              id="endTimestamp"
              name="endTimestamp"
              type="datetime-local"
              value={formData.endTimestamp}
              onChange={handleChange}
              className="glass border-muted hover:border-emerald/50 focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all duration-300 pl-10 pr-4"
              required
            />
            <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300 glow-emerald" />
          </div>
        </div>
      </div>

      {/* Max Claims */}
      <div className="space-y-2">
        <Label htmlFor="maxClaims" className="text-foreground font-medium">
          Max Claims
        </Label>
        <div className="relative group">
          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
          <Input
            id="maxClaims"
            name="maxClaims"
            type="number"
            value={formData.maxClaims}
            onChange={handleChange}
            placeholder="500"
            min="1"
            className="glass border-muted hover:border-emerald/50 focus:border-emerald focus:ring-2 focus:ring-emerald/20 transition-all duration-300 pl-10 pr-4"
            required
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300 glow-emerald" />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald to-emerald-dark hover:from-emerald-dark hover:to-emerald text-primary-foreground font-semibold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(var(--emerald)/0.5)]"
      >
        {isLoading && <div className="absolute inset-0 shimmer" />}
        <span className="relative flex items-center justify-center gap-2">
          {isLoading ? "Creating Event..." : "Create Event"}
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Button>
    </form>
  );
};

export default CreateEventForm;
