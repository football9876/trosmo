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
    <div style={{maxHeight:"80vh",width:"100%",overflow:"auto"}}>

    <Card sx={{ maxWidth: 600, mb: 4 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          {formData.docId ? "Edit Match" : "Create Match"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Home Team"
            name="homeTeam"
            value={formData.homeTeam}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Away Team"
            name="awayTeam"
            value={formData.awayTeam}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Venue"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Match Date"
            name="matchDate"
            type="date"
            value={formData.matchDate}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          {/* HOME LOGO */}
          <Box mt={2}>
            <Typography variant="body2">Home Logo</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "homeLogo")}
            />
            {formData.homeLogo && (
              <img
                src={
                  typeof formData.homeLogo === "string"
                    ? formData.homeLogo
                    : URL.createObjectURL(formData.homeLogo)
                }
                alt="Home Logo"
                style={{
                  width: "100%",
                  maxHeight: 150,
                  objectFit: "contain",
                  marginTop: 8,
                }}
              />
            )}
          </Box>

          {/* AWAY LOGO */}
          <Box mt={2}>
            <Typography variant="body2">Away Logo</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "awayLogo")}
            />
            {formData.awayLogo && (
              <img
                src={
                  typeof formData.awayLogo === "string"
                    ? formData.awayLogo
                    : URL.createObjectURL(formData.awayLogo)
                }
                alt="Away Logo"
                style={{
                  width: "100%",
                  maxHeight: 150,
                  objectFit: "contain",
                  marginTop: 8,
                }}
              />
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, bgcolor: "primary.main" }}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : formData.docId
              ? "Update Match"
              : "Create Match"}
          </Button>
        </Box>
      </CardContent>
    </Card>
    </div>

  );
};

export default CreateMatch;
