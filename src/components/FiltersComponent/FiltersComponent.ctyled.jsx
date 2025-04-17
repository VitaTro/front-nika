import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  gap: 25px;
  padding: 20px;
  margin: 0 auto;
  justify-content: center;
`;
export const FilterHeader = styled.h4`
  color: ${(props) => (props.theme.$isDarkMode ? "#fff" : "gray")};
  text-shadow: ${(props) =>
    props.theme.$isDarkMode
      ? "0 0 5px rgba(255, 255, 255, 0.8)"
      : "0 0 5px rgb(167, 182, 208)"};

  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  font-weight: 500;
`;
