
import "./landingPage.css";
import TopNavigation from './componets/Nav/topNavigation';
import Presenter from './componets/Presenter/main';
import NestedMenu from './componets/Nav/pcNavigation';
import Responsive from './componets/Blogs/responsive';
import useInnerWidth from '../funcs/useInnerWidth';
import Footer from './componets/footer';
const Home = () => {
  const width=useInnerWidth();
  return (<div className="main-body-container">
    <div className="home-content">
      <TopNavigation/>
      <br/>
      <Presenter/>
      {width  > 700 &&<>
      <NestedMenu/>
      <br/>
      </>}
      <Responsive/>
      <br/>
      <Footer/>
      {/* <h1>hello world</h1> */}
    </div>
    </div>
  )
}
export default Home
