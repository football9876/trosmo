import React, { useEffect, useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { uploadFile } from "../../Logics/upload"; 
import toast from "react-hot-toast";
import { docQr } from "../../Logics/docQr";
import { deleteData } from "../../Logics/deleteData";
import { AddData } from "../../Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UploadCloths: React.FC = () => {
  const [cloths, setCloths] = useState<{ url: string; docId?: string }[]>([]);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let toastId;
    try {
      toastId = toast.loading("Uploading...");
      setLoadingIndex(cloths.length); // Mark uploading index

      const url = (await uploadFile(file)) as string;
      const docId = await AddData(collection(db, "Cloths"), { url });

      setCloths((prev:any) => [...prev, { url, docId }]);
      toast.success("Upload successful");
    } catch (err: any) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      if (toastId) toast.dismiss(toastId);
      setLoadingIndex(null);
    }
  };

  const handleDelete = async (index: number) => {
    const cloth = cloths[index];
    await deleteData("Cloths", cloth.docId || "");
    setCloths((prev) => prev.filter((_, i) => i !== index));
  };

  const GetClothes = async () => {
    setLoading(true);
    try {
      const data = await docQr("Cloths");
      setCloths(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetClothes();
  }, []);

  return (
    <div>
      <MDBBtn style={{ marginBottom: "10px" }}>
        <label style={{ cursor: "pointer" }}>
          Upload Cloth
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleUpload}
          />
        </label>
      </MDBBtn>

      {loading && <div style={{ textAlign: "center", marginBottom: 20 }}>Please wait...</div>}

      <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                height={200}
                width={200}
                style={{ borderRadius: 8, margin: 5 }}
              />
            ))
          : cloths.map((cloth, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  display: "inline-block",
                  margin: 5,
                }}
              >
                {loadingIndex === i ? (
                  <Skeleton height={200} width={200} style={{ borderRadius: 8 }} />
                ) : (
                  <img
                    src={cloth.url}
                    alt={`Cloth ${i}`}
                    style={{
                      width: 200,
                      height: "auto",
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                )}
                <MDBBtn
                  size="sm"
                  color="danger"
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    padding: "2px 6px",
                    fontSize: 12,
                  }}
                  onClick={() => handleDelete(i)}
                >
                  ✕
                </MDBBtn>
              </div>
            ))}
      </div>
    </div>
  );
};

export default UploadCloths;
