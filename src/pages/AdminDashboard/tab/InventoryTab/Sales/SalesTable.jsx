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
import { useEffect, useState } from "react";
import axios from "../../../../../redux/axiosConfig";
import SalesExpandableRow from "./SalesRowExpandable";

const SalesTable = () => {
  const [offlineSales, setOfflineSales] = useState([]);
  const [onlineSales, setOnlineSales] = useState([]);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const resOffline = await axios.get("/api/admin/finance/offline/sales");
        const resOnline = await axios.get("/api/admin/finance/online/sales");
        setOfflineSales(resOffline.data);
        setOnlineSales(Array.isArray(resOnline.data) ? resOnline.data : []);
      } catch (err) {
        console.error("❌ Błąd pobierania sprzedaży:", err);
      }
    };
    fetchSales();
  }, []);

  const allSales = [
    ...(Array.isArray(offlineSales) ? offlineSales : []),
    ...(Array.isArray(onlineSales) ? onlineSales : []),
  ].sort((a, b) => new Date(b.saleDate) - new Date(a.saleDate));

  if (allSales.length === 0) {
    return <Typography>📭 Brak danych sprzedaży</Typography>;
  }

  return isMobile ? (
    <Box sx={{ mt: 2 }}>
      {allSales.map((sale) => (
        <Paper key={sale._id} sx={{ mb: 2, p: 2 }}>
          <Typography variant="subtitle2">
            📅 {new Date(sale.saleDate).toLocaleDateString("pl-PL")}
          </Typography>
          <Typography variant="body2">🧾 ID: {sale._id?.slice(-6)}</Typography>
          <Typography variant="body2">
            💸 Kwota: {sale.totalAmount?.toFixed(2) ?? "0.00"} zł
          </Typography>
          <Typography variant="body2">
            💳 Płatność: {sale.paymentMethod ?? "—"}
          </Typography>
          <Typography variant="body2">
            📌 Status: {sale.status ?? "Oczekuje"}
          </Typography>
        </Paper>
      ))}
    </Box>
  ) : (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <strong>📅 Data</strong>
            </TableCell>
            <TableCell>
              <strong>🧾 ID</strong>
            </TableCell>
            <TableCell>
              <strong>💸 Kwota</strong>
            </TableCell>
            <TableCell>
              <strong>💳 Płatność</strong>
            </TableCell>
            <TableCell>
              <strong>📌 Status</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allSales.map((sale) => (
            <SalesExpandableRow key={sale._id} sale={sale} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalesTable;
