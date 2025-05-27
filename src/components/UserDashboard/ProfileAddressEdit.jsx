import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  UserDashboardButtonForm,
  UserDashboardHeaderAddress,
  UserDashboardHeaderAddress2,
} from "./UserDashboard.styled";

const ProfileAddressEdit = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState("");

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
  };
  return (
    <>
      <UserDashboardHeaderAddress>
        {t("your_address")}
      </UserDashboardHeaderAddress>

      <UserDashboardHeaderAddress2>
        {t("shipping_address")}
      </UserDashboardHeaderAddress2>
      <UserDashboardButtonForm onClick={handleSave}>
        {t("save_changes")}
      </UserDashboardButtonForm>
    </>
  );
};
export default ProfileAddressEdit;
