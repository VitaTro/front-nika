import { useSelector } from "react-redux";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  selectPromoLoading,
  selectPromoProducts,
} from "../../redux/products/selectorsProducts";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { useNavigate } from "react-router-dom";
import { CarouselTitle } from "./PopularCarousel.styled";
import {
  InfoBox,
  Name,
  NewPrice,
  OldPrice,
  SlideCard,
  SlideImage,
  Wrapper,
} from "./PromoCarousel.styled";

const PromoCarousel = () => {
  const promoProducts = useSelector(selectPromoProducts);
  const loading = useSelector(selectPromoLoading);
  const navigate = useNavigate();

  if (loading || !promoProducts.length) return null;

  return (
    <Wrapper>
      <CarouselTitle>🎁 Promocja</CarouselTitle>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 180,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="promo-swiper"
      >
        {promoProducts.map((p) => (
          <SwiperSlide key={p._id} style={{ width: "260px" }}>
            <SlideCard onClick={() => navigate(`/products/${p._id}`)}>
              <SlideImage src={p.photoUrl} alt={p.name} />

              <InfoBox>
                <Name>{p.name}</Name>

                <div>
                  <NewPrice>{p.promoPrice} zł</NewPrice>
                  <OldPrice>{p.lastRetailPrice} zł</OldPrice>
                </div>
              </InfoBox>
            </SlideCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default PromoCarousel;
