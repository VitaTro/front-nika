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
import { fetchUserMain } from "../../redux/user/userOperations";
import {
  selectAuthError,
  selectAuthLoading,
} from "../../redux/user/userSelectors";

import Loader from "../Loader";
import {
  Container,
  HamburgerButton,
  HeaderComponent,
  LogoImage,
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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      dispatch(toggleTheme());
    }
  }, [dispatch]);
  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(fetchUserMain()); // 🔹 Запит до `/api/user/main`
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
          <LogoImage
            src={
              isDarkMode
                ? "https://res.cloudinary.com/dblh78pvc/image/upload/v1733218509/logoDark_d2zgpc.png"
                : "https://res.cloudinary.com/dblh78pvc/image/upload/v1733218461/logoLigth_zer4gb.png"
            }
            alt="My brand logo"
          />
        </NavLinkStyled>

        <HamburgerButton
          $isOpen={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div style={{ backgroundColor: isDarkMode ? "#0c0" : "#333" }} />
          <div style={{ backgroundColor: isDarkMode ? "#0c0" : "#333" }} />
          <div style={{ backgroundColor: isDarkMode ? "#0c0" : "#333" }} />
        </HamburgerButton>

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
          {/* {isUserAuthenticated ? (
            <>
              <NavItem>
                <NavLinkStyled
                  to="/wishlist"
                  $isActive={location.pathname === "/wishlist"}
                >
                  {t("wishlist")}
                </NavLinkStyled>
              </NavItem>{" "}
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
          ) : (
            <NavItem>
              <NavLinkStyled to="/user/auth/login">{t("login")}</NavLinkStyled>
            </NavItem>
          )} */}
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
