import React, { useEffect, useState } from "react";
import { ImageList, ImageListItem, Dialog, DialogContent, IconButton, Button} from "@mui/material";
// import { Delete, Upload } from "@mui/icons-material";
// import TopNavigation from "./Nav/topNavigation";
// import Footer from "./footer";
import { docQr } from "../../Logics/docQr";
import GallerySkeleton from "../../landingpage/componets/GellerySkeleton";
import { Delete, Upload } from "react-feather";
import { MDBBtn } from "mdb-react-ui-kit";
import { deleteData } from "../../Logics/deleteData";
import { uploadFile } from "../../Logics/upload";
import { getCurrentTimestamp } from "../../Logics/DateFunc";
import { AddData } from "../../Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
// import GallerySkeleton from "./GallerySkeleton";

const GalleryManager = () => {
  const [images, setImages] = useState<{ url: string; name: string; date: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

  // Fetch Images from Server
  const getImages = async () => {
    setLoading(true);
    try {
      const data: any = await docQr("Gallery");
      setImages(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  // Handle Image Upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImage(file);
    }
  };

  // Handle Image Deletion (Removes from UI, handle deletion on submit)
  const handleDelete =async (Image_: any) => {
    try{
    setImages((prevImages) => prevImages.filter((img) => img.url !== Image_.url));
    await deleteData("Gallery",Image_.docId);
    console.log("deletion successfuly");
    }
    catch(err){
console.log(err)
    }
    finally{
console.log("finally")
    }

  };


const [uploading,setUploading]=useState<boolean>(false);
  const submit=async ()=>{
try{
    if(!newImage)return
setUploading(true);
const url=await uploadFile(newImage)
console.log(url)
const data={
    url:url,
    name:newImage.name,
    date:getCurrentTimestamp()
}

const res=await AddData(collection(db,"Gallery"),data);
getImages()
setNewImage(null);
console.log({res});
}
catch(err:any){
    toast.error(err.message);
console.log(err);
}
finally{
    setUploading(false);
console.log("upload successful")
}
  }
  return (
    <>
   
      <div style={{ padding: 10,overflow:"auto",maxHeight:"95vh" }}>
        <h3>Manage Gallery</h3>

        {/* Image Grid */}
        {loading ? (
          <GallerySkeleton />
        ) : (
          <ImageList variant="masonry" cols={window.innerWidth > 768 ? 3 : 2} gap={10}>
            {images.map((image, index) => (
              <ImageListItem key={index} style={{ position: "relative" }}>
                <img
                  src={image.url}
                  alt={image.name}
                  loading="lazy"
                  style={{ width: "100%", height: "auto", borderRadius: 8, cursor: "pointer" }}
                  onClick={() => setSelectedImage(image.url)}
                />
                <IconButton
                  onClick={() => handleDelete(image)}
                  style={{ position: "absolute", top: 5, right: 5, color: "red", background: "white" }}
                >
                  <Delete />
                </IconButton>
              </ImageListItem>
            ))}
          </ImageList>
        )}

        {/* Lightbox Modal */}
        <Dialog style={{ zIndex: "999" }} open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md">
          <DialogContent style={{ padding: 10 }}>
            {selectedImage && (
              <img src={selectedImage} alt="Full Size" style={{ width: "100%", height: "auto", borderRadius: 8 }} />
            )}
          </DialogContent>
        </Dialog>

        {/* Upload New Image */}
        <div style={{ marginTop: 20 }}>
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} id="uploadImage" />
          <label htmlFor="uploadImage">
            <Button component="span" variant="contained" color="primary" startIcon={<Upload />}>
              Select New Image
            </Button>
          </label>
          {newImage && (
            <div style={{ marginTop: 10 }}>
                 <img src={URL.createObjectURL(newImage)} alt="Full Size" style={{  height: "auto", borderRadius: 8 }} />
              <p>New Image: {newImage.name}</p>
              <MDBBtn onClick={submit}  color={`dark`} disabled={uploading} >{uploading ? <ClipLoader color={`white`} size={20}/>:"Upload"}</MDBBtn>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GalleryManager;
