import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import useBlogs from "@/hooks/useBlogs";
import { useMemo } from "react";
import moment from "moment";
import { truncateString } from "@/Logics/date";

const schools = [
  {
    id: "coach-development",
    title: "Coach Development Program 2025",
    description: "A program for motivated and eager-to-learn coaches to develop their skills.",
    image: "https://www.til.no/om-klubben/Fotballskoler%20og%20trenerutvikling/trenerutviklingsprogram2025/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG",
    link: "/football-schools/coach-development"
  },
  {
    id: "til-school",
    title: "TIL School 2026 – Football After-School Program",
    description: "Football training for children and young people throughout the autumn.",
    image: "https://www.til.no/om-klubben/Fotballskoler%20og%20trenerutvikling/tilskolen/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG",
    link: "/football-schools/til-school"
  },
  {
    id: "summer-school",
    title: "TIL's Summer Football School",
    description: "Fun-filled football days for children aged 5-12 at the club's facilities.",
    image: "https://www.til.no/om-klubben/Fotballskoler%20og%20trenerutvikling/tils-sommerfotballskole/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG",
    link: "/football-schools/summer-school"
  },
  {
    id: "tine-school",
    title: "Tine Football School 2025",
    description: "Football school arranged the last week before schools start in autumn.",
    image: "https://www.til.no/om-klubben/Fotballskoler%20og%20trenerutvikling/tine-fotballskole-2025/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG",
    link: "/football-schools/tine-school"
  }
];

const FootballSchools = () => {
    const {blogs,loading}=useBlogs();
      const navigate=useNavigate();
    const schools=useMemo(() => {
      return blogs.slice(0,6).map((e)=>{
        return {
          id: e.docId,
          title: e.title,
          date: moment(e.date).format("MMM DD, YYYY"),
          description: e.text,
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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Football Schools & Coach Development
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl">
              Join our football schools and coach development programs to enhance your skills and passion for the game.
            </p>
          </div>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {schools.map((school) => (
            <Link 
              key={school.id}
              to={school.link}
              className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={school.image} 
                  alt={school.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {school.title}
                </h2>
                <p className="text-muted-foreground">
                  {truncateString(school.description, 200) ||school.description}
                </p>
                <div 
                onClick={()=>{
            navigate("/tickets")
          }} 
                 className="mt-4 flex items-center text-primary font-semibold">
                  Read more
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FootballSchools;
