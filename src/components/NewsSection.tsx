import useBlogs from "@/hooks/useBlogs";
import NewsCard from "./NewsCard";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import moment from "moment";

const newsItems = [
  {
    id: 1,
    date: "Jan 02, 2026",
    title: "Excited to play in front of Forza Tromsø",
    image:
      "https://www.til.no/nyheter/_/image/34dbe5b6-a063-45aa-89ca-510583df17c3:cfe0dcf356dca2803d2154e9ce2cc09ed3fb2487/width-300/Langt%20format.png.jpg", // match article image
  },
  {
    id: 2,
    date: "Dec 29, 2025",
    title: "We say goodbye for now",
    image:
      "https://www.til.no/nyheter/_/image/d466f07b-cae8-4841-ad78-77385e2b5a55:a5357ac9d202e91b2d0d761a1d627e7fc70d6c13/width-300/Langt%20format.png.jpg",
  },
  {
    id: 3,
    date: "Dec 29, 2025",
    title: "Nyhammer signs for TIL",
    image:
      "https://www.til.no/nyheter/_/image/96b97d6c-17b3-4026-93b8-52a8cbeddc35:f55fe43cdba3e6f3176b27125327a14d3caac12b/width-300/f%C3%B8rste%C3%B8kt.png.jpg",
  },
  {
    id: 4,
    date: "Dec 28, 2025",
    title: "Ready for Eliteserien",
    image:
      "https://www.til.no/nyheter/_/image/f4691b77-afe5-4103-a748-18522d5c77fe:35a7775c98e9f49c04b60557cee4c4f27f9f4db8/width-300/Langt%20format.png.jpg",
  },
  {
    id: 5,
    date: "Dec 26, 2025",
    title: "Signs new contract",
    image:
      "https://www.til.no/nyheter/_/image/a3fd8049-4ea8-4459-94ff-3c314eeb9d71:9823ad97fb4db744530eab5f71f1ac0f724a7569/width-300/NTB_8lgyomYqAgo.jpeg.jpg",
  },
  {
    id: 6,
    date: "Dec 26, 2025",
    title: "Ready for 2026",
    image:
      "https://www.til.no/nyheter/_/image/9f48c750-9816-4628-976f-407ee839df88:64a86c0a38e5df247c7ff5522a973d992b46cc4e/width-300/til.png.jpg",
  },
  {
    id: 7,
    date: "Dec 25, 2025",
    title: "TIL Academy seeking part-time co-leader",
    image:
      "https://www.til.no/nyheter/_/image/96b97d6c-17b3-4026-93b8-52a8cbeddc35:f55fe43cdba3e6f3176b27125327a14d3caac12b/width-300/f%C3%B8rste%C3%B8kt.png.jpg",
  },
  {
    id: 8,
    date: "Dec 25, 2025",
    title: "New assistant coach for TIL Women confirmed",
    image:
      "https://www.til.no/nyheter/_/image/96b97d6c-17b3-4026-93b8-52a8cbeddc35:f55fe43cdba3e6f3176b27125327a14d3caac12b/width-300/f%C3%B8rste%C3%B8kt.png.jpg",
  },
];

const NewsSection = () => {
 const {blogs,loading}=useBlogs();
 const newsItems=useMemo(() => {
   return blogs.slice(0,6).map((blog) => ({
    id: blog.docId,
    date: moment(blog.date).format("MMM DD, YYYY"),
    title: blog.title,
    image:blog.image as string
       }))
 },[blogs]);

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
