import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import useBlogs from "@/hooks/useBlogs";
import { useMemo } from "react";
import { ClipLoader } from "react-spinners";
import { ArrowLeft, Calendar, User } from "lucide-react";
import moment from "moment";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { blogs, loading } = useBlogs();

  const blog = useMemo(() => {
    return blogs.find((b) => b.docId === id);
  }, [blogs, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <ClipLoader size={40} color="hsl(var(--primary))" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <h1 className="text-2xl font-heading font-bold">Article not found</h1>
          <Link to="/news" className="text-primary hover:underline">
            Back to News
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[300px] md:h-[500px]">
        <img
          src={blog.image as string || "https://www.til.no/nyheter/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Back Link */}
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>

          <article className="max-w-4xl mx-auto">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
              {blog.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{moment(blog.date).format("MMMM Do, YYYY")}</span>
              </div>
              {(blog as any).author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{(blog as any).author}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-foreground leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: blog.text || "" }}
              />
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="font-heading font-bold text-lg mb-4">Share this article</h3>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-[#1877F2] text-white rounded hover:opacity-90 transition-opacity">
                  Facebook
                </button>
                <button className="px-4 py-2 bg-[#1DA1F2] text-white rounded hover:opacity-90 transition-opacity">
                  Twitter
                </button>
                <button className="px-4 py-2 bg-muted text-foreground rounded hover:bg-muted/80 transition-colors">
                  Copy Link
                </button>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              More News
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {blogs
                .filter((b) => b.docId !== id)
                .slice(0, 3)
                .map((item) => (
                  <Link
                    key={item.docId}
                    to={`/news/${item.docId}`}
                    className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image as string}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        {moment(item.date).format("MMM D, YYYY")}
                      </p>
                      <h4 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsDetail;
