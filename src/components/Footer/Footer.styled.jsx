import styled from "styled-components";

export const FooterItem = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => (props.$isDarkMode ? "#212521" : "#F8FFF8")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  margin-top: 20px;
  font-family: "Nunito", sans-serif;
  font-weight: 400;
  font-size: 16px;
  position: fixed;
  bottom: 0;
  padding: 5px;
  width: 100%;
`;
