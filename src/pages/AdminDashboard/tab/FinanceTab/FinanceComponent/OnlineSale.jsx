import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOnlineSales,
  updateOnlineSale,
} from "../../../../../redux/finance/onlineSale/operationOnlineSale";
import {
  selectOnlineSales,
  selectOnlineSalesError,
  selectOnlineSalesLoading,
} from "../../../../../redux/finance/onlineSale/selectorsOnlineSale";

const OnlineSale = () => {
  const dispatch = useDispatch();
  const onlineSales = useSelector(selectOnlineSales);
  const loading = useSelector(selectOnlineSalesLoading);
  const error = useSelector(selectOnlineSalesError);

  useEffect(() => {
    dispatch(fetchOnlineSales());
  }, [dispatch]);

  const handleStatusUpdate = (saleId, newStatus) => {
    dispatch(updateOnlineSale({ saleId, updatedData: { status: newStatus } }));
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Онлайн-продажі
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Продукти</TableCell>
            <TableCell>Кількість</TableCell>
            <TableCell>Загальна сума</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Дії</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {onlineSales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.id}</TableCell>
              <TableCell>
                {sale.products
                  .map(
                    (product) => `${product.productId} (${product.quantity})`
                  )
                  .join(", ")}
              </TableCell>
              <TableCell>
                {sale.products.reduce(
                  (total, product) => total + product.quantity,
                  0
                )}
              </TableCell>
              <TableCell>{sale.totalAmount} zł</TableCell>
              <TableCell>{sale.status}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleStatusUpdate(sale.id, "received")}
                >
                  Отримане
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleStatusUpdate(sale.id, "assembled")}
                >
                  Зібране
                </Button>
                <Button
                  size="small"
                  color="info"
                  onClick={() => handleStatusUpdate(sale.id, "shipped")}
                >
                  Вислано
                </Button>
                <Button
                  size="small"
                  color="success"
                  onClick={() => handleStatusUpdate(sale.id, "completed")}
                >
                  Завершено
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleStatusUpdate(sale.id, "cancelled")}
                >
                  Скасовано
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OnlineSale;
