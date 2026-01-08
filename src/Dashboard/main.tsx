import React, { useEffect } from "react";
import "./styles/dashboard.css";
import SideComponent from "./component/sideComponent";
import Nav from "./component/nav";
import { AppState } from "../store/Slice";
import { useSelector } from "react-redux";
import UsersTable from "./component/users";
import CreateUserForm from "./component/addUsers";
import Home from "./Home";
import Submittedforms from "./component/Submittedforms";
import ShowUser from "./component/showUser";
import { useNavigate } from "react-router-dom";
import PopUpEdit from "./component/PopUpEdit";
import EditBlogs from "./component/editBlogs";
import Blogs from "./component/blogs";
import GalleryManager from "./component/EditGallery";
import Settings from "./component/settings";
import MatchesManager from "./component/MatchesManager";
import UploadCloths from "./component/ManageCloths";
import UploadVideos from "./component/ManageVideos";


const DashboardMain: React.FC = () => {
const {currentPage,user}=useSelector((root:{app:AppState})=>root.app);
const navigate=useNavigate();
useEffect(()=>{
(()=>{
  if(!user?.isAdmin){
  return navigate("/UserDashboard")
}
})()
},[])



// if(!user || !user?.isAdmin)return <></>
  return (<>

<div className="dashboard d-flex ">
<div className="sideMenu">
<SideComponent close={()=>1}/>
</div>
<div className="content" style={{overflow:"auto"}}>
<Nav/>
{currentPage==='/dashboard' && <div style={{padding:16,overflow:"auto",width:"100%"}}><Home/></div>}
{currentPage==='/popup' && <div style={{padding:16,overflow:"auto",width:"100%"}}><PopUpEdit/></div>}
{currentPage==='/blogs' && <div style={{padding:16,overflow:"auto",width:"100%"}}><Blogs/></div>}
{currentPage==='/edit-blogs' && <div style={{padding:16,overflow:"auto",width:"100%"}}><EditBlogs/></div>}
{currentPage==='/forms' && <div style={{padding:16,overflow:"auto",width:"100%"}}><Submittedforms/></div>}
{currentPage==='/show-user' && <div style={{padding:16,overflow:"auto",width:"100%"}}><ShowUser/></div>}
{currentPage==='/users' && <div style={{padding:16,overflow:"auto",width:"100%"}}><UsersTable/></div>}
{currentPage==='/Gellery' && <div style={{padding:16,overflow:"auto",width:"100%"}}><GalleryManager/></div>}
{currentPage==='/Matches' && <div style={{padding:16,overflow:"auto",width:"100%"}}><MatchesManager/></div>}

{currentPage==='/add-user' && <div style={{padding:16,overflow:"auto",width:"100%"}}><CreateUserForm/></div>}
{currentPage==='/settings' && <div style={{padding:16,overflow:"auto",width:"100%"}}><Settings/></div>}
{currentPage==="/Cloths" && <div style={{padding:16,overflow:"auto",width:"100%"}}> 
  <UploadCloths/>
  </div>}

{currentPage==="/Videos" && <div style={{padding:16,overflow:"auto",width:"100%"}}> 
 <UploadVideos/>
  </div>}

</div>
</div>
</>

  );
};

export default DashboardMain;
