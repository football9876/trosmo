
import './TeamInfo.css';
import Footer from './footer';
import TopNavigation from './Nav/topNavigation';
import useInnerWidth from '../../funcs/useInnerWidth';

const HandballInfo = () => {
    const width=useInnerWidth()
  return (
    <>
      <TopNavigation />
      <br /><br /><br />
{width  <700 && <><br/><br/><br/><br/></>}

      <div className="handball-info-container" style={{ maxWidth: "90%", padding: 20, marginTop: 10, borderRadius: 10, margin: "0 auto", boxShadow: "1px 1px 10px 0px lightgray" }}>
      <img 
          src="/images/handball.jpeg" 
          alt="Flekkerøy Idrettspark - Nordic Stadiums" 
          className="club-image"
          style={{maxWidth:"100%",borderRadius:5}}
        />
        {/* Introduction */}
        <div className="section">
          <h2>Floy Handball</h2>
          <p>
            **Floy Handball** is a dedicated division within our club, committed to developing players of all skill levels. 
            Our focus is on teamwork, skill-building, and fostering a competitive spirit while ensuring a fun and inclusive environment.
          </p>
        </div>

        {/* Board & Leadership */}
        <div className="section">
          <h2>Handball Board & Leadership</h2>
          <p>
            The **Handball Board** oversees the operations and strategic development of the department. Their primary goals include:
          </p>
          <ul>
            <li>🏆 **Ensuring smooth management of all handball activities**</li>
            <li>📈 **Developing training programs and team strategies**</li>
            <li>🤝 **Providing support to players, coaches, and parents**</li>
            <li>💼 **Organizing competitions and tournaments**</li>
          </ul>
          {/* 
         
         <p>
           **For official announcements and board updates:**  
          👉 <a href="https://www.fotball.no/fotballdata/lag/kamper/?fiksId=30229" target="_blank" rel="noopener noreferrer">
            Read Handball Board Updates
          </a>
         </p>
          
         */}
        </div>

        {/* Contact Information */}
        <div className="section">
        <h2>Contact the Handball Board</h2>
          <p>
            If you have any questions regarding the handball department, training schedules, or player registration, feel free to reach out.
          </p>
          <ul>
            <li>📧 **Email:** <a href="mailto:support@tromsoil.com ">support@tromsoil.com </a></li>
            {/* <li>📞 **Phone:** +47 123 456 789</li> */}
            <li>📍 **Club Address:** Floy Handball Clubhouse,Nørresundby, Norway</li>
          </ul>
        </div>

        {/* Training & Development */}
        <div className="section">
          <h2>Training & Development</h2>
          <p>
            Our training program is structured to help players improve their **technical skills, game strategies, and physical conditioning**.
            We focus on:
          </p>
          <ul>
            <li>🏀 **Ball handling & passing techniques**</li>
            <li>🏃‍♂️ **Strength & agility training**</li>
            <li>🎯 **Tactical gameplay & teamwork**</li>
            <li>🏅 **Competitive match experience**</li>
          </ul>
          <p>
            Our experienced coaching staff ensures that every player gets **individualized attention** and grows at their own pace.
          </p>
        </div>

        {/* Competitions & Tournaments */}
        <div className="section">
          <h2>Competitions & Events</h2>
          <p>
            Floy Handball regularly competes in **local, regional, and national handball tournaments**. Players get the opportunity to:
          </p>
          <ul>
            <li>🔥 **Compete against top teams**</li>
            <li>🌍 **Participate in international matches**</li>
            <li>🏆 **Earn recognition and scholarships**</li>
            <li>🎉 **Engage in fun team-building events**</li>
          </ul>
        </div>

        {/* Why Choose Floy Handball? */}
        <div className="section">
          <h2>Why Choose Floy Handball?</h2>
          <p>Here’s why we stand out:</p>
          <ul>
            <li>✅ **Expert coaching from experienced professionals**</li>
            <li>🏟 **State-of-the-art training facilities**</li>
            <li>🤝 **A welcoming and inclusive sports community**</li>
            <li>📈 **Opportunities for national and international play**</li>
          </ul>
          <p>Join us today and become part of the **Floy Handball family!** 🏆</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HandballInfo;
