import styled from "styled-components";

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${(props) => (props.theme.isDarkMode ? "#333" : "#fff")};
  color: ${(props) => (props.theme.isDarkMode ? "#fff" : "#333")};
`;

export const WelcomeMessage = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

export const InfoContainer = styled.div`
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.5;
`;
