import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
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
  isUserAuthenticated,
  user,
  handleLogout,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <MobileMenu
      style={{
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "gray" : "#E0E0E0",
        transition: "background-color 0.3s ease-in-out",
      }}
      $isOpen={menuOpen}
      onClick={(e) => e.stopPropagation()} // Запобігаємо закриттю при кліку всередині
    >
      <CloseButton onClick={() => setMenuOpen(false)}>×</CloseButton>

      {/* Тема + мова */}
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

      {/* Навігація */}
      <NavItem>
        <NavLinkStyledMObile
          to="/products"
          $isActive={location.pathname === "/products"}
        >
          {t("products")}
        </NavLinkStyledMObile>
      </NavItem>
      <NavItem>
        <NavLinkStyledMObile
          to="/about"
          $isActive={location.pathname === "/about"}
        >
          {t("about")}
        </NavLinkStyledMObile>
      </NavItem>

      {isUserAuthenticated && (
        <>
          <NavItem>
            <NavLinkStyledMObile
              to="/wishlist"
              $isActive={location.pathname === "/wishlist"}
            >
              {t("wishlist")}
            </NavLinkStyledMObile>
          </NavItem>
          <NavItem>
            <NavLinkStyledMObile
              to="/shopping-cart"
              $isActive={location.pathname === "/shopping-cart"}
            >
              {t("basket")}
            </NavLinkStyledMObile>
          </NavItem>
        </>
      )}

      {/* Логін/Логаут */}
      {isUserAuthenticated ? (
        <>
          <NavItem>
            <NavLinkStyledMObile to="/profile">
              {user.username || t("my_account")}
            </NavLinkStyledMObile>
          </NavItem>
          <NavItem>
            <NavLinkStyledMObile to="/" onClick={handleLogout}>
              {t("logout")}
            </NavLinkStyledMObile>
          </NavItem>
        </>
      ) : (
        <NavItem>
          <NavLinkStyledMObile to="/user/auth/login">
            {t("login")}
          </NavLinkStyledMObile>
        </NavItem>
      )}
    </MobileMenu>
  );
};

export default MobileMenuHeader;
