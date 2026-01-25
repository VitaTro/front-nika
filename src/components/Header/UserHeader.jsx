import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { toggleTheme } from "../../redux/themeSlice";
// import UserAvatar from "../UserAvatar/UserAvatar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectAuthUser,
  selectIsUserAuthenticated,
} from "../../redux/auth/userAuth/selectorsAuth";
import { fetchUserMain } from "../../redux/user/userOperations";
import {
  selectAuthError,
  selectAuthLoading,
} from "../../redux/user/userSelectors";

import Logo from "../icons/logo.png";
import Loader from "../Loader";
import {
  Container,
  HamburgerButton,
  HeaderComponent,
  NavItem,
  NavLinkStyled,
  NavList,
  Option,
  Select,
  Slider,
  ThemeIcon,
  ThemeToggle,
  UtilityContainer,
} from "./Header.styled";
import MobileMenuHeader from "./MobileMenuHeader";
const UserHeader = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState("pl");
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { t, i18n } = useTranslation();
  const user = useSelector(selectAuthUser) || {};
  const userData = useSelector((state) => state.user.data);
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      dispatch(toggleTheme());
    }
  }, [dispatch]);
  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(fetchUserMain());
    }
  }, [dispatch, isUserAuthenticated]);
  const handleThemeToggle = () => {
    const newTheme = !isDarkMode;
    dispatch(toggleTheme());
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const changeLanguage = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/main");
  };
  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <HeaderComponent>
        <NavLinkStyled to="user/main">
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "60px",
              height: "60px",
            }}
          />
        </NavLinkStyled>
        {!menuOpen && (
          <HamburgerButton onClick={() => setMenuOpen(true)}>
            <span
              style={{
                fontWeight: 600,
                fontSize: "18px",
                fontFamily: '"Noto Sans", sans-serif',
                color: isDarkMode ? "lightgray" : "darkgray",
                textShadow: isDarkMode
                  ? "0 0 5px rgba(255, 255, 255, 0.8)"
                  : "0 0 5px rgb(167, 182, 208)",
              }}
            >
              ☰ MENU
            </span>
          </HamburgerButton>
        )}

        {/* Меню */}
        <NavList>
          <NavItem>
            <NavLinkStyled
              to="/user/main"
              $isActive={location.pathname === "/user/main"}
            >
              {t("main")}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled
              to={isUserAuthenticated ? "/user/products" : "/products"}
              $isActive={
                location.pathname.startsWith("/products") ||
                location.pathname.startsWith("/user/products")
              }
            >
              {t("products")}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled
              to="/about"
              $isActive={location.pathname === "/about"}
            >
              {t("about")}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled
              to="/user/wishlist"
              $isActive={location.pathname === "/wishlist"}
            >
              {t("wishlist")}
            </NavLinkStyled>
          </NavItem>{" "}
          <NavItem>
            <NavLinkStyled
              to="/user/shopping-cart"
              $isActive={location.pathname === "/shopping-cart"}
            >
              {t("basket")}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/user/profile/info">
              {user.username || t("my_account")}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/" onClick={handleLogout}>
              {t("logout")}
            </NavLinkStyled>
          </NavItem>
        </NavList>

        {!isMobile && (
          <UtilityContainer>
            <ThemeToggle onClick={handleThemeToggle}>
              <Slider isDarkMode={isDarkMode}>
                <ThemeIcon
                  src="https://res.cloudinary.com/dblh78pvc/image/upload/v1741275631/sun_prnb60.jpg"
                  alt="Sun icon"
                  $position="right"
                  $visible={!isDarkMode}
                />
                <ThemeIcon
                  src="https://res.cloudinary.com/dblh78pvc/image/upload/v1741275631/moon_krwywm.jpg"
                  alt="Moon icon"
                  $position="left"
                  $visible={isDarkMode}
                />
              </Slider>
            </ThemeToggle>

            {/* Вибір мови */}
            <Select
              id="language-select"
              value={selectedLanguage}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <Option value="pl">PL</Option>
              <Option value="ua">UA</Option>
              <Option value="en">EN</Option>
              <Option value="de">DE</Option>
            </Select>
          </UtilityContainer>
        )}
      </HeaderComponent>

      <MobileMenuHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isDarkMode={isDarkMode}
        selectedLanguage={selectedLanguage}
        changeLanguage={changeLanguage}
        t={t}
        user={user}
        isUserAuthenticated={isUserAuthenticated}
        handleLogout={handleLogout}
      />
    </Container>
  );
};

export default UserHeader;
