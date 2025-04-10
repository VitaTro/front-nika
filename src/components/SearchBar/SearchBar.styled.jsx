import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 600px;
  margin: 10px auto;

  @media (min-width: 768px) {
    max-width: 500px;
  }

  @media (min-width: 1024px) {
    max-width: 600px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 45px 12px 20px; /* Місце для притиска праворуч */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 24px;
  background-color: #fff;
  box-sizing: border-box;

  &:focus {
    border-color: #8baa36;
    outline: none;
  }

  @media (min-width: 768px) {
    height: 50px;
    font-size: 18px;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 20px;
  font-size: 18px;
  background-color: #8baa33; /* Зелений фон для притиска */
  color: #fff;
  border: none;
  border-radius: 14px;
  cursor: pointer;

  &:hover {
    background-color: #6e8a2d; /* Темніший зелений при наведенні */
  }

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;
