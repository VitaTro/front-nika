import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockMovements } from "../../../../../redux/inventory/stockMovement/operationsStockMovement";
import {
  selectStockError,
  selectStockLoading,
  selectStockMovements,
} from "../../../../../redux/inventory/stockMovement/selectorsStockMovement";
import AddStockMovementForm from "./AddStockMovementForm";
import PurchaseImport from "./PurchaseImport";

const StockMovementTab = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectStockMovements);
  const loading = useSelector(selectStockLoading);
  const error = useSelector(selectStockError);
  const [viewMode, setViewMode] = useState("view");

  useEffect(() => {
    dispatch(fetchStockMovements());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      {/* 🔘 Перемикачі режимів */}
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
      </Box>

      <Typography variant="h5" gutterBottom>
        📊 Усі складські рухи
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {viewMode === "add" && <AddStockMovementForm />}
      {viewMode === "bulk" && <PurchaseImport />}

      {viewMode === "view" && !loading && (
        <>
          {data.length === 0 ? (
            <Typography>🚫 Немає записів</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>📅 Дата</strong>
                    </TableCell>
                    <TableCell>
                      <strong>📦 Товар</strong>
                    </TableCell>
                    <TableCell>
                      <strong>🔁 Тип</strong>
                    </TableCell>
                    <TableCell>
                      <strong>🔢 К-сть</strong>
                    </TableCell>
                    <TableCell>
                      <strong>💰 Ціна (за од.)</strong>
                    </TableCell>
                    <TableCell>
                      <strong>📝 Faktura</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, i) => (
                    <TableRow key={item._id || i}>
                      <TableCell>
                        {new Date(item.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{item.product?.name || "—"}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {item.unitPrice !== undefined
                          ? `${item.unitPrice.toFixed(2)} zł`
                          : "—"}
                      </TableCell>
                      <TableCell>{item.note || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Box>
  );
};

export default StockMovementTab;
