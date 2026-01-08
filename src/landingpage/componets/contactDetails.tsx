import { MdEmail, MdLocationOn, MdSportsSoccer } from "react-icons/md";

const ContactDetails = () => {
  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "20px auto",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        background: "#f9f9f9",
        // textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3 style={{ color: "#e63333", marginBottom: "10px" }}>📞 Contact Us</h3>
      <img 
          src="/contact.jpg" 
          alt=" Nørresundbyfb Idrettspark - Nordic Stadiums" 
          className="club-image"
          style={{maxWidth:"100%",borderRadius:5}}
        />
      {/* Main Contact Email */}
    

      {/* Support Email */}
      <p>
        <MdEmail color="#e63333" size={20} />{" "}
        <a
          href="mailto:support@tromsoil.com "
          style={{ color: "#e63333", textDecoration: "none", fontWeight: "bold" }}
        >
          support@tromsoil.com 
        </a>
      </p>

      {/* Address */}
      <p>
        <MdLocationOn color="#e63333" size={20} />{" "}
        <span style={{ fontWeight: "bold", color: "#333" }}>
       Voerbjergvej 42, 9400 Nørresundby, Denmark


        </span>
      </p>

      {/* Ground */}
      <p>
        <MdSportsSoccer color="#e63333" size={20} />{" "}
        <span style={{ fontWeight: "bold", color: "#333" }}>
          Home Ground : Nordjyske Bank Arena
Nørresundby, Aalborg, Denmark

        </span>
      </p>
    </div>
  );
};

export default ContactDetails;
