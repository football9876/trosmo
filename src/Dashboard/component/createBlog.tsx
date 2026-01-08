import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import moment from "moment";
import { uploadFile } from "../../Logics/upload";
import { AddData } from "../../Logics/addData";

export interface BlogItem {
  title: string;
  text: string;
  image: File | string | null;
  date: string;
  docId?: string;
}

interface Props {
  editData?: BlogItem;
}

const CreateBlog: React.FC<Props> = ({ editData: editing }) => {
  const [editData, setEditData] = useState<BlogItem>();
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const [formData, setFormData] = useState<BlogItem>({
    title: "",
    text: "",
    image: null,
    date: new Date().toISOString(),
  });

  useEffect(() => {
    if (editing) {
      setEditData(editing);
    }
  }, [editing]);

  // populate when editing
  useEffect(() => {
    if (editData) {
      setFormData(editData);
      setLastUpdated(editData.date);
    }
  }, [editData]);

  // input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // file handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUri: any =
        typeof formData.image === "string" ? formData.image : "";

      if (formData.image instanceof File) {
        imageUri = await uploadFile(formData.image);
      }

      const updatedData: BlogItem = {
        ...formData,
        image: imageUri,
        date: moment(new Date().toISOString()).format("MMM DD, YYYY"),
      };

      if (editData) {
        const blogRef = doc(db, "Blogs", formData.docId || "newBlog");
        await setDoc(blogRef, updatedData, { merge: true });
      } else {
        await AddData(collection(db, "Blogs"), { ...updatedData });
      }

      toast.success(
        formData.docId
          ? "Blog post updated successfully!"
          : "Blog post created!"
      );

      setFormData({
        title: "",
        text: "",
        image: null,
        date: new Date().toISOString(),
      });
      setEditData(undefined);
      setLastUpdated(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mb: 4 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          {formData.docId ? "Edit Blog Post" : "Create Blog Post"}
        </Typography>

        {lastUpdated && (
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="bold"
            mb={2}
          >
            Last Updated:{" "}
            {moment(lastUpdated).format("MMM DD, YYYY - hh:mm A")}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Text"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            required
            multiline
            rows={4}
            margin="normal"
          />

          <Box mt={2} mb={2}>
            <Typography variant="body2" mb={1}>
              Upload Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Box>

          {formData.image && (
            <Box mb={2}>
              <img
                src={
                  typeof formData.image === "string"
                    ? formData.image
                    : URL.createObjectURL(formData.image)
                }
                alt="Blog Preview"
                style={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
            </Box>
          )}

          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            type="submit"
          >
            {loading
              ? "Saving..."
              : formData.docId
              ? "Update Blog"
              : "Create Blog"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreateBlog;
