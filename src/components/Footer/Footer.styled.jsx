import styled from "styled-components";

export const FooterItem = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: ${(props) => (props.$isDarkMode ? "#212521" : "#F8FFF8")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  margin-top: auto;
  font-family: "Nunito", sans-serif;
  font-weight: 400;
  font-size: 16px;
`;
