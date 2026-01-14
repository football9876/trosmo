import { VideoType } from "@/Dashboard/component/ManageVideos";
import { db } from "@/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useVideos = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Videos"), (snapshot) => {
      const videoList: VideoType[] = snapshot.docs
        .map((doc) => ({
          ...(doc.data() as VideoType),
          docId: doc.id, // Include document ID for editing/deleting
        }))   
      setVideos(videoList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching videos:", error);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return { videos, loading };
};
