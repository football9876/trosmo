import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-logo">
        
            <h3>Tromso IL</h3>
            <p>
      A football club with pride and tradition since its founding.
            </p>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            Nørresundby Stadion

Voerbjergvej 42, 9400 Nørresundby, Denmark
            <p>Email: info@tromsoil.com</p>
          </div>
{/* 
          <div className="footer-section">
            <h4>Følg os</h4>
            <p>Facebook: Tromso IL</p>
            <p>Instagram: @norresundby_fb</p>
            <p>Twitter: @norresundby_fb</p>
          </div> */}
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Tromso IL. Alle rettigheder forbeholdes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
