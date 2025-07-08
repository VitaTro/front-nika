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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../../redux/axiosConfig";
import SalesExpandableRow from "./SalesRowExpandable";
const SalesTable = () => {
  const dispatch = useDispatch();
  const [offlineSales, setOfflineSales] = useState([]);
  const [onlineSales, setOnlineSales] = useState([]);
  // const offlineSales = useSelector((state) => state.offlineSales.sales);
  // const onlineSales = useSelector((state) => state.onlineSales.sales);
  const loadingOffline = useSelector((state) => state.offlineSales.loading);
  const loadingOnline = useSelector((state) => state.onlineSales.loading);
  const errorOffline = useSelector((state) => state.offlineSales.error);
  const errorOnline = useSelector((state) => state.onlineSales.error);

  // useEffect(() => {
  //   dispatch(fetchOfflineSales());
  //   dispatch(fetchOnlineSales());
  // }, [dispatch]);
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get("/api/admin/finance/offline/sales");
        console.log("✅ Реальні дані:", res.data);
        setOfflineSales(res.data);
      } catch (err) {
        console.error("❌ Помилка:", err);
      }
    };

    fetchSales();
  }, []);
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get("/api/admin/finance/online/sales");
        console.log("✅ Реальні дані:", res.data);
        setOnlineSales(res.data);
      } catch (err) {
        console.error("❌ Помилка:", err);
      }
    };

    fetchSales();
  }, []);
  const isLoading = loadingOffline || loadingOnline;
  const hasError = errorOffline || errorOnline;
  if (!Array.isArray(offlineSales) || !Array.isArray(onlineSales)) {
    return <Typography>⏳ Завантаження даних продажів...</Typography>;
  }

  const allSales = [
    ...offlineSales.map((sale) => ({
      id: sale._id,
      date: sale.saleDate,
      type: "offline",
      buyer: sale.buyerName || "—",
      amount: sale.totalAmount,
      payment: sale.paymentMethod,
      status: sale.status,
    })),
    ...onlineSales.map((sale) => ({
      id: sale._id,
      date: sale.saleDate,
      type: "online",
      buyer: sale.userId?.email || "—",
      amount: sale.totalAmount,
      payment: sale.paymentMethod,
      status: sale.status,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (isLoading) return <Typography>⏳ Завантаження продажів...</Typography>;
  if (hasError)
    return (
      <Typography color="error">
        ❌ Помилка: {errorOffline || errorOnline}
      </Typography>
    );
  if (allSales.length === 0)
    return <Typography>📭 Продажів не знайдено</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>📅 Дата</strong>
            </TableCell>
            <TableCell>
              <strong>🛍️ Тип</strong>
            </TableCell>
            <TableCell>
              <strong>👤 Покупець</strong>
            </TableCell>
            <TableCell>
              <strong>💳 Оплата</strong>
            </TableCell>
            <TableCell>
              <strong>💸 Сума</strong>
            </TableCell>
            <TableCell>
              <strong>🔖 Статус</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allSales.map((sale) => (
            <SalesExpandableRow key={sale._id} sale={sale} />
            // <TableRow key={sale.id}>
            //   <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
            //   <TableCell>{sale.type}</TableCell>
            //   <TableCell>{sale.buyer}</TableCell>
            //   <TableCell>{sale.payment}</TableCell>
            //   <TableCell>{sale.amount?.toFixed(2)} zł</TableCell>
            //   <TableCell>{sale.status}</TableCell>
            // </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalesTable;
