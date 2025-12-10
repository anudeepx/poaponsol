import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatementSection } from "@/components/landing/StatementSection";
import ProtocolModules from "@/components/landing/ProtocolModules";
import Footer from "@/components/landing/Footer";

const page = () => {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden noise-overlay">
      <Navbar />
      <HeroSection />
      <StatementSection />
      <ProtocolModules />
      <Footer />
    </main>
  );
};

export default page;
