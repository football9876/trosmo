import React, { useState, useEffect } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBTextArea } from "mdb-react-ui-kit";
import toast from "react-hot-toast";
import { collection, doc,  setDoc } from "firebase/firestore";
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
  editData?: BlogItem; // Optional edit mode
}

const CreateBlog: React.FC<Props> = ({ editData:editing }) => {
  const [editData,setEditData]=useState<BlogItem>();
  useEffect(()=>{
if(editing){
  setEditData(editing)
}
  },[editing]);
  const [formData, setFormData] = useState<BlogItem>({
    title: "",
    text: "",
    image: null,
    date: new Date().toISOString(), // Default to today’s date
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Populate form when editing
  useEffect(() => {
    if (editData) {
      setFormData(editData);
      setLastUpdated(editData.date);
    }
  }, [editData]);

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  }

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUri:any = typeof formData.image === "string" ? formData.image : "";
    if (formData.image instanceof File) {
      imageUri = await uploadFile(formData.image);
    }

    const updatedData: BlogItem = {
      ...formData,
      image: imageUri,
      date: moment(new Date().toISOString()).format("MMM DD, YYYY"),
    };

    try {
      if(editData){
      const blogRef = doc(db, "Blogs", formData.docId || "newBlog");
      await setDoc(blogRef, updatedData, { merge: true });
      }
      else{
        await AddData(collection(db,"Blogs"),{...updatedData})
      }
      toast.success(formData.docId ? "Blog post updated successfully!" : "Blog post created!");
      // setLastUpdated(updatedData.date);
      setFormData({
    title: "",
    text: "",
    image: null,
    date: new Date().toISOString(), // Default to today’s date
  });
setEditData(undefined)
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
        <h4 className="mb-3">{formData.docId ? "Edit Blog Post" : "Create Blog Post"}</h4>
        {lastUpdated && (
          <span style={{ fontWeight: "bold", color: "gray" }}>
            Last Updated: {moment(lastUpdated).format("MMM DD, YYYY - hh:mm A")}
          </span>
        )}
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <MDBInput label="Title" name="title" value={formData.title} onChange={handleInputChange} required className="mb-3" />
          <MDBTextArea label="Text"  name="text" value={formData.text} onChange={handleInputChange} required className="mb-3"  />

          <label htmlFor="file">Upload Image</label>
          <br />
          <input id="file" type="file" accept="image/*" onChange={handleFileChange} className="mb-3" />

          {formData.image && (
            <div className="mb-3">
              <img
                src={typeof formData.image === "string" ? formData.image : URL.createObjectURL(formData.image)}
                alt="Blog Preview"
                style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 5 }}
              />
            </div>
          )}

          <MDBBtn style={{ width: "100%", background: "var(--blue)" }} disabled={loading} rounded type="submit">
            {loading ? "Saving..." : formData.docId ? "Update Blog" : "Create Blog"}
          </MDBBtn>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
};

export default CreateBlog;
