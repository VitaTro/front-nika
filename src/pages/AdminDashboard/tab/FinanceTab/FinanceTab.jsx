import { Button } from "@mui/material";
import React, { useState } from "react";
import FinanceSettings from "./FinanceComponent/FinanceSettings";
import OfflineOrder from "./FinanceComponent/OfflineOrder";
import OfflineSale from "./FinanceComponent/OfflineSale";
import OnlineOrder from "./FinanceComponent/OnlineOrder";
import OnlineSale from "./FinanceComponent/OnlineSale";
const FinanceTab = () => {
  const [viewMode, setViewMode] = useState("overview");

  return (
    <div style={{ marginLeft: "10px" }}>
      {/* Кнопки для переключення між секціями */}
      <div style={{ marginBottom: "20px", marginLeft: "10px" }}>
        <Button
          variant={viewMode === "overview" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setViewMode("overview")}
        >
          Статистика
        </Button>
        <Button
          variant={viewMode === "online-orders" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setViewMode("online-orders")}
          style={{ marginLeft: "10px" }}
        >
          Онлайн-замовлення
        </Button>
        <Button
          variant={viewMode === "online-sales" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setViewMode("online-sales")}
          style={{ marginLeft: "10px" }}
        >
          Онлайн-продажі
        </Button>
        <Button
          variant={viewMode === "offline-orders" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setViewMode("offline-orders")}
          style={{ marginLeft: "10px" }}
        >
          Офлайн-замовлення
        </Button>
        <Button
          variant={viewMode === "offline-sales" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setViewMode("offline-sales")}
          style={{ marginLeft: "10px" }}
        >
          Офлайн-продажі
        </Button>
      </div>

      {/* Відображення відповідної секції */}
      {/* Відображення відповідного контенту */}
      {viewMode === "overview" && <FinanceSettings />}
      {viewMode === "online-orders" && <OnlineOrder />}
      {viewMode === "online-sales" && <OnlineSale />}
      {viewMode === "offline-orders" && <OfflineOrder />}
      {viewMode === "offline-sales" && <OfflineSale />}
    </div>
  );
};
export default FinanceTab;
