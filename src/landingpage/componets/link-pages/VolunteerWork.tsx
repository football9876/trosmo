// import "./AcademyInfo.css";
import TopNavigation from "../Nav/topNavigation";
import Footer from "../footer";
import useInnerWidth from "../../../funcs/useInnerWidth";

const VolunteerWork = () => {
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
           <header className="volunteer-registration-header">
        <h1>Sør Cup Volunteer Registration 2024 - Fløy</h1>
        <p>Book your favorite volunteer shift today.</p>
      </header>
          <img 
         src="https://www.superinvite.no/uploads/logo_1478194065.png"
          className="club-image"
          style={{maxWidth:"100%",borderRadius:5}}
        />


    <div className="volunteer-registration-page">
   

      <section className="volunteer-registration-section">
        <h2>Dear Fløy Member!</h2>
        <p>
          Sør Cup is Fløy's largest and most important volunteer event and the primary source of income. The revenue from Sør Cup helps keep membership fees low and activity levels high.
        </p>
        <p>
          To carry out Sør Cup, we rely on our members and have set up a model where every member must contribute a certain number of shifts per child. You can find this further down the page.
        </p>
        <p>
          We use <strong>SUPERINVITE</strong> for volunteer registration. SuperInvite is an online store where you can choose shifts that best suit you. The price is naturally set to 0 NOK.
        </p>
        <p>
          <strong>Be early - The earlier you book, the more options you have to choose from.</strong>
        </p>
      </section>

      <section className="volunteer-registration-section">
        <h2>How Many Shifts Are Required?</h2>
        <h3>Football Members:</h3>
        <ul>
          <li>1 child – 3 shifts</li>
          <li>2 or more children – minimum 4 shifts</li>
          <li>1 night shift counts as 3 shifts.</li>
        </ul>
        <h3>Teams with Two or More Coaches:</h3>
        <ul>
          <li>Minimum 2 shifts per additional coach beyond 2. For example, a team with 4 coaches must have 2 coaches take 2 shifts each. How these are distributed is up to the individual team.</li>
        </ul>
        <h3>Handball Members:</h3>
        <ul>
          <li>2 shifts per family, regardless of the number of children (this applies only if you have children solely in handball. If you have children in football, the football rules apply).</li>
        </ul>
        <p>
          Registration is open for all departments from <strong>March 26, 2024</strong>.
        </p>
        <p>
          Thank you for contributing to this summer's community event and for supporting Fløy!
        </p>
      </section>

      <section className="volunteer-registration-section">
        <h2>How to Book a Shift</h2>
        <ol>
          <li>Click on <strong>"Go to product options."</strong></li>
          <li>Choose the shift you want. The number behind each category indicates the number of different shifts in that category. Behind each shift, you’ll see the number of available slots.</li>
          <li>Once you’ve found your shift, click the <strong>"Add to cart"</strong> button on the right side.</li>
          <li>If you want to register multiple shifts, you can do so.</li>
          <li>When you’re done, click the <strong>"View cart"</strong> button.</li>
          <li>Here, you’ll see a summary of your shifts.</li>
          <li>Click on <strong>"Go to registration."</strong></li>
          <li>Enter your first name and last name. Also, provide contact information and details about which team you are volunteering for. You can specify the team per shift if you have children on multiple teams. If you’ve added multiple shifts to your cart, you must fill in details about who will take which shift. You can copy the fields from <strong>"Person 1"</strong> if all shifts are to be performed by the same person.</li>
          <li>Click on <strong>"Go to payment information."</strong> Here, enter your email address and optionally choose a password.</li>
          <li>Click on <strong>"Go to summary."</strong></li>
          <li>Check the box <strong>"I accept the following terms"</strong> and then click the <strong>"Proceed to payment"</strong> button.</li>
        </ol>
        <p>
          You have now registered your shift. You will receive a receipt via email. We recommend adding it to your calendar so you don’t forget the shift. Some adjustments may occur as SØRCUP approaches, but we will contact you directly if needed.
        </p>
        <p>
          <strong>Note:</strong> If you do not receive a receipt via email, the shifts are not registered.
        </p>
        <p>
          Pay attention to age restrictions for each shift.
        </p>
      </section>

  



















</div>


      </div>
      <br/>
      <Footer/>
      </>

    )
}

export default VolunteerWork