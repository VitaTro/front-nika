import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { fetchOrders } from "../../../redux/order/operationOrder";
import {
  selectOrders,
  selectOrdersError,
  selectOrdersLoading,
} from "../../../redux/order/selectorsOrder";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <TableContainer component={Paper}>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Замовлення</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Назва продукту</TableCell>
            <TableCell>Кількість</TableCell>
            <TableCell>Ціна</TableCell>
            <TableCell>Адреса доставки</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Дії</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderId}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>
                {order.products
                  .map((product) => `${product.name} (${product.quantity} шт.)`)
                  .join(", ")}
              </TableCell>
              <TableCell>
                {order.products.reduce(
                  (total, product) => total + product.quantity,
                  0
                )}
              </TableCell>
              <TableCell>{order.totalPrice} zł</TableCell>
              <TableCell>{order.deliveryAddress}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => console.log("Edit order", order.orderId)}
                >
                  Редагувати
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => console.log("Delete order", order.orderId)}
                >
                  Видалити
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersPage;
