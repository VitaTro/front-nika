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
import { selectStockMovements } from "../../../../../../redux/inventory/stockMovement/selectorsStockMovement";

const StockMovementTable = () => {
  const data = useSelector(selectStockMovements);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedMovement, setSelectedMovement] = useState(null);

  if (!data || data.length === 0) {
    return <Typography>🚫 Немає записів</Typography>;
  }

  return (
    <>
      {isMobile ? (
        <Box sx={{ mt: 2 }}>
          {data.map((item) => (
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
                💰{" "}
                {item.type === "purchase" &&
                item.unitPurchasePrice !== undefined
                  ? `${item.unitPurchasePrice.toFixed(2)} zł`
                  : item.type === "sale" && item.unitSalePrice !== undefined
                  ? `${item.unitSalePrice.toFixed(2)} zł`
                  : item.price !== undefined
                  ? `${item.price.toFixed(2)} zł`
                  : "—"}
              </Typography>
              <Typography variant="body2">📝 {item.note || "—"}</Typography>
            </Paper>
          ))}
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
                  <strong>📝 Faktura</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, i) => (
                <TableRow key={item._id || `row-${i}`}>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{item.productName || "—"}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {item.type === "purchase" &&
                    item.unitPurchasePrice !== undefined
                      ? `${item.unitPurchasePrice.toFixed(2)} zł`
                      : item.type === "sale" && item.unitSalePrice !== undefined
                      ? `${item.unitSalePrice.toFixed(2)} zł`
                      : item.price !== undefined
                      ? `${item.price.toFixed(2)} zł`
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
  );
};

export default StockMovementTable;
