import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const FormContainerAddress = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 95%;

  @media (max-width: 1024px) {
    width: 95%;
    gap: 8px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* На планшетах і мобілках елементи в один стовпчик */
    width: 95%;
    gap: 6px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 4px;
    width: 95%;
  }
`;

export const InputField = styled.input`
  width: 90%;
  padding: 10px;
  margin: 6px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  @media (max-width: 1024px) {
    padding: 8px;
    font-size: 15px;
  }

  @media (max-width: 768px) {
    padding: 6px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    font-size: 13px;
  }
`;
export const CheckboxStyled = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #007bff; /* Колір чекбокса */
  cursor: pointer;
`;

export const SelectField = styled.select`
  width: 95%;
  padding: 10px;
  margin: 6px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background: #fff;

  @media (max-width: 1024px) {
    padding: 8px;
    font-size: 15px;
  }

  @media (max-width: 768px) {
    padding: 6px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    font-size: 13px;
  }
`;

export const SubmitButton = styled.button`
  width: 50%;
  padding: 5px 30px;
  background: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  font-family: "Noto Sans", sans-serif;
  margin: 30px 0;
  &:hover {
    background: #0056b3;
  }
`;
export const ButtonWrapper = styled.div`
  margin-top: 0;
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const HeaderOrder = styled.h4`
  font-family: "Noto Sans", sans-serif;
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  text-align: center;
  color: gray;
  text-shadow: 0 0 5px rgb(167, 182, 208);
`;
export const HeaderOrderAddress = styled.h5`
  font-family: "Noto Sans", sans-serif;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  color: gray;
  margin: 5px;
  text-shadow: 0 0 5px rgb(167, 182, 208);
`;
