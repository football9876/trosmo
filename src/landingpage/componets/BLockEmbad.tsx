import { FacebookEmbed } from "react-social-media-embed";
import React from "react";

const BlockedFacebookEmbed:React.FC<{url:string,width:string,style?:React.CSSProperties}> = ({url}) => {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <FacebookEmbed
        url={url}
        width="100%"
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          cursor: "auto",
        }}
      />
    </div>
  );
};

export default BlockedFacebookEmbed;
