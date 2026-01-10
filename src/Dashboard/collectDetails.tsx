import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { AppState, setUser } from "@/store/Slice";
import { db } from "@/firebase.config";
import { uploadFile } from "@/Logics/upload";
import toast from "react-hot-toast";
import { docQr } from "@/Logics/docQr";
import { updateData } from "@/Logics/updateData";

export interface ApplicationProps {
  docId?: string;
  fullName: string;
  nationality: string;
  dateOfBirth: string;
  passportNumber: string;
  countryOfResidence: string;
  whatsappNumber: string;
  email: string;
  invitationCode: string;
  legacyName: string;
  primaryPosition: string;
  secondaryPosition?: string;
  preferredFoot: string;
  currentClub?: string;
  leagueLevel?: string;
  contractDuration?: string;
  underAgent: "Yes" | "No";
  agentName?: string;
  height: string;
  weight: string;
  shoeSize: string;
  jerseySize: string;
  injuries?: string;
  fullyFit: "Yes" | "No";
  validVisa: "Yes" | "No";
  euPassport: "Yes" | "No";
  dietaryRestrictions: "Yes" | "No";
  dietaryDetails?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  needAirportPickup: "Yes" | "No";
  declaration: boolean;
  signature: string;
  submissionDate: string;
  passportDataPageUrl?: string;
  bioDataUrl?: string;
  sponsorshipFormUrl?: string;
}

