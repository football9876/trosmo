import Header from '../header'
import Responsive from '../../landingpage/componets/Blogs/responsive'
import NestedMenu from '../../landingpage/componets/Nav/pcNavigation'
import Footer from '../Footer'

const Activities2025 = () => {
  return (
  <div className="main-body-container">
      <div className="home-content">
        <Header />
        <NestedMenu />
        <Responsive
          left={
            <div className="about-nfb-wrapper">
           <h3 style={{padding:20,fontWeight:"bold",textAlign:"center"}}>Activities 2025 / Year Wheel 2025</h3>
      <p>
        We need volunteers to help us with the many activities we hold throughout the year.
      </p>
      <p>
        Click on this or the link below to see the many activities where we need volunteers during the year. We hope players (youth, senior, and oldboys), passive members, parents, grandparents, and many others will lend a helping hand.
        Choose the shift(s) you can help us with.
      </p>
      <p>
        <a
          href="#0"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#007BFF", textDecoration: "underline" }}
        >
          CLICK HERE - AND OPEN THE YEAR WHEEL / ACTIVITIES 2025 - SHIFT SCHEDULE
        </a>
        &nbsp;(or see the spotbox on the right side)
      </p>
      <p>
        Send an email to <strong>info@tromsoil.com</strong>  with: <br />
        Shift number, shift date, your name, email, phone number, and if applicable, your own or your child’s department.
      </p>
      <p>
        You will then be entered into the schedule with your name next to the selected shifts (other information will not be visible). You will receive an SMS or email confirming that we have received your registration and "heartbeat" as a volunteer shift helper.
      </p>
      <p>Thank you in advance for your help.</p>
      <h3>Example activities and periods:</h3>
      <ul>
        <li>Canteen shifts at Voerbjergvej - March, April, May, June, August, September, and October</li>
        <li>Nørhalne Cup - May</li>
        <li>Nordjyske Bank DUS CUP - May</li>
        <li>Work Saturday at Lerumbakken - May</li>
        <li>Match Day at Lerumbakken - May</li>
        <li>Sankt Hans - Stigsborg - June</li>
        <li>NFB DBU Football School - June / July</li>
        <li>Green Concert - July</li>
        <li>Nordjyske Bank training tournament Aalborg Championships - July</li>
        <li>Christmas tree sales - November / December</li>
        <li>Fireworks sales - December</li>
      </ul>
            </div>
          }
        />
        <Footer />
      </div>
    </div>
  )
}

export default Activities2025
