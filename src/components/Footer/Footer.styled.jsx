import { Link } from "react-router-dom";
import styled from "styled-components";

export const FooterWrapper = styled.footer`
  max-width: 1400px;
  background-color: ${({ theme }) =>
    theme.isDarkMode ? "#1a1a1a" : "#f7f7f7"};
  color: ${({ theme }) => (theme.isDarkMode ? "#ccc" : "#333")};
  padding: 40px 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 24px;
  font-size: 14px;
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 150px;
`;

export const FooterTitle = styled.div`
  font-weight: 600;
  margin-bottom: 6px;
`;

export const FooterLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

export const DevNote = styled.div`
  font-size: 12px;
  opacity: 0.6;
  margin-top: 20px;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;

  a {
    color: ${({ theme }) => (theme.isDarkMode ? "#fff" : "#000")};
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.2);
      color: #d1a954; /* Ніжне золото */
    }
  }
`;
