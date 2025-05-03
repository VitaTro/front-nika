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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";
import PaginationComponent from "../../../../../components/PaginationComponent/PaginationComponent";
import { fetchOnlineOrders } from "../../../../../redux/finance/onlineOrder/operationOnlineOrder";
import {
  selectOnlineOrders,
  selectOnlineOrdersError,
  selectOnlineOrdersLoading,
} from "../../../../../redux/finance/onlineOrder/selectorsOnlineOrder";
const OnlineOrder = () => {
  const dispatch = useDispatch();
  const onlineOrders = useSelector(selectOnlineOrders);
  const loading = useSelector(selectOnlineOrdersLoading);
  const error = useSelector(selectOnlineOrdersError);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const ordersPerPage = 10;

  useEffect(() => {
    dispatch(fetchOnlineOrders());
  }, [dispatch]);

  const totalPages = Math.ceil(onlineOrders.length / ordersPerPage);
  const currentOrders = onlineOrders.slice(
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
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Онлайн-замовлення
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Продукти</TableCell>
            <TableCell>Кількість</TableCell>
            <TableCell>Ціна</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Дії</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {onlineOrders.map((order) => (
            <TableRow key={order.orderId}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>
                {order.products
                  .map(
                    (product) => `${product.productId} (${product.quantity}шт.)`
                  )
                  .join(", ")}
              </TableCell>
              <TableCell>{order.totalQuantity}</TableCell>
              <TableCell>{order.totalPrice} zł</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  color="info"
                  onClick={() => handleOpenDetails(order)}
                >
                  Деталі
                </Button>
                <Button
                  size="small"
                  color="info"
                  onClick={() => handleStatusUpdate(order.orderId, "received")}
                >
                  Отримане
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleStatusUpdate(order.orderId, "assembled")}
                >
                  Зібране
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleStatusUpdate(order.orderId, "shipped")}
                >
                  Вислано
                </Button>
                <Button
                  size="small"
                  color="success"
                  onClick={() => handleStatusUpdate(order.orderId, "completed")}
                >
                  Завершити
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleStatusUpdate(order.orderId, "cancelled")}
                >
                  Скасувати
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
export default OnlineOrder;
