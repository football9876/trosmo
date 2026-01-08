import React, { useEffect, useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import toast from "react-hot-toast";
import { docQr } from "../../Logics/docQr";
import { deleteData } from "../../Logics/deleteData";
import { AddData} from "../../Logics/addData"; // ensure you have updateData
import { collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { updateData } from "../../Logics/updateData";
import { uploadFileToCpanelServer } from "../../Logics/uploadToCpanel";
import { getCurrentTimestamp } from "../../Logics/DateFunc";

interface VideoType {
  url: string;
  title: string;
  docId?: string;
}

const UploadVideos: React.FC = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [originalTitles, setOriginalTitles] = useState<string[]>([]);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let toastId;
    try {
      toastId = toast.loading("Uploading video...");
      setLoadingIndex(videos.length);

      const url = (await uploadFileToCpanelServer(file)) as string;
    
      const docId = await AddData(collection(db, "Videos"), { url, title: "",createdAt:getCurrentTimestamp() });

      setVideos((prev:any) => [...prev, { url, title: "", docId }]);
      setOriginalTitles((prev) => [...prev, ""]);
      toast.success("Video uploaded successfully");
    } catch (err: any) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      if (toastId) toast.dismiss(toastId);
      setLoadingIndex(null);
    }
  };

  const handleDelete = async (index: number) => {
    const video = videos[index];
    await deleteData("Videos", video.docId || "");
    setVideos((prev) => prev.filter((_, i) => i !== index));
    setOriginalTitles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTitleChange = (index: number, newTitle: string) => {
    setVideos((prev) =>
      prev.map((video, i) => (i === index ? { ...video, title: newTitle } : video))
    );
  };

  const handleSaveTitle = async (index: number) => {
    const video = videos[index];
    try {
      await updateData("Videos", video.docId || "", { title: video.title });
      toast.success("Title updated");
      setOriginalTitles((prev) =>
        prev.map((title, i) => (i === index ? video.title : title))
      );
    } catch (err: any) {
      toast.error("Failed to update title");
    }
  };

  const getVideos = async () => {
    setLoading(true);
    try {
      const data = await docQr("Videos");
      setVideos(data);
      setOriginalTitles(data.map((v: VideoType) => v.title || ""));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div>
      <h4 style={{ marginBottom: "10px" }}>Upload Training or Showcase Videos</h4>

      <MDBBtn style={{ marginBottom: "10px" }}>
        <label style={{ cursor: "pointer" }}>
          Upload Video
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={handleUpload}
          />
        </label>
      </MDBBtn>

      {loading && <div style={{ textAlign: "center", marginBottom: 20 }}>Please wait...</div>}

      <div className="flex items-center justify-center flex-wrap gap-2">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                height={200}
                width={200}
                style={{ borderRadius: 8, margin: 5 }}
              />
            ))
          : videos.map((video, i) => {
            console.log({video});
              const hasChanged = video.title !== originalTitles[i];
              return (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    margin: 5,
                    width: 220,
                  }}
                >
                  {loadingIndex === i ? (
                    <Skeleton height={200} width={200} style={{ borderRadius: 8 }} />
                  ) : (
                    <video
                      controls
                      src={video.url}
                      style={{
                        width: 200,
                        height: "auto",
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <input
                    type="text"
                    value={video.title}
                    onChange={(e) => handleTitleChange(i, e.target.value)}
                    placeholder="Enter title"
                    style={{
                      width: "100%",
                      marginTop: 5,
                      padding: "5px",
                      borderRadius: 4,
                      border: "1px solid #ccc",
                      fontSize: 14,
                    }}
                  />

                  {hasChanged && (
                    <MDBBtn
                      size="sm"
                      color="primary"
                      style={{ width: "100%", marginTop: 5, fontSize: 12, padding: "4px 0" }}
                      onClick={() => handleSaveTitle(i)}
                    >
                      Save Title
                    </MDBBtn>
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
              );
            })}
      </div>
    </div>
  );
};

export default UploadVideos;
