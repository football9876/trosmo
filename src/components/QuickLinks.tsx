import { 
  Newspaper, 
  Video, 
  Users, 
  Calendar, 
  Trophy, 
  Ticket, 
  MapPin, 
  Info 
} from "lucide-react";

const links = [
  { icon: Newspaper, label: "News", href: "#" },
  { icon: Video, label: "Video", href: "#" },
  { icon: Users, label: "Teams", href: "#" },
  { icon: Calendar, label: "Fixtures", href: "#" },
  { icon: Trophy, label: "Results", href: "#" },
  { icon: Ticket, label: "Buy Tickets", href: "#" },
  { icon: MapPin, label: "Romssa Arena", href: "#" },
  { icon: Info, label: "About TIL", href: "#" },
];

const QuickLinks = () => {
  return (
    <section className="py-8 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex flex-col items-center gap-2 p-4 text-background hover:text-primary transition-colors group"
            >
              <link.icon className="w-6 h-6 transition-transform group-hover:scale-110" />
              <span className="text-xs font-heading font-semibold uppercase tracking-wide text-center">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
