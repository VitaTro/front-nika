import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%; /* Забезпечує повну висоту документа */
    margin: 0; /* Усунення стандартних відступів */
    padding: 0; /* Усунення стандартних відступів */
    background-color: ${(props) => (props.theme.isDarkMode ? "#333" : "#fff")};
    color: ${(props) => (props.theme.isDarkMode ? "#fff" : "#000")};
    transition: all 0.3s linear;
  }

  .no-theme {
    background-color: #fff !important;
    color: #000 !important;
  }
`;
