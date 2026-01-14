import { FaRegAddressBook } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdSportsSoccer } from "react-icons/md";

const ContactDetails = () => {
  return (
    <div
      style={{
        maxWidth: "480px",
        width:"100%",
        margin: "30px auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        background: "#ffffff",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <h3
        style={{
          color: "#c62828",
          marginBottom: "16px",
          fontSize: "20px",
          fontWeight: 700,
          borderBottom: "2px solid #f0f0f0",
          paddingBottom: "8px",
        }}
      >
        Contact Us
      </h3>



      {/* Contact Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Support Email */}
        <div style={rowStyle}>
          <FaRegAddressBook size={18} color="#c62828" />
          <a href="mailto:support@tromsoil.com" style={linkStyle}>
             Romssa Arena Stadionvegen 3, 9007 Tromsø, Norway. 
          </a>
        </div>

        {/* General Email */}
        <div style={rowStyle}>
          <MdEmail size={18} color="#c62828" />
          <a href="mailto:post@tromsoil.com" style={linkStyle}>
            post@tromsoil.com
          </a>
        </div>
      </div>
    </div>
  );
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 12px",
  background: "#fafafa",
  borderRadius: "8px",
  border: "1px solid #eee",
};

const linkStyle: React.CSSProperties = {
  color: "#c62828",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "14px",
};

export default ContactDetails;
