import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Play, Download, Share2, ExternalLink } from "lucide-react";
import { useVideos } from "@/hooks/useVideos";

// Helper function to generate thumbnail from video URL
const generateThumbnail = (videoUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.preload = 'metadata';
    
    video.onloadeddata = () => {
      // Seek to 1 second to get a better thumbnail
      video.currentTime = 1;
    };
    
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
        resolve(thumbnail);
      } else {
        reject(new Error('Could not get canvas context'));
      }
    };
    
    video.onerror = () => {
      // Return placeholder if video fails to load
      resolve("/logo.jpeg");
    };
    
    video.src = videoUrl;
  });
};

interface VideoWithThumbnail {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  createdAt?: string;
}

const Videos = () => {
  const { videos, loading } = useVideos();
  const [videosWithThumbnails, setVideosWithThumbnails] = useState<VideoWithThumbnail[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoWithThumbnail | null>(null);
  const [thumbnailsLoading, setThumbnailsLoading] = useState(false);

  useEffect(() => {
    if (videos.length > 0) {
      setThumbnailsLoading(true);
      
      // Generate thumbnails for all videos
      const generateAllThumbnails = async () => {
        const videosWithThumb = await Promise.all(
          videos.map(async (video) => {
            try {
              const thumbnail = await generateThumbnail(video.url);
              return {
                id: video.docId || '',
                title: video.title,
                url: video.url,
                thumbnail,
                createdAt: video.createdAt
              };
            } catch (error) {
              console.error('Error generating thumbnail for:', video.title, error);
              return {
                id: video.docId || '',
                title: video.title,
                url: video.url,
                thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
                createdAt: video.createdAt
              };
            }
          })
        );
        
        setVideosWithThumbnails(videosWithThumb);
        if (videosWithThumb.length > 0) {
          setSelectedVideo(videosWithThumb[0]);
        }
        setThumbnailsLoading(false);
      };
      
      generateAllThumbnails();
    }
  }, [videos]);

  const handleDownload = () => {
    if (selectedVideo) {
      const link = document.createElement('a');
      link.href = selectedVideo.url;
      link.download = selectedVideo.title;
      link.click();
    }
  };

  const handleShare = async () => {
    if (selectedVideo) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: selectedVideo.title,
            url: selectedVideo.url
          });
        } catch (error) {
          console.log('Error sharing:', error);
        }
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(selectedVideo.url);
        alert('Video link copied to clipboard!');
      }
    }
  };

  const [userSelected, setUserSelected]=useState<boolean>(false);
  const handleOpenNew = () => {
    if (selectedVideo) {
      window.open(selectedVideo.url, '_blank');
    }
  };

  if (loading || thumbnailsLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading videos...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (videosWithThumbnails.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">No Videos Yet</h2>
            <p className="text-muted-foreground">Check back later for exciting content!</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] bg-primary">
        <img
          src="/hero2.jpeg"
          alt="Video"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white">Video</h1>
        </div>
      </div>

      {/* Featured Video */}
      {selectedVideo && (
        <div className="bg-foreground">
          <div className="container mx-auto px-4 py-8">
            <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden bg-black">
              <video
                controls
                autoPlay={userSelected}
                className="w-full h-full"
                // poster={selectedVideo.thumbnail}
                src={selectedVideo.url}
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 pointer-events-none">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                  {selectedVideo.title}
                </h2>
                <div className="flex items-center gap-4 mt-3 pointer-events-auto">
                  <button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    <span className="text-sm">Download video</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">Share video</span>
                  </button>
                  <button 
                    onClick={handleOpenNew}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className="text-sm">Open in new window</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="flex-1 bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videosWithThumbnails.map((video) => (
              <div
                key={video.id}
                onClick={() => {
                  if(window.innerWidth < 768){
                  window.open(video.url, '_blank');

                  }
                  else{
                  setSelectedVideo(video);
                  window.scrollTo(0, 400);
                  setUserSelected(true);
                  }
                }}
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <div className="relative aspect-video">
                  <video
                    src={video.url}
                    style={{backgroundColor:"black"}}
                    // alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                      <Play className="w-7 h-7 text-primary-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  {video.createdAt && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(video.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Videos;