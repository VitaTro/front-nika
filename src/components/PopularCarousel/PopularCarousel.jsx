import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularProducts } from "../../redux/popular/operationPopular";
import { selectPopularItems } from "../../redux/popular/selectorsPopular";
import PopularStar from "../icons/star.png";
import {
  ArrowLeft,
  ArrowRight,
  CarouselItem,
  CarouselTitle,
  CarouselTrack,
  CarouselWrapper,
  ItemImage,
  ItemName,
  ItemPrice,
  PopularHeader,
} from "./PopularCarousel.styled";
const PopularCarousel = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectPopularItems);
  const trackRef = useRef(null);

  useEffect(() => {
    dispatch(getPopularProducts());
  }, [dispatch]);

  if (!items || !items.length) return null;

  const scrollLeft = () => {
    trackRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    trackRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <CarouselWrapper>
      <PopularHeader>
        <img src={PopularStar} alt="Popular icon star" />
        <CarouselTitle>Popularne produkty</CarouselTitle>
      </PopularHeader>

      <ArrowLeft onClick={scrollLeft}>‹</ArrowLeft>
      <ArrowRight onClick={scrollRight}>›</ArrowRight>

      <CarouselTrack ref={trackRef}>
        {items.map((p) => (
          <CarouselItem key={p._id}>
            <ItemImage src={p.photoUrl} alt={p.name} />
            <ItemName>{p.name}</ItemName>
            <ItemPrice>{p.price} zł</ItemPrice>
          </CarouselItem>
        ))}
      </CarouselTrack>
    </CarouselWrapper>
  );
};

export default PopularCarousel;
