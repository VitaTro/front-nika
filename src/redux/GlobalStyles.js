import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => (props.theme.isDarkMode ? "#333" : "#fff")};
    color: ${(props) => (props.theme.isDarkMode ? "#fff" : "#000")};
    transition: all 0.3s linear;
  }

  .no-theme {
    background-color: #fff !important;
    color: #000 !important;
  }

  main {
    flex: 1;
  }
`;
