
import './TeamInfo.css';
import Footer from './footer';
import TopNavigation from './Nav/topNavigation';
import useInnerWidth from '../../funcs/useInnerWidth';

const TeamInfo = () => {
const width=useInnerWidth();
  return (
    <>
      <TopNavigation />
      <br /><br /><br />
{width  <700 && <><br/><br/><br/><br/></>}

      <div className="team-info-container" style={{maxWidth:"90%",padding:20,marginTop:10,borderRadius:10,margin:"0 auto",boxShadow:"1px 1px 10px 0px lightgray"}}>
        {/* Team Overview */}
        <div className="section">
          <h2>Our Team</h2>
          <img 
          src="/images/team.jpeg" 
          alt="Flekkerøy Idrettspark - Nordic Stadiums" 
          className="club-image"
          style={{maxWidth:"100%",borderRadius:5}}
        />
          <p>
            Our football club is dedicated to nurturing talent, fostering teamwork, and promoting sportsmanship. 
            With a strong emphasis on both individual player growth and team success, we strive to create an environment 
            where athletes can thrive on and off the field. We take pride in our rich history, competitive spirit, and 
            commitment to excellence.
          </p>
        </div>

        {/* Coaching Philosophy */}
        <div className="section">
          <h2>Coaching & Development</h2>
          <p>
            Our coaching staff is composed of experienced professionals who are passionate about developing players’ skills, 
            tactical understanding, and mental resilience. We follow a structured training program that emphasizes fitness, 
            technique, strategy, and teamwork to ensure that our players reach their full potential.
          </p>
          <p>
            Beyond the game, our coaches serve as mentors, guiding players through their athletic and personal development. 
            We encourage a growth mindset, where mistakes are seen as opportunities for improvement and success is built on 
            dedication and perseverance.
          </p>
        </div>

        {/* Parental Support */}
        <div className="section">
          <h2>Parental Involvement</h2>
          <p>
            Parents play a crucial role in the success of our team. Their support, encouragement, and active participation 
            contribute significantly to the players’ experience. We maintain open communication with parents through regular 
            updates, meetings, and feedback sessions to ensure alignment in player development and overall team goals.
          </p>
          <p>
            We welcome parents to engage with the team by volunteering, attending games, and being part of our community 
            events, creating a strong bond between families and the club.
          </p>
        </div>

        {/* Facilities & Equipment */}
        <div className="section">
          <h2>Facilities & Equipment</h2>
          <p>
            Our club is equipped with high-quality training facilities, ensuring players have the resources they need to 
            improve their game. We provide professional-grade soccer balls, training cones, fitness gear, and well-maintained 
            jerseys to create a professional training environment.
          </p>
          <p>
            Regular maintenance and upgrades are made to our equipment to ensure that players always have access to the best 
            tools for their development. Safety is also a priority, with protective gear and injury prevention programs in place.
          </p>
        </div>

        {/* Club Vision & Values */}
        <div className="section">
          <h2>Our Vision & Values</h2>
          <p>
            We believe in **teamwork, respect, dedication, and perseverance**. Our club is built on a foundation of discipline 
            and integrity, with the goal of developing well-rounded athletes who embody sportsmanship and professionalism.
          </p>
          <p>
            We strive to provide an inclusive and competitive platform where players of all backgrounds can chase their football 
            dreams. Whether aspiring to play at a professional level or simply looking to enjoy the sport, our team is a place 
            where passion meets opportunity.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeamInfo;
