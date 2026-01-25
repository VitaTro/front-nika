import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleTheme } from "../../redux/themeSlice";

import { selectGuestCartCount } from "../../redux/guest/shopping/guestShoppingSelectors";
import { selectGuestWishlist } from "../../redux/guest/wishlist/guestWishlistSelectors";
import Moon from "../icons/moon.png";
import Sun from "../icons/sun.png";
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
  setShowLoginModal,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const guestWishlist = useSelector(selectGuestWishlist);
  const guestCartCount = useSelector(selectGuestCartCount);
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

      {!isUserAuthenticated && (
        <>
          <NavItem>
            <NavLinkStyledMObile
              to="/guest-wishlist"
              $isActive={location.pathname === "/guest-wishlist"}
              onClick={() => setMenuOpen(false)}
            >
              {t("wishlist")} ({guestWishlist.length})
            </NavLinkStyledMObile>
          </NavItem>

          {/* <NavItem>
            <NavLinkStyledMObile
              to="/guest-cart"
              $isActive={location.pathname === "/guest-cart"}
              onClick={() => setMenuOpen(false)}
            >
              {t("basket")} ({guestCartCount})
            </NavLinkStyledMObile>
          </NavItem> */}
        </>
      )}

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
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {t("login")}
        </NavLinkStyledMObile>
      )}
    </MobileMenu>
  );
};

export default MobileMenuHeader;
