import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleTheme } from "../../redux/themeSlice";

import { useState } from "react";
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
  user,
  isUserAuthenticated,
  isAuthPage,
  menuOpen,
  setMenuOpen,
  isDarkMode,
  selectedLanguage,
  changeLanguage,
  t,
  handleLogout,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <MobileMenu
      style={{
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "gray" : "#E0E0E0",
        transition: "background-color 0.3s ease-in-out",
      }}
      $isOpen={menuOpen}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseButton onClick={() => setMenuOpen(false)}>×</CloseButton>

      {/* 🔹 Тема + мова */}
      <MobileUtilityContainer>
        <ThemeToggle onClick={() => dispatch(toggleTheme())}>
          <Slider isDarkMode={isDarkMode}>
            <ThemeIcon
              src="https://res.cloudinary.com/dblh78pvc/image/upload/v1741275631/sun_prnb60.jpg"
              alt="Sun icon"
            />
            <ThemeIcon
              src="https://res.cloudinary.com/dblh78pvc/image/upload/v1741275631/moon_krwywm.jpg"
              alt="Moon icon"
            />
          </Slider>
        </ThemeToggle>
        <Select
          value={selectedLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <Option value="pl">PL</Option>
          <Option value="ua">UA</Option>
          <Option value="en">EN</Option>
          <Option value="de">DE</Option>
        </Select>
      </MobileUtilityContainer>

      {isUserAuthenticated && (
        <>
          <NavItem>
            <NavLinkStyledMObile
              to="/user/profile/info"
              onClick={() => setMenuOpen(false)}
            >
              {user.username || t("my_account")}
            </NavLinkStyledMObile>
          </NavItem>
        </>
      )}
      <NavItem>
        <NavLinkStyledMObile
          to="/main"
          $isActive={location.pathname === "/main"}
          onClick={() => setMenuOpen(false)}
        >
          {t("main")}
        </NavLinkStyledMObile>
      </NavItem>
      <NavItem>
        <NavLinkStyledMObile
          to="/products"
          $isActive={
            location.pathname === "/products" ||
            location.pathname === "/user/products"
          }
          onClick={() => setMenuOpen(false)}
        >
          {t("products")}
        </NavLinkStyledMObile>
      </NavItem>
      <NavItem>
        <NavLinkStyledMObile
          to="/about"
          $isActive={location.pathname === "/about"}
          onClick={() => setMenuOpen(false)}
        >
          {t("about")}
        </NavLinkStyledMObile>
      </NavItem>

      {isUserAuthenticated && (
        <>
          <NavItem>
            <NavLinkStyledMObile
              to="/user/wishlist"
              $isActive={location.pathname === "/user/wishlist"}
              onClick={() => setMenuOpen(false)}
            >
              {t("wishlist")}
            </NavLinkStyledMObile>
          </NavItem>
          <NavItem>
            <NavLinkStyledMObile
              to="/user/shopping-cart"
              $isActive={location.pathname === "/user/shopping-cart"}
              onClick={() => setMenuOpen(false)}
            >
              {t("basket")}
            </NavLinkStyledMObile>
          </NavItem>
        </>
      )}
      {isUserAuthenticated ? (
        <NavItem>
          <NavLinkStyledMObile
            to="/"
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
          >
            {t("logout")}
          </NavLinkStyledMObile>
        </NavItem>
      ) : (
        <NavLinkStyledMObile
          to="#"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            setShowLoginModal(true);
          }}
        >
          {t("login")}
        </NavLinkStyledMObile>
      )}
      {showLoginModal && (
        <SocialLoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </MobileMenu>
  );
};

export default MobileMenuHeader;
