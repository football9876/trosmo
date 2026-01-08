import React from "react";
import { ImageList, ImageListItem, Skeleton } from "@mui/material";

const GallerySkeleton: React.FC = () => {
  return (
    <ImageList variant="masonry" style={{padding:16}} cols={window.innerWidth > 768 ? 3 : 2} gap={10}>
      {[...Array(6)].map((_, index) => (
        <ImageListItem key={index}>
          <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 8 }} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default GallerySkeleton;
