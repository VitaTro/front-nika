import styled from "styled-components";

export const UserDashboardForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-left: 150px;
`;
export const UserDashboardHeader = styled.h4`
  padding: 0;
  margin: 0 5px 20px;
  justify-content: center;
  display: flex;
  align-items: center;
  font-family: "Noto Sans", sans-serif;
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => (props.theme.$isDarkMode ? "lightgray" : "gray")};
  background: ${(props) =>
    props.$isActive
      ? props.theme.$isDarkMode
        ? "linear-gradient(90deg, #8BC34A, #1B5E20)"
        : "linear-gradient(90deg, #91A1B8, #ECEFF1)"
      : "none"};
  background-clip: text;
  -webkit-background-clip: text;
  color: ${(props) => (props.$isActive ? "transparent" : "")};
  text-shadow: ${(props) =>
    props.$isActive
      ? props.theme.$isDarkMode
        ? "0 5px 15px rgba(123, 228, 10, 0.5), 0 0 10px rgba(255, 255, 255, 0.2)"
        : "0 0 12px rgba(167, 182, 208, 0.9)"
      : "0 0 6px rgba(0, 0, 0, 0.1)"};
  transition: all 0.5s ease-in-out;

  &:hover {
    transform: scale(1.01);
    text-shadow: ${(props) =>
      props.theme.$isDarkMode
        ? "0 10px 20px rgba(123, 228, 10, 0.7), 0 0 15px rgba(255, 255, 255, 0.4)"
        : "0 0 15px rgba(167, 182, 208, 1)"};
  }
`;
export const UserDashboardHeaderAddress = styled.h5`
  padding: 0;
  margin: 0 5px 20px;
  justify-content: center;
  display: flex;
  align-items: center;
  font-family: "Noto Sans", sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: ${(props) => (props.theme.$isDarkMode ? "lightgray" : "gray")};
  background: ${(props) =>
    props.$isActive
      ? props.theme.$isDarkMode
        ? "linear-gradient(90deg, #8BC34A, #1B5E20)"
        : "linear-gradient(90deg, #91A1B8, #ECEFF1)"
      : "none"};
  background-clip: text;
  -webkit-background-clip: text;
  color: ${(props) => (props.$isActive ? "transparent" : "")};
  text-shadow: ${(props) =>
    props.$isActive
      ? props.theme.$isDarkMode
        ? "0 5px 15px rgba(123, 228, 10, 0.5), 0 0 10px rgba(255, 255, 255, 0.2)"
        : "0 0 12px rgba(167, 182, 208, 0.9)"
      : "0 0 6px rgba(0, 0, 0, 0.1)"};
  transition: all 0.5s ease-in-out;

  &:hover {
    transform: scale(1.01);
    text-shadow: ${(props) =>
      props.theme.$isDarkMode
        ? "0 10px 20px rgba(123, 228, 10, 0.7), 0 0 15px rgba(255, 255, 255, 0.4)"
        : "0 0 15px rgba(167, 182, 208, 1)"};
  }
`;
export const UserDashboardHeaderAddress2 = styled.h6`
  padding: 0;
  margin: 0 5px 20px;
  justify-content: center;
  display: flex;
  align-items: center;
  font-family: "Noto Sans", sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: ${(props) => (props.theme.$isDarkMode ? "lightgray" : "gray")};
  background: ${(props) =>
    props.$isActive
      ? props.theme.$isDarkMode
        ? "linear-gradient(90deg, #8BC34A, #1B5E20)"
        : "linear-gradient(90deg, #91A1B8, #ECEFF1)"
      : "none"};
  background-clip: text;
  -webkit-background-clip: text;
  color: ${(props) => (props.$isActive ? "transparent" : "")};
  text-shadow: ${(props) =>
    props.$isActive
      ? props.theme.$isDarkMode
        ? "0 5px 15px rgba(123, 228, 10, 0.5), 0 0 10px rgba(255, 255, 255, 0.2)"
        : "0 0 12px rgba(167, 182, 208, 0.9)"
      : "0 0 6px rgba(0, 0, 0, 0.1)"};
  transition: all 0.5s ease-in-out;

  &:hover {
    transform: scale(1.01);
    text-shadow: ${(props) =>
      props.theme.$isDarkMode
        ? "0 10px 20px rgba(123, 228, 10, 0.7), 0 0 15px rgba(255, 255, 255, 0.4)"
        : "0 0 15px rgba(167, 182, 208, 1)"};
  }
`;
export const UserDashboardInputForm = styled.input`
  padding: 10px 14px;
  width: 80%;
  font-size: 14px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4cb0d4;
    box-shadow: 0 0 5px rgba(76, 176, 212, 0.5);
  }

  &:hover {
    border-color: #777;
  }

  margin-bottom: 15px;
`;

export const UserDashboardButtonForm = styled.button`
  padding: 10px 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  margin: 20px 0 40px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.01);
  }

  &:active {
    background-color: #003f7f;
    transform: scale(0.95);
  }
`;

export const UserDashboardLabelForm = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-size: 16px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
`;
