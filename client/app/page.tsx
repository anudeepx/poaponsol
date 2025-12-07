import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatementSection } from "@/components/landing/StatementSection";
import ProtocolModules from "@/components/landing/ProtocolModules";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/landing/Footer";
// import { FeaturedEventsSection } from "@/components/landing/FeaturedEventsSection";

const page = () => {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden noise-overlay">
      <Navbar />
      <HeroSection />
      <StatementSection />
      {/* <FeaturedEventsSection /> */}
      <ProtocolModules />
      <HowItWorks />
      <Footer />
    </main>
  );
};

export default page;
