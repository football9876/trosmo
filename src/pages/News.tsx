import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import useBlogs from "@/hooks/useBlogs";
import { useMemo } from "react";
import moment from "moment";
import { ClipLoader } from "react-spinners";

interface NewsItem {
  id: number | string;
  date: string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  month: string;
}



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
  const {blogs,loading}=useBlogs();
const newsItems: NewsItem[] = useMemo(()=>{
return blogs.map((blog) => ({
    id: blog.docId,
  date: blog.date,
  title: blog.title,
  description: blog.text,
  image: blog.image as string,
  tags: [],
  month: moment(blog.date).format("MMMM"),
}))
},[blogs]);

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
          src="/hero2.jpeg"
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
            {loading && <div><ClipLoader size={20}/></div>}
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
                        to={`/news/${item.id}`}
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
