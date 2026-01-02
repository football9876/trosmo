import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import TILLogo from "./TILLogo";

const footerLinks = {
  club: [
    { label: "About Tromsø IL", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
  tickets: [
    { label: "Buy Tickets", href: "#" },
    { label: "Season Tickets", href: "#" },
    { label: "Group Tickets", href: "#" },
    { label: "VIP Packages", href: "#" },
  ],
  arena: [
    { label: "Romssa Arena", href: "#" },
    { label: "Stadium Guide", href: "#" },
    { label: "Transportation", href: "#" },
    { label: "Book Meeting Room", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo and social */}
          <div className="lg:col-span-2">
            <TILLogo className="h-10 mb-6" />
            <p className="text-background/70 text-sm mb-6 max-w-xs">
              Tromsø Idrettslag - The world's northernmost top club. Founded 1920.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center bg-background/10 hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Club links */}
          <div>
            <h4 className="font-heading font-bold uppercase tracking-wide text-sm mb-4">
              The Club
            </h4>
            <ul className="space-y-3">
              {footerLinks.club.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tickets links */}
          <div>
            <h4 className="font-heading font-bold uppercase tracking-wide text-sm mb-4">
              Tickets
            </h4>
            <ul className="space-y-3">
              {footerLinks.tickets.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Arena links */}
          <div>
            <h4 className="font-heading font-bold uppercase tracking-wide text-sm mb-4">
              Arena
            </h4>
            <ul className="space-y-3">
              {footerLinks.arena.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © 2026 Tromsø Idrettslag. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-background/50 hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-background/50 hover:text-background transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
