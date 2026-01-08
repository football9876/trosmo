import React, { useEffect, useState } from "react";
import { MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { AppState, setUser } from "../../store/Slice";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../interface";
import { Avatar } from "@mui/material";
import { updateData } from "../../Logics/updateData";
import toast from "react-hot-toast";
import { docQr } from "../../Logics/docQr";
import { ClipLoader } from "react-spinners";
import TrialApplicationDetails, { ApplicationProps } from "./ApplicationDetails";


const UserProfile: React.FC = () => {
    const user=useSelector((root:{app:AppState})=>root.app.user);
    const [form,setForm]=useState<ApplicationProps>();
  const [profilePic, setProfilePic] = useState<string>(user?.profilePic || "");
const [working,setWorking]=useState<boolean>(false);
  // Convert File to Base64
  const fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
const dispatch=useDispatch();
  // Handle Profile Pic Change
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
    setWorking(true)
        try {
        const base64String = (await fileToBase64(file)) as string;
        setProfilePic(base64String);
        const newUser={...(user as User), profilePic: base64String }

        await updateData('Users',user?.docId as string,newUser);
toast.success("profile picture updated successfully")
        dispatch(setUser(newUser)); // Update in Firebase
      } catch (error) {
        console.error("Error converting file:", error);
      }
      finally{
    setWorking(false)
      }
    }
  };



const [loading,setLoading]=useState<boolean>(false);
  const getForm=async (user:User)=>{
try{
setLoading(true);
console.log(user.userid);
const res=await docQr("Forms",{
  max:1,
  whereClauses:[
    {
    field:"ownerUid",
    operator:"==",
    value:user.userid
  }
]
})
if(res?.[0])setForm({formData:res?.[0]});

}
catch(err:any){
toast.error(err?.message)
}
finally{
setLoading(false)
}
  }



  useEffect(()=>{
if(user)getForm(user)
  },[user])

  return (
    <MDBCard className="text-center" style={{ maxWidth: "400px", margin: "auto", padding: 20 }}>
      <MDBCardBody>
        <div className="profile-pic-container">
            <div className={'flex justify-center'}>
            <Avatar

              src={profilePic }
              alt="Profile"
              className="rounded-circle"
              style={{ width: 120, height: 120, cursor: "pointer", objectFit: "cover" }}
            />
            </div>

          <input
            type="file"
            id="profilePicUpload"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

<div style={{textAlign:"center"}}>
        <span style={{fontWeight:"bold"}}>{user?.username}</span>
</div>

        <MDBBtn onClick={()=>{
            // (document.querySelector("profilePicUpload") as HTMLInputElement).click()
        }} disabled={working} rounded style={{width:"100%"}} color="dark" className="mt-3">
<label htmlFor="profilePicUpload" className="profile-pic-label">
{working ?"Working...": "Change profile picture"}
</label>
        </MDBBtn>
        <br/><br/><br/>
        {loading && <ClipLoader size={20}/>}
        
       {form && <TrialApplicationDetails {...form}/>}
      </MDBCardBody>
    </MDBCard>
  );
};

export default UserProfile;
