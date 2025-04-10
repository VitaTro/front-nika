import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
// import Products from "../components/Products/Products";
// import { AboutPage } from "../pages/AboutPage";
import HomePage from "../pages/HomePage/HomePage";
// import MainPage from "../pages/MainPage/MainPage";
// import { NotFoundPage } from "../pages/NotFountPage/NotFoundPage";
// import ProductsPage from "../pages/ProductsPage/ProductsPage";
// import ShoppingCartPage from "../pages/ShoppingCartPage";
// import WishlistPage from "../pages/WishlistPage";
import { GlobalStyles } from "../redux/GlobalStyles";
// import AuthFormLogin from "./AuthForm/AuthFormLogin";
// import AuthFormRegister from "./AuthForm/AuthFormRegister";
// import Footer from "./Footer/Footer";
// import "./i18n/i18n";

export const App = () => {
  const location = useLocation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const theme = {
    isDarkMode,
  };
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/main" element={<MainPage />} /> */}
          // {/* Products */}
          {/* <Route path="/products" element={<Products type="all" />} />
  //         {/* Додано маршрут для всіх продуктів */}
          {/* <Route path="/products/gold" element={<Products type="gold" />} />
         <Route path="/products/silver" element={<Products type="silver" />} />
         <Route path="/products/set" element={<Products type="set" />} />
        <Route path="/products/box" element={<Products type="box" />} />
         <Route path="/products/:type" element={<ProductsPage />} />
         <Route path="/products/:id/details" element={<ProductDetails />} />
         <Route path="/products/popular" element={<ProductsPage popular />} />
          <Route path="/products/search" element={<ProductsPage search />} />
        <Route path="/products/filters" element={<ProductsPage filters />} /> */}
          {/* Маршрути для Auth */}
          {/* <Route path="/auth/login" element={<AuthFormLogin />} />
           <Route
            path="/auth/register/user"
            element={<AuthFormRegister isAdmin={false} />}
          /> */}
          {/* <Route
            path="/auth/register/admin"
            element={<AuthFormRegister isAdmin={true} />}
          />
          {/* Маршрути для User */}
          {/* <Route path="/user/wishlist" element={<WishlistPage />} />
          <Route path="/user/shopping-cart" element={<ShoppingCartPage />} /> */}
          {/* <Route path="/user/profile" element={<UserProfilePage />} />

        <Route path="/user/purchase-history" element={<WishlistPage />} />

        {/* Маршрути для Admin */}
          {/* <Route path="/admin/dashboard" element={<AdminDashboardPage />} /> */}
          {/* Інші маршрути */}
          {/* <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
        {/* <Footer /> */}
      </>
    </ThemeProvider>
  );
  // return <div>Hello</div>;
};
