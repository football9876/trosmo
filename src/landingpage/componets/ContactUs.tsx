
import useInnerWidth from '../../funcs/useInnerWidth'
import ContactDetails from './contactDetails';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const ContactUs = () => {
    const width=useInnerWidth();
  return (
  <>
     <div className="min-h-screen flex flex-col">
        <Navbar />
        

        <br /><br /><br />
<div style={{maxWidth: "90%", padding: 20, marginTop: 10, borderRadius: 10, margin: "0 auto" }}>

<ContactDetails/>
</div>

     <Footer />

  </div>
  </>

  )
}

export default ContactUs