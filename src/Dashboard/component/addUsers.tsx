import React, { useState } from "react";
import { MDBInput,  MDBBtn,  MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { User } from "../../interface";
import toast from "react-hot-toast";
import { AddData } from "../../Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "../../firebase.config";

const CreateUserForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<User, "userid">>({
    username: "",
    password:"",
    gender: "male",
    profilePic: "",
    createdAt: new Date().toISOString().split("T")[0], // Current Date
    isBanned: "no",
    isBlocked: false,
    isAdmin: false,
  });
const [loading,setLoading]=useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      ...formData,
      userid: Date.now().toString(), // Generate unique ID
    };
    console.log(newUser);
setLoading(true)

   try{
const res=await AddData(collection(db,"Users"),newUser);
console.log(res);
toast.success("User created successfully")
setFormData({
  username: "",
  password:"",
  gender: "male",
  profilePic: "",
  createdAt: new Date().toISOString().split("T")[0], // Current Date
  isBanned: "no",
  isBlocked: false,
  isAdmin: false,
});

   }
   catch(err:any){
    console.log(err);
toast.error("Something went wrong")
   }
   finally{
setLoading(false)
console.log("operation completed")
   }

  };

  return (
    <MDBCard className="mb-4" style={{maxWidth:600}}>
      <MDBCardBody>
        <h4 className="mb-3">Create New User</h4>
        <form onSubmit={handleSubmit}>
          <MDBInput label="Username" name="username" value={formData.username} onChange={handleInputChange} required className="mb-3" />
          
          <MDBInput label="Password" name="password" value={formData.password} onChange={handleInputChange} required className="mb-3" />
          
          <select className="form-select mb-3" name="gender" value={formData.gender} onChange={handleInputChange} required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {formData.profilePic && (
            <div className="mb-3">
              <img src={formData.profilePic} alt="Profile Preview" className="rounded-circle" style={{ width: 50, height: 50 }} />
            </div>
          )}

       
          <MDBBtn style={{width:"100%"}} disabled={loading} rounded type="submit" color="primary">{loading ? "Please wait":"Create User"}</MDBBtn>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
};

export default CreateUserForm;
