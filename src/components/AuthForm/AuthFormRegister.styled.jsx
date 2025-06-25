import styled from "styled-components";

export const HeaderForm = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: rgb(184, 195, 125);
  text-shadow: 0 0 5px rgb(173, 226, 160);
  margin-bottom: 20px;
  word-wrap: break-word;
  max-width: 90%;
  transition: color 0.4s ease, text-shadow 0.4s ease;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  padding: 25px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    padding: 20px;
    max-width: 90%;
    margin-bottom: 50px;
  }
  @media (max-width: 480px) {
    padding: 15px;
    max-width: 100%;
    margin-bottom: 60px;
  }
`;
export const LabelForm = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-size: 16px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
`;

export const InputForm = styled.input`
  padding: 10px 14px;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
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

export const ButtonForm = styled.button`
  padding: 12px 15px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:active {
    background-color: #003f7f;
    transform: scale(0.95);
  }
`;
export const ItemForm = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  gap: 10px;
  font-size: 18px;
`;

export const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
    display: flex;
    justify-content: flex-start;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
`;
