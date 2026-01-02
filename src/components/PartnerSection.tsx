import { ArrowRight } from "lucide-react";

interface PartnerProps {
  name: string;
  logo: string;
  description: string;
  label: string;
}

const partnerData: PartnerProps[] = [
  {
    name: "SpareBank 1 Nord-Norge",
    logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=100&q=80&fit=crop",
    description:
      "Vår hovedsamarbeidspartner SpareBank 1 Nord-Norge har vokst i takt med utviklingen av lokalsamfunnene og landsdelen, og har et tydelig samfunnsansvar.",
    label: "Hovedsamarbeidspartner",
  },
  {
    name: "Troms Kraft",
    logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=200&h=100&q=80&fit=crop",
    description:
      "Tromsø IL og Troms Kraft har hatt et langvarig samarbeid. Sammen gir vi TILs hjemmebane navnet Romssa Arena.",
    label: "Arena",
  },
];

const PartnerSection = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {partnerData.map((partner) => (
            <div key={partner.name} className="group">
              <span className="block text-sm text-muted-foreground font-heading uppercase tracking-wide mb-4">
                {partner.label}
              </span>
              <a href="#" className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-32 h-20 flex-shrink-0 bg-secondary flex items-center justify-center p-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Partner CTAs */}
        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <a href="#" className="btn-primary flex items-center gap-2">
            <span>Bli partner</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#" className="btn-outline flex items-center gap-2">
            <span>Se alle våre partnere</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
