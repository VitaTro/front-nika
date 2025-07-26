import { Box, Button, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import ExpenseManager from "./FinanceComponent/ExpenseManager";
import FinanceOverview from "./FinanceComponent/FinanceOverview";
import OfflineOrder from "./FinanceComponent/OfflineOrder/OfflineOrder";
import OfflineSale from "./FinanceComponent/OfflineSale/OfflineSale";
import OnlineOrder from "./FinanceComponent/OnlineOrder/OnlineOrder";
import OnlineSale from "./FinanceComponent/OnlineSale/OnlineSale";
import StockProfitOverview from "./FinanceComponent/StockProfitOverview";

const FinanceTab = () => {
  const [viewMode, setViewMode] = useState("overview");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const financeTabs = [
    { label: "Статистика", value: "overview", color: "primary" },
    { label: "Маржа", value: "stock-profit", color: "secondary" },
    { label: "Онлайн-замовлення", value: "online-orders", color: "primary" },
    { label: "Онлайн-продажі", value: "online-sales", color: "secondary" },
    { label: "Офлайн-замовлення", value: "offline-orders", color: "primary" },
    { label: "Офлайн-продажі", value: "offline-sales", color: "secondary" },
    { label: "Витрати", value: "expenses", color: "error" },
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
        {financeTabs.map((tab) => (
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

      {viewMode === "overview" && <FinanceOverview />}
      {viewMode === "stock-profit" && <StockProfitOverview />}
      {viewMode === "online-orders" && <OnlineOrder />}
      {viewMode === "online-sales" && <OnlineSale />}
      {viewMode === "offline-orders" && <OfflineOrder />}
      {viewMode === "offline-sales" && <OfflineSale />}
      {viewMode === "expenses" && <ExpenseManager />}

      <Outlet />
    </Box>
  );
};

export default FinanceTab;
