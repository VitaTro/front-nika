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
import BulkMovementForm from "../MonthlyReport/BulkMovementForm";
import AddStockMovementForm from "./AddStockMovementForm";

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
      </Box>

      {/* 📑 Заголовок */}
      <Typography variant="h5" gutterBottom>
        Усі складські рухи
      </Typography>

      {/* 🔄 Loading / Error */}
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {/* ➕ Режим: Додати */}
      {viewMode === "add" && <AddStockMovementForm />}

      {/* 📥 Режим: Масовий імпорт */}
      {viewMode === "bulk" && <BulkMovementForm />}

      {/* 📋 Режим: Перегляд */}
      {viewMode === "view" && !loading && (
        <>
          {data.length === 0 ? (
            <Typography>Немає запиcів</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Дата</TableCell>
                    <TableCell>Продукт</TableCell>
                    <TableCell>Тип</TableCell>
                    <TableCell>К-сть</TableCell>
                    <TableCell>Ціна</TableCell>
                    <TableCell>Примітка</TableCell>
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
                      <TableCell>{item.unitPrice} zł</TableCell>
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
