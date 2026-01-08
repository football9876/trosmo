import Footer from "../Footer";
import Header from "../header";
import NestedMenu from "../../landingpage/componets/Nav/pcNavigation";
import Responsive from "../../landingpage/componets/Blogs/responsive";

const AboutNFB = () => {
  return (
    <div className="main-body-container">
    <div className="home-content">
     <Header/>
     <NestedMenu/>
    <Responsive left={
   
    <div className="about-nfb-container" style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Briefly About NFB</h2>
      <p>
        Nørresundby United Football Clubs (commonly known as NFB or Tromso IL) was founded
        based on several years of collaboration between the football clubs in Nørresundby.
        It started back in 2008 with a joint youth department. From there, things evolved further.
      </p>
      <p>
        The general assemblies of Lindholm IF and Nørresundby BK approved the merger in the spring
        of 2014, whereas NUBI's general assembly did not achieve a sufficiently large majority for the merger.
        On July 1, 2015, Lindholm IF and Nørresundby BK finally merged.
      </p>

      <h3>Name and Kit</h3>
      <p>
        The final name was chosen through a competition. Many good suggestions and reasons were received.
        A committee consisting of members affiliated with the former clubs then chose the final name.
        In the same way, the color of the new club kit was selected. NFB plays at home in a red shirt,
        red shorts, and red socks.
      </p>

      <h3>Logo</h3>
            <div
        style={{
          marginTop: "20px",
          width: "100%",
          height: "300px",
          backgroundColor: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#888",
          fontStyle: "italic",
        }}
      >
      <img style={{width:200,height:"auto" }} src="/assets/shitts.png"/>
      </div>
      <p>
        Just like with the name and kit, a competition was announced for the new logo.
        It was intended that the logo should include the history of Nørresundby. Many good and interesting
        proposals were received. However, two proposals particularly appealed to the committee.
        The two proposals were, in many ways, similar and were combined. A logo was created that both
        visually looks good and also includes a story, including elements from Nørresundby's old city coat of arms.
      </p>

      <h3>Symbolism</h3>
      <p>
        From Aase Daarbak from Sundby Samlingerne, the club received this explanation of Nørresundby's city coat of arms:
        The boat on the Nørresundby coat of arms is not a Viking ship, but a row ferry, which refers to the ferries
        that until 1864 ferried people, animals, carts, etc., from Nørresundby to Aalborg and vice versa.
        The waves naturally symbolize the Limfjord. The moon symbolizes determination. The star symbolizes
        skillful decision-making. The moon and the star are seen on several coats of arms.
        This explanation and these symbols served as inspiration for the club's new logo.
      </p>

      {/* Placeholder for logo or club image */}
      <div
        style={{
          marginTop: "20px",
          width: "100%",
          height: "300px",
          backgroundColor: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#888",
          fontStyle: "italic",
        }}
      >
      <img style={{width:200,height:"auto" }}
      
          className="app-icon"
      
      src="/icon.png"/>
      </div>
    </div>
}/>
     <Footer/>
    </div>
    </div>
  );
};

export default AboutNFB;
