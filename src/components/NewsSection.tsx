import NewsCard from "./NewsCard";
import { ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    date: "Jan 02, 2026",
    title: "Excited to play in front of Forza Tromsø",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
  },
  {
    id: 2,
    date: "Dec 29, 2025",
    title: "We say goodbye for now",
  },
  {
    id: 3,
    date: "Dec 29, 2025",
    title: "Nyhammer signs for TIL",
  },
  {
    id: 4,
    date: "Dec 28, 2025",
    title: "Ready for Eliteserien",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
  },
  {
    id: 5,
    date: "Dec 26, 2025",
    title: "Signs new contract",
  },
  {
    id: 6,
    date: "Dec 26, 2025",
    title: "Ready for 2026",
  },
  {
    id: 7,
    date: "Dec 25, 2025",
    title: "TIL Academy seeking part-time co-leader",
  },
  {
    id: 8,
    date: "Dec 25, 2025",
    title: "New assistant coach for TIL Women confirmed",
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
            <span>See more news</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
