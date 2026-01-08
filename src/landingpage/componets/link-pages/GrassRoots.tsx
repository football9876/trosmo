import { useNavigate } from 'react-router-dom';
import useInnerWidth from '../../../funcs/useInnerWidth';
import Footer from '../footer';
import TopNavigation from '../Nav/topNavigation';
import './grassroots.css'; // Add styling as needed
import { MDBBtn } from 'mdb-react-ui-kit';

const InfokapslerPage = () => {
        const width=useInnerWidth()
        const navigate=useNavigate()
    
  return (<>
  <TopNavigation/>

  <br /><br /><br />
  {width  <700 && <><br/><br/><br/><br/></>}

    <div className="infokapsler-page" style={{ maxWidth: "90%", padding: 20, marginTop: 10, borderRadius: 10, margin: "0 auto", boxShadow: "1px 1px 10px 0px lightgray" }}>
      <header className="infokapsler-header">
        <h1>Infokapsler</h1>
        <p>Learn about Norsk Tipping's interactive information modules.</p>
      </header>

      <section className="infokapsler-section">
        <h2>What are Infokapsler?</h2>
        <p>
          Infokapsler are small, interactive information modules designed to provide quick and easy-to-understand explanations about Norsk Tipping's games, rules, and responsible gaming practices.
        </p>
      </section>

      <section className="infokapsler-section">
        <h2>Purpose of Infokapsler</h2>
        <ul>
          <li>Educate players about games and rules.</li>
          <li>Promote responsible gaming.</li>
          <li>Provide transparency about odds and winnings.</li>
        </ul>
      </section>

      <section className="infokapsler-section">
        <h2>Types of Infokapsler</h2>
        <ul>
          <li>Game rules and instructions.</li>
          <li>Odds and probability explanations.</li>
          <li>Responsible gaming tips and resources.</li>
        </ul>
      </section>

      <section className="infokapsler-section">
        <h2>How to Use Infokapsler</h2>
        <ol>
          <li>Click on the Infokapsler icon on the Norsk Tipping website or app.</li>
          <li>Explore the interactive content.</li>
          <li>Learn about games and responsible gaming practices.</li>
        </ol>
      </section>

      <section className="infokapsler-section">
        <h2>Benefits of Infokapsler</h2>
        <ul>
          <li>Easy access to information.</li>
          <li>Interactive and engaging.</li>
          <li>Helps players make informed decisions.</li>
        </ul>
      </section>
      <br/>
      <div className="d-flex justify-content-center">
      <MDBBtn onClick={()=>{
      navigate("/Dashboard")}}>Apply now</MDBBtn>
      </div>
<br/><br/>
    </div>
    <br/><br/>
    <Footer/>
    </>
  );
};

export default InfokapslerPage;