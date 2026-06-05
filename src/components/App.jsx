import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { GlobalStyles } from "../redux/GlobalStyles";
import { selectIsAdminAuthenticated } from "../redux/auth/adminAuth/selectorsAdminAuth";
import {
  selectAuthUser,
  selectIsLoggedIn,
} from "../redux/auth/userAuth/selectorsAuth";
import { Wrapper } from "./App.styled";
import "./i18n/i18n";
// 📌 Компоненти
import Header from "../components/Header/Header";
import UserHeader from "../components/Header/UserHeader";
import AboutPage from "../pages/About/AboutPage";
import MainPage from "../pages/MainPage/MainPage";
import NotFoundPage from "../pages/NotFountPage/NotFoundPage";
import ErrorBoundary from "./ErrorBoundary";
import Footer from "./Footer/Footer";
import Products from "./Products/Products";
import ScrollToTop from "./ScrollTop";
import SearchResults from "./SearchBar/SearchResults";
// 📌 Авторизація
import AdminLoginForm from "./AuthForm/AdminAuthForm/AdminLoginForm";
import AdminRegisterForm from "./AuthForm/AdminAuthForm/AdminRegisterForm";
import ForgotPassword from "./AuthForm/UserAuthForm/ForgotPassword";
import UserLoginForm from "./AuthForm/UserAuthForm/UserLoginForm";
import UserRegisterForm from "./AuthForm/UserAuthForm/UserRegisterForm";
// 📌 Адмін панель
import AdminLayout from "../pages/AdminDashboard/AdminLayout";
import DashboardTab from "../pages/AdminDashboard/tab/DashboardTab/DashboardTab";
import FinanceOverview from "../pages/AdminDashboard/tab/FinanceTab/FinanceComponent/FinanceOverview";
import FinanceSettings from "../pages/AdminDashboard/tab/FinanceTab/FinanceComponent/FinanceSettings";

import FinanceTab from "../pages/AdminDashboard/tab/FinanceTab/FinanceTab";
import StockMovementTab from "../pages/AdminDashboard/tab/InventoryTab/StockMovement/StockMovementTab";
import ProductsTab from "../pages/AdminDashboard/tab/ProductsTab/ProductsTab";
import UsersTab from "../pages/AdminDashboard/tab/UsersTab/UsersTab";
// 📌 User панель
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { usePageView } from "../hooks/usePageView";
import InventoryLayout from "../pages/AdminDashboard/InventoryLayout";
import OfflineOrder from "../pages/AdminDashboard/tab/FinanceTab/OrderTab/OfflineOrder/OfflineOrder";
import OnlineOrder from "../pages/AdminDashboard/tab/FinanceTab/OrderTab/OnlineOrder/OnlineOrder";
import OrderTab from "../pages/AdminDashboard/tab/FinanceTab/OrderTab/OrderTab";
import ProfileOrder from "../pages/AdminDashboard/tab/FinanceTab/OrderTab/ProfileOrder/ProfileOrder";
import OfflineSale from "../pages/AdminDashboard/tab/FinanceTab/SalesTab/OfflineSale/OfflineSale";
import OnlineSale from "../pages/AdminDashboard/tab/FinanceTab/SalesTab/OnlineSale/OnlineSale";
import ProfileSale from "../pages/AdminDashboard/tab/FinanceTab/SalesTab/ProfileSale/ProfileSale";
import SaleTab from "../pages/AdminDashboard/tab/FinanceTab/SalesTab/SalesTab";
import MonthlyReportPage from "../pages/AdminDashboard/tab/InventoryTab/MonthlyReport/MonthlyReportPage";
import PurchaseImport from "../pages/AdminDashboard/tab/InventoryTab/StockMovement/tab/PurchaseImport";
import DataDeletion from "../pages/DataDeletion";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import UserOrderPage from "../pages/ProfileUser/OrderPage";
import ProfilePage from "../pages/ProfileUser/ProfilePage";
import ShoppingCartPage from "../pages/ShoppingCartPage/ShoppingCartPage";
import WishlistPage from "../pages/WishlistPage/WishlistPage";
import { checkAdminSession } from "../redux/auth/adminAuth/operationsAdminAuth";
import { checkUserSession } from "../redux/auth/userAuth/operationAuth";
import CookieConsent from "./Cookies/CookieConsent";
import CookiesPolicy from "./Policy/CookiesPolicy";
import PaymentPolicy from "./Policy/PaymentPolicy";
import PrivacyPolicy from "./Policy/PrivacyPolicy";
import ReturnsPolicy from "./Policy/ReturnsPolicy";
import TermsPolicy from "./Policy/TermsPolicy.jsx";
import ProtectedRoute from "./ProtectedRoute";
import UserSingleOrder from "./UserDashboard/OrderPlace/orderUser/UserSingleOrder.jsx";

