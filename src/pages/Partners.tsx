import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Phone } from "lucide-react";

const contacts = [
  {
    name: "Wiggo Yttegård",
    role: "Commercial Manager",
    phone: "+47 450 80 595",
    email: "wiggo.yttergaard@til.no",
    linkedin: "https://www.linkedin.com/in/wiggo-ytterg%C3%A5rd-0b051020/"
  },
  {
    name: "Kristoffer Thunberg",
    role: "Sales & Partner Manager",
    phone: "+47 970 14 299",
    email: "kristoffer.thunberg@til.no",
    linkedin: "https://www.linkedin.com/in/kristoffer-thunberg/"
  },
  {
    name: "Tromsø IL",
    role: "Club",
    phone: "+47 971 73 000",
    email: "post@til.no",
    linkedin: "https://www.linkedin.com/company/tromso-idrettslag/"
  }
];

const vipPackages = [
  {
    title: "Season Ticket",
    description: "Get access to a permanent seat on one of our long sides."
  },
  {
    title: "Rushfeldt Lounge",
    description: "Get access to the Rushfeldt Lounge where food is served before the match and during halftime. Permanent seat in the K-section."
  },
  {
    title: "Grand Lounge",
    description: "Get access to the Grand Lounge where food is served before the match and during halftime. VIP seats on East Tribune."
  },
  {
    title: "VIP Suite",
    description: "Access to your own suite with 12 seats, where food is served before the match and during halftime. *Suite branding, external and internal, comes additionally."
  }
];

const Partners = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-primary">
        <img 
          src="https://www.til.no/om-klubben/bli-en-til-partner/_/image/7e283e1f-277f-4817-b849-eb3ec4925c51:8850d9399324eac8517d846057de8f434085451e/-1-1/4H4A9970.JPG"
          alt="Become a TIL Partner"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground">
            Become a TIL Partner
          </h1>
        </div>
      </div>

      {/* Intro */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-xl text-muted-foreground mb-6">
            Tromsø IL offers a wide range of commercial opportunities for your business.
          </p>
          <Button size="lg" onClick={() => window.open('#', '_blank')}>
            Click Here to Be Contacted
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold mb-4">What kind of partner should the club be for your business?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We shall be a partner that creates value and memorable experiences.
          </p>

          {/* Business Network */}
          <div className="bg-muted p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-heading font-bold mb-4">Northern Norway's Best Business Network</h2>
            <p className="mb-4">We collaborate with those we know!</p>
            <p className="mb-4">
              That's why we work throughout the season to facilitate relationship building between the businesses in our network, Pro TIL.
            </p>
            <p className="mb-4">
              Here you can see which companies are part of <a href="#" className="text-primary font-semibold">Pro TIL</a>
            </p>
            <p>
              Contact us and we will gladly share what the network entails and what opportunities it offers for you and your business.
            </p>
          </div>

          {/* Contact Section */}
          <h2 className="text-3xl font-heading font-bold text-center mb-8">We Want to Get to Know You!</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contacts.map((contact) => (
              <div key={contact.name} className="bg-card p-6 rounded-lg border text-center">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground">
                    {contact.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg">{contact.name}</h3>
                <p className="text-muted-foreground mb-4">{contact.role}</p>
                <div className="space-y-2 text-sm">
                  <a href={`tel:${contact.phone}`} className="flex items-center justify-center gap-2 text-primary hover:underline">
                    <Phone className="w-4 h-4" />
                    {contact.phone}
                  </a>
                  <a href={`mailto:${contact.email}`} className="flex items-center justify-center gap-2 text-primary hover:underline">
                    <Mail className="w-4 h-4" />
                    {contact.email}
                  </a>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-primary hover:underline">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Digital Partnership */}
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold mb-4">The Northern Norwegian Stage for Meaningful Marketing with Influence</h2>
            <p className="text-muted-foreground mb-4">
              Does your business focus on strengthening the brand or does it want direct returns? We offer digital packages tailored to your needs:
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <li className="bg-primary/10 p-4 rounded-lg text-center font-semibold">Visibility</li>
              <li className="bg-primary/10 p-4 rounded-lg text-center font-semibold">Conversions</li>
              <li className="bg-primary/10 p-4 rounded-lg text-center font-semibold">Experiences</li>
              <li className="bg-primary/10 p-4 rounded-lg text-center font-semibold">WOW Effect</li>
            </ul>
            <p className="text-center text-lg font-semibold">
              TIL is the perfect platform - High organic reach & engagement.
            </p>
          </div>

          {/* Digital Partnership Details */}
          <div className="bg-muted p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-heading font-bold mb-4">Digital Partnership</h2>
            <p>
              Together with you and your business, we find the package that gives you the most value given your needs. It requires a little work and a bit of creativity, but together we accomplish more than alone.
            </p>
          </div>

          {/* VIP Opportunities */}
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold mb-6">VIP Opportunities</h2>
            <p className="text-muted-foreground mb-6">
              We have a range of VIP packages for your business, and will work with you to find the package that suits your needs. Our packages are divided into season tickets, Rushfeldt Lounge, Grand Lounge and private VIP suite.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {vipPackages.map((pkg) => (
                <div key={pkg.title} className="bg-card p-6 rounded-lg border">
                  <h3 className="font-heading font-bold text-lg mb-2">{pkg.title}</h3>
                  <p className="text-muted-foreground">{pkg.description}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-6 font-semibold">
              We <strong>customize</strong> your match day experience according to your needs. Contact us for more info.
            </p>
          </div>

          {/* Arena Visibility */}
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold mb-4">Visibility at the Arena</h2>
            <p className="text-muted-foreground mb-6">
              The arena is our best place to expose your business with visibility. Both locally and nationally through 2D signs permanently mounted on the stands and digital LED exposure in connection with home games.
            </p>
            
            <h3 className="text-xl font-heading font-bold mb-4">LED Exposure</h3>
            <p className="text-muted-foreground mb-6">
              Let all of Norway see your logo. Football is one of the biggest sports on TV, and you can be shown again and again. Our matches are always on TV, and many of them on open national channels.
            </p>

            <h3 className="text-xl font-heading font-bold mb-4">Other Exposure</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Big screen</li>
              <li>2D signs - TV zone</li>
              <li>2D signs - Local zone</li>
            </ul>
          </div>

          {/* Match Partner */}
          <div className="bg-primary text-primary-foreground p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-heading font-bold mb-4">Match Partner</h2>
            <p className="mb-4">
              One of our most popular and attractive products. With an average of 4,600 spectators at the stadium, 15 times a year, match day is the biggest live event in Tromsø.
            </p>
            <p className="mb-4">
              As we combine both spectators at the stadium and our engaged supporters on social media, match partner can be a very lucrative package for your business.
            </p>
            <p>
              We also focus here on your needs based on the desire for visibility, conversion, experiences and/or the WOW effect. One does not exclude the other. If you want full throttle, we give full throttle.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Partners;
