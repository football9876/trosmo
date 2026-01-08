import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Stack,
} from "@mui/material";
import { docQr } from "../../Logics/docQr";
import { AddData } from "../../Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import toast from "react-hot-toast";
import { deleteData } from "../../Logics/deleteData";
import { countriesData } from "../countries";

const Settings: React.FC = () => {
  const [countries, setCountries] = useState<{ docId: string; name: string }[]>([]);
  const [newCountry, setNewCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch countries
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

  const handleAddCountry = async () => {
    if (!newCountry.trim()) return;
    try {
      await AddData(collection(db, "countries"), {
        name: newCountry.trim(),
      });
      toast.success("Country added successfully");
      setNewCountry("");
      fetchCountries();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteCountry = async (docId: string) => {
    try {
      await deleteData("countries", docId);
      toast.success("Deleted successfully");
      fetchCountries();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, bgcolor: "background.paper", maxHeight: "100vh", overflow: "auto" }}>
      <Typography  variant="h5" mb={2}>
        Countries Settings
      </Typography>
      <TextField
        fullWidth
        label="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />

      <Stack direction="row" spacing={1} mb={2} alignItems="center">
        <TextField
          label="Add new country"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button variant="contained" color="primary" size="small" onClick={handleAddCountry}>
          Add
        </Button>
      </Stack>

      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <CircularProgress size={24} />
          <Typography ml={1}>Loading...</Typography>
        </Box>
      ) : filteredCountries.length > 0 ? (
        <List>
          {filteredCountries.map((country) => (
            <ListItem
              key={country.docId}
              divider
              secondaryAction={
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteCountry(country.docId)}
                >
                  Delete
                </Button>
              }
            >
              <ListItemText primary={country.name} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No countries found.</Typography>
      )}
    </Box>
  );
};

export default Settings;