const CollectDetails: React.FC<{ onSuccess: (data: ApplicationProps) => void }> = ({
  onSuccess,
}) => {
  const { user } = useSelector((root: { app: AppState }) => root.app);
  const [countries,setCountries]=useState<{ docId: string; name: string }[]>([]);
  const fetchCountries = async () => {
    setLoading(true);
    try {
      const data = await docQr("countries", {});
      setCountries(data);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);
  const [formData, setFormData] = useState<ApplicationProps>({
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
    leagueLevel: "",
    contractDuration: "",
    underAgent: "No",
    agentName: "",
    height: "",
    weight: "",
    shoeSize: "",
    jerseySize: "",
    injuries: "",
    fullyFit: "Yes",
    validVisa: "Yes",
    euPassport: "Yes",
    dietaryRestrictions: "No",
    dietaryDetails: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    needAirportPickup: "No",
    declaration: false,
    signature: "",
    submissionDate: new Date().toISOString().split("T")[0],
    passportDataPageUrl: "",
    bioDataUrl: "",
    sponsorshipFormUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<{
    passportDataPageUrl?: File;
    bioDataUrl?: File;
    sponsorshipFormUrl?: File;
  }>({});

  const handleFileChange = (key: keyof ApplicationProps, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        [key]: reader.result as string, // store preview as base64
      }));
    }
    reader.readAsDataURL(file); // preview as base64
  };
  const handleChange = (key: keyof ApplicationProps, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
const dispatch=useDispatch();
  const handleSubmit = async () => {
    if (!user?.userid) return;
    if (!formData.fullName || !formData.nationality || !formData.dateOfBirth || !formData.passportNumber || !formData.countryOfResidence || !formData.whatsappNumber || !formData.email || !formData.invitationCode || !formData.legacyName || !formData.primaryPosition || !formData.preferredFoot || !formData.currentClub || !formData.leagueLevel || !formData.contractDuration || !formData.height || !formData.weight || !formData.shoeSize || !formData.jerseySize || !formData.injuries || !formData.fullyFit || !formData.validVisa || !formData.euPassport || !formData.dietaryRestrictions || !formData.dietaryDetails || !formData.emergencyContactName || !formData.emergencyContactPhone || !formData.emergencyContactRelation || !formData.needAirportPickup || !formData.declaration || !formData.signature) {
      toast.error("Please fill all the form data");
      return;
    }
    if (!files.passportDataPageUrl || !files.bioDataUrl || !files.sponsorshipFormUrl) {
      toast.error("Please upload all the required documents");
      return;
    }
    setLoading(true);
    try {
      const [passPortDataUrl, bioDataUrl, sponsorshipFormUrl] = await Promise.all((["passportDataPageUrl", "bioDataUrl", "sponsorshipFormUrl"] as (keyof ApplicationProps)[]).map(async (key) => {
        const url = await uploadFile(files[key as keyof ApplicationProps] as File);
        console.log("url", url);
        return url
      }));
      // console.log({ passPortDataUrl, bioDataUrl, sponsorshipFormUrl });

      await addDoc(collection(db, "Forms"), {
        ...formData,
        passPortDataUrl, bioDataUrl, sponsorshipFormUrl,
        userId: user.userid,
        submittedAt: serverTimestamp(),
      });
     await updateData("Users", user?.docId,{...user,registrationCompleted:true});
     localStorage.setItem("User",JSON.stringify({...user,registrationCompleted:true}))
     dispatch(setUser({...user,registrationCompleted:true}));

      onSuccess(formData);
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  const getValue = (value: any) => value ?? "";

  return (
    <Card sx={{ maxWidth: 700, margin: "auto", mb: 4 }}>
      <CardContent>


        {/* Section 1: Personal Information */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Personal Information
          </Typography>
          {["fullName", "nationality", "dateOfBirth", "passportNumber", "countryOfResidence", "whatsappNumber", "email", "invitationCode"].map((key) =>{
            

            if(key=="countryOfResidence"){

          <FormControl fullWidth>
            <InputLabel id="country-select-label">Country</InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={getValue(formData.nationality)}
              onChange={(e) => handleChange("nationality", e.target.value)}
            >
              {countries.map((country) => (
                <MenuItem key={country.docId} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>



            }

            return (
            <TextField
              key={key}
              label={key.replace(/([A-Z])/g, " $1")}
              value={getValue(formData[key as keyof ApplicationProps])}
              fullWidth
              margin="dense"
              onChange={(e) => handleChange(key as keyof ApplicationProps, e.target.value)}
            />
          )
        
})}
        </Box>

        {/* Section 2: Football Details */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Football Details
          </Typography>
          {["legacyName", "primaryPosition", "secondaryPosition", "preferredFoot", "currentClub", "leagueLevel", "contractDuration", "underAgent", "agentName"].map((key) => (
            <TextField
              key={key}
              label={key.replace(/([A-Z])/g, " $1")}
              value={getValue(formData[key as keyof ApplicationProps])}
              fullWidth
              margin="dense"
              onChange={(e) => handleChange(key as keyof ApplicationProps, e.target.value)}
            />
          ))}
        </Box>

        {/* Section 3: Physical Attributes */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Physical Attributes
          </Typography>
          {["height", "weight", "shoeSize", "jerseySize", "injuries", "fullyFit"].map((key) => (
            <TextField
              key={key}
              label={key.replace(/([A-Z])/g, " $1")}
              value={getValue(formData[key as keyof ApplicationProps])}
              fullWidth
              margin="dense"
              onChange={(e) => handleChange(key as keyof ApplicationProps, e.target.value)}
            />
          ))}
        </Box>

        {/* Section 4: Trial Logistics */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Trial Logistics
          </Typography>
          {["validVisa", "euPassport", "dietaryRestrictions", "dietaryDetails", "emergencyContactName", "emergencyContactPhone", "emergencyContactRelation", "needAirportPickup"].map((key) => (
            <TextField
              key={key}
              label={key.replace(/([A-Z])/g, " $1")}
              value={getValue(formData[key as keyof ApplicationProps])}
              fullWidth
              margin="dense"
              onChange={(e) => handleChange(key as keyof ApplicationProps, e.target.value)}
            />
          ))}
        </Box>

        {/* Section 5: Terms & Declarations */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Terms & Declarations
          </Typography>
          {["signature"].map((key) => (
            <TextField
              key={key}
              label={key.replace(/([A-Z])/g, " $1")}
              value={getValue(formData[key as keyof ApplicationProps])}
              fullWidth
              placeholder="Type Full Name as Signature"
              margin="dense"
              onChange={(e) => handleChange(key as keyof ApplicationProps, e.target.value)}
            />
          ))}
        </Box>

        {/* File Upload Links */}
        <Box mb={3}>
          {(["passportDataPageUrl", "bioDataUrl", "sponsorshipFormUrl"] as (keyof ApplicationProps)[]).map((key) => (
            <Box mb={2} key={key}>
              <Typography variant="subtitle2" gutterBottom>
                {key.replace(/([A-Z])/g, " $1")}
              </Typography>

              {/* Upload Button */}
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mb: 1 }}
              >
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange(key, e.target.files[0]);
                      setFiles((prevFiles) => ({
                        ...prevFiles,
                        [key]: e.target.files[0],
                      }))
                    }
                  }}
                />
              </Button>

              {/* Preview */}
              {formData[key] && (
                <Box
                  sx={{
                    mt: 1,
                    p: 1,
                    border: "1px dashed gray",
                    borderRadius: 2,
                    textAlign: "center",
                    maxWidth: 300,
                  }}
                >
                  {typeof formData[key] == "string" && formData[key].startsWith("data:image") ? (
                    <img
                      src={formData[key]}
                      alt="preview"
                      style={{ maxWidth: "100%", maxHeight: 150 }}
                    />
                  ) : (
                    <Typography variant="body2" noWrap>
                      File selected (preview not available)
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          ))}
        </Box>


        {/* Checkbox: "I declare that all information provided is true and correct." */}
        <Box mb={3} display="flex" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.declaration}
                onChange={(e) => handleChange("declaration", e.target.checked)}
              />
            }
            label="I declare that all information provided is true and correct."
          />
        </Box>
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
          style={{width:"100%"}}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollectDetails;
