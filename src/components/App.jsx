import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Products from "../components/Products/Products";
import AboutPage from "../pages/AboutPage";
import AdminLayout from "../pages/AdminDashboard/AdminLayout";
import OrderOffline from "../pages/AdminDashboard/Finance/OrderOffline";
import OrdersPage from "../pages/AdminDashboard/Finance/OrdersPage";
import OverviewFinancePage from "../pages/AdminDashboard/Finance/OverviewFinancePage";
import SalesPage from "../pages/AdminDashboard/Finance/SalesPage";
import DashboardTab from "../pages/AdminDashboard/tab/DashboardTab";
import FinanceTab from "../pages/AdminDashboard/tab/FinanceTab";
import ProductsTab from "../pages/AdminDashboard/tab/ProductsTab";
import UsersTab from "../pages/AdminDashboard/tab/UsersTab";
import HomePage from "../pages/HomePage/HomePage";
import MainPage from "../pages/MainPage/MainPage";
import { NotFoundPage } from "../pages/NotFountPage/NotFoundPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ShoppingCartPage from "../pages/ShoppingCartPage/ShoppingCartPage";
import WishlistPage from "../pages/WishlistPage/WishlistPage";
import { GlobalStyles } from "../redux/GlobalStyles";
import AuthFormLogin from "./AuthForm/AuthFormLogin";
import AuthFormRegister from "./AuthForm/AuthFormRegister";
import ErrorBoundary from "./ErrorBoundary";
import Footer from "./Footer/Footer";
import SearchResults from "./SearchBar/SearchResults";
import "./i18n/i18n";

export const App = () => {
  const location = useLocation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const theme = {
    isDarkMode,
  };

  // Перевіряємо, чи поточний маршрут є частиною адмінської панелі
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
          {/* Products */}
          <Route path="/products" element={<Products type="all" />} />
          <Route path="/products/gold" element={<Products type="gold" />} />
          <Route path="/products/silver" element={<Products type="silver" />} />
          <Route path="/products/set" element={<Products type="set" />} />
          <Route path="/products/box" element={<Products type="box" />} />
          <Route path="/products/:type" element={<ProductsPage />} />
          <Route
            path="/search"
            element={
              <ErrorBoundary>
                <SearchResults />
              </ErrorBoundary>
            }
          />
          {/* Маршрути для Auth */}
          <Route path="/auth/login" element={<AuthFormLogin />} />
          <Route
            path="/auth/register/user"
            element={<AuthFormRegister isAdmin={false} />}
          />
          <Route
            path="/auth/register/admin"
            element={<AuthFormRegister isAdmin={true} />}
          />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route
            path="/shopping-cart"
            element={
              <ErrorBoundary>
                <ShoppingCartPage />
              </ErrorBoundary>
            }
          />
          {/* Маршрути для Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<UsersTab />} />
            <Route path="products" element={<ProductsTab />} />
            <Route path="dashboard" element={<DashboardTab />} />
            <Route path="finance" element={<FinanceTab />}>
              <Route path="orders" element={<OrdersPage />} />
              <Route path="sale" element={<SalesPage />} />
              <Route path="overview" element={<OverviewFinancePage />} />
              <Route path="offline" element={<OrderOffline />} />
            </Route>
          </Route>
          {/* Інші маршрути */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Відображаємо футер лише для не-адмінських сторінок */}
        {!isAdminPage && <Footer />}
      </>
    </ThemeProvider>
  );
};
