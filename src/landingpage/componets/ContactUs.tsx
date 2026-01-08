
import useInnerWidth from '../../funcs/useInnerWidth'
import ContactDetails from './contactDetails';
import Header from '../../landingPage2/header';
import NestedMenu from './Nav/pcNavigation';
import Footer from '../../landingPage2/Footer';
const ContactUs = () => {
    const width=useInnerWidth();
  return (
  <>
  <div className="main-body-container">
    <div className="home-content">
     <Header/>
     <NestedMenu/>
        <br /><br /><br />
{width  <700 && <><br/><br/><br/><br/></>}
<div style={{maxWidth: "90%", padding: 20, marginTop: 10, borderRadius: 10, margin: "0 auto", boxShadow: "1px 1px 10px 0px lightgray" }}>
<h2 style={{fontWeight:"bold"}}>Contact us 
</h2>
<ContactDetails/>
</div>
  <Footer/>
  </div>
  </div>
  </>

  )
}

export default ContactUs