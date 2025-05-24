import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%; 
    margin: 0; 
    padding: 0;
    background-color: ${(props) => (props.theme.isDarkMode ? "#333" : "#fff")};
    color: ${(props) => (props.theme.isDarkMode ? "#fff" : "#000")};
    transition: all 0.3s linear;
    padding-bottom: 40px;
  }

  .no-theme {
    background-color: #fff !important;
    color: #000 !important;
  }
      footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px;
    text-align: center;
    background-color: ${(props) =>
      props.theme.isDarkMode ? "#212521" : "#F8FFF8"};
    color: ${(props) => (props.theme.isDarkMode ? "#fff" : "#000")};
  }
`;
