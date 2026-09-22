import { useEffect, useState } from "react";
import banner4 from "../icons/dostawa.jpg";
import banner2 from "../icons/rabat.jpg";
import banner3 from "../icons/timeJob.jpg";
import banner1 from "../icons/welcome.jpg";
import { BannerImage, BannerWrapper } from "./BannerCarousel.styled";

const banners = [banner1, banner2, banner3, banner4];
const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BannerWrapper style={{ width: "100%", textAlign: "center" }}>
      <BannerImage
        src={banners[currentIndex]}
        alt={`banner-${currentIndex}`}
        // style={{
        //   width: "100%",
        //   height: "auto",
        //   maxHeight: "300px",
        //   objectFit: "contain",
        //   borderRadius: "12px",
        // }}
      />
    </BannerWrapper>
  );
};
export default BannerCarousel;
