import React, { useState, useEffect } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import toast from "react-hot-toast";
import { uploadFile } from "../../Logics/upload";
import { v4 as uuidv4 } from "uuid";
import { getCurrentTimestamp } from "../../Logics/DateFunc";

export interface MatchItem {
  day: string;
  weekday: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  homeLogo: File | string | null;
  awayLogo: File | string | null;
  backgroundImage: File | string | null;
  docId?: string;
  createdAt: string;
  homeScore?: number;
  isLastMatch?:boolean,
  awayScore?: number,
  matchDate:string,
}

interface Props {
  editData?: MatchItem;
  onSave: (newMatch: MatchItem) => void;
}

const LastMatchForm: React.FC<Props> = ({ editData, onSave }) => {
  const [formData, setFormData] = useState<MatchItem>({
    day: "",
    weekday: "",
    time: "",
    homeTeam: "",
    awayTeam: "",
    venue: "",
    homeLogo: null,
    awayLogo: null,
    backgroundImage: null,
    createdAt: "",
    homeScore: 0,
    matchDate:"",
    awayScore: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // If score fields, convert to number
    console.log(value)
    if (name === "homeScore" || name === "awayScore") {
      setFormData({ ...formData, [name]: parseInt(value, 10) });
    }
     
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "homeLogo" | "awayLogo" | "backgroundImage"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, [field]: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let homeLogoUrl = typeof formData.homeLogo === "string" ? formData.homeLogo : "";
    let awayLogoUrl = typeof formData.awayLogo === "string" ? formData.awayLogo : "";
    let bgImageUrl = typeof formData.backgroundImage === "string" ? formData.backgroundImage : "";

    try {
      if (formData.homeLogo instanceof File) {
        homeLogoUrl = await uploadFile(formData.homeLogo) as string;
      }
      if (formData.awayLogo instanceof File) {
        awayLogoUrl = await uploadFile(formData.awayLogo) as string;
      }
      if (formData.backgroundImage instanceof File) {
        bgImageUrl = await uploadFile(formData.backgroundImage) as string;
      }

      const finalDocId = formData.docId || uuidv4();

      const updatedData: MatchItem = {
        ...formData,
        homeLogo: homeLogoUrl,
        awayLogo: awayLogoUrl,
        backgroundImage: bgImageUrl,
        docId: finalDocId,
        createdAt: getCurrentTimestamp(),
      };

      onSave(updatedData);

      // Reset form
      setFormData({
        day: "",
        weekday: "",
        time: "",
        homeTeam: "",
        awayTeam: "",
        venue: "",
        homeLogo: null,
        awayLogo: null,
        backgroundImage: null,
        createdAt: "",
        homeScore: 0,
        matchDate:"",
        awayScore: 0,
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBCard className="mb-4" style={{ maxWidth: 600 }}>
      <MDBCardBody>
        <form onSubmit={handleSubmit}>
          {/* <MDBInput label="Day EX (Saturday)" name="day" value={formData.day} onChange={handleInputChange} required className="mb-3" /> */}
          {/* <MDBInput label="Weekday" name="weekday" value={formData.weekday} onChange={handleInputChange} required className="mb-3" /> */}
          {/* <MDBInput label="Time" name="time" value={formData.time} onChange={handleInputChange} required className="mb-3" /> */}
          {/* <MDBInput label="Home Team" name="homeTeam" value={formData.homeTeam} onChange={handleInputChange} required className="mb-3" /> */}
          {/* <MDBInput label="Away Team" name="awayTeam" value={formData.awayTeam} onChange={handleInputChange} required className="mb-3" /> */}
          {/* <MDBInput label="Venue" name="venue" value={formData.venue} onChange={handleInputChange} required className="mb-3" /> */}
          {/* <MDBInput label="Match Date" name="matchDate" value={formData.matchDate} onChange={handleInputChange} required className="mb-3" type="date"/> */}

           <MDBInput label="Home Score" type="number" name="homeScore" value={formData.homeScore} onChange={handleInputChange} className="mb-3" />
          <MDBInput label="Away Score" type="number" name="awayScore" value={formData.awayScore} onChange={handleInputChange} className="mb-3" /> 

          <label>Home Logo</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "homeLogo")} className="mb-3" />
          {formData.homeLogo && (
            <img
              src={typeof formData.homeLogo === "string" ? formData.homeLogo : URL.createObjectURL(formData.homeLogo)}
              alt="Home Logo"
              style={{ width: "100%", maxHeight: 150, objectFit: "contain", marginBottom: 10 }}
            />
          )}

          <label>Away Logo</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "awayLogo")} className="mb-3" />
          {formData.awayLogo && (
            <img
              src={typeof formData.awayLogo === "string" ? formData.awayLogo : URL.createObjectURL(formData.awayLogo)}
              alt="Away Logo"
              style={{ width: "100%", maxHeight: 150, objectFit: "contain", marginBottom: 10 }}
            />
          )}

          <label>Background Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "backgroundImage")} className="mb-3" />
          {formData.backgroundImage && (
            <img
              src={typeof formData.backgroundImage === "string" ? formData.backgroundImage : URL.createObjectURL(formData.backgroundImage)}
              alt="Background"
              style={{ width: "100%", maxHeight: 200, objectFit: "cover", marginBottom: 10 }}
            />
          )} 

          <MDBBtn style={{ width: "100%", background: "var(--blue)" }} disabled={loading} rounded type="submit">
            {loading ? "Saving..." : "Update"}
          </MDBBtn>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
};

export default LastMatchForm;
