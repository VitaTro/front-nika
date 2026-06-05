import { Box, Button, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import UserOrderDetails from "../../components/UserDashboard/OrderPlace/orderUser/OrderDetails.jsx";
import UserSingleOrder from "../../components/UserDashboard/OrderPlace/orderUser/UserSingleOrder.jsx.jsx";
import ProfileAddress from "../../components/UserDashboard/ProfileMain/ProfileAddress.jsx";
import ProfileMain from "../../components/UserDashboard/ProfileMain/ProfileMain.jsx";
import UserPurchaseHistory from "../../components/UserDashboard/ProfileMain/UserPurchaseHistory.jsx";
import { fetchUserInfo } from "../../redux/user/userOperations";
import { selectUser } from "../../redux/user/userSelectors";
import UserSettings from "./UserSettings";

const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const tabItems = [
    { label: t("your_data"), component: <ProfileMain /> },
    { label: t("shipping_addresses"), component: <ProfileAddress /> },

    {
      label: t("my_orders"),
      component: selectedOrderId ? (
        <UserSingleOrder
          orderId={selectedOrderId}
          onBack={() => setSelectedOrderId(null)}
        />
      ) : (
        <UserOrderDetails onSelectOrder={setSelectedOrderId} />
      ),
    },

    { label: t("order_history"), component: <UserPurchaseHistory /> },

    // Можеш прибрати або залишити як заглушку

    { label: t("settings"), component: <UserSettings /> },
  ];

  if (!user) return <p>Loading profile...</p>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 3,
        padding: "20px",
      }}
    >
      {isMobile ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {tabItems.map((tab, index) => (
            <Button
              key={index}
              variant={selectedTab === index ? "contained" : "outlined"}
              onClick={() => setSelectedTab(index)}
              sx={{
                justifyContent: "flex-start",
                color: isDarkMode ? "#0c0" : "#1f871a",
                textTransform: "none",
              }}
              fullWidth
            >
              {tab.label}
            </Button>
          ))}
        </Box>
      ) : (
        <Tabs
          value={selectedTab}
          orientation="vertical"
          variant="scrollable"
          onChange={(e, newVal) => setSelectedTab(newVal)}
          sx={{
            minWidth: 200,
            borderRight: 1,
            borderColor: "divider",
          }}
        >
          {tabItems.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              sx={{
                color: isDarkMode ? "#0c0" : "#1f871a",
                alignItems: "flex-start",
              }}
            />
          ))}
        </Tabs>
      )}

      <Box sx={{ flexGrow: 1 }}>{tabItems[selectedTab].component}</Box>
    </Box>
  );
};

export default ProfilePage;
