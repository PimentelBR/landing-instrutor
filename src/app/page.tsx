import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBanner from "@/components/SearchBanner";
import ForWho from "@/components/ForWho";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import DashboardDemo from "@/components/DashboardDemo";
import SocialProof from "@/components/SocialProof";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import Differentials from "@/components/Differentials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SearchBanner />
        <ForWho />
        <Benefits />
        <HowItWorks />
        <DashboardDemo />
        <SocialProof />
        <Comparison />
        <Pricing />
        <Differentials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
