import { useState, useEffect } from "react";

const useInnerWidth = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  console.log({innerWidth});
  useEffect(() => {
    const handleResize = () => setInnerWidth(window.innerWidth);
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return innerWidth;
};

export default useInnerWidth;
