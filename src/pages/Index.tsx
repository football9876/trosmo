import Navbar from "@/components/Navbar";
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
      <FeaturedBanner
        title="Buy Season Ticket - Your Regular Seat"
        subtitle="In 2026 you can choose between season tickets, combo passes, or TIL+ season ticket subscriptions. Early bird - better price!"
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
