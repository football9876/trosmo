import React, { useEffect, useState } from "react";
import Header from "../header";
import NestedMenu from "../../landingpage/componets/Nav/pcNavigation";
import "./posts.css";
import Footer from "../Footer";
import toast from "react-hot-toast";
import { docQr } from "../../Logics/docQr";
import { Skeleton } from "@mui/material"; // You can use MDBSkeleton if you prefer

export interface PostType {
  docId: string;
  title: string;
  date: string;
  text: string;
  image: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const GetPosts = async () => {
    try {
      setLoading(true);
      const data = await docQr("Blogs", {});
      setPosts(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetPosts();
  }, []);

  return (
    <>
      <div className="main-body-container">
        <div className="home-content">
          <Header />
          <NestedMenu />
          <br />
          <br />
          <div style={{ padding: 20 }}>
            <div className="post-list">
              {posts.length === 0  && !loading && <span style={{fontSize:14,fontFamily:'cursive'}}>No post available at the moment</span>}
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div className="post-item" key={index}>
                      <Skeleton variant="rectangular" width="100%" height={200} />
                      <div className="post-content" style={{ padding: 10 }}>
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="90%" />
                      </div>
                    </div>
                  ))
                : posts.map((post, index) => (
                    <div className="post-item" key={index}>
                      <div
                        className="post-image"
                        style={{
                          backgroundImage: `url(${post.image})`,
                          height: "200px",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "8px",
                        }}
                      />
                      <div className="post-content">
                        <h3>{post.title}</h3>
                        <small>{post.date}</small>
                        <p>{post.text}</p>
                      </div>
                    </div>
                  ))}
            </div>
            <br />
            <br />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default PostList;
