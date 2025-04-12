import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserIcon from "./UserAvatar.png";
import {
  AvatarContainer,
  DropdownMenu,
  UserCircle,
  UserImage,
} from "./UserAvatar.styled";
const UserAvatar = () => {
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.user?.avatar || null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await dispatch(uploadUserAvatar(file));
      } catch (error) {
        console.error("Failed to upload avatar:", error);
      }
    }
  };

  return (
    <AvatarContainer>
      <UserCircle onClick={toggleMenu}>
        {avatar ? (
          <UserImage src={avatar} alt="User avatar" />
        ) : (
          <img src={UserIcon} alt="User icon" style={{ width: "100%" }} />
        )}
      </UserCircle>

      {/* Меню користувача */}
      {isMenuOpen && (
        <DropdownMenu>
          <ul>
            <li>
              <label>
                Upload Avatar
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
              </label>
            </li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </DropdownMenu>
      )}
    </AvatarContainer>
  );
};
export default UserAvatar;
