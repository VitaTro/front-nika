import { Box, Button, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import OfflineOrder from "./OfflineOrder/OfflineOrder.jsx";
import OnlineOrder from "./OnlineOrder/OnlineOrder.jsx";
import ProfileOrder from "./ProfileOrder/ProfileOrder.jsx";

const OrderTab = () => {
  const [viewMode, setViewMode] = useState("offline");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const orderTabs = [
    { label: "Офлайн", value: "offline", color: "primary" },
    { label: "Онлайн", value: "online", color: "secondary" },
    { label: "Платформа", value: "profile", color: "secondary" },
  ];

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          mb: 3,
        }}
      >
        {orderTabs.map((tab) => (
          <Button
            key={tab.value}
            variant={viewMode === tab.value ? "contained" : "outlined"}
            color={tab.color}
            onClick={() => setViewMode(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </Box>

      {viewMode === "offline" && <OfflineOrder />}
      {viewMode === "online" && <OnlineOrder />}
      {viewMode === "profile" && <ProfileOrder />}
      <Outlet />
    </Box>
  );
};
export default OrderTab;
