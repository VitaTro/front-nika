import { useState } from "react";
import { useSelector } from "react-redux";
import UserIcon from "./UserAvatar.png";
import {
  AvatarContainer,
  DropdownMenu,
  UserCircle,
  UserImage,
} from "./UserAvatar.styled";
const UserAvatar = () => {
  const userPhoto = useSelector((state) => state.auth.userPhoto);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  return (
    <AvatarContainer>
      <UserCircle onClick={toggleMenu}>
        {userPhoto ? (
          <UserImage src={userPhoto} alt="User avatar" />
        ) : (
          <img src={UserIcon} alt="User icon" style={{ width: "100%" }} />
        )}
      </UserCircle>

      {/* Меню користувача */}
      {isMenuOpen && (
        <DropdownMenu>
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </DropdownMenu>
      )}
    </AvatarContainer>
  );
};
export default UserAvatar;
