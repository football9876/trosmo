import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import useBlogs from "@/hooks/useBlogs";
import { useMemo } from "react";
import moment from "moment";

const Sustainability = () => {
  const {blogs,loading}=useBlogs();
  const newsItems=useMemo(() => {
    return blogs.map((e)=>{
      return {
        id: e.docId,
        title: e.title,
        date: moment(e.date).format("MMM DD, YYYY"),
        image: e.image as string,
        link: `/news/${e.docId}`
      }
    })
  },[blogs]);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
     
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-primary">
        <img 
          src="https://www.til.no/yngres/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG"
          alt="Sustainability"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Sustainability
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl">
              Our commitment to sustainable development and positive community impact
            </p>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-heading font-bold mb-8">Latest News</h2>
         {loading && <div style={{padding:10}}>
        <span>Loading...</span>
        </div>}
        {/* Featured News */}
        {newsItems.length > 0 && (
          <Link 
            to={newsItems[0].link}
            className="block mb-8 group"
          >
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <img 
                src={newsItems[0].image}
                alt={newsItems[0].title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm mb-2">{newsItems[0].date}</p>
                <h3 className="text-2xl md:text-3xl font-heading font-bold">{newsItems[0].title}</h3>
              </div>
            </div>
          </Link>
        )}

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.slice(1).map((item) => (
            <Link 
              key={item.id}
              to={item.link}
              className="group bg-card rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-1">{item.date}</p>
                <h3 className="font-heading font-bold group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/news" className="text-primary font-semibold hover:underline">
            See more news →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sustainability;
