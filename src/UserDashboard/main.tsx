import React, { useEffect } from "react";
import "../Dashboard/styles/dashboard.css";
import SideComponent from "./component/sideComponent";
import Nav from "./component/nav";
import { AppState } from "../store/Slice";
import { useSelector } from "react-redux";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import useInnerWidth from "../funcs/useInnerWidth";
import DetailsModal from "../Dashboard/DetailsModal";
import UserProfile from "./component/profile";
import PaymentForm from "./component/Payment";
import NotificationModal from "./Notification";

const UserDashboardMain: React.FC = () => {
const {currentPage,user}=useSelector((root:{app:AppState})=>root.app);
const navigate=useNavigate()
// const dispatch=useDispatch()

useEffect(()=>{
if(!user)navigate("/Login");
},[]);
const width=useInnerWidth()
  return (<><DetailsModal/>
  <NotificationModal/>
<div className="dashboard d-flex ">
<div className="sideMenu">
<SideComponent close={()=>1}/>
</div>
<div style={{maxHeight:"95vh",overflow:"auto"}} className="content">
<Nav/>
{currentPage==='/dashboard' && <div style={{padding:width < 500 ? 2:16,overflow:"auto",width:"100%"}}><Home/></div>}
{currentPage==='/profile' && <div style={{padding:width < 500 ? 2:16,overflow:"auto",width:"100%"}}><UserProfile/></div>}
{currentPage=="/payment" && <div> <PaymentForm/> </div>}

</div>
</div>
</>

  );
};

export default UserDashboardMain;
