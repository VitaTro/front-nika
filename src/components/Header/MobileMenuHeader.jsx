import React from "react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice";
import {
  CloseButton,
  MobileMenu,
  MobileUtilityContainer,
  NavItem,
  NavLinkStyledMObile,
  Option,
  Select,
  Slider,
  ThemeIcon,
  ThemeToggle,
} from "./Header.styled";

const MobileMenuHeader = ({
  menuOpen,
  setMenuOpen,
  isDarkMode,
  selectedLanguage,
  changeLanguage,
  t,
}) => {
  const dispatch = useDispatch();

  return (
    <MobileMenu
      style={{
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "gray" : "#E0E0E0",
        transition: "background-color 0.3s ease-in-out",
      }}
      $isOpen={menuOpen}
      className="mobile-menu"
      onClick={(e) => e.stopPropagation()} // Запобігаємо закриттю при кліку всередині
    >
      <CloseButton
        style={{
          color: isDarkMode ? "green" : "black",
          transition: "color 0.3s ease-in-out",
        }}
        onClick={() => setMenuOpen(false)}
      >
        ×
      </CloseButton>
      <MobileUtilityContainer>
        <ThemeToggle onClick={() => dispatch(toggleTheme())}>
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
      </MobileUtilityContainer>
      <NavItem>
        <NavLinkStyledMObile
          to="/products"
          onClick={() => setMenuOpen(false)}
          style={{
            color: isDarkMode ? "#E0E0E1" : "gray",
          }}
        >
          {t("products")}
        </NavLinkStyledMObile>
      </NavItem>
      <NavItem>
        <NavLinkStyledMObile
          to="/wishlist"
          onClick={() => setMenuOpen(false)}
          style={{
            color: isDarkMode ? "#E0E0E1" : "gray",
          }}
        >
          {t("wishlist")}
        </NavLinkStyledMObile>
      </NavItem>
      <NavItem>
        <NavLinkStyledMObile
          to="/about"
          onClick={() => setMenuOpen(false)}
          style={{
            color: isDarkMode ? "#E0E0E1" : "gray",
          }}
        >
          {t("about")}
        </NavLinkStyledMObile>
      </NavItem>
      <NavItem>
        <NavLinkStyledMObile
          to="/shopping-cart"
          onClick={() => setMenuOpen(false)}
          style={{
            color: isDarkMode ? "#E0E0E1" : "gray",
          }}
        >
          {t("basket")}
        </NavLinkStyledMObile>
      </NavItem>
      <NavItem>
        <NavLinkStyledMObile
          to="/user/profile"
          onClick={() => setMenuOpen(false)}
          style={{
            color: isDarkMode ? "#E0E0E1" : "gray",
          }}
        >
          {t("user")}
        </NavLinkStyledMObile>
      </NavItem>
    </MobileMenu>
  );
};

export default MobileMenuHeader;
