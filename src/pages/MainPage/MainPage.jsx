import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import BannerCarousel from "../../components/BannerCarousel/BannerCarousel";
import Loader from "../../components/Loader";
import PopularCarousel from "../../components/PopularCarousel/PopularCarousel";
import ReviewsCarousel from "../../components/ReviewsCarousel/ReviewsCarousel";
import { reviews } from "../../data/reviews";
import { fetchPublicMain } from "../../redux/main/mainOperations";
import { fetchUserMain } from "../../redux/user/userOperations";
import { selectWishlistProducts } from "../../redux/wishlist/selectorsWishlist";
import ProductsPage from "../ProductsPage/ProductsPage";
import Girl from "./xupingGirl.png";

import { HeroText, HomeTitle } from "./MainPage.styled";

const MainPage = () => {
  const isUserAuthenticated = useSelector((state) => state.userAuth.isLoggedIn);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const wishlist = useSelector(selectWishlistProducts);
  const loading = useSelector((state) => state?.user?.loading || false);
  const error = useSelector((state) => state?.user?.error || null);

  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(fetchUserMain());
    } else {
      dispatch(fetchPublicMain());
    }
  }, [dispatch, isUserAuthenticated]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Helmet>
        <title>{t("meta.home.title")}</title>
        <meta name="description" content={t("meta.home.description")} />
        <link rel="canonical" href="https://nika-gold.net/" />
      </Helmet>

      <BannerCarousel />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "40px",
          padding: "40px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <img
          src={Girl}
          alt="Xuping Jewelry model"
          style={{
            width: "100%",
            maxWidth: "380px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            flexShrink: 0,
          }}
        />

        <div
          style={{
            maxWidth: "600px",
            color: "#5a4a3f",
            lineHeight: "1.6",
            textAlign: "left",
          }}
        >
          <HomeTitle>{t("meta.home.description1")}</HomeTitle>

          <HeroText>{t("meta.home.description2")}</HeroText>
          <HeroText>{t("meta.home.description3")}</HeroText>
          <HeroText>{t("meta.home.description4")}</HeroText>
        </div>
      </div>

      <ProductsPage isUserAuthenticated={isUserAuthenticated} />
      <PopularCarousel />
      <ReviewsCarousel reviews={reviews} />
    </>
  );
};

export default MainPage;
