import React from "react";
import "./MatchCardBG.css";
import { MDBBtn } from "mdb-react-ui-kit";

interface MatchCardProps {
  homeLogo: string;
  awayLogo: string;
  homeScore: number;
  awayScore: number;
  backgroundImage: string;
  playerImage: string;
}

const MatchCardBG: React.FC<MatchCardProps> = ({
  homeLogo,
  awayLogo,
  homeScore,
  awayScore,
  backgroundImage,
}) => {
  return (
    <div
      className="match-card"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div>
      <div className="score-section">
        <img src={homeLogo} alt="Home logo" className="team-logo" />
        <div className="score">{homeScore}</div>
        <span style={{fontWeight:"bold",color:"white",fontSize:50}}>:</span>
        <div className="score">{awayScore}</div>
        <img src={awayLogo} alt="Away logo" className="team-logo" />
      </div>
<br/>
<div className="flex items-center justify-center">
  <MDBBtn rounded color="secondary" style={{background:'white',color:'black'}}>Last Match</MDBBtn>
</div>
</div>

    </div>
  );
};

export default MatchCardBG;
