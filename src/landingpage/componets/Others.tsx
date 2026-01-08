import { useEffect, useState } from "react";
import useInnerWidth from "../../funcs/useInnerWidth";
import SlideElement2, { SlideElementNetclub } from "./Blogs/slideElement2";
import SponsorSlider from "./Blogs/slides";
import ReactPlayer from "react-player";
import { docQr } from "../../Logics/docQr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import { PostType } from "../../landingPage2/Posts/Posts";
import { Skeleton as Skeleton_} from "@mui/material"; // You can use MDBSkeleton if you prefer

export interface Video {
  url: string;
  title: string;
  createdAt: string;
}

const Others = () => {
  const width = useInnerWidth();
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set container height after render
    setTimeout(() => {
      const el = document.querySelector(".blogs");
      if (el) {
        const rects = el.getClientRects();
        setMaxHeight(rects[0].height > window.innerHeight ? rects[0].height : rects[0].height);
      }
    }, 3000);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const data = await docQr("Videos");
        setVideos(data);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);


    const [posts, setPosts] = useState<PostType[]>([]);
  const [loading_, setLoading_] = useState<boolean>(false);

  const GetPosts = async () => {
    try {
      setLoading_(true);
      const data = await docQr("Blogs", {});
      setPosts(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading_(false);
    }
  };

  useEffect(() => {
    GetPosts();
  }, []);


  return (
    <div
      style={{
        maxHeight: width > 900 ? maxHeight : undefined,
        width: "100%",
        maxWidth:"90vw",
        overflow: "auto",
      }}
    >
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ background: "white", marginTop: 10 }}>
            <Skeleton height={300} width="100%" />
            <Skeleton width={200} />
            <br />
            <br />
          </div>
        ))
      ) : videos.length > 0 ? (
        videos.map((video, i) => (
          <div key={i} style={{ background: "white", marginTop: 10 }}>
            <ReactPlayer width="100%" src={video.url} controls />
            <span>{video.title || "Untitled"}</span>
            <br />
            <br />
            <br />
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No videos available</p>
      )}

      <div style={{ padding: 0 }}>
            <div className={`post-list mobileshow`}>
              {posts.length === 0  && !loading && <span style={{fontSize:14,fontFamily:'cursive'}}>No post available at the moment</span>}
              {loading_
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div className="post-item free" key={index}>
                      <Skeleton_ variant="rectangular" width="100%" height={200} />
                      <div className="post-content" style={{ padding: 10 }}>
                        <Skeleton_ variant="text" width="60%" />
                        <Skeleton_ variant="text" width="40%" />
                        <Skeleton_ variant="text" width="100%" />
                        <Skeleton_ variant="text" width="90%" />
                      </div>
                    </div>
                  ))
                : posts.slice(0,5).map((post, index) => (
                    <div className="post-item free" key={index}>
                      <div
                        className="post-image free"
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
            </div>
      <SlideElement2 />
      <SponsorSlider />
      <SlideElementNetclub />
    </div>
  );
};

export default Others;
