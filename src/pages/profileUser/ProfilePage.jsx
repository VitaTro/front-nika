import { Box, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ProfileMain from "../../components/UserDashboard/tab/ProfileMain/ProfileMain";

import ProfileAddress from "../../components/UserDashboard/tab/ProfileMain/ProfileAddress";
import { fetchUserInfo } from "../../redux/user/userOperations";
import { selectUser } from "../../redux/user/userSelectors";
const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const user = useSelector(selectUser);
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  if (!user) return <p>Loading profile...</p>;
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 3,
        padding: "20px",
      }}
    >
      <Tabs
        value={selectedTab}
        orientation={isMobile ? "horizontal" : "vertical"}
        variant="scrollable"
        onChange={handleChange}
        sx={{
          minWidth: isMobile ? "100%" : 200,
          alignItems: isMobile ? "center" : "start",
          fontFamily: "Arial",
          order: isMobile ? -1 : 0,
        }}
      >
        <Tab
          label={t("your_data")}
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
        <Tab
          label={t("shipping_addresses")}
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
        <Tab
          label={t("my_orders")}
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
        <Tab
          label={t("order_history")}
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
        <Tab
          label={t("payment_cards")}
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
        <Tab
          label={t("wallet")}
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
        <Tab
          label={t("settings")}
          style={{ color: isDarkMode ? "#0c0" : "#1f871a" }}
        />
      </Tabs>

      <Box>
        {selectedTab === 0 && <ProfileMain />}
        {selectedTab === 1 && <ProfileAddress />}

        {selectedTab === 2 && (
          <p>Тут буде історія покупок та поточні замовлення...</p>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
