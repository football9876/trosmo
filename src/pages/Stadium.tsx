import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { MapPin, Users, Calendar, Phone, Mail, Building } from "lucide-react";

const stadiumInfo = [
  { icon: Users, label: "Capacity", value: "6,859" },
  { icon: Calendar, label: "Opened", value: "1987" },
  { icon: Building, label: "Surface", value: "Artificial Turf" },
  { icon: MapPin, label: "Location", value: "Tromsø, Norway" },
];

const facilities = [
  {
    title: "VIP Lounge",
    description: "Experience match day in style with exclusive VIP facilities, gourmet dining, and premium views of the pitch.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80"
  },
  {
    title: "Conference Rooms",
    description: "Modern meeting rooms and conference facilities available for business events and corporate gatherings.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80"
  },
  {
    title: "Club Shop",
    description: "Visit our official club shop for the latest TIL merchandise, kits, and memorabilia.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
  },
  {
    title: "Media Center",
    description: "State-of-the-art press facilities for media coverage of matches and club events.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80"
  }
];

const Stadium = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&q=80"
          alt="Romssa Arena"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-wider">
              ROMSSA ARENA
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mt-4 font-medium">
              Supported by Troms Kraft
            </p>
          </div>
        </div>
      </div>

      {/* Stadium Stats */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stadiumInfo.map((info) => (
              <div key={info.label} className="text-center">
                <info.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <p className="text-3xl md:text-4xl font-heading font-bold">{info.value}</p>
                <p className="text-sm opacity-80 mt-1">{info.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About the Stadium */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              About Romssa Arena
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Romssa Arena, formerly known as Alfheim Stadion, is the home of Tromsø IL and is located in the heart of Tromsø, 
                the world's northernmost city with a professional football club. The stadium has been the home ground of TIL since 1987 
                and has witnessed countless memorable moments in Norwegian football history.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                The arena features modern facilities including premium seating areas, VIP lounges, conference rooms, 
                and a state-of-the-art artificial turf playing surface that allows for year-round football despite 
                the challenging Arctic conditions.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Located just a short walk from the city center, Romssa Arena offers easy access for supporters and 
                visitors alike. The stadium atmosphere on match days is electric, with the passionate Forza Tromsø 
                supporters creating an unforgettable experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-10 text-center">
            Stadium Facilities
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {facilities.map((facility) => (
              <div key={facility.title} className="bg-card rounded-lg overflow-hidden shadow-lg group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">{facility.title}</h3>
                  <p className="text-muted-foreground">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location & Contact */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Map / Location */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                Getting Here
              </h2>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1395.8654844747694!2d18.9551!3d69.6489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45c4c452994b4d5f%3A0x9f7f3f4f3a5b5b5a!2sAlfheim%20Stadion!5e0!3m2!1sen!2sno!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Romssa Arena Location"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Alfheimveien 2, 9007 Tromsø, Norway</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                Contact Us
              </h2>
              <div className="bg-card rounded-lg p-6">
                <div className="space-y-4">
                
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:post@til.no" className="text-muted-foreground hover:text-primary transition-colors">
                       support@tromsoil.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-heading font-bold mb-4">Stadium Tours</h3>
                  <p className="text-muted-foreground mb-4">
                    Experience Romssa Arena like never before with an exclusive stadium tour. 
                    See the players' tunnel, changing rooms, and pitch-side views.
                  </p>
                  <Link
                    to="#"
                    className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded font-heading font-bold hover:bg-primary/90 transition-colors"
                  >
                    Book a Stadium Tour
                  </Link>
                </div>

                <div className="mt-8">
                  <h3 className="font-heading font-bold mb-4">Book Meeting Rooms</h3>
                  <p className="text-muted-foreground mb-4">
                    Host your next meeting or event at Romssa Arena. Modern facilities with stunning views.
                  </p>
                  <Link
                    to="#"
                    className="inline-block border-2 border-primary text-primary px-6 py-3 rounded font-heading font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Book Meeting Rooms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Stadium;
