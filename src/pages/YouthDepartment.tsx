import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const sections = [
  {
    id: "club-handbook",
    title: "Club Handbook",
    description: "Guidelines and information for players, parents and coaches",
    link: "/youth-department/club-handbook"
  },
  {
    id: "sports-schedule",
    title: "Sports Schedule",
    description: "Training and match schedules for youth teams",
    link: "/youth-department/sports-schedule"
  },
  {
    id: "about-youth",
    title: "About Youth Department",
    description: "Learn about our youth development philosophy",
    link: "/youth-department/about"
  },
  {
    id: "track-calendar",
    title: "Track Calendar Yngres",
    description: "Booking and availability for training facilities",
    link: "/youth-department/track-calendar"
  },
  {
    id: "become-member",
    title: "Become a Member",
    description: "Join the TIL family and start your football journey",
    link: "/youth-department/become-member"
  },
  {
    id: "volunteering",
    title: "Volunteering in TIL",
    description: "Make a difference by volunteering with our club",
    link: "/youth-department/volunteering"
  },
  {
    id: "tournament",
    title: "TIL Tournament",
    description: "Information about our annual youth tournament",
    link: "/youth-department/tournament"
  },
  {
    id: "leroy-hall",
    title: "Lerøy Hall",
    description: "Our indoor training facility information",
    link: "/youth-department/leroy-hall"
  },
  {
    id: "fff-mini",
    title: "FFF & FFF Mini",
    description: "Football for Fun program for the youngest players",
    link: "/youth-department/fff-mini"
  }
];

const newsItems = [
  {
    title: "Record Year at TIL Tournament",
    date: "Sep 1, 2025",
    category: "Youth"
  },
  {
    title: "Start-up Training Class of 2020",
    date: "Aug 20, 2025",
    category: "Youth"
  },
  {
    title: "You Can Now Charge Your EV at Lerøyhallen",
    date: "2025",
    category: "Partner Content"
  },
  {
    title: "Great Tournament Experiences in Piteå",
    date: "2025",
    category: "Youth"
  }
];

const YouthDepartment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-primary">
        <img 
          src="https://www.til.no/yngres/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG"
          alt="Youth Department"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Youth Department
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl">
              Developing the next generation of football talent in Tromsø
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* News Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold mb-6">Latest News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {newsItems.map((item, index) => (
              <div key={index} className="bg-card p-4 rounded-lg border hover:shadow-lg transition-shadow cursor-pointer">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{item.category}</span>
                <p className="text-sm text-muted-foreground mt-2">{item.date}</p>
                <h3 className="font-semibold mt-1">{item.title}</h3>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="#" className="text-primary font-semibold hover:underline">
              See more news →
            </Link>
          </div>
        </div>

        {/* Sections Grid */}
        <h2 className="text-2xl font-heading font-bold mb-6">Explore Youth Department</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link 
              key={section.id}
              to={section.link}
              className="group bg-card p-6 rounded-lg border hover:border-primary hover:shadow-lg transition-all"
            >
              <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {section.title}
              </h3>
              <p className="text-muted-foreground text-sm">{section.description}</p>
              <div className="mt-4 flex items-center text-primary text-sm font-semibold">
                Learn more
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default YouthDepartment;
