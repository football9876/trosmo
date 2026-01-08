import React, { useEffect, useState } from "react";
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdb-react-ui-kit";
import toast from "react-hot-toast";
import { getCountries } from "./countries";
import { AddData } from "../Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "../firebase.config";
import { updateData } from "../Logics/updateData";
import { useDispatch, useSelector } from "react-redux";
import { AppState, setUser } from "../store/Slice";
import { uploadFile } from '../Logics/upload';

const CollectDetails:React.FC<{onSuccess:()=>void}> = ({onSuccess}) => {
  const [countries,setCountries]=useState<string[]>([]);

  useEffect(()=>{
(async ()=>{
setCountries(await getCountries());
})();
  },[]);
  const [formData, setFormData] = useState({
    fullName: "",
    nationality: "",
    dateOfBirth: "",
    passportNumber: "",
    countryOfResidence: "",
    whatsappNumber: "",
    email: "",
    invitationCode: "",
    legacyName: "",
    primaryPosition: "",
    secondaryPosition: "",
    preferredFoot: "",
    currentClub: "",
    underAgent: "No",
    agentName: "",
    height: "",
    weight: "",
    shoeSize: "",
    jerseySize: "",
    injuries: "",
    fullyFit: "Yes",
    validVisa: "No",
    euPassport: "No",
    dietaryRestrictions: "No",
    dietaryDetails: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    needAirportPickup: "No",
    declaration: false,
    signature: "",
    submissionDate: "",
      passportDataPageUrl: "",
  bioDataUrl: "",
  sponsorshipFormUrl: "",
  });
const {user}=useSelector((root:{app:AppState})=>root.app);

  const handleInputChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const dispatch=useDispatch();
  const handleSubmit = async (e:any) => {
    e.preventDefault();
   
    try{
console.log("submit")
await AddData(collection(db,"Forms"),{...formData,ownerUid:user?.userid||""});
await updateData("Users",user?.docId||"",{...user,registrationCompleted:true});
dispatch(setUser({...user,registrationCompleted:true} as any))
      onSuccess()

    }
    catch(err:any){
      toast.error(err.message);
    }
    finally{
    }
  };



const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
  const file = e.target.files?.[0];
  if (!file) return;

  let toastId;
  try {
    toastId = toast.loading("Uploading...");
    const url = (await uploadFile(file)) as string;
    setFormData((prev) => ({
      ...prev,
      [field]: url,
    }));
    toast.success("Upload successful!");
  } catch (err: any) {
    console.error(err);
    toast.error("Upload failed");
  } finally {
    if (toastId) toast.dismiss(toastId);
  }
};


  return (
    <MDBCard>
      <MDBCardBody>
        <form onSubmit={handleSubmit}>
          {/* Section 1 */}
          <h5>Personal Information</h5>
          <MDBInput
            label="Full Name (as in Passport)"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mb-3"
          />
     
            <label className="mb-2">Nationality</label>
          
      <select className="form-select mb-3"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
          
          >
      <option value="">Select Country</option>
        {countries.map((country,i:number)=>{
            return <option key={i} value={country} selected={country==formData?.countryOfResidence}>{country}</option>
          })}
          </select>


          <MDBInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Passport Number"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleInputChange}
            className="mb-3"
          />
          
          <label className="mb-2">Country of Residence</label>
          
      <select className="form-select mb-3"
            name="countryOfResidence"
            value={formData.countryOfResidence}
            onChange={handleInputChange}
          
          >
      <option value="">Select Country</option>
        {countries.map((country,i:number)=>{
            return <option key={i} value={country} selected={country==formData?.countryOfResidence}>{country}</option>
          })}
          </select>

          <MDBInput
            label="WhatsApp Number (with country code)"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Invitation Reference Code (FILE NUMBER)"
            name="invitationCode"
            value={formData.invitationCode}
            onChange={handleInputChange}
            className="mb-3"
          />

          {/* Section 2 */}
          <h5>Football Details</h5>
          <MDBInput
            label="Legacy Name"
            name="legacyName"
            value={formData.legacyName}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Primary Position"
            name="primaryPosition"
            value={formData.primaryPosition}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Secondary Position"
            name="secondaryPosition"
            value={formData.secondaryPosition}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Preferred Foot"
            name="preferredFoot"
            value={formData.preferredFoot}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Current Club"
            name="currentClub"
            value={formData.currentClub}
            onChange={handleInputChange}
            className="mb-3"
          />
    
          <label>Are you under agent/representation?</label>
          <select
            className="form-select mb-3"
            name="underAgent"
            value={formData.underAgent}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {formData.underAgent === "Yes" && (
            <MDBInput
              label="Agent’s Name and Contact"
              name="agentName"
              value={formData.agentName}
              onChange={handleInputChange}
              className="mb-3"
            />
          )}

          {/* Section 3 */}
          <h5>Physical Attributes</h5>
          <MDBInput
            label="Height (cm)"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Weight (kg)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Shoe Size"
            name="shoeSize"
            type="number"
            value={formData.shoeSize}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Jersey Size"
            name="jerseySize"
            value={formData.jerseySize}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Injuries in past 12 months (if any)"
            name="injuries"
            value={formData.injuries}
            onChange={handleInputChange}
            className="mb-3"
          />
          <label>Are you fully fit to play?</label>
          <select
            className="form-select mb-3"
            name="fullyFit"
            value={formData.fullyFit}
            onChange={handleInputChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          {/* Section 4 */}
          <h5>Trial Logistics</h5>
          <label>Do you have a valid visa to Denmark?</label>
          <select
            className="form-select mb-3"
            name="validVisa"
            value={formData.validVisa}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <label>Do you have an EU passport/residence permit?</label>
          <select
            className="form-select mb-3"
            name="euPassport"
            value={formData.euPassport}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <label>Do you have dietary restrictions?</label>
          <select
            className="form-select mb-3"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {formData.dietaryRestrictions === "Yes" && (
            <MDBInput
              label="If Yes, please specify"
              name="dietaryDetails"
              value={formData.dietaryDetails}
              onChange={handleInputChange}
              className="mb-3"
            />
          )}
          <MDBInput
            label="Emergency Contact Name"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Emergency Contact Phone"
            name="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Relationship to You"
            name="emergencyContactRelation"
            value={formData.emergencyContactRelation}
            onChange={handleInputChange}
            className="mb-3"
          />
          <label>Do you need airport pickup?</label>
          <select
            className="form-select mb-3"
            name="needAirportPickup"
            value={formData.needAirportPickup}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>

          {/* Section 5 */}
          <h5>Terms & Declarations</h5>
          <MDBCheckbox
            name="declaration"
            label="I declare that all information provided is true and correct."
            checked={formData.declaration}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Signature (type full name)"
            name="signature"
            value={formData.signature}
            onChange={handleInputChange}
            className="mb-3"
          />
          <MDBInput
            label="Date of Submission"
            name="submissionDate"
            type="date"
            value={formData.submissionDate}
            onChange={handleInputChange}
            className="mb-3"
          />




<h5>Uploads</h5>

<label>Passport Data Page</label>
<input
  type="file"
  accept="image/*,application/pdf"
  className="form-control mb-3"
  onChange={(e) => handleFileUpload(e, "passportDataPageUrl")}
/>
{formData.passportDataPageUrl && (
  <div className="mb-3">
    <a href={formData.passportDataPageUrl} target="_blank" rel="noopener noreferrer">View Uploaded Passport Page</a>
  </div>
)}

<label>Bio Data</label>
<input
  type="file"
  accept="image/*,application/pdf"
  className="form-control mb-3"
  onChange={(e) => handleFileUpload(e, "bioDataUrl")}
/>
{formData.bioDataUrl && (
  <div className="mb-3">
    <a href={formData.bioDataUrl} target="_blank" rel="noopener noreferrer">View Uploaded Bio Data</a>
  </div>
)}

<label>Sponsorship Form</label>
<input
  type="file"
  accept="image/*,application/pdf"
  className="form-control mb-3"
  onChange={(e) => handleFileUpload(e, "sponsorshipFormUrl")}
/>
{formData.sponsorshipFormUrl && (
  <div className="mb-3">
    <a href={formData.sponsorshipFormUrl} target="_blank" rel="noopener noreferrer">View Uploaded Sponsorship Form</a>
  </div>
)}





          <MDBBtn type="submit" color="dark" style={{ width: "100%" }}>
            Submit
          </MDBBtn>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
};

export default CollectDetails;
