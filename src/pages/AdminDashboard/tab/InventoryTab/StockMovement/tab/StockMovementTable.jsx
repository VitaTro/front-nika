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
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectOfflineSales } from "../../../../../../redux/finance/offlineSale/selectorsOfflineSale";
import { selectStockMovements } from "../../../../../../redux/inventory/stockMovement/selectorsStockMovement";

const StockMovementTable = () => {
  const movements = useSelector(selectStockMovements);
  const offlineSales = useSelector(selectOfflineSales);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedMovement, setSelectedMovement] = useState(null);

  if (!movements || movements.length === 0) {
    return <Typography>🚫 Немає записів</Typography>;
  }

  // 🧠 Мапа продажів
  const offlineSaleMap = {};
  offlineSales.forEach((sale) => {
    offlineSaleMap[sale._id] = sale;
  });

  // 📦 Групування рухів по замовленнях
  const groupedMovements = {};
  movements.forEach((m) => {
    if (m.type === "sale" && m.relatedSaleId) {
      if (!groupedMovements[m.relatedSaleId]) {
        groupedMovements[m.relatedSaleId] = [];
      }
      groupedMovements[m.relatedSaleId].push(m);
    }
  });

  // 📊 Розрахунок ціни та знижки
  const getAdjustedPrice = (item) => {
    const saleId = item.relatedSaleId;
    const saleInfo = offlineSaleMap[saleId];
    const group = groupedMovements[saleId];

    if (saleInfo && group) {
      const totalQty = group.reduce((sum, m) => sum + m.quantity, 0);
      const discountPerUnit = saleInfo.discount / totalQty;
      return {
        price: item.unitSalePrice - discountPerUnit,
        discount: discountPerUnit,
      };
    }

    // fallback
    return {
      price: item.finalUnitPrice ?? item.unitSalePrice ?? item.price ?? null,
      discount:
        item.unitSalePrice && item.finalUnitPrice
          ? item.unitSalePrice - item.finalUnitPrice
          : 0,
    };
  };

  return (
    <>
      {isMobile ? (
        <Box sx={{ mt: 2 }}>
          {movements.map((item) => {
            const { price, discount } = getAdjustedPrice(item);
            return (
              <Paper key={item._id} sx={{ mb: 2, p: 2 }}>
                <Typography variant="subtitle2">
                  📦 {item.productName || "—"}
                </Typography>
                <Typography variant="body2">
                  📅 {new Date(item.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">🔁 {item.type}</Typography>
                <Typography variant="body2">🔢 {item.quantity}</Typography>
                <Typography variant="body2">
                  💰 {price !== null ? `${price.toFixed(2)} zł` : "—"}
                </Typography>
                {discount > 0 && (
                  <Typography variant="body2" sx={{ color: "orange" }}>
                    🔻 Знижка: {discount.toFixed(2)} zł
                  </Typography>
                )}
                <Typography variant="body2">📝 {item.note || "—"}</Typography>
              </Paper>
            );
          })}
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table stickyHeader>
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
                  <strong>🔻 Знижка</strong>
                </TableCell>
                <TableCell>
                  <strong>📝 Faktura</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movements.map((item, i) => {
                const { price, discount } = getAdjustedPrice(item);
                return (
                  <TableRow key={item._id || `row-${i}`}>
                    <TableCell>
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{item.productName || "—"}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell
                      sx={{
                        color: discount > 0 ? "orange" : "inherit",
                        fontWeight: discount > 0 ? "bold" : "normal",
                      }}
                    >
                      {price !== null ? `${price.toFixed(2)} zł` : "—"}
                    </TableCell>
                    <TableCell>
                      {discount > 0 ? `${discount.toFixed(2)} zł` : "—"}
                    </TableCell>
                    <TableCell>{item.note || "—"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default StockMovementTable;
