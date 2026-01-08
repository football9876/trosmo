import Footer from "../Footer";
import Header from "../header";
import NestedMenu from "../../landingpage/componets/Nav/pcNavigation";
import Responsive from "../../landingpage/componets/Blogs/responsive";
import "./SponsorsNFB.css"; // styles for the table and text

const SponsorsNFB = () => {
  return (
    <div className="main-body-container">
      <div className="home-content">
        <Header />
        <NestedMenu />
        <Responsive
          left={
            <div className="about-nfb-wrapper">
              {/* Kontingent Section */}
               <h2>Sponsors</h2>
      <p>
        The following support sports and are sponsors of Nørresundby Forenede Boldklubber. Support our sponsors — they support us!
      </p>

      <h3>Main Sponsor</h3>
      <p>
        Nordjyske Bank is the main sponsor of Nørresundby Forenede Boldklubber. The bank is firmly rooted in the local area, and the Nørresundby branch is the club's banking partner.
      </p>
      <p>
        The employees at the Nørresundby branch are ready to meet with you to advise on your banking needs.
        You can contact the Nørresundby branch at <a href="mailto:info@tromsoil.com">info@tromsoil.com</a>. For each meeting held, the bank supports Tromso IL with an extra amount of 350 DKK (remember to refer to the agreement).
      </p>
      <p>
        Click the bank's logo to learn more on Nordjyske Bank’s website.
      </p>

      <h3>Sponsors in Tromso IL</h3>
      <ul>
        <li>Nordjyske Bank</li>
        <li>OK</li>
        <li>3F Aalborg</li>
        <li>AVAS</li>
        <li>BD Toys</li>
        <li>Bechmann Signs</li>
        <li>Beierholm</li>
        <li>Biopejs-shop.dk</li>
        <li>Bjerregaard & Vigel Pedersen</li>
        <li>Boligadministration ApS</li>
        <li>BrandIN</li>
        <li>Butik Julia</li>
        <li>Children's Corner</li>
        <li>CJ Appliance Service</li>
        <li>The Golden Pretzel</li>
        <li>Eberhardt’s Painting Company</li>
        <li>Erik Andersen’s Successor</li>
        <li>Frii Bike Shop</li>
        <li>Rehabilitation Denmark</li>
        <li>Grønborg Electric</li>
        <li>Hjort Beer</li>
        <li>Holm Electrical and Plumbing</li>
        <li>Industrial and Damage Service West</li>
        <li>Jammerbugt Sports Center</li>
        <li>Jin Shing Grill</li>
        <li>Kærsgaard - Home Appliances</li>
        <li>Lindholm Electric</li>
        <li>Lindholm Church - Factua</li>
        <li>Painter Malerspand v. Johnni Bo Nielsen</li>
        <li>Painting Company Ove Pedersen & Son</li>
        <li>Master Painter Martin Hansen</li>
        <li>Maria Louise Flowers</li>
        <li>Michael Lund A/S</li>
        <li>Bricklayer Brian Pedersen</li>
        <li>Bricklayer Thomas Hedegaard</li>
        <li>The Real Estate House</li>
        <li>Mørch Automobiles</li>
        <li>N.O Jensen</li>
        <li>Nordjysk Auto Recycling</li>
        <li>Nordjysk Coffee</li>
        <li>Nordjysk Painting Company</li>
        <li>Nørresundby Pharmacy</li>
        <li>Nørresundby Housing Association</li>
        <li>P.E. Kristensen’s Successor</li>
        <li>Prinsen’s Pizza</li>
        <li>Redmark</li>
        <li>Rema 1000 Viaduktvej</li>
        <li>Ret & Råd Lawyers</li>
        <li>RJH Design ApS</li>
        <li>Sindal Stairs ApS</li>
        <li>Skalkam Construction</li>
        <li>Škoda Nørresundby</li>
        <li>Butcher Tranholm</li>
        <li>Solsiden Paint and Color Store</li>
        <li>Spar Nord</li>
        <li>Sparekassen Danmark</li>
        <li>Stadsing</li>
        <li>Stigsborg PS</li>
        <li>Sundby-Hvorup Housing Association</li>
        <li>Super Brugsen Nordhavnen</li>
        <li>The Number People</li>
        <li>Terndrup Taxi</li>
        <li>The Irish House</li>
        <li>Thomas Aaby</li>
        <li>Tommy Tents</li>
        <li>UNIBREW</li>
        <li>Vilsen Cars A/S</li>
        <li>VM Madhus</li>
        <li>Workshop 1</li>
        <li>Wasabi Sushi</li>
        <li>Aabybro Contractor Company</li>
        <li>Aalborg Floors</li>
        <li>Aalborg Airport</li>
        <li>Aalborg Locks & Security</li>
      </ul>       
      </div>}/>
       <Footer />
      </div>
    </div>
  );
};

export default SponsorsNFB;
