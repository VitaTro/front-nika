import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { toggleTheme } from "../../redux/themeSlice";
import SocialLoginModal from "../AuthForm/UserAuthForm/SocialLoginModal";
// import UserAvatar from "../UserAvatar/UserAvatar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectAuthUser,
  selectIsUserAuthenticated,
} from "../../redux/auth/userAuth/selectorsAuth";
import {
  selectGuestCart,
  selectGuestCartCount,
} from "../../redux/guest/shopping/guestShoppingSelectors";
import { selectGuestWishlist } from "../../redux/guest/wishlist/guestWishlistSelectors";
import { fetchUserMain } from "../../redux/user/userOperations";
import {
  selectAuthError,
  selectAuthLoading,
} from "../../redux/user/userSelectors";
import Logo from "../icons/logo.png";
import Moon from "../icons/moon.png";
import Sun from "../icons/sun.png";
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
const Header = () => {
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const guestCart = useSelector(selectGuestCart);
  const guestWishlist = useSelector(selectGuestWishlist);
  const guestCartCount = useSelector(selectGuestCartCount);
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
  // useEffect(() => {
  //   if (isUserAuthenticated) {
  //     dispatch(fetchUserInfo()); // ✅ Завантажуємо дані користувача після входу
  //   }
  // }, [dispatch, isUserAuthenticated]);

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
        <NavLinkStyled to="/main">
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "60px",
              height: "60px",
            }}
          />
        </NavLinkStyled>

        {/* <HamburgerButton
          $isOpen={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div style={{ backgroundColor: isDarkMode ? "#0c0" : "#333" }} />
          <div style={{ backgroundColor: isDarkMode ? "#0c0" : "#333" }} />
          <div style={{ backgroundColor: isDarkMode ? "#0c0" : "#333" }} />
        </HamburgerButton> */}
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
            <NavLinkStyled to="/main" $isActive={location.pathname === "/main"}>
              {t("main")}
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled
              to="/products"
              $isActive={location.pathname === "/products"}
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

          {!isUserAuthenticated && (
            <>
              <NavItem>
                <NavLinkStyled
                  to="/guest-wishlist"
                  $isActive={location.pathname === "/guest-wishlist"}
                >
                  {t("wishlist")} ({guestWishlist.length})
                </NavLinkStyled>
              </NavItem>

              {/* <NavItem>
                <NavLinkStyled
                  to="/guest-cart"
                  $isActive={location.pathname === "/guest-cart"}
                >
                  {t("basket")} ({guestCartCount})
                </NavLinkStyled>
              </NavItem> */}
            </>
          )}
          {isUserAuthenticated && (
            <>
              <NavItem>
                <NavLinkStyled
                  to="/wishlist"
                  $isActive={location.pathname === "/wishlist"}
                >
                  {t("wishlist")}
                </NavLinkStyled>
              </NavItem>

              <NavItem>
                <NavLinkStyled
                  to="/shopping-cart"
                  $isActive={location.pathname === "/shopping-cart"}
                >
                  {t("basket")}
                </NavLinkStyled>
              </NavItem>

              <NavItem>
                <NavLinkStyled to="/profile">
                  {user.username || t("my_account")}
                </NavLinkStyled>
              </NavItem>

              <NavItem>
                <NavLinkStyled to="/" onClick={handleLogout}>
                  {t("logout")}
                </NavLinkStyled>
              </NavItem>
            </>
          )}

          <NavItem>
            <NavLinkStyled
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setShowLoginModal(true);
              }}
            >
              {t("login")}
            </NavLinkStyled>
          </NavItem>
        </NavList>

        {!isMobile && (
          <UtilityContainer>
            <ThemeToggle onClick={handleThemeToggle}>
              <Slider isDarkMode={isDarkMode}>
                <ThemeIcon
                  src={Sun}
                  alt="Sun icon"
                  $position="right"
                  $visible={!isDarkMode}
                />
                <ThemeIcon
                  src={Moon}
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
      {/* Пошук знизу */}
      {/* <SearchContainer>
        <SearchBar onSearch={(query) => console.log("Searching for:", query)} />
      </SearchContainer> */}

      {/* Мобільне меню */}
      <MobileMenuHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isDarkMode={isDarkMode}
        selectedLanguage={selectedLanguage}
        changeLanguage={changeLanguage}
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        t={t}
        // isUserAuthenticated={isUserAuthenticated}
        user={user}
        handleLogout={handleLogout}
      />
      <>
        {showLoginModal && (
          <SocialLoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </>
    </Container>
  );
};
export default Header;
