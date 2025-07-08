import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectStockMovements } from "../../../../../../redux/inventory/stockMovement/selectorsStockMovement";

const StockMovementTable = () => {
  const data = useSelector(selectStockMovements);

  if (!data || data.length === 0) {
    return <Typography>🚫 Немає записів</Typography>;
  }

  return (
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
              <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
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
  );
};

export default StockMovementTable;
