import styled from "styled-components";

export const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  background-color: ${({ isVerified }) => (isVerified ? "#DFFFD6" : "#FFE6E6")};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
`;

export const StatusIcon = styled.img`
  width: 50px;
  margin-bottom: 10px;
`;

export const ButtonForm = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;
