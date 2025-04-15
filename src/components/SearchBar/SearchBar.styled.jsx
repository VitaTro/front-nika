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
    max-width: 500px; /* Для екранів до 1022px */
    height: 35px; /* Менша висота */
  }

  @media (max-width: 768px) {
    max-width: 400px; /* Для планшетів */
    height: 30px;
  }

  @media (max-width: 480px) {
    max-width: 350px; /* Для мобільних */
    height: 30px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 45px 12px 20px; /* Відступи */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
  box-sizing: border-box;
  height: 100%; /* Підлаштовується під контейнер */

  &:focus {
    border-color: #8baa36; /* Колір при фокусі */
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
  top: 50%; /* Центруємо по вертикалі */
  transform: translateY(-50%);
  padding: 10px 20px;
  font-size: 16px;
  background-color: #8baa33; /* Основний фон */
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #6e8a2d; /* Темніший зелений */
  }

  @media (max-width: 1022px) {
    padding: 11px 16px;
    font-size: 14px;
    right: -17px; /* Зменшуємо правий відступ */
  }

  @media (max-width: 768px) {
    padding: 9px 14px;
    font-size: 12px;
    right: -17px; /* Ще менший відступ */
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 12px;
    right: -13px;
  }
`;
