import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface NewsItem {
  id: number;
  date: string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  month: string;
}

const newsItems: NewsItem[] = [
  // January 2026
  {
    id: 1,
    date: "January 09, 2026",
    title: "Kit Partner",
    description: "We offer companies the opportunity to become a kit partner. This is a great way to get a lot of exposure. Read more about your opportunities here.",
    image: "https://www.til.no/nyheter/_/image/919cbff0-d932-4f2b-a2ed-61843eef24c6:3f5e88c2214604a56b3cf776fec8b4df93ea3224/width-300/000.png.jpg",
    month: "January 2026"
  },
  {
    id: 2,
    date: "January 09, 2026",
    title: "Visibility",
    description: "You can buy visibility on various surfaces with us. Read more about visibility here.",
    image: "https://www.til.no/nyheter/_/image/7038ef15-4b79-4b7b-ad28-1f2673f9dfdc:d2f3cc1e3251c138b4c7f90c811cdfe852a9aca8/width-300/storskjerm.jpeg.jpg",
    month: "January 2026"
  },
  {
    id: 3,
    date: "January 09, 2026",
    title: "Partner Level",
    description: "We offer a structured and flexible partner model with three levels. Read more about our partner levels here.",
    image: "https://www.til.no/nyheter/_/image/c68db749-15c8-47d2-b9f7-4b036f985ff4:6f6b736055278259b6ca8417c56634629dabd878/width-300/partnerniv%C3%A5.png.jpg",
    month: "January 2026"
  },
  {
    id: 4,
    date: "January 08, 2026",
    title: "The Boys Are Back",
    description: "See the photo series from the first training session of the year.",
    image: "https://www.til.no/nyheter/_/image/96b97d6c-17b3-4026-93b8-52a8cbeddc35:f55fe43cdba3e6f3176b27125327a14d3caac12b/width-300/f%C3%B8rste%C3%B8kt.png.jpg",
    tags: ["Video", "Images", "Men's First Team"],
    month: "January 2026"
  },
  {
    id: 5,
    date: "January 02, 2026",
    title: "- Looking Forward to Playing in Front of Forza Tromsø",
    description: "Tromsø IL and KFUM have agreed on a permanent transfer for Mathias Tønnessen.",
    image: "https://www.til.no/nyheter/_/image/34dbe5b6-a063-45aa-89ca-510583df17c3:cfe0dcf356dca2803d2154e9ce2cc09ed3fb2487/width-300/Langt%20format.png.jpg",
    month: "January 2026"
  },
  // December 2025
  {
    id: 6,
    date: "December 29, 2025",
    title: "We Say Goodbye For Now",
    description: "Miika Koskela makes a permanent move to FK Haugesund.",
    image: "https://www.til.no/nyheter/_/image/d466f07b-cae8-4841-ad78-77385e2b5a55:a5357ac9d202e91b2d0d761a1d627e7fc70d6c13/width-300/Langt%20format.png.jpg",
    month: "December 2025"
  },
  {
    id: 7,
    date: "December 29, 2025",
    title: "Nyhammer Ready for TIL",
    description: "Tromsø IL and FK Haugesund have agreed on a permanent transfer for Troy Nyhammer.",
    month: "December 2025"
  },
  {
    id: 8,
    date: "December 28, 2025",
    title: "Ready for Eliteserien",
    description: "Jesper Grundt becomes a TIL player.",
    image: "https://www.til.no/nyheter/_/image/f4691b77-afe5-4103-a748-18522d5c77fe:35a7775c98e9f49c04b60557cee4c4f27f9f4db8/width-300/Langt%20format.png.jpg",
    month: "December 2025"
  },
  {
    id: 9,
    date: "December 26, 2025",
    title: "Signs New Contract",
    description: "Tromsø IL buys Lars Olden Larsen, who is now a Tromsø player for 2 more years.",
    image: "https://www.til.no/nyheter/_/image/a3fd8049-4ea8-4459-94ff-3c314eeb9d71:9823ad97fb4db744530eab5f71f1ac0f724a7569/width-300/NTB_8lgyomYqAgo.jpeg.jpg",
    tags: ["Men's First Team"],
    month: "December 2025"
  },
  {
    id: 10,
    date: "December 26, 2025",
    title: "Ready for 2026",
    description: "Elisabeth Skall extends her contract with Tromsø IL Women and is ready for a new season in Tromsø.",
    image: "https://www.til.no/nyheter/_/image/9f48c750-9816-4628-976f-407ee839df88:64a86c0a38e5df247c7ff5522a973d992b46cc4e/width-300/til.png.jpg",
    tags: ["Women's First Team"],
    month: "December 2025"
  }
];

const filterOptions = [
  { label: "Partner Content", count: 44 },
  { label: "Men's First Team", count: 39 },
  { label: "With Video", count: 26 },
  { label: "Women's First Team", count: 23 },
  { label: "Images", count: 18 },
  { label: "Video", count: 15 },
  { label: "Academy", count: 12 },
  { label: "eSeries", count: 4 },
  { label: "Youth", count: 4 },
  { label: "eFootball", count: 4 },
  { label: "With Photo Gallery", count: 3 },
  { label: "Pro TIL", count: 2 },
  { label: "Supporter", count: 2 },
  { label: "TIL History", count: 1 },
  { label: "Tickets", count: 1 },
];

const News = () => {
  // Group news by month
  const groupedNews = newsItems.reduce((acc, item) => {
    if (!acc[item.month]) {
      acc[item.month] = [];
    }
    acc[item.month].push(item);
    return acc;
  }, {} as Record<string, NewsItem[]>);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] bg-primary">
        <img
          src="https://www.til.no/nyheter/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG"
          alt="News"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white">News</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* News List */}
            <div className="flex-1">
              {Object.entries(groupedNews).map(([month, items]) => (
                <div key={month} className="mb-8">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-4 border-b-2 border-primary pb-2">
                    {month}
                  </h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        to="#"
                        className="flex gap-4 p-4 bg-card rounded-lg hover:shadow-lg transition-shadow group"
                      >
                        {item.image && (
                          <div className="w-24 h-24 md:w-32 md:h-24 flex-shrink-0 overflow-hidden rounded">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">{item.date}</p>
                          <h4 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex gap-2 mt-2">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Load More Button */}
              <div className="text-center mt-8">
                <button className="px-8 py-3 bg-primary text-primary-foreground font-heading font-bold rounded hover:bg-primary/90 transition-colors">
                  Show More
                </button>
              </div>
            </div>

            {/* Sidebar - Filters */}
            <div className="w-full lg:w-80">
              <div className="bg-card rounded-lg p-6 sticky top-24">
                <h3 className="font-heading font-bold text-lg mb-4">Filter</h3>
                <button className="text-primary font-medium mb-4">Show/Hide Filters</button>
                
                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                    Articles
                  </h4>
                  {filterOptions.map((filter) => (
                    <label
                      key={filter.label}
                      className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-muted-foreground text-primary focus:ring-primary"
                      />
                      <span className="text-sm">
                        {filter.label} ({filter.count})
                      </span>
                    </label>
                  ))}
                </div>
                
                <button className="mt-4 text-primary font-medium text-sm">
                  See all filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default News;
