import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-primary min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Floating CTA Button */}
      <a
        href="#news"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-primary-foreground font-heading font-semibold uppercase tracking-wide animate-bounce"
      >
        <span>View News</span>
        <ArrowRight className="w-5 h-5" />
      </a>
    </section>
  );
};

export default HeroSection;
