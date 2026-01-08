
import useInnerWidth from '../../../funcs/useInnerWidth';
import Footer from '../footer';
import TopNavigation from '../Nav/topNavigation';
import './gloalclub.css'; // Add styling as needed

const GoalClubPage = () => {
        const width=useInnerWidth()
    
  return (<>
  <TopNavigation/>


  <br /><br /><br />
  {width  <700 && <><br/><br/><br/><br/></>}



    <div className="goal-club-page" style={{ maxWidth: "90%", padding: 20, marginTop: 10, borderRadius: 10, margin: "0 auto", boxShadow: "1px 1px 10px 0px lightgray" }}>
      <header className="goal-club-header">
        <h1>Goal Club 2024</h1>
        <p>Support the team and win great prizes!</p>
      </header>
      <img style={{backgroundColor:"lightgray",width:"100%"}} src={`https://campaign.fandrive.io/privateapi/campaignapplive/campaignfiles/614634?guid=85879bbb-2010-4df7-a5a5-d92b654a7085`}  />



      <section className="goal-club-section">
        <h2>What is the Goal Club?</h2>
        <p>
          The Goal Club is a well-known concept where, for every goal our A-team scores in the opponent's net during the 2024 Postnord League, you can contribute a chosen amount to support the team and be entered into a draw for great prizes at the end of the season!
        </p>
        <p>
          This is a fun way to follow the club while also making a welcome contribution in a simple way.
        </p>
      </section>

      <section className="goal-club-section">
        <h2>How to Participate</h2>
        <h3>Private Individuals:</h3>
        <p>Choose between 5, 7.50, 10, 20, 50, or 100 NOK per goal.</p>
        <h3>Businesses:</h3>
        <p>Choose between 50, 100, 200, 300, 400, or 500 NOK per goal.</p>
        <p>
          <strong>Don’t have Facebook but still want to contribute?</strong> Choose SMS when you register!
        </p>
        <p>
          Both private individuals and businesses will be invoiced after the halfway point and at the end of the season.
        </p>
      </section>

      <section className="goal-club-section">
        <h2>Prizes for Private Individuals</h2>
        <p>The list of prizes will be updated, but here are some examples:</p>
        <ul>
          <li>Signed home jersey</li>
          <li>Signed away jersey</li>
          <li>Supporter scarf</li>
          <li>Gift card from Pizzabakeren</li>
          <li>Gift card from KiwiNørresundby</li>
        </ul>
      </section>

     
    </div>
    <br/>
    <Footer/>
    </>
  );
};

export default GoalClubPage;