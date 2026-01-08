
import './TeamInfo.css';
import Footer from './footer';
import TopNavigation from './Nav/topNavigation';
import useInnerWidth from '../../funcs/useInnerWidth';
const AcademyInfo = () => {
  const width=useInnerWidth()
  return (
    <>
      <TopNavigation />
      <br /><br /><br />
{width  <700 && <><br/><br/><br/><br/></>}
      <div className="academy-info-container" style={{ maxWidth: "90%", padding: 20, marginTop: 10, borderRadius: 10, margin: "0 auto", boxShadow: "1px 1px 10px 0px lightgray" }}>
        
        {/* Introduction */}
        <div className="section">
          <h2>Floy Academy</h2>
          <img 
          src="https://res.cloudinary.com/dr6vj7zrn/image/upload/v1742235581/rg418rqo49hx3wbwvypa.jpg" 
          alt="Flekkerøy Idrettspark - Nordic Stadiums" 
          className="club-image"
          style={{maxWidth:"100%",borderRadius:5}}
        />
          <p>
            The **Floy Academy** is a premier football development program designed to nurture young talent and equip players 
            with the skills needed to excel in the sport. The academy provides a structured training environment, expert coaching, 
            and competitive opportunities for aspiring footballers.
          </p>
        </div>

        {/* Academy Training Program */}
        <div className="section">
          <h2>Comprehensive Training Program</h2>
          <p>
            At Floy Academy, our training is **structured to cover all aspects of player development**. Our approach includes:
          </p>
          <ul>
            <li>⚽ **Technical Skills** – Passing, dribbling, shooting, and ball control.</li>
            <li>📊 **Tactical Awareness** – Game intelligence, positioning, and teamwork.</li>
            <li>💪 **Physical Fitness** – Endurance, speed, and strength training.</li>
            <li>🧠 **Mental Resilience** – Confidence-building and decision-making under pressure.</li>
          </ul>
          <p>
            Our **licensed coaches** ensure that players receive personalized training, guiding them towards excellence 
            on and off the field.
          </p>
        </div>

        {/* Who Can Join? */}
        <div className="section">
          <h2>Who Can Join?</h2>
          <p>
            The academy is **open to players of all skill levels and age groups**, providing structured training based on individual 
            abilities. Whether you are just starting out or looking to take your game to the next level, we have a place for you.
          </p>
          <p>**Age Groups:**</p>
          <ul>
            <li>🧒 **U-12** – Beginner level (Fundamental skills)</li>
            <li>👦 **U-15** – Intermediate level (Enhanced training and match play)</li>
            <li>👨‍🎓 **U-18** – Advanced level (Competitive and professional pathway)</li>
          </ul>
        </div>

        {/* Registration Process */}
        <div className="section">
          <h2>How to Register?</h2>
          <p>
            To join Floy Academy, players must **complete the official registration process**. Follow these steps to enroll:
          </p>
          <ul>
            <li>📄 **Fill out the application form**</li>
            <li>⚡ **Attend assessment trials**</li>
            <li>💰 **Pay the registration fee**</li>
            <li>🏆 **Begin structured training sessions**</li>
          </ul>
   
        </div>

        {/* Career Pathway */}
        <div className="section">
          <h2>Pathway to Professional Football</h2>
          <p>
            Floy Academy serves as a **stepping stone for young talents** who aspire to play at a professional level. 
            Many academy graduates have progressed to top-tier teams, national squads, and even international clubs.
          </p>
          <ul>
            <li>👀 **Scouting Opportunities** – Talent scouts frequently observe our players.</li>
            <li>🎓 **Scholarship Programs** – Elite players may qualify for educational scholarships.</li>
            <li>🗺 **International Exposure** – Participation in global tournaments and friendly matches.</li>
          </ul>
        </div>

        {/* Why Choose Floy Academy? */}
        <div className="section">
          <h2>Why Choose Floy Academy?</h2>
          <p>
            Our academy stands out because we offer:
          </p>
          <ul>
            <li>🏆 **Elite coaching staff with professional experience**</li>
            <li>🎯 **High-quality training and structured player development**</li>
            <li>📈 **Pathways to professional football and higher opportunities**</li>
            <li>🏟 **State-of-the-art training facilities and equipment**</li>
            <li>🤝 **A supportive, inclusive, and passionate football community**</li>
          </ul>
          <p>
            If you dream of playing football at a high level, **Floy Academy is the place to start!** 🚀⚽🔥
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AcademyInfo;
