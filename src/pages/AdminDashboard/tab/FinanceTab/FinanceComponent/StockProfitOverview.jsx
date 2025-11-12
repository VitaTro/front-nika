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
import { selectOfflineSales } from "../../../../../redux/finance/offlineSale/selectorsOfflineSale";
import { selectStockMovements } from "../../../../../redux/inventory/stockMovement/selectorsStockMovement";

const StockProfitOverview = () => {
  const movements = useSelector(selectStockMovements);
  const offlineSales = useSelector(selectOfflineSales);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const allSaleMovements = movements.filter((m) => m.type === "sale");

  const offlineSaleMap = {};
  offlineSales.forEach((sale) => {
    offlineSaleMap[sale._id] = sale;
  });

  const groupedMovements = {};
  allSaleMovements.forEach((m) => {
    const key = m.relatedSaleId;
    if (!key) return;
    if (!groupedMovements[key]) groupedMovements[key] = [];
    groupedMovements[key].push(m);
  });

  const getLastPurchasePrice = (sale) => {
    const relevantPurchases = movements
      .filter(
        (m) =>
          m.type === "purchase" &&
          m.productIndex === sale.productIndex &&
          new Date(m.date) < new Date(sale.date)
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return relevantPurchases[0]?.unitPurchasePrice ?? null;
  };

  const getFinalRowData = (sale) => {
    const saleId = sale.relatedSaleId;
    const saleGroup = groupedMovements[saleId];
    const saleInfo = offlineSaleMap[saleId];

    if (saleId && saleGroup && saleInfo) {
      const totalQty = saleGroup.reduce((sum, m) => sum + m.quantity, 0);
      const discountPerUnit = saleInfo.discount / totalQty;
      const adjustedSalePrice = sale.unitSalePrice - discountPerUnit;
      const purchasePrice = getLastPurchasePrice(sale);
      const profit =
        purchasePrice !== null
          ? (adjustedSalePrice - purchasePrice) * sale.quantity
          : null;

      return {
        date: new Date(sale.date).toLocaleDateString(),
        name: sale.productName || "—",
        index: sale.productIndex,
        purchase: purchasePrice !== null ? purchasePrice.toFixed(2) : "—",
        sale: adjustedSalePrice.toFixed(2),
        diff: profit !== null ? profit.toFixed(2) : "—",
        discount: discountPerUnit.toFixed(2),
      };
    }

    // 🔁 Fallback
    const purchasePrice = getLastPurchasePrice(sale);
    const salePrice = sale.finalUnitPrice ?? sale.unitSalePrice;
    const profit =
      purchasePrice !== null
        ? (salePrice - purchasePrice) * sale.quantity
        : null;

    return {
      date: new Date(sale.date).toLocaleDateString(),
      name: sale.productName || "—",
      index: sale.productIndex,
      purchase: purchasePrice !== null ? purchasePrice.toFixed(2) : "—",
      sale: salePrice.toFixed(2),
      diff: profit !== null ? profit.toFixed(2) : "—",
      discount: (
        sale.unitSalePrice - (sale.finalUnitPrice ?? sale.unitSalePrice)
      ).toFixed(2),
    };
  };

  const totalProfit = allSaleMovements.reduce((sum, sale) => {
    const row = getFinalRowData(sale);
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
              const row = getFinalRowData(sale);
              return (
                <Paper key={idx} sx={{ p: 1, mb: 1 }}>
                  <Typography variant="subtitle2">{row.date}</Typography>
                  <Typography>
                    <strong>{row.name}</strong>
                  </Typography>
                  <Typography>Індекс: {row.index}</Typography>
                  <Typography>Закупка: {row.purchase} zł</Typography>
                  <Typography>Продаж: {row.sale} zł</Typography>
                  <Typography>Знижка: {row.discount} zł</Typography>
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
                <TableCell>🔻 Знижка</TableCell>
                <TableCell>📊 Різниця</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSaleMovements.map((sale, idx) => {
                const row = getFinalRowData(sale);
                return (
                  <TableRow key={idx}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.index}</TableCell>
                    <TableCell>{row.purchase} zł</TableCell>
                    <TableCell>{row.sale} zł</TableCell>
                    <TableCell>{row.discount} zł</TableCell>
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
