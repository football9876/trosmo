import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import TILLogo from "./TILLogo";

const navLinks = [
  { label: "Youth Academy", href: "#" },
  { label: "Sustainability", href: "#" },
  { label: "Football Schools", href: "#" },
  { label: "Shop", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Book Meeting Room", href: "#" },
  { label: "Supporters", href: "#" },
  { label: "Norsk", href: "#" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <TILLogo className="h-8 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
            <button className="nav-link flex items-center gap-2">
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-primary-foreground p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-primary-foreground/20">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-3 nav-link"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
