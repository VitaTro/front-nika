import React from "react";
import Header from "../../components/Header/Header";
import SliderWelcome from "../../components/Slider/SliderWelcome";
import ProductsPage from "../ProductsPage/ProductsPage";
ProductsPage;
const MainPage = () => {
  // const { t } = useTranslation();
  // const userName = useSelector((state) => state.auth.userName); // Ім'я користувача з Redux
  // const userRole = useSelector((state) => state.auth.role); // Роль користувача

  return (
    <>
      <Header />
      <SliderWelcome />
      <ProductsPage />
    </>
    // <WelcomeContainer>
    //   <WelcomeMessage>
    //     {t("welcome_back")}, {userName || t("user")}!
    //   </WelcomeMessage>
    //   <InfoContainer>
    //     <p>
    //       {t("role")}: {userRole || t("standard_user")}
    //     </p>
    //     <p>{t("explore_dashboard")}</p>
    //   </InfoContainer>
    // </WelcomeContainer>
  );
};

export default MainPage;
