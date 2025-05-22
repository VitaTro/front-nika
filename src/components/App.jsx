import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../redux/GlobalStyles";
import { selectIsAdminAuthenticated } from "../redux/auth/adminAuth/selectorsAdminAuth";
import { selectIsUserAuthenticated } from "../redux/auth/userAuth/selectorsAuth";
import Header from "./Header/Header";
import UserHeader from "./Header/UserHeader";
import "./i18n/i18n";

// 📌 Компоненти
import AboutPage from "../pages/AboutPage";
import MainPage from "../pages/MainPage/MainPage";
import NotFoundPage from "../pages/NotFountPage/NotFoundPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ErrorBoundary from "./ErrorBoundary";
import Footer from "./Footer/Footer";
import Products from "./Products/Products";
import SearchResults from "./SearchBar/SearchResults";
// 📌 Авторизація
import AdminLoginForm from "./AuthForm/AdminAuthForm/AdminLoginForm";
import AdminRegisterForm from "./AuthForm/AdminAuthForm/AdminRegisterForm";
import UserLoginForm from "./AuthForm/UserAuthForm/UserLoginForm";
import UserRegisterForm from "./AuthForm/UserAuthForm/UserRegisterForm";

// 📌 Адмін панель
import AdminLayout from "../pages/AdminDashboard/AdminLayout";
import DashboardTab from "../pages/AdminDashboard/tab/DashboardTab/DashboardTab";
import FinanceOverview from "../pages/AdminDashboard/tab/FinanceTab/FinanceComponent/FinanceOverview";
import FinanceSettings from "../pages/AdminDashboard/tab/FinanceTab/FinanceComponent/FinanceSettings";
import OfflineOrder from "../pages/AdminDashboard/tab/FinanceTab/FinanceComponent/OfflineOrder/OfflineOrder";
import OfflineSale from "../pages/AdminDashboard/tab/FinanceTab/FinanceComponent/OfflineSale/OfflineSale";
import OnlineOrder from "../pages/AdminDashboard/tab/FinanceTab/FinanceComponent/OnlineOrder/OnlineOrder";
import OnlineSale from "../pages/AdminDashboard/tab/FinanceTab/FinanceComponent/OnlineSale/OnlineSale";
import FinanceTab from "../pages/AdminDashboard/tab/FinanceTab/FinanceTab";
import ProductsTab from "../pages/AdminDashboard/tab/ProductsTab/ProductsTab";
import UsersTab from "../pages/AdminDashboard/tab/UsersTab/UsersTab";

// 📌 User панель
import ShoppingCartPage from "../pages/ShoppingCartPage/ShoppingCartPage";
import WishlistPage from "../pages/WishlistPage/WishlistPage";
import ProfilePage from "../pages/profileUser/ProfilePage";

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAdminAuthenticated = useSelector(selectIsAdminAuthenticated);
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const theme = { isDarkMode };

  // 🔹 Лог для перевірки стану користувача
  useEffect(() => {
    console.log("🔎 isUserAuthenticated:", isUserAuthenticated);
  }, [isUserAuthenticated]);

  // ✅ Зберігаємо останню сторінку в `localStorage`
  useEffect(() => {
    localStorage.setItem("lastPage", location.pathname);
  }, [location.pathname]);

  // ✅ При перезапуску — повертаємо користувача на його останню сторінку
  useEffect(() => {
    const lastPage = localStorage.getItem("lastPage");
    if (lastPage && lastPage !== location.pathname) {
      navigate(lastPage);
    }
  }, [navigate, location.pathname]);
  useEffect(() => {
    console.log("🔎 isUserAuthenticated після logout:", isUserAuthenticated);
  }, [isUserAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ErrorBoundary>
        {/* 📌 Динамічний хедер */}
        {isUserAuthenticated ? <UserHeader /> : <Header />}

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/products"
            element={<Products type="all" isGuestMode={!isUserAuthenticated} />}
          />
          <Route path="/products/gold" element={<Products type="gold" />} />
          <Route path="/products/silver" element={<Products type="silver" />} />
          <Route path="/products/set" element={<Products type="set" />} />
          <Route path="/products/box" element={<Products type="box" />} />
          <Route path="/products/:type" element={<ProductsPage />} />

          {/* Авторизація */}
          <Route path="/user/auth/register" element={<UserRegisterForm />} />
          <Route path="/admin/auth/register" element={<AdminRegisterForm />} />
          {isUserAuthenticated ? (
            <>
              <Route path="/user/wishlist" element={<WishlistPage />} />
              <Route
                path="/user/shopping-cart"
                element={<ShoppingCartPage />}
              />
              <Route path="/user/profile/info" element={<ProfilePage />} />
            </>
          ) : (
            <Route path="/user/auth/login" element={<UserLoginForm />} />
          )}
          {/* 📌 Захищена адмін панель */}
          {isAdminAuthenticated ? (
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="users" element={<UsersTab />} />
              <Route path="products" element={<ProductsTab />} />
              <Route path="dashboard" element={<DashboardTab />} />
              <Route path="finance" element={<FinanceTab />}>
                <Route path="offlineOrder" element={<OfflineOrder />} />
                <Route path="offlineSale" element={<OfflineSale />} />
                <Route path="onlineOrder" element={<OnlineOrder />} />
                <Route path="onlineSale" element={<OnlineSale />} />
                <Route path="overview" element={<FinanceOverview />} />
                <Route path="settings" element={<FinanceSettings />} />
              </Route>
            </Route>
          ) : (
            <Route path="/admin/auth/login" element={<AdminLoginForm />} />
          )}

          {/* 📌 Сторінка 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>

      {/* ✅ Футер, якщо користувач не на адмін панелі */}
      {!location.pathname.startsWith("/admin") && <Footer />}
    </ThemeProvider>
  );
};
