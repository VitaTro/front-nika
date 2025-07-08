import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockMovements } from "../../../../../redux/inventory/stockMovement/operationsStockMovement";
import {
  selectStockError,
  selectStockLoading,
} from "../../../../../redux/inventory/stockMovement/selectorsStockMovement";
import SalesTable from "../Sales/SalesTable";
import AddStockMovementForm from "./tab/AddStockMovementForm";
import PurchaseImport from "./tab/PurchaseImport";
import StockMovementTable from "./tab/StockMovementTable";
const StockMovementTab = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectStockLoading);
  const error = useSelector(selectStockError);
  const [viewMode, setViewMode] = useState("view");

  useEffect(() => {
    dispatch(fetchStockMovements());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      {/* 🔘 Режими */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button
          variant={viewMode === "view" ? "contained" : "outlined"}
          onClick={() => setViewMode("view")}
        >
          Переглянути
        </Button>
        <Button
          variant={viewMode === "add" ? "contained" : "outlined"}
          onClick={() => setViewMode("add")}
        >
          Додати рух
        </Button>
        <Button
          variant={viewMode === "bulk" ? "contained" : "outlined"}
          onClick={() => setViewMode("bulk")}
        >
          Масовий імпорт
        </Button>
        <Button
          variant={viewMode === "sales" ? "contained" : "outlined"}
          onClick={() => setViewMode("sales")}
        >
          Продажі
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        📊 Усі складські рухи
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {viewMode === "add" && <AddStockMovementForm />}
      {viewMode === "bulk" && <PurchaseImport />}
      {viewMode === "view" && !loading && <StockMovementTable />}
      {viewMode === "sales" && <SalesTable />}
    </Box>
  );
};

export default StockMovementTab;
