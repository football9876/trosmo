import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Trophy, Users, Calendar, MapPin, Target, Heart } from "lucide-react";

const clubHistory = [
  { year: "1920", event: "Tromsø Idrettslag founded" },
  { year: "1985", event: "First promotion to the Norwegian top division" },
  { year: "1987", event: "Alfheim Stadion (now Romssa Arena) opened" },
  { year: "1996", event: "UEFA Cup participation" },
  { year: "2009", event: "Norwegian Cup winners" },
  { year: "2010", event: "UEFA Europa League Round of 16" },
];

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in everything we do, both on and off the pitch."
  },
  {
    icon: Users,
    title: "Community",
    description: "We are deeply rooted in our community and committed to making a positive impact."
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Football is in our blood. We play with heart and pride for our supporters."
  }
];

const quickLinks = [
  { title: "Football Schools", href: "/football-schools", description: "Develop your skills with our youth programs" },
  { title: "Partners", href: "/partners", description: "Join our network of proud sponsors" },
  { title: "Romssa Arena", href: "/stadium", description: "Explore our home ground" },
  { title: "Youth Department", href: "/youth-department", description: "Our commitment to developing young talent" },
  { title: "Shop", href: "/shop", description: "Official TIL merchandise" },
  { title: "Tickets", href: "/tickets", description: "Get tickets for upcoming matches" },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1920&q=80"
          alt="About Tromsø IL"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-12 left-8 right-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              About Tromsø IL
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              The World's Northernmost Professional Football Club
            </p>
          </div>
        </div>
      </div>

      {/* Club Stats */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div>
              <Trophy className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <p className="text-3xl md:text-4xl font-heading font-bold">1</p>
              <p className="text-sm opacity-80 mt-1">Cup Title</p>
            </div>
            <div>
              <Calendar className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <p className="text-3xl md:text-4xl font-heading font-bold">1920</p>
              <p className="text-sm opacity-80 mt-1">Founded</p>
            </div>
            <div>
              <Users className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <p className="text-3xl md:text-4xl font-heading font-bold">100+</p>
              <p className="text-sm opacity-80 mt-1">Years of History</p>
            </div>
            <div>
              <MapPin className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <p className="text-3xl md:text-4xl font-heading font-bold">69°N</p>
              <p className="text-sm opacity-80 mt-1">Latitude</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p className="text-lg leading-relaxed">
                Tromsø Idrettslag, commonly known as TIL, is a Norwegian professional football club based in 
                Tromsø, the largest city in Northern Norway. Founded in 1920, TIL holds the distinction of 
                being the world's northernmost professional football club, located at 69°N latitude.
              </p>
              <p className="text-lg leading-relaxed">
                The club has a rich history in Norwegian football, having competed in the top tier of Norwegian 
                football for many seasons. TIL won the Norwegian Cup in 2009, securing their first and only 
                major trophy, which qualified them for the UEFA Europa League where they reached the Round of 16.
              </p>
              <p className="text-lg leading-relaxed">
                Playing at Romssa Arena (formerly Alfheim Stadion), the club is known for its passionate 
                supporter base, particularly the ultras group Forza Tromsø, who create an electric atmosphere 
                during home matches despite the challenging Arctic conditions.
              </p>
              <p className="text-lg leading-relaxed">
                TIL operates a comprehensive youth development program through its academy and youth department, 
                committed to developing local talent and contributing to the community. The club is also known 
                for its sustainability initiatives and community engagement programs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Club Values */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-10 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-lg p-8 text-center">
                <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Club History Timeline */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-10 text-center">
            Club History
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {clubHistory.map((item, index) => (
                <div key={item.year} className="flex gap-6 items-start">
                  <div className="w-20 flex-shrink-0 text-right">
                    <span className="text-xl font-heading font-bold text-primary">{item.year}</span>
                  </div>
                  <div className="relative">
                    <div className="w-4 h-4 bg-primary rounded-full mt-1" />
                    {index < clubHistory.length - 1 && (
                      <div className="absolute top-5 left-1.5 w-0.5 h-full bg-primary/30" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="text-lg text-foreground">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-10 text-center">
            Explore More
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className="bg-card rounded-lg p-6 hover:shadow-lg transition-shadow group"
              >
                <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {link.title}
                </h3>
                <p className="text-muted-foreground">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Want to Know More?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get in touch with us or visit Romssa Arena to learn more about Tromsø IL
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/stadium"
              className="px-8 py-3 bg-background text-foreground font-heading font-bold rounded hover:bg-background/90 transition-colors"
            >
              Visit Romssa Arena
            </Link>
            <Link
              to="/partners"
              className="px-8 py-3 border-2 border-primary-foreground text-primary-foreground font-heading font-bold rounded hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
