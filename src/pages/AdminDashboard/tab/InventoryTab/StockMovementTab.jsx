import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockMovements } from "../../../../redux/inventory/stockMovement/operationsStockMovement";
import {
  selectStockError,
  selectStockLoading,
  selectStockMovements,
} from "../../../../redux/inventory/stockMovement/selectorsStockMovement";
import ProductGridWithSummary from "./IndexDetails/ProductGridWithSummary";
import SalesTable from "./Sales/SalesTable";
import AddStockMovementForm from "./StockMovement/tab/AddStockMovementForm";
import PurchaseImport from "./StockMovement/tab/PurchaseImport";
import StockMovementTable from "./StockMovement/tab/StockMovementTable";
const StockMovementTab = () => {
  const dispatch = useDispatch();
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
        <Button
          variant={viewMode === "analytics" ? "contained" : "outlined"}
          onClick={() => setViewMode("analytics")}
        >
          Аналітика
        </Button>
      </Box>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {viewMode === "add" && <AddStockMovementForm />}
      {viewMode === "bulk" && <PurchaseImport />}
      {viewMode === "view" && !loading && <StockMovementTable />}
      {viewMode === "sales" && <SalesTable />}
      {viewMode === "analytics" && (
        <ProductGridWithSummary productIndexes={uniqueIndexes} />
      )}
    </Box>
  );
};

export default StockMovementTab;
