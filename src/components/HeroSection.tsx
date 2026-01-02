import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-primary min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Large Arrow Graphics */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Left bracket */}
        <div className="absolute left-[10%] top-[5%]">
          <svg
            viewBox="0 0 150 400"
            className="w-24 md:w-36 lg:w-48 h-auto"
            fill="none"
            stroke="currentColor"
            strokeWidth="40"
          >
            <path
              d="M140 10 H20 V390"
              className="text-foreground"
              strokeLinecap="square"
            />
          </svg>
        </div>

        {/* Large Arrow */}
        <div className="relative">
          <svg
            viewBox="0 0 600 300"
            className="w-[60vw] md:w-[50vw] lg:w-[40vw] h-auto arrow-animation"
            fill="none"
          >
            {/* Arrow shaft */}
            <line
              x1="0"
              y1="150"
              x2="400"
              y2="150"
              stroke="currentColor"
              strokeWidth="60"
              className="text-foreground"
              strokeLinecap="square"
            />
            {/* Arrow head */}
            <path
              d="M350 30 L550 150 L350 270"
              stroke="currentColor"
              strokeWidth="60"
              className="text-foreground"
              strokeLinecap="square"
              strokeLinejoin="miter"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Floating CTA Button */}
      <a
        href="#news"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-primary-foreground font-heading font-semibold uppercase tracking-wide animate-bounce"
      >
        <span>Se Nyheter</span>
        <ArrowRight className="w-5 h-5" />
      </a>
    </section>
  );
};

export default HeroSection;
