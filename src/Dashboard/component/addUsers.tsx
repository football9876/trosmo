import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { User } from "../../interface";
import toast from "react-hot-toast";
import { AddData } from "../../Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "../../firebase.config";

const CreateUserForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<User, "userid">>({
    username: "",
    password: "",
    gender: "male",
    profilePic: "",
    createdAt: new Date().toISOString().split("T")[0],
    isBanned: "no",
    isBlocked: false,
    isAdmin: false,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      ...formData,
      userid: Date.now().toString(),
    };

    setLoading(true);

    try {
      const res = await AddData(collection(db, "Users"), newUser);
      console.log(res);
      toast.success("User created successfully");

      setFormData({
        username: "",
        password: "",
        gender: "male",
        profilePic: "",
        createdAt: new Date().toISOString().split("T")[0],
        isBanned: "no",
        isBlocked: false,
        isAdmin: false,
      });
    } catch (err: any) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4" sx={{ maxWidth: 600 }}>
      <CardContent>
        <h4 className="mb-3">Create New User</h4>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          {formData.profilePic && (
            <div style={{ marginBottom: 16 }}>
              <img
                src={formData.profilePic}
                alt="Profile Preview"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Please wait" : "Create User"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateUserForm;
