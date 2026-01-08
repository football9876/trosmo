
import "./styles.css";
// import { User, Activity, BarChart, Heart, CreditCard } from "react-feather";
import ApplicationProgress from "./applicationProgress"
import MatchSchedule from "../landingpage/componets/Blogs/MatchResult";
import AnnouncementSlider from "./component/Annoucement";
const Home = () => {

  // const actionBtns=[
  //   {
  //     name: "Profile & Stats",
  //     click: () => {
  //       console.log("Profile & Stats clicked");
  //     },
  //     icon: <User size={30} />,
  //   },
  //   {
  //     name: "Training",
  //     click: () => {
  //       console.log("Training clicked");
  //     },
  //     icon: <Activity size={30} />, // Activity represents movement/exercise
  //   },
  //   {
  //     name: "Performance",
  //     click: () => {
  //       console.log("Performance clicked");
  //     },
  //     icon: <BarChart size={30} />, // Bar chart represents performance tracking
  //   },
  //   {
  //     name: "Health",
  //     click: () => {
  //       console.log("Health clicked");
  //     },
  //     icon: <Heart size={30} />, // Heart represents health status
  //   },
  //   {
  //     name: "Payments",
  //     click: () => {
  //       console.log("Payments clicked");
  //     },
  //     icon: <CreditCard size={30} />, // Credit card represents payments
  //   },
  // ]





  return (<>

    <div style={{padding:10}}>
      {/* <div className="actionBtns flex items-center" style={{gap:1}}>

{actionBtns.map((item:any,i:number)=>(<div key={i}>
   <button className="iconContainer"> {item.icon}</button>
    <span style={{color:'white',marginTop:5}}>{item.name}</span>
</div>))}
</div> */}

<div>

<div style={{

}}>
<AnnouncementSlider/>
</div> 
<div style={{
  background:"white",
  borderRadius:20,
  padding:"10px 0px"
}}>
<ApplicationProgress/>
</div>

<br/>
<div style={{background:"white",padding:10,borderRadius:10

}}>

    {/* <div className="responsive-container flex"> */}
{/* <PerformanceAnalysis/> */}
<MatchSchedule/>
{/* <div></div> */}
{/* </div> */}
</div>
<br/>
</div>




    </div>
 </> )
}

export default Home
