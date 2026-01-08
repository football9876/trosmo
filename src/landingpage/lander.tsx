import "./landingPage.css";
import TopNavigation from './componets/Nav/topNavigation';
// import Presenter from './componets/Presenter/main';
import Footer from './componets/footer';
import useInnerWidth from "../funcs/useInnerWidth";

const Lander = () => {
    const width=useInnerWidth();
  return (
    <div>
      <TopNavigation />
      <br />
      <br />
      <br />
      <br />
      {width < 700 && <>
         <br />
         <br />
         <br />
      </>}
      {/* <Presenter /> */}
      
      {/* Club Information Section */}
      <div style={{maxWidth:"90%",padding:20,marginTop:10,borderRadius:10,margin:"0 auto",boxShadow:"1px 1px 10px 0px lightgray"}}>

      <div className="club-info-container" >
        <h5>AboutNørresundby Idrettslag (Fløy IL)</h5>
        <img 
          src="https://tse1.mm.bing.net/th?id=OIP.jyeCzlD1_jxGVpReW_IruwHaEH&pid=Api" 
          alt="Flekkerøy Idrettspark - Nordic Stadiums" 
          className="club-image"
          style={{maxWidth:"100%",borderRadius:5}}
        />
        <p>
         Nørresundby Idrettslag, commonly known as Fløy IL, is a distinguished sports club based inNørresundby, Kristiansand, Norway.
          Established on July 29, 1950, the club has a rich history spanning over seven decades, primarily focusing on football and team handball.
        </p>
      </div>

      {/* Football Achievements Section */}
      <div className="football-section">
        <h5>Football Achievements and Current Standing</h5>
        <p>
          As of the 2024 season, Fløy IL competes in the 2. divisjon, the third tier of the Norwegian football league system, 
          finishing 11th out of 14 teams in Group 1.
        </p>
        <p>
          Their home matches are held at the <strong>Flekkerøy Stadion</strong>, which accommodates up to 1,500 spectators.
        </p>
      </div>

      {/* Club Mission Section */}
      <div className="mission-section">
        <h5>Club Mission and Community Engagement</h5>
        <p>
          Since its inception, Fløy IL has been committed to nurturing talent and promoting sportsmanship. 
          The club's mission centers on teaching essential skills and fostering player development, reflecting a dedication to both athletic excellence and community involvement.
        </p>
      </div>

      {/* Stadium Information */}
      <div className="stadium-info">
        <h5>Facilities and Infrastructure</h5>
        <p>
          The <strong>Flekkerøy Stadion</strong> serves as the club's primary venue, offering facilities that support both players and fans. 
          The stadium's capacity and amenities contribute to a vibrant match-day atmosphere, enhancing the overall experience for attendees.
        </p>
      </div>

      {/* Future Plans */}
      <div className="future-plans">
        <h5>Recent Performance and Future Prospects</h5>
        <p>
          In recent seasons, Fløy IL has demonstrated resilience and competitiveness within their league.
          The club continues to strive for excellence, aiming to improve their standings and achieve greater success in Norwegian football.
        </p>
      </div>

      {/* Contact Info */}
      <div className="contact-info">
        <h5>Contact and Further Information</h5>
        <p>
          For more details about Fløy IL, including upcoming matches, player information, and community events, visit the 
        contact via email at <strong>support@tromsoil.com </strong>.
        </p>
      </div>
      </div>

      <br />
      <Footer />
    </div>
  );
};

export default Lander;
