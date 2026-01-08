import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import carousel CSS
import useInnerWidth from "../../funcs/useInnerWidth";

const announcements = [
  {
    title: "Exciting Announcement!",
    text: "We are thrilled to introduce Performance Analysis – track match ratings, receive coach feedback, monitor fitness levels, and get improvement suggestions! ⚽🔥",
    image: "/banners/banner1.jpg",
  },
  {
    title: "New Training Sessions!",
    text: "Our football academy now offers personalized training plans to help players improve their stamina, agility, and overall game performance! 💪⚽",
    image: "/banners/banner2.jpg",
  }
];

const AnnouncementSlider: React.FC = () => {
  const width=useInnerWidth()
  return (<>
    <div style={{ width: "100%",height:240,marginTop:width < 700 ? -0:-50 }}>
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showArrows={false}
        
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={700}
      >
        {announcements.map((item, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              height: "300px",
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                maxWidth: "90%",
              }}
            >
              <h4 style={{ marginBottom: "10px" }}>{item.title}</h4>
              <p style={{ margin: 0 }}>{item.text}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>

    {width < 700 && <div style={{height:20}}></div>}
    </>
  );
}

export default AnnouncementSlider;
