import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import Footer from "@/components/landing/Footer";

const page = () => {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden noise-overlay">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
};

export default page;
