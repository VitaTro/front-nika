import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Products from "../components/Products/Products";
import useGlobalNavigation from "../hooks/useGlobalNavigation";
import useGlobalPagination from "../hooks/useGlobalPagination";
import AboutPage from "../pages/AboutPage";
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
import HomePage from "../pages/HomePage/HomePage";
import MainPage from "../pages/MainPage/MainPage";
import { NotFoundPage } from "../pages/NotFountPage/NotFoundPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ShoppingCartPage from "../pages/ShoppingCartPage/ShoppingCartPage";
import WishlistPage from "../pages/WishlistPage/WishlistPage";
import { GlobalStyles } from "../redux/GlobalStyles";
import { selectIsAdminAuthenticated } from "../redux/auth/adminAuth/selectorsAdminAuth";
import { selectIsUserAuthenticated } from "../redux/auth/userAuth/selectorsAuth";
import AdminLoginForm from "./AuthForm/AdminAuthForm/AdminLoginForm";
import AdminRegisterForm from "./AuthForm/AdminAuthForm/AdminRegisterForm";
import UserLoginForm from "./AuthForm/UserAuthForm/UserLoginForm";
import UserRegisterForm from "./AuthForm/UserAuthForm/UserRegisterForm";
import Footer from "./Footer/Footer";
import SearchResults from "./SearchBar/SearchResults";
import "./i18n/i18n";

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminAuthenticated = useSelector(selectIsAdminAuthenticated);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const theme = { isDarkMode };
  const isUserAuthenticated = useSelector((state) =>
    state.auth ? selectIsUserAuthenticated(state) : false
  );

  useGlobalNavigation();
  const { currentPage, handlePageChange } = useGlobalPagination();

  // ✅ Зберігаємо останню відвідану сторінку у `localStorage`
  useEffect(() => {
    localStorage.setItem("lastPage", location.pathname);
  }, [location.pathname]);

  // ✅ При запуску отримуємо збережену сторінку та перенаправляємо користувача
  useEffect(() => {
    const lastPage = localStorage.getItem("lastPage");
    if (lastPage && lastPage !== location.pathname) {
      navigate(lastPage);
    }
  }, [navigate, location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />{" "}
        {/* 🔥 Переконатися, що тут маршрут є */}
        <Route path="/products" element={<Products type="all" />} />
        <Route path="/products/:type" element={<ProductsPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Маршрути для автентифікації */}
        <Route path="/user/auth/login" element={<UserLoginForm />} />
        <Route path="/user/auth/register" element={<UserRegisterForm />} />
        <Route path="/admin/auth/register" element={<AdminRegisterForm />} />
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
        <Route path="*" element={<NotFoundPage />} />{" "}
      </Routes>

      {!location.pathname.startsWith("/admin") && <Footer />}
    </ThemeProvider>
  );
};
