import BackgroundEffects from "@/components/BackgroundEffects";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollIndicator from "@/components/ScrollIndicator";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <Navbar />
      <Hero />
      <ScrollIndicator />
    </main>
  );
};

export default Index;
