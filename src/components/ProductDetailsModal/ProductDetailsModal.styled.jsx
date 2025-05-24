import styled from "styled-components";

export const DetailsContainer = styled.div`
  background-color: ${(props) => (props.theme.isDarkMode ? "#212121" : "#fff")};
  color: ${(props) => (props.theme.isDarkMode ? "#fff" : "#000")};
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  margin: auto;
  text-align: center;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => (props.theme.isDarkMode ? "#ff5555" : "#333")};

  &:hover {
    color: #ff5555;
  }
`;

export const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 15px;
`;

export const Description = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const InfoItem = styled.li`
  font-size: 14px;
  margin-bottom: 5px;
  color: ${(props) => (props.theme.isDarkMode ? "#bbb" : "#555")};
`;
