import styled from "styled-components";
export const AvatarContainer = styled.div`
  position: relative;
`;

export const UserCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.theme.$isDarkMode ? "#444" : "#f0f0f0"};
  cursor: pointer;
  border: 2px solid ${(props) => (props.theme.$isDarkMode ? "#888" : "#ccc")};
`;

export const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: ${(props) => (props.theme.$isDarkMode ? "#333" : "#fff")};
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 150px;
  z-index: 10;

  ul {
    list-style: none;
    margin: 0;
    padding: 10px;
  }

  li {
    padding: 8px;
    cursor: pointer;
    &:hover {
      background-color: ${(props) =>
        props.theme.$isDarkMode ? "#444" : "#f7f7f7"};
    }
  }
`;
