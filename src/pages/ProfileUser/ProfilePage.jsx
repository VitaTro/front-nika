import { Box, Button, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import UserOrderDetails from "../../components/UserDashboard/tab/ProfileMain/orderUser/OrderDetails";
import UserSingleOrder from "../../components/UserDashboard/tab/ProfileMain/orderUser/UserSingleOrder.jsx";
import ProfileAddress from "../../components/UserDashboard/tab/ProfileMain/ProfileAddress";
import ProfileMain from "../../components/UserDashboard/tab/ProfileMain/ProfileMain";
import UserPurchaseHistory from "../../components/UserDashboard/tab/ProfileMain/UserPurchaseHistory";
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
        <UserSingleOrder orderId={selectedOrderId} />
      ) : (
        <UserOrderDetails onSelectOrder={setSelectedOrderId} />
      ),
    },

    { label: t("order_history"), component: <UserPurchaseHistory /> },
    {
      label: t("payment_cards"),
      component: <p>💳 {t("payment_cards_placeholder")}</p>,
    },
    {
      label: t("wallet"),
      component: <p>👛 {t("wallet_placeholder")}</p>,
    },
    {
      label: t("settings"),
      component: <UserSettings />,
    },
  ];

  if (!user) return <p>Loading profile...</p>;
  {
    selectedOrderId ? (
      <UserSingleOrder orderId={selectedOrderId} />
    ) : (
      <UserOrderDetails onSelectOrder={setSelectedOrderId} />
    );
  }

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
        // 📱 Mobile navigation
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

      {/* 🔽 Активний контент вкладки */}
      <Box sx={{ flexGrow: 1 }}>{tabItems[selectedTab].component}</Box>
    </Box>
  );
};

export default ProfilePage;
