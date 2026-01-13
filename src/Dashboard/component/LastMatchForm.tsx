import React, { useState, useEffect } from "react";
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
  isLastMatch?: boolean;
  awayScore?: number;
  matchDate: string;
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
      if (formData.homeLogo instanceof File)
        homeLogoUrl = (await uploadFile(formData.homeLogo)) as string;

      if (formData.awayLogo instanceof File)
        awayLogoUrl = (await uploadFile(formData.awayLogo)) as string;

      if (formData.backgroundImage instanceof File)
        bgImageUrl = (await uploadFile(formData.backgroundImage)) as string;

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
    <div className="mb-4 max-w-xl rounded-xl bg-white p-5 shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Scores */}
        <div>
          <label className="block text-sm font-medium mb-1">Home Score</label>
          <input
            type="number"
            name="homeScore"
            value={formData.homeScore}
            onChange={handleInputChange}
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Away Score</label>
          <input
            type="number"
            name="awayScore"
            value={formData.awayScore}
            onChange={handleInputChange}
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Home Logo */}
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

        {/* Away Logo */}
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

        {/* Background */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Background Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "backgroundImage")}
            className="block w-full text-sm"
          />
          {formData.backgroundImage && (
            <img
              src={
                typeof formData.backgroundImage === "string"
                  ? formData.backgroundImage
                  : URL.createObjectURL(formData.backgroundImage)
              }
              alt="Background"
              className="mt-2 h-44 w-full object-cover rounded"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default LastMatchForm;
