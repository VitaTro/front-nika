import { Alert, Box, Button, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loader from "../../../../../components/Loader";
import { fetchStockMovements } from "../../../../../redux/inventory/stockMovement/operationsStockMovement";
import {
  selectStockError,
  selectStockLoading,
  selectStockMovements,
} from "../../../../../redux/inventory/stockMovement/selectorsStockMovement";
import ProductGridWithSummary from "../IndexDetails/ProductGridWithSummary";
import SalesTable from "../Sales/SalesTable";
import AddStockMovementForm from "./tab/AddStockMovementForm";
import PurchaseImport from "./tab/PurchaseImport";
import StockMovementTable from "./tab/StockMovementTable";

const StockMovementTab = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const loading = useSelector(selectStockLoading);
  const error = useSelector(selectStockError);
  const [viewMode, setViewMode] = useState("view");
  const [selectedIndex, setSelectedIndex] = useState("Box1900008");
  const [selectedMovement, setSelectedMovement] = useState(null);
  const movements = useSelector(selectStockMovements);
  const uniqueIndexes = [...new Set(movements.map((m) => m.productIndex))];
  useEffect(() => {
    dispatch(fetchStockMovements());
  }, [dispatch]);

  const movementTabs = [
    { label: "Переглянути", value: "view", color: "primary" },
    { label: "Додати рух", value: "add", color: "primary" },
    { label: "Масовий імпорт", value: "bulk", color: "secondary" },
    { label: "Продажі", value: "sales", color: "primary" },
    { label: "Аналітика", value: "analytics", color: "secondary" },
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
        {movementTabs.map((tab, index) => (
          <Button
            key={`${tab.value}-${index}`}
            variant={viewMode === tab.value ? "contained" : "outlined"}
            color={tab.color}
            onClick={() => setViewMode(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </Box>

      {loading && <Loader />}
      {error && <Alert severity="error">{error}</Alert>}

      {viewMode === "add" && <AddStockMovementForm />}
      {viewMode === "bulk" && <PurchaseImport />}
      {viewMode === "view" && !loading && <StockMovementTable />}
      {viewMode === "sales" && <SalesTable />}
      {viewMode === "analytics" && (
        <ProductGridWithSummary productIndexes={uniqueIndexes} />
      )}
      <Outlet />
    </Box>
  );
};

export default StockMovementTab;
