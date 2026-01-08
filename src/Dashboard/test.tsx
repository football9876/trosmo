import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBFile } from "mdb-react-ui-kit";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
// import { uploadHtmlFile } from "../Logics/uploadFileToFirebase";
import { AppState, setCurrentPage, setUser } from "../store/Slice";
import { collection } from "firebase/firestore";
import { AddData } from "../Logics/addData";
import { db } from "../firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateData } from "../Logics/updateData";
import { uploadFile } from "../Logics/upload";
import { useEffect, useState } from "react";

export interface UserCollectedDetails {
  docId?:string,
  surname: string;
  firstName: string;
  middleName: string;
  gender: "Male" | "Female";
  position: string;
  age: string;
  weight: string;
  height: string;
  jerseySize: string;
  shoeSize: string;
  legacyName: string;
  country: string;
  email: string;
  phone: string;
  countryOfBirth: string;
  nationality: string;
  passportDataPage?: File | null;
  bioData?: File | null;
  sponsorshipForm?: File | null;
}
const data={
  "positions": [
    { "name": "Wingback - Left Wingback", "abbreviation": "LWB" },
    { "name": "Wingback - Right Wingback", "abbreviation": "RWB" },
    { "name": "Central Midfielder", "abbreviation": "CM" },
    { "name": "Defensive Midfielder", "abbreviation": "DM" },
    { "name": "Wide Midfielder: Left Midfielder", "abbreviation": "LM" },
    { "name": "Wide Midfielder: Right Midfielder", "abbreviation": "RM" },
    { "name": "Attacking Midfielder", "abbreviation": "AM" },
    { "name": "Centre Forward", "abbreviation": "CF" },
    { "name": "Striker", "abbreviation": "ST" },
    { "name": "Wingers: Left Winger", "abbreviation": "LW" },
    { "name": "Wingers: Right Winger", "abbreviation": "RW" },
    {name:"Goalkeeper",abbreviation:""}
  ],
  "countries": [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", 
    "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", 
    "Czechia", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", 
    "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", 
    "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", 
    "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", 
    "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", 
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", 
    "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", 
    "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", 
    "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
    "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
    "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", 
    "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  
  ],
  "sizes": [
    { "label": "Small (S)", "value": "S" },
    { "label": "Medium (M)", "value": "M" },
    { "label": "Large (L)", "value": "L" },
    { "label": "Extra Large (XL)", "value": "XL" }
  ]
}