export const App = () => {
  const location = useLocation();
  usePageView(location.pathname);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isAdminAuthenticated = useSelector(selectIsAdminAuthenticated);
  const user = useSelector(selectAuthUser) || {};
  const isUserAuthenticated = useSelector(selectIsLoggedIn);
  const isAdminPage = location.pathname.startsWith("/admin");

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const theme = { isDarkMode };
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const isAuthPage = [
    "/user/auth/login",
    "/user/auth/register",
    "/admin/auth/login",
    "/admin/auth/register",
    "/user/auth/reset-password",
  ].some((route) => location.pathname.startsWith(route));
  useEffect(() => {
    dispatch(checkAdminSession());
  }, []);
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);
  const handleGoogleCallback = async (response) => {
    try {
      const res = await fetch(
        "https://nika-gold-back-fe0ff35469d7.herokuapp.com/api/user/auth/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ credential: response.credential }),
        },
      );

      const data = await res.json();

      if (!data.user) return;

      dispatch(checkUserSession());
      // navigate("/user/main");
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  const { promptGoogle } = useGoogleLogin(
    GOOGLE_CLIENT_ID,
    handleGoogleCallback,
  );

  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <GlobalStyles />
      <ToastContainer position="top-right" autoClose={3000} />
      <Wrapper>
        <ErrorBoundary>
          {/* ✅ Хедер не рендериться на сторінках логіну/реєстрації */}
          {/* {!isAdminAuthenticated &&
            !isAuthPage &&
            (isUserAuthenticated ? <UserHeader /> : <Header />)} */}
          {/* {!isAdminAuthenticated &&
            !isAuthPage &&
            (isUserAuthenticated && user?.username ? (
              isMobile ? (
                <MobileMenuHeader user={user} />
              ) : (
                <UserHeader />
              )
            ) : (
              <Header />
            ))} */}
          {!isAdminPage &&
            (isUserAuthenticated ? (
              <UserHeader />
            ) : (
              <Header promptGoogle={promptGoogle} />
            ))}

          <main>
            <Routes>
              {/* Авторизація */}
              <Route
                path="/user/auth/register"
                element={<UserRegisterForm />}
              />
              <Route
                path="/admin/auth/register"
                element={<AdminRegisterForm />}
              />
              <Route path="/user/auth/login" element={<UserLoginForm />} />
              <Route path="/admin/auth/login" element={<AdminLoginForm />} />
              <Route
                path="/user/auth/reset-password"
                element={<ForgotPassword />}
              />

              {/* Інші маршрути */}
              <Route path="/" element={<MainPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/policy-payment" element={<PaymentPolicy />} />
              <Route path="/policy-cookies" element={<CookiesPolicy />} />
              <Route path="/policy-privacy" element={<PrivacyPolicy />} />
              <Route path="/policy-returns" element={<ReturnsPolicy />} />
              <Route path="/policy-terms" element={<TermsPolicy />} />
              <Route path="/data-deletion" element={<DataDeletion />} />

              <Route
                path="/guest-cart"
                element={<ShoppingCartPage promptGoogle={promptGoogle} />}
              />
              <Route path="/guest-wishlist" element={<WishlistPage />} />
              <Route
                path="/products"
                element={
                  <Products type="all" isGuestMode={!isUserAuthenticated} />
                }
              />
              <Route path="/products/gold" element={<Products type="gold" />} />
              <Route
                path="/products/goldLight"
                element={<Products type="goldLight" />}
              />
              <Route
                path="/products/silver"
                element={<Products type="silver" />}
              />
              <Route path="/products/set" element={<Products type="set" />} />
              <Route
                path="/products/handmade"
                element={<Products type="handmade" />}
              />

              <Route path="/products/box" element={<Products type="box" />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/products/:type" element={<Products />} />

              {/* Захищена user панель */}
              {isUserAuthenticated ? (
                <Route element={<ProtectedRoute />}>
                  <Route path="/user/main" element={<MainPage />} />
                  <Route path="/user/wishlist" element={<WishlistPage />} />
                  <Route
                    path="/user/shopping-cart"
                    element={<ShoppingCartPage />}
                  />
                  <Route path="/user/orders" element={<UserOrderPage />} />
                  <Route
                    path="/user/orders/:orderId"
                    element={<UserSingleOrder />}
                  />
                  <Route path="/user/profile/info" element={<ProfilePage />} />
                  <Route
                    path="/user/products/:id"
                    element={<ProductDetailsPage />}
                  />
                  <Route
                    path="/user/products"
                    element={<Products type="all" />}
                  />
                  <Route
                    path="/user/products/gold"
                    element={<Products type="gold" />}
                  />
                  <Route
                    path="/user/products/goldLight"
                    element={<Products type="goldLight" />}
                  />
                  <Route
                    path="/user/products/silver"
                    element={<Products type="silver" />}
                  />{" "}
                  <Route
                    path="/user/products/set"
                    element={<Products type="set" />}
                  />{" "}
                  <Route
                    path="/user/products/box"
                    element={<Products type="box" />}
                  />{" "}
                  <Route
                    path="/user/products/handmade"
                    element={<Products type="handmade" />}
                  />{" "}
                  <Route path="/user/products/:type" element={<Products />} />
                </Route>
              ) : (
                <Route path="/user/auth/login" element={<UserLoginForm />} />
              )}
              {/* Захищена адмін панель */}
              {isAdminAuthenticated ? (
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="users" element={<UsersTab />} />
                  <Route path="products" element={<ProductsTab />} />
                  <Route path="dashboard" element={<DashboardTab />} />
                  <Route path="finance" element={<FinanceTab />}>
                    <Route path="orders" element={<OrderTab />}>
                      <Route path="offline" element={<OfflineOrder />} />
                      <Route path="online" element={<OnlineOrder />} />
                      <Route path="profile" element={<ProfileOrder />} />
                    </Route>
                    <Route path="sales" element={<SaleTab />}>
                      <Route path="offline" element={<OfflineSale />} />
                      <Route path="online" element={<OnlineSale />} />
                      <Route path="profile" element={<ProfileSale />} />
                    </Route>
                    <Route path="overview" element={<FinanceOverview />} />
                    <Route path="settings" element={<FinanceSettings />} />
                  </Route>
                  <Route path="stock" element={<InventoryLayout />}>
                    <Route path="movement" element={<StockMovementTab />} />
                    <Route path="movement/bulk" element={<PurchaseImport />} />
                    <Route
                      path="monthly-report"
                      element={<MonthlyReportPage />}
                    />
                  </Route>
                </Route>
              ) : null}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </ErrorBoundary>
        {!isAdminAuthenticated && !isAuthPage && <Footer />}
      </Wrapper>
      <CookieConsent />
    </ThemeProvider>
  );
};
