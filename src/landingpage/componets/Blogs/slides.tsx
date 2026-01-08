import React, { useEffect, useState } from "react";
import "./sideSlides.css"; // CSS file we’ll create below
import { AnimatePresence,motion } from "framer-motion";

const sponsors = [
  { image: "/assets/stigsborg-3.jpg.jpeg", link: "" },
  { image: "/assets/nordjysk-malerfirma.png", link: "" },
  { image: "/assets/hummel-logo.png", link: "http://www.hummel.net/" },
  { image: "/assets/avas.jpg", link: "" },
  { image: "/assets/aalborg-gulve.png", link: "" },
  { image: "/assets/sindaltrappenstort0.jpg", link: "" },
  { image: "/assets/biopejs.png", link: "" },
  { image: "/assets/pe_kristensens.png", link: "" },
  { image: "/assets/3f_logo_goer_dig_staerkere_primary_rgb_png.png", link: "" },
  { image: "/assets/spar-nord_logo_cmyk.png", link: "https://www.sparnord.dk/" },
  { image: "/assets/noerresundby-apotek.png", link: "" },
  { image: "/assets/njb-v1-farver.png", link: "https://www.nordjyskebank.dk/noerresundby" },
  { image: "/assets/ok-logo.png", link: "" },
  { image: "/assets/terndrup-texa-og-busser.jpg", link: "" },
  { image: "/assets/rbrew-co_big-257ac54b.png", link: "" },
  { image: "/assets/shb_logo_rbg.png", link: "" },
  { image: "/assets/michaellund-1024x410.jpg", link: "" },
  { image: "/assets/jinshing.jpg", link: "" },
  { image: "/assets/aalborg-lufthavn-logo-svg.png", link: "" },
  { image: "/assets/bechmann-skilte.png", link: "" },
];

const SponsorSlider: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 3) % sponsors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const visibleSponsors = [];
  for (let i = 0; i < 3; i++) {
    visibleSponsors.push(sponsors[(startIndex + i) % sponsors.length]);
  }

  return (
    <div className="sponsor-slider-wrapper">
      <AnimatePresence mode="wait">
  <motion.div
    key={startIndex}
    className="sponsor-slider-inner"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{
      duration: 0.1,         // slower transition (2 seconds)
      ease: "linear"       // linear easing
    }}
  >
    {visibleSponsors.map((sponsor, index) => (
      <div
        key={index}
        className="sponsor-slide"
        style={{ backgroundImage: `url(${sponsor.image})` }}
      >
        <a href={sponsor.link} target="_blank" rel="noopener noreferrer"></a>
      </div>
    ))}
  </motion.div>
</AnimatePresence>
<br/><br/>
    </div>
  );
};

export default SponsorSlider;
