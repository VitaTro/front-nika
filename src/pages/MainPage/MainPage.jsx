import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import BannerCarousel from "../../components/BannerCarousel/BannerCarousel";
import Loader from "../../components/Loader";
import PopularCarousel from "../../components/PopularCarousel/PopularCarousel";
import ReviewsCarousel from "../../components/ReviewsCarousel/ReviewsCarousel";
import ProductsPage from "../ProductsPage/ProductsPage";

import { reviews } from "../../data/reviews";
import { fetchPublicMain } from "../../redux/main/mainOperations";
import { fetchUserMain } from "../../redux/user/userOperations";
import { selectWishlistProducts } from "../../redux/wishlist/selectorsWishlist";

import { HomeSeoText, HomeTitle } from "./MainPage.styled";

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

      <HomeTitle>{t("meta.home.description")}</HomeTitle>

      <ProductsPage isUserAuthenticated={isUserAuthenticated} />
      <PopularCarousel />
      <ReviewsCarousel reviews={reviews} />

      <HomeSeoText>
        <p>{/* тут буде текст, який я напишу для тебе */}</p>
      </HomeSeoText>
    </>
  );
};

export default MainPage;
