import { ArrowRight } from "lucide-react";
import stadiumHeroImg from "@/assets/stadium-hero.jpg";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeaturedBannerProps {
  image?: string;
  title: string;
  subtitle?: string;
  href?: string;
}

const FeaturedBanner = ({
  image,
  title,
  subtitle,
  href = "#",
}: FeaturedBannerProps) => {
  const isMobile=useIsMobile();
  return (
    <a
      href={href}
      style={{
          height:isMobile ? 300:400
        }}
      className="group relative block w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden"
    >
      <img
        src={image || stadiumHeroImg}
        alt={title}
        
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl">
            {subtitle}
          </p>
        )}
        <div className="flex items-center gap-2 mt-4 text-primary-foreground font-heading font-semibold uppercase tracking-wide">
          <span>Read more</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
        </div>
      </div>
    </a>
  );
};

export default FeaturedBanner;
