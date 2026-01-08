import { useState } from "react";
import { Menu, X, User, Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import TILLogo from "./TILLogo";

const topBarLinks = [
  { label: "Youth Academy", href: "/youth-department" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Football Schools", href: "/football-schools" },
  { label: "Shop", href: "/shop" },
  { label: "Partners", href: "/partners" },
  { label: "Book Meeting Room", href: "#" },
  { label: "Supporters", href: "#" },
  { label: "English", href: "#" },
];

const mainNavLinks = [
  { label: "News", href: "#" },
  { label: "Video", href: "#" },
  { label: "Team", href: "#" },
  { label: "Schedule", href: "#" },
  { label: "Results", href: "#" },
  { label: "Buy Tickets", href: "/tickets" },
  { label: "Romssa Arena", href: "#" },
  { label: "About TIL", href: "#" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar - Dark */}
      <div className="bg-foreground hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end h-10 gap-6">
            {topBarLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-xs font-heading font-semibold uppercase tracking-wide text-background hover:opacity-80 transition-opacity"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-heading font-semibold uppercase tracking-wide text-background hover:opacity-80 transition-opacity"
                >
                  {link.label}
                </a>
              )
            ))}
            <button className="text-background hover:opacity-80 transition-opacity">
              <User className="w-5 h-5" />
            </button>
            <button className="text-background hover:opacity-80 transition-opacity">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Middle Section - Brand */}
      <div className="bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo and Club Name */}
            <Link to="/" className="flex items-center gap-4">
              <TILLogo className="h-14 lg:h-16 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-heading font-bold text-primary-foreground tracking-wide">
                  TROMSØ IL
                </h1>
                <p className="text-xs lg:text-sm text-primary-foreground/90 font-medium">
                  The World's Northernmost Professional Football Club
                </p>
              </div>
            </Link>

            {/* TIL+ Branding - Desktop */}
            <div className="hidden lg:flex flex-col items-end">
              <div className="text-primary-foreground font-heading text-4xl font-bold tracking-tight">
                TIL<span className="text-primary-foreground">+</span>
              </div>
              <p className="text-xs text-primary-foreground/80">Season Ticket Subscription</p>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-primary-foreground p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-primary border-t border-primary-foreground/20">
        <div className="container mx-auto px-4">
          <div className="hidden lg:flex items-center justify-between h-12">
            {/* Main Nav Links with Dividers */}
            <div className="flex items-center">
              {mainNavLinks.map((link, index) => (
                <div key={link.label} className="flex items-center">
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="nav-link px-4 py-3">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="nav-link px-4 py-3">
                      {link.label}
                    </a>
                  )}
                  {index < mainNavLinks.length - 1 && (
                    <div className="h-4 w-px bg-primary-foreground/30" />
                  )}
                </div>
              ))}
            </div>

            {/* Search */}
            <button className="flex items-center gap-2 nav-link">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-primary py-4 border-t border-primary-foreground/20">
          <div className="container mx-auto px-4">
            {/* Main Links */}
            <div className="mb-4 pb-4 border-b border-primary-foreground/20">
              {mainNavLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block py-3 nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block py-3 nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>
            {/* Secondary Links */}
            {topBarLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block py-2 text-sm text-primary-foreground/80 hover:text-primary-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-2 text-sm text-primary-foreground/80 hover:text-primary-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
