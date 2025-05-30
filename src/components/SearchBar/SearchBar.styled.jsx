import styled from "styled-components";

export const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 40px;
  margin: 10px auto;

  @media (max-width: 1022px) {
    max-width: 500px;
    height: 35px;
  }

  @media (max-width: 768px) {
    max-width: 400px;
    height: 30px;
  }

  @media (max-width: 480px) {
    max-width: 350px;
    height: 30px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 45px 12px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
  box-sizing: border-box;
  height: 100%;

  &:focus {
    border-color: rgb(52, 69, 255);
    outline: none;
  }

  @media (max-width: 1022px) {
    font-size: 14px;
    padding: 10px 40px 10px 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 35px 8px 12px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 35px 8px 12px;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: -45px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  margin: 0 5px;
  padding: 11px 20px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  background: ${(props) =>
    props.theme.$isDarkMode
      ? "linear-gradient(135deg, #555, #222)"
      : "linear-gradient(135deg, #add8e6, #4682b4)"};
  color: ${(props) => (props.theme.$isDarkMode ? "#fff" : "#000")};
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.theme.$isDarkMode
        ? "linear-gradient(135deg, #666, #333)"
        : "linear-gradient(135deg, #4682b4, #add8e6)"};
  }

  &.active {
    background: ${(props) =>
      props.theme.$isDarkMode
        ? "linear-gradient(135deg, #666, #333)"
        : "linear-gradient(135deg, #4682b4, #add8e6)"};
  }

  @media (max-width: 1022px) {
    padding: 11px 16px;
    font-size: 14px;
    right: -17px;
  }

  @media (max-width: 768px) {
    padding: 9px 14px;
    font-size: 12px;
    right: -17px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 12px;
    right: -13px;
  }
`;
