import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  padding: 10px 60px;
  gap: 15px;
`;

export const HeaderComponent = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;

  @media (max-width: 768px) {
    align-items: flex-start;
    gap: 10px;
  }
`;
export const LogoImage = styled.img`
  width: 90px;
  height: 90px;
  margin-right: 150px;

  transition: all 0.5s linear;
  @media (max-width: 968px) {
    margin-right: 15px;
    width: 70px;
    height: 70px;
  }
  @media (max-width: 768px) {
    margin-right: 0;
    width: 60px;
    height: 60px;
  }
  @media (max-width: 480px) {
    margin-left: 5px;
    width: 50px;
    height: 50px;
  }
`;
export const LogoImageUser = styled.img`
  width: 90px;
  height: 90px;
  margin-right: 50px;

  transition: all 0.5s linear;
  @media (max-width: 968px) {
    margin-right: 15px;
    width: 70px;
    height: 70px;
  }
  @media (max-width: 768px) {
    margin-right: 0;
    width: 60px;
    height: 60px;
  }
  @media (max-width: 480px) {
    margin-left: 5px;
    width: 50px;
    height: 50px;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;

  @media (min-width: 825px) {
    // justify-content: space-around;
    width: 100%;
  }
  @media (max-width: 890px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: start;
    width: 100%;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  margin: 0 15px;
  text-align: center;
`;

export const SearchContainer = styled.div`
  // align-self: flex-start; /* Вирівнювання по лівому краю */
  // margin-top: auto; /* Розташування внизу */
  // input {
  //   width: 200px;
  //   height: 36px;
  //   border-radius: 12px;
  //   border: 1px solid #ccc;
  //   padding: 5px;
  //   font-size: 16px;
  //   margin-left: 35px;
  // }

  // @media (max-width: 768px) {
  //   width: 80%; /* На мобільному адаптується до ширини */
  //   margin-left: 5px;
  }
`;
export const NavLinkStyled = styled(Link)`
  color: ${(props) => (props.theme.$isDarkMode ? "#E0E0E0" : "gray")};
  font-family: "Nunito", sans-serif;
  font-weight: 400;
  font-size: 18px;
  text-decoration: none;
  list-style: none;

  /* Тінь для активної сторінки */
  text-shadow: ${(props) =>
    props.$isActive
      ? props.theme.$isDarkMode
        ? "0 6px 12px rgba(164, 159, 159, 0.5)"
        : "0 6px 12px rgba(176, 173, 173, 0.6)"
      : "none"};

  /* Градієнт кольору для активної сторінки */
  background: ${(props) =>
    props.$isActive
      ? props.theme.$isDarkMode
        ? "linear-gradient(90deg, #8BC34A,rgb(9, 66, 12))"
        : "linear-gradient(90deg, #91A1B8,rgb(20, 159, 252))"
      : "none"};
  background-clip: text;
  -webkit-background-clip: text;
  color: ${(props) =>
    props.$isActive
      ? "transparent"
      : ""}; /* Прозорий текст для активного стану */

  /* Ефект при наведенні */
  &:hover {
    color: ${(props) =>
      props.theme.$isDarkMode ? "lightgray" : "darkgray"}; /* Зміна кольору */
    text-shadow: ${(props) =>
      props.theme.$isDarkMode
        ? "0 8px 8px rgba(221, 219, 219, 0.79)"
        : "0 8px 8px rgba(248, 247, 247, 0.8)"};
    transform: scale(1.05); /* Легке збільшення */
    transition: all 0.3s ease-in-out; /* Плавний перехід */
  }
`;

export const ThemeToggle = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;
export const Slider = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isDarkMode", // Заборона передачі в DOM
})`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.theme.$isDarkMode ? "#222" : "#fff")};
  transition: 0.4s;
  border-radius: 34px;
  border: 1px solid #ccc;

  &::before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: ${(props) =>
      props.isDarkMode ? "30px" : "4px"}; // Позиція змінюється залежно від теми
    bottom: 4px;
    background-color: #333; // Стабільний колір, не залежить від теми
    transition: 0.6s;
    border-radius: 50%;
    border: 1px solid #ccc;
  }
`;

export const ThemeIcon = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => (props.$position === "left" ? "4px" : "unset")};
  right: ${(props) => (props.$position === "right" ? "4px" : "unset")};
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: left 0.6s, right 0.6s;
  width: 22px;
  height: 22px;
`;

export const Select = styled.select``;

export const Label = styled.label``;

export const Option = styled.option``;

export const LanguageSelector = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const LanguageSelected = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};

  img {
    width: 24px;
    height: 24px;
  }
`;

export const LanguageOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.$isDarkMode ? "#444" : "#f7f7f7")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$isDarkMode ? "#555" : "#e2e2e2")};
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;

  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: none;

  ${LanguageSelector}:hover & {
    display: block;
  }
`;

export const HamburgerButton = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 1100;
  div {
    width: 30px;
    height: 3px;
    background-color: ${({ theme }) => (theme.$isDarkMode ? "#0c0" : "#333")};
    transition: background-color 0.3s ease-in-out;
  }

  @media (max-width: 767px) {
    display: ${({ $isOpen }) => ($isOpen ? "none" : "flex")};
  }
`;
export const NavLinkStyledMObile = styled(Link)`
  color: ${(props) => (props.theme.$isDarkMode ? "#E0E0E0" : "gray")};
  font-family: "Nunito", sans-serif;
  font-weight: 400;
  font-size: 36px;
  text-decoration: none;
  list-style: none;
  &:hover {
    color: darkgray;
  }
`;
export const UtilityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    justify-content: flex-end;
    flex-direction: column;
    margin-top: 10px;
  }

  @media (max-width: 608px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-top: 15px;
    width: 100%;
    display: none;
  }
  @media (max-width: 1016px) {
    flex-direction: column; /* Вертикальне вирівнювання */
    align-items: center;
  }
`;

export const MobileMenu = styled.ul`
  position: fixed;
  list-style: none;
  top: 0;
  right: 0;
  height: 100vh;
  width: 70%;
  background-color: ${(props) => (props.theme.$isDarkMode ? "#333" : "#fff")};
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2);
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out; /* Плавна анімація кольору */
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const MobileUtilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${(props) =>
    props.theme.$isDarkMode
      ? "green"
      : "red"}; /* Хрестик зелений у темному режимі */
  transition: color 0.3s ease-in-out;

  &:hover {
    color: limegreen; /* Зелений колір при наведенні */
  }
`;
