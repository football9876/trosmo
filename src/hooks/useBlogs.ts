import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { BlogItem } from "../Dashboard/component/createBlog";
import { db } from "../firebase.config";
 // Adjust path if needed

const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Blogs"), (snapshot) => {
      const blogList: BlogItem[] = snapshot.docs
      .map((doc) => ({
        ...(doc.data() as BlogItem),
        docId: doc.id, // Include document ID for editing/deleting
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort descending (recent first)
    ;
      setBlogs(blogList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return { blogs, loading };
};

export default useBlogs;
