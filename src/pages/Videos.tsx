import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Play, Download, Share2, ExternalLink } from "lucide-react";

interface VideoItem {
  id: number;
  title: string;
  thumbnail: string;
  duration?: string;
  date?: string;
  category?: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    title: "Kristiansund - Tromsø 1-3",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    duration: "5:30",
    date: "December 2025",
    category: "Match Highlights"
  },
  {
    id: 2,
    title: "Tromsø - Viking 2-1",
    thumbnail: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    duration: "6:15",
    date: "November 2025",
    category: "Match Highlights"
  },
  {
    id: 3,
    title: "The Boys Are Back - First Training Session",
    thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    duration: "3:45",
    date: "January 2026",
    category: "Behind the Scenes"
  },
  {
    id: 4,
    title: "Tromsø - Molde 1-0",
    thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    duration: "4:20",
    date: "October 2025",
    category: "Match Highlights"
  },
  {
    id: 5,
    title: "Troy Nyhammer - Welcome to TIL",
    thumbnail: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
    duration: "2:30",
    date: "December 2025",
    category: "Player Signing"
  },
  {
    id: 6,
    title: "Tromsø - Rosenborg 2-2",
    thumbnail: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80",
    duration: "5:00",
    date: "September 2025",
    category: "Match Highlights"
  },
  {
    id: 7,
    title: "Bodø/Glimt - Tromsø 1-1",
    thumbnail: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800&q=80",
    duration: "4:45",
    date: "August 2025",
    category: "Match Highlights"
  },
  {
    id: 8,
    title: "Season Review 2025",
    thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80",
    duration: "12:00",
    date: "December 2025",
    category: "Season Review"
  },
  {
    id: 9,
    title: "Jesper Grundt Signs for TIL",
    thumbnail: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80",
    duration: "2:15",
    date: "December 2025",
    category: "Player Signing"
  },
  {
    id: 10,
    title: "Tromsø - Brann 3-0",
    thumbnail: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
    duration: "5:45",
    date: "July 2025",
    category: "Match Highlights"
  },
  {
    id: 11,
    title: "Women's Team Training Camp",
    thumbnail: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800&q=80",
    duration: "4:00",
    date: "February 2025",
    category: "Behind the Scenes"
  },
  {
    id: 12,
    title: "Academy Showcase 2025",
    thumbnail: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80",
    duration: "8:30",
    date: "November 2025",
    category: "Academy"
  }
];

const Videos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] bg-primary">
        <img
          src="https://www.til.no/video/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG"
          alt="Video"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white">Video</h1>
        </div>
      </div>

      {/* Featured Video */}
      <div className="bg-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden bg-black group cursor-pointer">
            <img
              src={videos[0].thumbnail}
              alt={videos[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                {videos[0].title}
              </h2>
              <div className="flex items-center gap-4 mt-3">
                <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Download className="w-5 h-5" />
                  <span className="text-sm">Download video</span>
                </button>
                <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">Share video</span>
                </button>
                <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                  <span className="text-sm">Open in new window</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.slice(1).map((video) => (
              <div
                key={video.id}
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                      <Play className="w-7 h-7 text-primary-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  )}
                  {video.category && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      {video.category}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  {video.date && (
                    <p className="text-sm text-muted-foreground mt-1">{video.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-primary text-primary-foreground font-heading font-bold rounded hover:bg-primary/90 transition-colors">
              Load More Videos
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Videos;
