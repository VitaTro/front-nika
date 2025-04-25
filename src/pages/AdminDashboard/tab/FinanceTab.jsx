import { Button } from "@mui/material";
import React, { useState } from "react";
import OrderOffline from "../Finance/OrderOffline";
import OrdersPage from "../Finance/OrdersPage";

import OverviewFinancePage from "../Finance/OverviewFinancePage";
import SalesPage from "../Finance/SalesPage";
const FinanceTab = () => {
  const [viewMode, setViewMode] = useState("orders");

  return (
    <div style={{ marginLeft: "10px" }}>
      {/* Кнопки для переключення між секціями */}
      <div style={{ marginBottom: "20px", marginLeft: "10px" }}>
        <Button
          variant={viewMode === "orders" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setViewMode("orders")}
        >
          Замовлення
        </Button>
        <Button
          variant={viewMode === "sales" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setViewMode("sales")}
          style={{ marginLeft: "10px" }}
        >
          Продажі
        </Button>
        <Button
          variant={viewMode === "overview" ? "contained" : "outlined"}
          color="success"
          onClick={() => setViewMode("overview")}
          style={{ marginLeft: "10px" }}
        >
          Фінансова статистика
        </Button>
        <Button
          variant={viewMode === "offline" ? "contained" : "outlined"}
          color="success"
          onClick={() => setViewMode("offline")}
          style={{ marginLeft: "10px" }}
        >
          Замовлення Offline
        </Button>
      </div>

      {/* Відображення відповідної секції */}
      {viewMode === "orders" && <OrdersPage />}
      {viewMode === "sales" && <SalesPage />}
      {viewMode === "statistics" && <OverviewFinancePage />}
      {viewMode === "offline" && <OrderOffline />}
    </div>
  );
};
export default FinanceTab;
