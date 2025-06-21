import { Button } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import ExpenseManager from "./FinanceComponent/ExpenseManager";
import FinanceOverview from "./FinanceComponent/FinanceOverview";
import FinanceSettings from "./FinanceComponent/FinanceSettings";
import OfflineOrder from "./FinanceComponent/OfflineOrder/OfflineOrder";
import OfflineSale from "./FinanceComponent/OfflineSale/OfflineSale";
import OnlineOrder from "./FinanceComponent/OnlineOrder/OnlineOrder";
import OnlineSale from "./FinanceComponent/OnlineSale/OnlineSale";
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
        <Button
          variant={viewMode === "settings" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setViewMode("settings")}
          style={{ marginLeft: "10px" }}
        >
          Налаштування
        </Button>
        <Button
          variant={viewMode === "expenses" ? "contained" : "outlined"}
          color="error"
          onClick={() => setViewMode("expenses")}
          style={{ marginLeft: "10px" }}
        >
          Витрати
        </Button>
      </div>

      {/* Відображення відповідної секції */}
      {/* Відображення відповідного контенту */}
      {viewMode === "overview" && <FinanceOverview />}
      {viewMode === "settings" && <FinanceSettings />}
      {viewMode === "online-orders" && <OnlineOrder />}
      {viewMode === "online-sales" && <OnlineSale />}
      {viewMode === "offline-orders" && <OfflineOrder />}
      {viewMode === "offline-sales" && <OfflineSale />}
      {viewMode === "expenses" && <ExpenseManager />}
      <Outlet />
    </div>
  );
};
export default FinanceTab;
