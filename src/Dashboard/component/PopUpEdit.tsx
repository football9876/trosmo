import React, { useState, useEffect } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { User } from "../../interface";
import { getTimeAgoString } from "../../Logics/date";
import { Divider } from "@mui/material";
import moment from "moment";
import { uploadFile } from "../../Logics/upload";
interface PopUp {
  title: string;
  text: string;
  icon: File | string | null; // File for upload, string for preview
  read: boolean;
  readAt: string | null;
  userId: string;
  docId?: string; // Store document ID for updating
}

const PopUpEdit: React.FC = () => {
  const [formData, setFormData] = useState<PopUp>({
    title: "",
    text: "",
    icon: null,
    read: false,
    readAt: null,
    userId: "",
  });

  const [person, setPerson] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Load user data from sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("PopUpUser");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setPerson(userData);
      setFormData((prev) => ({
        ...prev,
        userId: userData.userid || "",
      }));
      fetchPopUp(userData.userid);
    }
  }, []);

  // Fetch PopUp from Firebase by userId
  const fetchPopUp = async (userId: string) => {
    try {
      const popUpDoc = await getDoc(doc(db, "PopUps", userId));
      if (popUpDoc.exists()) {
        setFormData({ ...popUpDoc.data(), docId: popUpDoc.id } as PopUp);
      }
    } catch (err) {
      console.error("Error fetching PopUp:", err);
    }
  };

  // Handle Text Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, icon: file });
    }
  };

  // Convert File to Base64
  // const fileToBase64 = (file: File): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let fileUri:any = typeof formData.icon === "string" ? formData.icon : "";
    if (formData.icon instanceof File) {
      fileUri = await uploadFile(formData.icon);
    }

    const updatedData = {
      ...formData,
      icon: fileUri, // Convert file to base64
      read: false,
      readAt: null,
    };

    try {
      await setDoc(doc(db, "PopUps", formData.userId), updatedData);
      sessionStorage.setItem("PopUpUser", JSON.stringify(updatedData)); // Update sessionStorage
      toast.success("PopUp updated successfully!");
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
        <h4 className="mb-3">Update {person?.username}'s Announcement</h4>
        <Divider />
        <span style={{ fontWeight: "bold", color: "green" }}>
          {formData.read
            ? `Read (${moment(formData.readAt).format("MMM DD, YYYY - hh:mm A")}) ${getTimeAgoString(formData.readAt || "")}`
            : "Not Read"}
        </span>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <MDBInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mb-3"
          />
          <MDBInput
            label="Text"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            required
            className="mb-3"
            multiple
          />

          <label htmlFor="file">Icon </label>
          <br />
          <input id="file" type="file" accept="image/*" onChange={handleFileChange} className="mb-3" />

          {formData.icon && (
            <div className="mb-3">
              <img
                src={typeof formData.icon === "string" ? formData.icon : URL.createObjectURL(formData.icon)}
                alt="Preview"
                className="rounded-circle"
                style={{ width: 50, height: 50 }}
              />
            </div>
          )}

          <MDBBtn
            style={{ width: "100%", background: "var(--blue)" }}
            disabled={loading}
            rounded
            type="submit"
            color="primary"
          >
            {loading ? "Saving..." : "Save PopUp"}
          </MDBBtn>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
};

export default PopUpEdit;
