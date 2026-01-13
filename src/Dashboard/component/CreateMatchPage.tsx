import React, { useState, useEffect } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { uploadFile } from "../../Logics/upload";
import { v4 as uuidv4 } from "uuid";
import { getCurrentTimestamp } from "../../Logics/DateFunc";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../store/Slice";

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
  isLastMatch?: boolean;
  awayScore?: number;
  matchDate: string;
}

interface Props {
  editData?: MatchItem;
}

const CreateMatchPage: React.FC<Props> = ({ editData }) => {
  const dispatch = useDispatch();
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
    matchDate: "",
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
    if (name === "homeScore" || name === "awayScore") {
      setFormData({ ...formData, [name]: parseInt(value, 10) });
    } else {
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

      const matchRef = doc(db, "Matches", finalDocId);
      await setDoc(matchRef, updatedData, { merge: true });

      toast.success(formData.docId ? "Match updated successfully!" : "Match created!");

      // Navigate back to matches list
      dispatch(setCurrentPage("/Matches"));
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    dispatch(setCurrentPage("/Matches"));
  };

  return (<div className="p-4">
  <button
    onClick={handleBack}
    className="mb-6 flex items-center gap-2 font-medium text-primary hover:text-primary/80"
  >
    <ArrowLeft className="h-5 w-5" />
    Back to Matches
  </button>

  <h2 className="mb-6 text-2xl font-bold">
    {editData?.docId ? "Edit Match" : "Create New Match"}
  </h2>

  {/* Card */}
  <div className="mb-4 max-w-xl rounded-xl bg-white p-5 shadow">
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Time */}
      <div>
        <label className="mb-1 block text-sm font-medium" style={{textAlign:"start"}}>Time</label>
        <input
          type="text"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          required
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Home Team */}
      <div>
        <label style={{textAlign:"start"}} className="mb-1 block text-sm font-medium">Home Team</label>
        <input
          type="text"
          name="homeTeam"
          value={formData.homeTeam}
          onChange={handleInputChange}
          required
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Away Team */}
      <div>
        <label style={{textAlign:"start"}} className="mb-1 block text-sm font-medium">Away Team</label>
        <input
          type="text"
          name="awayTeam"
          value={formData.awayTeam}
          onChange={handleInputChange}
          required
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Venue */}
      <div>
        <label style={{textAlign:"start"}} className="mb-1 block text-sm font-medium">Venue</label>
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleInputChange}
          required
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Match Date */}
      <div>
        <label style={{textAlign:"start"}} className="mb-1 block text-sm font-medium">Match Date</label>
        <input
          type="date"
          name="matchDate"
          value={formData.matchDate}
          onChange={handleInputChange}
          required
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Home Logo */}
      <div>
        <label style={{textAlign:"start"}} className="mb-1 block text-sm font-medium">Home Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "homeLogo")}
          className="block w-full text-sm"
        />
        {formData.homeLogo && (
          <img
            src={
              typeof formData.homeLogo === "string"
                ? formData.homeLogo
                : URL.createObjectURL(formData.homeLogo)
            }
            alt="Home Logo"
            className="mt-2 h-36 w-full rounded object-contain"
          />
        )}
      </div>

      {/* Away Logo */}
      <div>
        <label style={{textAlign:"start"}} className="mb-1 block text-sm font-medium">Away Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "awayLogo")}
          className="block w-full text-sm"
        />
        {formData.awayLogo && (
          <img
            src={
              typeof formData.awayLogo === "string"
                ? formData.awayLogo
                : URL.createObjectURL(formData.awayLogo)
            }
            alt="Away Logo"
            className="mt-2 h-36 w-full rounded object-contain"
          />
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {loading
          ? "Saving..."
          : formData.docId
          ? "Update Match"
          : "Create Match"}
      </button>
    </form>
  </div>
</div>
  );
};

export default CreateMatchPage;
