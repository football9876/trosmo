import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedBanner from "@/components/FeaturedBanner";
import NewsSection from "@/components/NewsSection";
import CTASection from "@/components/CTASection";
import QuickLinks from "@/components/QuickLinks";
import MatchWidget from "@/components/MatchWidget";
import PartnerSection from "@/components/PartnerSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedBanner
        title="Kjøp sesongkort - Din faste plass"
        subtitle="I 2026 kan du velge mellom sesongkort, kombikort, eller TIL+ sesongkortabonnement. Tidlig ute - bedre pris!"
      />
      <NewsSection />
      <QuickLinks />
      <CTASection />
      <MatchWidget />
      <PartnerSection />
      <Footer />
    </div>
  );
};

export default Index;
