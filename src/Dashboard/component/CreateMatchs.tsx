import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { uploadFile } from "../../Logics/upload";
import { v4 as uuidv4 } from "uuid";
import { getCurrentTimestamp } from "../../Logics/DateFunc";

import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

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
  onSave: (newMatch: MatchItem) => void;
}

const CreateMatch: React.FC<Props> = ({ editData, onSave }) => {
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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "homeScore" || name === "awayScore") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "homeLogo" | "awayLogo" | "backgroundImage"
  ) => {
    const file = e.target.files?.[0];
    if (file) setFormData({ ...formData, [field]: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let homeLogoUrl =
      typeof formData.homeLogo === "string" ? formData.homeLogo : "";
    let awayLogoUrl =
      typeof formData.awayLogo === "string" ? formData.awayLogo : "";
    let bgImageUrl =
      typeof formData.backgroundImage === "string"
        ? formData.backgroundImage
        : "";

    try {
      if (formData.homeLogo instanceof File) {
        homeLogoUrl = (await uploadFile(formData.homeLogo)) as string;
      }
      if (formData.awayLogo instanceof File) {
        awayLogoUrl = (await uploadFile(formData.awayLogo)) as string;
      }
      if (formData.backgroundImage instanceof File) {
        bgImageUrl = (await uploadFile(formData.backgroundImage)) as string;
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

      toast.success(
        formData.docId ? "Match updated successfully!" : "Match created!"
      );

      onSave(updatedData);

      // reset
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
        matchDate: "",
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
<div className="max-h-[80vh] w-full overflow-auto">
  <div className="mb-4 max-w-xl rounded-xl bg-white p-5 shadow">
    <h2 className="mb-4 text-lg font-semibold">
      {formData.docId ? "Edit Match" : "Create Match"}
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Time */}
      <div>
        <label className="block text-sm font-medium mb-1">Time</label>
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
        <label className="block text-sm font-medium mb-1">Home Team</label>
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
        <label className="block text-sm font-medium mb-1">Away Team</label>
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
        <label className="block text-sm font-medium mb-1">Venue</label>
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
        <label className="block text-sm font-medium mb-1">Match Date</label>
        <input
          type="date"
          name="matchDate"
          value={formData.matchDate}
          onChange={handleInputChange}
          required
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* HOME LOGO */}
      <div>
        <label className="block text-sm font-medium mb-1">Home Logo</label>
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
            className="mt-2 h-36 w-full object-contain rounded"
          />
        )}
      </div>

      {/* AWAY LOGO */}
      <div>
        <label className="block text-sm font-medium mb-1">Away Logo</label>
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
            className="mt-2 h-36 w-full object-contain rounded"
          />
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-3 w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
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

export default CreateMatch;
