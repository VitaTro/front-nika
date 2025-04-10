import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-size: cover;
  background-position: center;
  color: #fff;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 50px;
`;

export const StyledLink = styled(Link)`
  padding: 10px 20px;
  border: 2px solid #fff;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
export const Register = styled(Link)`
  border: 1px solid #fafafa;
  font-family: "Poppins", sans-serif;
  padding: 22px 44px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #fafafa;
  text-decoration: none;
  list-style: none;
  border-radius: 24px 44px;
  background-color: #bfd641;

  &:is(:hover, :focus-visible) {
    background-color: #8baa36;
    transition: all 0.3s;
    transition-behavior: normal;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    transition-delay: 0s;
    transition-property: all;
  }

  @media (max-width: 968px) {
    padding: 22px 44px;
    margin-right: 18px;
    font-size: 16px;
  }
  @media (max-width: 768px) {
    padding: 18px 36px;
    margin-right: 12px;
    font-size: 12px;
  }
`;

export const SignIn = styled(Link)`
  border: 1px solid #fafafa;
  font-family: "Poppins", sans-serif;
  padding: 22px 44px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #fafafa;
  border-radius: 24px 44px;
  text-decoration: none;
  list-style: none;
  background-color: #bfd641;

  &:is(:hover, :focus-visible) {
    background-color: #8baa36;
    transition: all 0.3s;
    transition-behavior: normal;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    transition-delay: 0s;
    transition-property: all;
  }

  @media (max-width: 968px) {
    padding: 22px 44px;
    font-size: 16px;
  }
  @media (max-width: 768px) {
    padding: 18px 36px;
    font-size: 12px;
  }
`;
