import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectStockMovements } from "../../../../../redux/inventory/stockMovement/selectorsStockMovement";

const StockProfitOverview = () => {
  const movements = useSelector(selectStockMovements);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const allSaleMovements = movements.filter((m) => m.type === "sale");

  const getProfitRowData = (sale) => {
    const relevantPurchases = movements
      .filter(
        (m) =>
          m.type === "purchase" &&
          m.productIndex === sale.productIndex &&
          new Date(m.date) < new Date(sale.date)
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const lastPurchase = relevantPurchases[0];
    const purchasePrice = lastPurchase?.unitPurchasePrice ?? null;
    const salePrice = sale.unitSalePrice;
    const quantity = sale.quantity;
    const profit =
      purchasePrice !== null ? (salePrice - purchasePrice) * quantity : null;

    return {
      date: new Date(sale.date).toLocaleDateString(),
      name: sale.productName || "—",
      index: sale.productIndex,
      purchase: purchasePrice !== null ? purchasePrice.toFixed(2) : "—",
      sale: salePrice.toFixed(2),
      diff: profit !== null ? profit.toFixed(2) : "—",
    };
  };

  const totalProfit = allSaleMovements.reduce((sum, sale) => {
    const row = getProfitRowData(sale);
    return sum + (Number(row.diff) || 0);
  }, 0);

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        📦 Прибуток по складу
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Продажів: {allSaleMovements.length} — Загальний прибуток:{" "}
        <strong style={{ color: totalProfit > 0 ? "green" : "red" }}>
          {totalProfit.toFixed(2)} zł
        </strong>
      </Typography>

      <TableContainer>
        {isMobile ? (
          <Box>
            {allSaleMovements.map((sale, idx) => {
              const row = getProfitRowData(sale);
              return (
                <Paper key={idx} sx={{ p: 1, mb: 1 }}>
                  <Typography variant="subtitle2">{row.date}</Typography>
                  <Typography>
                    <strong>{row.name}</strong>
                  </Typography>
                  <Typography>Індекс: {row.index}</Typography>
                  <Typography>Закупка: {row.purchase} zł</Typography>
                  <Typography>Продаж: {row.sale} zł</Typography>
                  <Typography
                    sx={{
                      color: Number(row.diff) >= 0 ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    Різниця: {row.diff} zł
                  </Typography>
                </Paper>
              );
            })}
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>📅 Дата</TableCell>
                <TableCell>📦 Назва</TableCell>
                <TableCell>🆔 Індекс</TableCell>
                <TableCell>💸 Закупка</TableCell>
                <TableCell>💰 Продаж</TableCell>
                <TableCell>📊 Різниця</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSaleMovements.map((sale, idx) => {
                const row = getProfitRowData(sale);
                return (
                  <TableRow key={idx}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.index}</TableCell>
                    <TableCell>{row.purchase} zł</TableCell>
                    <TableCell>{row.sale} zł</TableCell>
                    <TableCell
                      sx={{
                        color: Number(row.diff) >= 0 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {row.diff} zł
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Paper>
  );
};

export default StockProfitOverview;
