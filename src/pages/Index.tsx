import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>GymFlow Pro - Gestion de salle de sport tout-en-un</title>
        <meta name="description" content="La plateforme tout-en-un pour les propriétaires de salles de sport, entraîneurs et membres. Planification, paiements, suivi - tout en un seul endroit." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
