import styled from "styled-components";

export const FilterContainer = styled.div`
  width: 150px; /* Фіксована ширина для бічної панелі */
  flex-shrink: 0; /* Не дозволяємо панелі змінювати розмір */
  background-color: #f9f9f9;
  // padding: 20px;
  border-radius: 10px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
export const FilterHeader = styled.h4`
  color: ${(props) => (props.theme.$isDarkMode ? "#fff" : "gray")};
  text-shadow: ${(props) =>
    props.theme.$isDarkMode
      ? "0 0 5px rgba(255, 255, 255, 0.8)"
      : "0 0 5px rgb(167, 182, 208)"};
  cursor: pointer;
  margin: 10px 0;
  padding: 10px;
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  font-weight: 500;
`;
export const FilterSection = styled.div`
  margin-bottom: 20px;
`;
