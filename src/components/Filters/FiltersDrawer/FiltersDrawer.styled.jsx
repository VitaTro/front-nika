import styled from "styled-components";

export const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-300px")};
  width: 280px;
  height: 100%;
  background: ${({ theme }) => theme.background || "#fff"};
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transition: right 0.3s ease;
  z-index: 9999;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 26px;
  cursor: pointer;
  float: right;
  color: ${({ theme }) => theme.text || "#000"};
`;

export const Label = styled.label`
  display: block;
  margin-top: 15px;
  font-weight: bold;
  color: ${({ theme }) => theme.text || "#000"};
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: ${({ theme }) => theme.inputBg || "#fff"};
  color: ${({ theme }) => theme.text || "#000"};
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: ${({ theme }) => theme.inputBg || "#fff"};
  color: ${({ theme }) => theme.text || "#000"};
`;
