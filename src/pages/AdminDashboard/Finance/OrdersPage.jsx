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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import PaginationComponent from "../../../components/PaginationComponent/PaginationComponent";
import {
  fetchOrders,
  updateOrderStatus,
} from "../../../redux/order/operationOrder";
import {
  selectOrders,
  selectOrdersError,
  selectOrdersLoading,
} from "../../../redux/order/selectorsOrder";
import OrderDetails from "../order/OrderDetails";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const ordersPerPage = 10;

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const currentOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, newStatus }));
  };

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
          {currentOrders.map((order) => (
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
                  onClick={() => handleStatusUpdate(order.orderId, "queued")}
                >
                  В черзі
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleStatusUpdate(order.orderId, "assembled")}
                >
                  Зібрано
                </Button>
                <Button
                  size="small"
                  color="success"
                  onClick={() => handleStatusUpdate(order.orderId, "shipped")}
                >
                  Відправлено
                </Button>
                <Button
                  size="small"
                  color="info"
                  onClick={() => handleOpenDetails(order)}
                >
                  Деталі
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {selectedOrder && (
        <OrderDetails
          open={!!selectedOrder}
          onClose={handleCloseDetails}
          order={selectedOrder}
        />
      )}
    </TableContainer>
  );
};

export default OrdersPage;
