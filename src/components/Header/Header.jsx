import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { toggleTheme } from "../../redux/themeSlice";
import UserAvatar from "../UserAvatar/UserAvatar";
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

import { useLocation } from "react-router-dom";
import MobileMenuHeader from "./MobileMenuHeader";

const Header = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState("pl");
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      dispatch(toggleTheme()); // Встановлюємо темну тему
    }
  }, [dispatch]);

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode; // Перемикання теми
    dispatch(toggleTheme()); // Оновлюємо стан Redux
    localStorage.setItem("theme", newTheme ? "dark" : "light"); // Зберігаємо тему
  };

  const changeLanguage = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };
  return (
    <Container>
      <HeaderComponent>
        {/* Логотип */}
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

        {/* Гамбургер-кнопка */}
        <HamburgerButton onClick={() => setMenuOpen(!menuOpen)}>
          <div style={{ backgroundColor: isDarkMode ? "#0c0" : "#333" }} />
          <div style={{ backgroundColor: isDarkMode ? "#0c0" : "#333" }} />
          <div style={{ backgroundColor: isDarkMode ? "#0c0" : "#333" }} />
        </HamburgerButton>

        {/* Меню */}
        <NavList>
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
              to="/wishlist"
              $isActive={location.pathname === "/wishlist"}
            >
              {t("wishlist")}
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
              to="/shopping-cart"
              $isActive={location.pathname === "/shopping-cart"}
            >
              {t("basket")}
            </NavLinkStyled>
          </NavItem>
        </NavList>

        {/* Utility: Теми та мови */}
        {!isMobile && (
          <UtilityContainer>
            <UserAvatar />
            {/* Перемикач теми */}
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
        t={t}
      />
    </Container>
  );
};
export default Header;
