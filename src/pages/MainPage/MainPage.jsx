import React from "react";
import Header from "../../components/Header/Header";
import HoursOfWork from "./hours_of_work.png";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ProductsPage from "../ProductsPage/ProductsPage";
import { ImageWork } from "./MainPage.styled";

const MainPage = () => {
  const { t } = useTranslation();
  const userName = useSelector((state) => state.auth.userName); // Ім'я користувача з Redux
  const userRole = useSelector((state) => state.auth.role); // Роль користувача

  return (
    <>
      <Header />
      {/* image */}
      <ImageWork src={HoursOfWork} alt="hours of work" />
      <ProductsPage />
    </>
  );
};

export default MainPage;