const CollectDetails: React.FC<{onSuccess:()=>void,editForm?:UserCollectedDetails}> = ({onSuccess,editForm}) => {


  const {user}=useSelector((root:{app:AppState})=>root.app);
  const [formData, setFormData] = useState<UserCollectedDetails>({
    surname: "",
    firstName: "",
    middleName: "",
    gender: "Male",
    position: "",
    age: "",
    weight: "",
    height: "",
    jerseySize: "",
    shoeSize: "",
    legacyName: "",
    country: "",
    email: "",
    phone: "",
    countryOfBirth: "",
    nationality: "",
    passportDataPage: null,
    bioData: null,
    sponsorshipForm: null,
  });


  console.log({formData});
useEffect(()=>{
if(editForm)setFormData(editForm);
},[editForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const dispatch=useDispatch();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const navigate=useNavigate();
  const [loading,setLoading]=useState<boolean>(false);
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      if(!user?.userid)return navigate("/Login");
      setLoading(true)

const data:any={...formData}
if(formData.passportDataPage){
// console.log(formData.passportDataPage);
const uri=await uploadFile(formData.passportDataPage);
data.passportDataPage={uri,type:formData.passportDataPage.type,name:formData.passportDataPage.name,extension:formData.passportDataPage.name.split(".").slice(-1)[0]};
}
else return toast.error("Passport data is require")
  if(formData.bioData){
// console.log(formData.bioData)
const uri=await uploadFile(formData.bioData);



data.bioData={uri,type:formData.bioData.type,name:formData.bioData.name,extension:formData.bioData.name.split(".").slice(-1)[0]};

  }
  else return toast.error("bio data is required")

  if(formData.sponsorshipForm){
// console.log(formData.sponsorshipForm)
const uri=await uploadFile(formData.sponsorshipForm);
data.sponsorshipForm={uri,type:formData.sponsorshipForm.type,name:formData.sponsorshipForm.name,extension:formData.sponsorshipForm.name.split(".").slice(-1)[0]};
  }
  else return toast.error("Sponsorship form is required")


    console.log("Form Data:", data)//save this
   await  AddData(collection(db,"Forms"),{...data,ownerUid:user?.userid||""})
   await updateData("Users",user?.docId as string,{...user,registrationCompleted:true});
   window.localStorage.setItem("User",JSON.stringify({...user,registrationCompleted:true}));
   dispatch(setUser({...user,registrationCompleted:true}));
      onSuccess();
    dispatch(setCurrentPage("/payment"));
    }
    catch(err:any){
      toast.error(err);
console.error(err);
    }
    finally{
      setLoading(true)
    }
  };




  const updateForm =async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      if(!user?.userid)return navigate("/Login");
      setLoading(true)

const data:any={...formData}
if(formData.passportDataPage && formData.passportDataPage.type){
// console.log(formData.passportDataPage);
const uri=await uploadFile(formData.passportDataPage);
data.passportDataPage={uri,type:formData.passportDataPage.type,name:formData.passportDataPage.name,extension:formData.passportDataPage.name.split(".").slice(-1)[0]};
}
else return toast.error("Passport data is require")
  if(formData.bioData && formData.bioData.type){
// console.log(formData.bioData)
const uri=await uploadFile(formData.bioData);



data.bioData={uri,type:formData.bioData.type,name:formData.bioData.name,extension:formData.bioData.name.split(".").slice(-1)[0]};

  }
  else return toast.error("bio data is required")

  if(formData.sponsorshipForm && formData.sponsorshipForm.type){
// console.log(formData.sponsorshipForm)
const uri=await uploadFile(formData.sponsorshipForm);
data.sponsorshipForm={uri,type:formData.sponsorshipForm.type,name:formData.sponsorshipForm.name,extension:formData.sponsorshipForm.name.split(".").slice(-1)[0]};
  }
  else return toast.error("Sponsorship form is required")


    console.log("Form Data:", data)//save this
   await  updateData("Forms",editForm?.docId as string,{...data,ownerUid:user?.userid||""})
   await updateData("Users",user?.docId as string,{...user,registrationCompleted:true});
   window.localStorage.setItem("User",JSON.stringify({...user,registrationCompleted:true}));
   dispatch(setUser({...user,registrationCompleted:true}));
      onSuccess();
    dispatch(setCurrentPage("/payment"));
    }
    catch(err:any){
      toast.error(err);
console.error(err);
    }
    finally{
      setLoading(true)
    }
  };

  return (
    <MDBCard className="mb-4">
        {/* <button onClick={runTestFunc}>run test func</button> */}
      <MDBCardBody>
        <form onSubmit={editForm ? updateForm:handleSubmit}>

          <MDBInput readOnly={editForm ? true:false} label="Surname" name="surname" value={formData.surname} onChange={handleInputChange} required className="mb-3" />
          
          <MDBInput  label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="mb-3" />
          
          <MDBInput label="Middle Name" name="middleName" value={formData.middleName} onChange={handleInputChange} className="mb-3" />


          <label className="mb-2">Gender</label>
          <select className="form-select mb-3" name="gender" value={formData.gender} onChange={handleInputChange} required>
            <option selected={editForm?.gender == 'Male'} value="Male">Male</option>
            <option selected={editForm?.gender == 'Female'} value="Female">Female</option>
          </select>

          {/* <MDBInput label=""  value={formData.position} onChange={handleInputChange} className="mb-3" /> */}
          <label className="mb-2">Position</label>
          <select className="form-select mb-3" name="position" value={formData.position} onChange={handleInputChange} required>
            <option value="">Position</option>
        {data.positions.map((p,i:number)=>{
            return <option key={i} value={p.name} selected={p.name===editForm?.position}>{p.name}</option>
          })}
          </select>



          <MDBInput label="Age" type="number" name="age" value={formData.age} onChange={handleInputChange} required className="mb-3" />
          <MDBInput label="Weight (kg)" type="number" name="weight" value={formData.weight} onChange={handleInputChange} className="mb-3" />
          <MDBInput label="Height (cm)" type="number" name="height" value={formData.height} onChange={handleInputChange} className="mb-3" />

          <label className="mb-2">Jersey Size</label>
          <select className="form-select mb-3" name="jerseySize" value={formData.jerseySize} onChange={handleInputChange} required>
            <option value="">Jersey Size</option>
        {data.sizes.map((size,i:number)=>{
            return <option key={i} value={size.value} selected={size.value==editForm?.jerseySize}>{size.label}</option>
          })}
          </select>


          <MDBInput label="Boot Size" name="shoeSize" type="number" value={formData.shoeSize} onChange={handleInputChange} className="mb-3" />

          <MDBInput label="Legacy Name" name="legacyName" value={formData.legacyName} onChange={handleInputChange} className="mb-3" />

          <label className="mb-2">Country</label>
          <select className="form-select mb-3" name="country" value={formData.country} onChange={handleInputChange} required>
            <option value="">Select Country</option>
        {data.countries.map((country,i:number)=>{
            return <option key={i} value={country} selected={country==editForm?.country}>{country}</option>
          })}
          </select>

          <MDBInput label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} required className="mb-3" />
          <MDBInput label="Phone" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="mb-3" />

          <MDBInput label="Country of Birth" name="countryOfBirth" value={formData.countryOfBirth} onChange={handleInputChange} className="mb-3" />
          <MDBInput label="Nationality" name="nationality" value={formData.nationality} onChange={handleInputChange} className="mb-3" />

          {/* Upload Fields */}
          <h5 className="mb-2">Upload Documents</h5>

          <MDBFile label="Upload Passport Data Page" name="passportDataPage" onChange={handleFileChange} required className="mb-3" />
          <MDBFile label="Upload Bio Data" name="bioData" onChange={handleFileChange} required className="mb-3" />
          <MDBFile label="Upload Sponsorship Form" name="sponsorshipForm" onChange={handleFileChange} required className="mb-3" />

          <MDBBtn style={{ width: "100%" }} rounded type="submit" color="dark">
           {loading ? <ClipLoader size={18} color="white" />:editForm ? "Save Changes":"Submit"}
          </MDBBtn>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
};

export const Test=CollectDetails;
export default CollectDetails;
