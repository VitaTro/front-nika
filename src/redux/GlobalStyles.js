import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* 🔥 Підключаємо шрифти тут — це безпечно */
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Playball&display=swap');

  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => (props.theme.isDarkMode ? "#333" : "#fff")};
    color: ${(props) => (props.theme.isDarkMode ? "#fff" : "#000")};
    transition: all 0.3s linear;

    /* 🔥 Тепер шрифти доступні всюди */
    font-family: 'Noto Sans', sans-serif;
  }

  .no-theme {
    background-color: #fff !important;
    color: #000 !important;
  }

  main {
    flex: 1;
  }

  a {
    text-decoration: none;
    color: rgb(22, 124, 233);
    transition: color 0.2s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;
