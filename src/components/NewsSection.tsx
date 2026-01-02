import NewsCard from "./NewsCard";
import { ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    date: "02. jan. 2026",
    title: "Gleder meg til å spille foran Forza Tromsø",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
  },
  {
    id: 2,
    date: "29. des. 2025",
    title: "Vi takker for nå",
  },
  {
    id: 3,
    date: "29. des. 2025",
    title: "Nyhammer klar for TIL",
  },
  {
    id: 4,
    date: "28. des. 2025",
    title: "Klar for Eliteserien",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
  },
  {
    id: 5,
    date: "26. des. 2025",
    title: "Signerer ny avtale",
  },
  {
    id: 6,
    date: "26. des. 2025",
    title: "Klar for 2026",
  },
  {
    id: 7,
    date: "25. des. 2025",
    title: "TIL-skolen søker medansvarlig leder i deltidsstilling",
  },
  {
    id: 8,
    date: "25. des. 2025",
    title: "Ny assistenttrener for TIL Kvinner er klar",
  },
];

const NewsSection = () => {
  return (
    <section id="news" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newsItems.map((item, index) => (
            <div
              key={item.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <NewsCard
                date={item.date}
                title={item.title}
                image={item.image}
                size={item.image ? "large" : "small"}
              />
            </div>
          ))}
        </div>

        {/* See More Link */}
        <div className="flex justify-center mt-10">
          <a
            href="#"
            className="btn-outline flex items-center gap-2"
          >
            <span>Se flere nyheter</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
