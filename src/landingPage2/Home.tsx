
import Responsive from "../landingpage/componets/Blogs/responsive";
import NestedMenu from "../landingpage/componets/Nav/pcNavigation";
import Footer from "./Footer";
import Header from "./header";
import "./landingPage.css";

const Home = () => {
  return (<div className="main-body-container">
    <div className="home-content">
     <Header/>
     <NestedMenu/>
     
    
    <Responsive/>
    <Footer/>
    </div>
    </div>
  )
}
export default Home
