import Footer from "../Footer";
import Header from "../header";
import NestedMenu from "../../landingpage/componets/Nav/pcNavigation";
import Responsive from "../../landingpage/componets/Blogs/responsive";

const  ClubMaterials= () => {
  return (
    <div className="main-body-container">
      <div className="home-content">
        <Header />
        <NestedMenu />
        <Responsive
          left={
            <div className="about-nfb-wrapper">
              <h3 style={{padding:20,fontWeight:"bold",textAlign:"center"}}>Draw January 2025</h3>
            <img width={"100%"} style={{
                width:"100%"
            }} src="/assets/table.png"/>
            </div>
          }
        />
        <Footer />
      </div>
    </div>
  );
};

export default ClubMaterials;
