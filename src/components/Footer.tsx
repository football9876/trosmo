import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import TILLogo from "./TILLogo";

const Footer = () => {
  return (
    <footer className="bg-[#c40000] text-white">
      <div className="max-w-6xl mx-auto px-4 py-16 text-center space-y-10">

        {/* Logo */}
        <div className="flex justify-center">
          <TILLogo className="h-14" />
        </div>

        {/* Top contact row */}
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
        

          <a href="mailto:post@tromsoil.com" className="border-b border-white pb-1">
            post@tromsoil.com
          </a>

          <a href="/contact-us" className="border-b border-white pb-1">
            Contact us
          </a>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
          <a href="https://facebook.com" className="flex items-center gap-2 border-b border-white pb-1">
            <Facebook size={16} /> Facebook
          </a>

          <a href="https://instagram.com" className="flex items-center gap-2 border-b border-white pb-1">
            <Instagram size={16} /> Instagram
          </a>

          <a href="https://youtube.com" className="flex items-center gap-2 border-b border-white pb-1">
            <Youtube size={16} /> YouTube
          </a>

          <a href="https://linkedin.com" className="flex items-center gap-2 border-b border-white pb-1">
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>

        {/* Newsletter */}
        {/* <div className="space-y-4">
          <p className="font-semibold text-lg">
            Subscribe to newsletters from Tromsø
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Email address"
              className="px-4 py-3 w-full sm:w-96 text-black outline-none"
            />

            <button className="text-white font-bold tracking-wide relative">
              REGISTRATION
              <span className="absolute left-0 -bottom-2 w-full h-1 bg-yellow-400"></span>
            </button>
          </div>
        </div> */}

        {/* Bottom links */}
        <div className="flex justify-center gap-10 text-sm mt-12">
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
