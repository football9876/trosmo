import { BsFacebook } from "react-icons/bs"; 
import React from 'react'
import useInnerWidth from "../funcs/useInnerWidth";
import MobileMenu from "../landingpage/componets/Nav/mobileMenu";
import { Link, useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

const Header:React.FC= () => {
    const width=useInnerWidth();
    const navigate=useNavigate();
  return (
    <>
{width < 700  && <div className="mobileMenu"><MobileMenu/></div>}

    <div className='header'>
      {width  >  900 ? <div className='input-container flex items-center justify-content-end'>
<div className='searchInput flex items-center ' style={{gap:20}}>
<BsFacebook onClick={()=>{
    window.open("https://www.facebook.com/noerresundbyforenedeboldklubber?fref=ts#","_blank")
}} color="white"  size={30}/>
<div>
   <MDBBtn onClick={()=>{
    navigate("/Login");
   }} style={{background:"white"}} className="" color="link"> <Link style={{color:"black"}} className="Login Button" to={"/Login"}>Login</Link>
   </MDBBtn>
</div>
</div>

      </div>:
    <MDBBtn onClick={()=>{
    navigate("/Login");
   }} style={{background:"#f9f8fb"}} className="" color="link"> <Link to={'/Login'} style={{color:"#3e3434"}} className="Login Button" >Login</Link>
   </MDBBtn>}

      <div style={{marginTop:width  > 900 ? -30:0}} className="flex items-center justify-center ">
<img src="/logo.png"/>
      </div>
    </div>

  
    </>
  )
}

export default Header
