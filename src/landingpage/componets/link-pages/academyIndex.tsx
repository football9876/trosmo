// import "./AcademyInfo.css";
import TopNavigation from "../Nav/topNavigation";
import Footer from "../footer";
import useInnerWidth from "../../../funcs/useInnerWidth";

const AcademyLink = () => {
      const width=useInnerWidth()
  return (
    <>
      <TopNavigation />
      <br /><br /><br />
{width  <700 && <><br/><br/><br/><br/></>}

      <div
        className="academy-info-container"
        style={{
          maxWidth: "90%",
          padding: 20,
          marginTop: 10,
          borderRadius: 10,
          margin: "0 auto",
          boxShadow: "1px 1px 10px 0px lightgray",
        }}
      >
        {/* Academy Overview */}
        <div className="section">
          <h2>Fløy Academy 2023/2024</h2>
          <img 
         src="https://www.superinvite.no/uploads/logo_1691992227.png"
          className="club-image"
          style={{maxWidth:"100%",borderRadius:5}}
        />
          <p>
            The Fløy Academy is Fløy's football after-school program for boys and girls from the 3rd grade and up.  
          </p>
          <p>
            You can find more details about the Academy on our website.  
          </p>
        </div>

        {/* Activities */}
        <div className="section">
          <h2>Practical Information</h2>
          <h3>Our Activities</h3>
          <p>
            At the Academy, we offer a healthy diet and plenty of activities focused on fundamental ball skills, teamwork, 
            and fun during our training sessions. Players are grouped by age to ensure they are both challenged and experience a sense of mastery.
          </p>
          <p>
            We have skilled coaches with solid expertise in player development.
          </p>
        </div>

        {/* Training Days */}
        <div className="section">
          <h2>Choose One, Two, or Three Days of Activities</h2>
          <p>
            This year, we offer sessions on **Tuesdays, Thursdays, and Fridays**. Choose what suits your child best.  
            The registration is generally for the entire school year, but it is possible to change the day or number of days during the year.
          </p>
          <p>
            <strong>Note:</strong> We do not recommend that players participate in the Academy on the same day they have similar training or a match.  
            This can lead to excessive total workload, increasing the risk of injuries.
          </p>
        </div>

        {/* Pricing and Payment */}
        <div className="section">
          <h2>Pricing and Payment</h2>
          <p>
            The Academy's pricing is competitive compared to traditional after-school programs, and we offer a **15% sibling discount**:
          </p>
          <ul>
            <li>**1 day:** 750 NOK</li>
            <li>**2 days:** 1350 NOK</li>
            <li>**3 days:** 1750 NOK</li>
          </ul>
          <p>
            Payment for the Academy is automatically deducted on the 1st of each month.  
            There is a one-month cancellation policy, meaning you must pay for the current and following month.
          </p>
        </div>

        {/* New Players */}
        <div className="section">
          <h2>First Time at the Academy?</h2>
          <p>
            New players receive a special **Academy clothing package** including a sweater, t-shirt, and shorts, which is included in the price.  
            Players who wish to purchase a new clothing package can get one at a discounted club price.
          </p>
          <p>
            <strong>*Participation for at least 4 months is required to receive the clothing package.</strong>
          </p>
        </div>

        {/* Communication */}
        <div className="section">
          <h2>Communication</h2>
          <p>
            Join the Academy's **private Facebook group** (Note: A new group has been created).  
            Search for **"Fløy Academy 23/24"** on Facebook or click this <a href="#">link</a> to request membership.
          </p>
          <p>
            Important information is shared in the group, and parents can use it to send messages to staff members.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AcademyLink;
