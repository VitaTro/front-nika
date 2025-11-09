import { Box, Button, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import ExpenseManager from "./FinanceComponent/ExpenseManager";
import FinanceOverview from "./FinanceComponent/FinanceOverview";
import StockProfitOverview from "./FinanceComponent/StockProfitOverview";
import OrderTab from "./OrderTab/OrderTab";
import SaleTab from "./SalesTab/SalesTab";

const FinanceTab = () => {
  const [viewMode, setViewMode] = useState("overview");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const financeTabs = [
    { label: "Статистика", value: "overview", color: "primary" },
    { label: "Маржа", value: "stock-profit", color: "secondary" },
    { label: "Замовлення", value: "orders", color: "primary" },
    { label: "Продажі", value: "sales", color: "secondary" },
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
      {viewMode === "orders" && <OrderTab />}
      {viewMode === "sales" && <SaleTab />}
      {viewMode === "expenses" && <ExpenseManager />}

      <Outlet />
    </Box>
  );
};

export default FinanceTab;
