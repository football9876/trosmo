import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Ticket, CreditCard, Users, MapPin, Clock, Info, ChevronRight } from "lucide-react";

const ticketCategories = [
  {
    title: "Single Match Tickets",
    description: "Buy tickets for individual home matches at Romssa Arena",
    icon: Ticket,
    href: "#",
  },
  {
    title: "Season Tickets",
    description: "Get access to all home matches with your season ticket",
    icon: CreditCard,
    href: "#",
  },
  {
    title: "Group Tickets",
    description: "Special rates for groups of 10 or more people",
    icon: Users,
    href: "#",
  },
];

const ticketInfo = [
  {
    title: "Venue",
    content: "Romssa Arena, Tromsø",
    icon: MapPin,
  },
  {
    title: "Match Day Box Office",
    content: "Opens 2 hours before kick-off",
    icon: Clock,
  },
  {
    title: "Age Categories",
    content: "Adult (18+), Youth (13-17), Child (0-12)",
    icon: Info,
  },
];

const pricingTiers = [
  { category: "Adult", standing: "250 NOK", seated: "350 NOK", vip: "650 NOK" },
  { category: "Youth (13-17)", standing: "125 NOK", seated: "175 NOK", vip: "325 NOK" },
  { category: "Child (0-12)", standing: "Free*", seated: "100 NOK", vip: "200 NOK" },
  { category: "Senior (67+)", standing: "200 NOK", seated: "280 NOK", vip: "520 NOK" },
];

const faqs = [
  {
    question: "How do I buy tickets?",
    answer: "Tickets can be purchased online through our website, at the stadium box office on match days, or at authorized ticket outlets in Tromsø.",
  },
  {
    question: "Can I get a refund if the match is cancelled?",
    answer: "Yes, if a match is cancelled and not rescheduled, you will receive a full refund. If the match is rescheduled, your ticket remains valid for the new date.",
  },
  {
    question: "Are there discounts for students?",
    answer: "Yes, students with valid student ID can purchase tickets at youth prices. Please bring your student ID to the match.",
  },
  {
    question: "How do I access my digital ticket?",
    answer: "After purchase, you will receive an email with your digital ticket. You can also access your tickets by logging into your account on our website.",
  },
];

const Tickets = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-primary-foreground mb-4">
            Ticket Information
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Everything you need to know about purchasing tickets for TIL home matches at Romssa Arena.
          </p>
        </div>
      </section>

      {/* Ticket Categories */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-heading font-bold mb-8">
            Buy Tickets
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ticketCategories.map((category) => (
              <a
                key={category.title}
                href={category.href}
                className="group bg-card border border-border p-6 hover:shadow-lg transition-all duration-300 hover:border-primary"
              >
                <category.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <span className="inline-flex items-center text-primary font-semibold">
                  Buy Now <ChevronRight className="w-4 h-4 ml-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {ticketInfo.map((info) => (
              <div key={info.title} className="flex items-start gap-4">
                <div className="bg-primary p-3">
                  <info.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg">{info.title}</h3>
                  <p className="text-muted-foreground">{info.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-heading font-bold mb-8">
            Ticket Prices
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-border">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-4 font-heading font-bold">Category</th>
                  <th className="text-left p-4 font-heading font-bold">Standing</th>
                  <th className="text-left p-4 font-heading font-bold">Seated</th>
                  <th className="text-left p-4 font-heading font-bold">VIP</th>
                </tr>
              </thead>
              <tbody>
                {pricingTiers.map((tier, index) => (
                  <tr 
                    key={tier.category} 
                    className={index % 2 === 0 ? "bg-background" : "bg-muted"}
                  >
                    <td className="p-4 font-semibold">{tier.category}</td>
                    <td className="p-4">{tier.standing}</td>
                    <td className="p-4">{tier.seated}</td>
                    <td className="p-4">{tier.vip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            * Children under 12 can enter free to standing areas when accompanied by a paying adult.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-heading font-bold mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-card p-6 border border-border">
                <h3 className="font-heading font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary p-8 lg:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-primary-foreground mb-4">
                Need Help?
              </h2>
              <p className="text-primary-foreground/90 mb-6">
                Our ticket office is ready to assist you with any questions about purchasing tickets or attending matches.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:billett@til.no" className="btn-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Email Us
                </a>
                <a href="tel:+4777600100" className="btn-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Call: +47 77 60 01 00
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tickets;
