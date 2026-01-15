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
    logo: "/logos/sparebank.jpg",
    description:
      "Our main partner SpareBank 1 Nord-Norge has grown in step with the development of local communities and the region, and has a clear social responsibility. The world’s northernmost fully-fledged financial institution has been our main partner since 1991.",
    label: "MAIN PARTNER",
  },
  {
    name: "Troms Kraft",
    logo: "/logos/troms.png",
    description:
      "Tromsø IL and Troms Kraft have had a long-standing collaboration and for several years we have worked on our own behalf to elevate the Sami language and culture. Now we are joining forces and naming TIL’s home stadium Romssa Arena. The goal is to give Sami culture greater visibility through top-flight football.",
    label: "ARENA",
  },
];

const PartnerSection = () => {
  return (
    <section className="bg-[#f5f5f5] py-16">
      <div className="max-w-3xl mx-auto px-4 space-y-20">
        {partnerData.map((partner) => (
          <div key={partner.name} className="text-center">
            {/* Label */}
            <div className="flex justify-center mb-6">
              <span className="bg-black text-white text-xs font-bold px-6 py-2 tracking-widest">
                {partner.label}
              </span>
            </div>

            {/* Logo Card */}
            <div className="bg-white shadow-md flex justify-center items-center py-6">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 object-contain"
              />
            </div>

            {/* Description */}
            <div className="bg-red-600 text-white px-8 py-8 text-sm leading-relaxed">
              {partner.description}
            </div>
          </div>
        ))}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="mailto:support@tromsoil.com"
            className="bg-red-600 text-white font-bold px-8 py-3 uppercase tracking-wide hover:bg-red-700 transition"
          >
            Become a Partner
          </a>

          <a
            href="/partners"
            className="text-red-600 font-semibold flex items-center gap-2 hover:underline"
          >
            See all our partners
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Bottom partners strip */}
        <div className="bg-white py-8 px-6 shadow-sm" style={{borderRadius:"20px"}}>
          <div className="flex flex-wrap items-center justify-center gap-10">
            <img src="/logos/img.png" style={{width:"100%",height:100}} />
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
