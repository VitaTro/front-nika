import styled from "styled-components";
export const Pagination = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 40px;
`;

export const PageLink = styled.button`
  margin: 0 5px;
  padding: 10px 20px;
  border: 1px solid ${(props) => (props.theme.$isDarkMode ? "#555" : "#ccc")};
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) =>
    props.theme.$isDarkMode ? "#444" : "#f5f5f5"};
  color: ${(props) => (props.theme.$isDarkMode ? "#fff" : "#000")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.theme.$isDarkMode ? "#555" : "#ddd")};
  }
`;
