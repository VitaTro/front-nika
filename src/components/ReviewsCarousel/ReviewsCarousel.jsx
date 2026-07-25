import { useRef } from "react";
import ReviewIcon from "../icons/review.png";
import {
  ArrowLeft,
  ArrowRight,
  CarouselTitle,
} from "../PopularCarousel/PopularCarousel.styled";
import {
  ReviewAvatar,
  ReviewCard,
  ReviewsHeader,
  ReviewsTrack,
  ReviewsWrapper,
  ReviewText,
} from "./ReviewsCarousel.styled";
const ReviewsCarousel = ({ reviews }) => {
  const trackRef = useRef(null);

  const scrollLeft = () => {
    trackRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    trackRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (!reviews || !reviews.length) return null;

  return (
    <ReviewsWrapper>
      <ReviewsHeader>
        <img
          src={ReviewIcon}
          alt="Reviews icon"
          className="reviews-icon"
          width={70}
        />
        <CarouselTitle>Opinie klientów</CarouselTitle>
      </ReviewsHeader>

      <ArrowLeft onClick={scrollLeft}>‹</ArrowLeft>
      <ArrowRight onClick={scrollRight}>›</ArrowRight>

      <ReviewsTrack ref={trackRef}>
        {reviews.map((r, i) => (
          <ReviewCard key={i}>
            <ReviewAvatar />
            <ReviewText>
              {" "}
              <p className="original">{r.original}</p>
              <p className="translation">{r.translation}</p>
            </ReviewText>
          </ReviewCard>
        ))}
      </ReviewsTrack>
    </ReviewsWrapper>
  );
};

export default ReviewsCarousel;
