import { Box, Button, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import OfflineSale from "./OfflineSale/OfflineSale.jsx";
import OnlineSale from "./OnlineSale/OnlineSale.jsx";
import ProfileSale from "./ProfileSale/ProfileSale.jsx";

const SaleTab = () => {
  const [viewMode, setViewMode] = useState("offline");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const saleTabs = [
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
        {saleTabs.map((tab) => (
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

      {viewMode === "offline" && <OfflineSale />}
      {viewMode === "online" && <OnlineSale />}
      {viewMode === "profile" && <ProfileSale />}
      <Outlet />
    </Box>
  );
};

export default SaleTab;
