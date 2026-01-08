import { useEffect, useState } from "react";
import { ImageList, ImageListItem, Dialog, DialogContent } from "@mui/material";
import { docQr } from "../../Logics/docQr";
import Header from "../../landingPage2/header";
import NestedMenu from "./Nav/pcNavigation";
import Footer from "../../landingPage2/Footer";

const Gallery = () => {
  const [images, setImages] = useState<{
    url: string;
    name: string;
    date: string;
  }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getImages = async () => {
    setLoading(true);
    try {
      const data: any = await docQr("Gallery");
      console.log(data);
      setImages(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="main-body-container">
      <div className="home-content">
        <Header />
        <NestedMenu />

        <div style={{ padding: 10 }}>
          <h3>Gallery</h3>

          {/* Image Grid */}
          {loading ? (
            <GallerySkeleton />
          ) : (
            <ImageList
              variant="masonry"
              cols={window.innerWidth > 768 ? 3 : 2}
              gap={10}
            >
              {images.map((image, index) => (
                <ImageListItem
                  key={index}
                  onClick={() => setSelectedImage(image.url)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    loading="lazy"
                    style={{ width: "100%", height: "auto", borderRadius: 8 }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}

          {/* Lightbox Modal */}
          <Dialog
            style={{ zIndex: "999" }}
            open={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            maxWidth="md"
          >
            <DialogContent style={{ padding: 10 }}>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Full Size"
                  style={{ width: "100%", height: "auto", borderRadius: 8 }}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Gallery;

import { Skeleton } from "@mui/material";

const GallerySkeleton = () => {
  // Adjust how many placeholders you'd like (example: 6)
  const placeholders = Array.from({ length: 6 });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
      {placeholders.map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={200}

          style={{ borderRadius: 8, }}
        />
      ))}
    </div>
  );
};

