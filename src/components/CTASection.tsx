import { ArrowRight } from "lucide-react";
import seasonTicketImg from "@/assets/season-ticket.jpg";
import volunteersImg from "@/assets/volunteers.jpg";

interface CTACardProps {
  image: string;
  title: string;
  description: string;
  href?: string;
}

const CTACard = ({ image, title, description, href = "#" }: CTACardProps) => {
  return (
    <a
      href={href}
      className="group block overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="relative aspect-[16/9]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-2">
            {title}
          </h3>
          <p className="text-primary-foreground/80 mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-2 text-primary-foreground font-heading font-semibold uppercase tracking-wide">
            <span>Les mer</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </div>
        </div>
      </div>
    </a>
  );
};

const CTASection = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <CTACard
            image={seasonTicketImg}
            title="Kjøp sesongkort - Din faste plass"
            description="I 2026 kan du velge mellom sesongkort, kombikort, eller TIL+ sesongkortabonnement. Tidlig ute - bedre pris!"
          />
          <CTACard
            image={volunteersImg}
            title="Bli frivillig hos oss!"
            description="Tromsø IL er tuftet på frivilligheten og vi søker kontinuerlig påfyll av nye familiemedlemmer."
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
