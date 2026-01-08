import React, { useEffect, useState } from "react";
import {  MDBBtn, MDBCardBody, MDBTable, MDBTableBody } from "mdb-react-ui-kit";
import { setCurrentPage, } from "../../store/Slice";
import { useDispatch} from "react-redux";
import { User } from "../../interface";
import { Avatar } from "@mui/material";
import { docQr } from "../../Logics/docQr";
import { ClipLoader } from "react-spinners";

const ShowUser: React.FC = () => {
  const [user,setUser] = useState<User>();

  const [profilePic] = useState<string>(user?.profilePic || "");
  const dispatch = useDispatch();
const [loading,setLoading]=useState<boolean>(true);


  const getUser=async (uid:string)=>{//userid
    try{
        setLoading(true)
const user=await docQr("Users",{
    max:1,
    whereClauses:[
        {
            field:"userid",
            operator:"==",
            value:uid
        }
    ]
})
console.log(user);
if(user.length > 0){
    setUser(user[0])
    
}
else exit()    
}
    catch(err:any){
console.log(err)
    }
    finally{
setLoading(false)
    }
  }

  const exit=()=>dispatch(setCurrentPage("/forms"));
  useEffect(()=>{
(()=>{
const uid=sessionStorage.getItem("showUserId");
if(!uid)return exit()
getUser(uid)
})()


  },[])

  // Convert File to Base64
  
  // User Details in "Prop | Value" format
  const userDetails = [
    { label: "Username", value: user?.username },
    { label: "Gender", value: user?.gender },
    { label: "User ID", value: user?.userid },
    { label: "Created At", value: user?.createdAt },
    { label: "Banned", value: user?.isBanned === "yes" ? "Yes" : "No" },
    { label: "Blocked", value: user?.isBlocked ? "Yes" : "No" },
    { label: "Admin", value: user?.isAdmin ? "Yes" : "No" },
  ];

  return (
    <div className=" user-profile-card">
      <MDBCardBody style={{maxWidth:500}}>
        {/* Profile Picture */}
        <div className="profile-pic-container">
          <div className="d-flex justify-content-center">
            <Avatar
              src={profilePic}
              alt="Profile"
              className="rounded-circle"
              style={{ width: 120, height: 120, cursor: "pointer", objectFit: "cover" }}
            />
          </div>
        
        </div>

        {loading && <ClipLoader size={30} color={"dark"}/>}
     

        {/* User Details Table */}
        <MDBTable style={{background:"white",boxShadow:"1px 1px 10px 0px lightgray",borderRadius:20}} responsive borderless className="mt-4">
          <MDBTableBody>
            {userDetails.map((detail, index) => (
              <tr key={index}>
                <td><strong>{detail.label}</strong></td>
                <td>{detail.value}</td>
              </tr>
            ))}
          </MDBTableBody>
         
          <br/>

        </MDBTable>
        <br/>
      <br/>
          <MDBBtn style={{width:"100%"}} rounded color={`dark`} onClick={()=>exit()}>Back to forms</MDBBtn>
          <br/>
      </MDBCardBody>

    </div>
  );
};

export default ShowUser;
