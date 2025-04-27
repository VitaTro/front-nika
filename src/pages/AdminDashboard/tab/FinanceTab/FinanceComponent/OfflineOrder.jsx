import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";
import {
  fetchOfflineOrders,
  updateOfflineOrderStatus,
} from "../../../../../redux/finance/offlineOrder/operationOfflineOrder";
import {
  selectOfflineOrders,
  selectOfflineOrdersError,
  selectOfflineOrdersLoading,
} from "../../../../../redux/finance/offlineOrder/selectorsOfflineOrder";
const OfflineOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOfflineOrders);
  const isLoading = useSelector(selectOfflineOrdersLoading);
  const error = useSelector(selectOfflineOrdersError);

  useEffect(() => {
    dispatch(fetchOfflineOrders());
  }, [dispatch]);

  const handleUpdateStatus = (id, newStatus) => {
    dispatch(updateOfflineOrderStatus({ orderId: id, newStatus }));
  };

  if (isLoading) return <Loader />;
  if (error) {
    return <Typography color="error">Помилка: {error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Офлайн-Замовлення
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID Замовлення</TableCell>
            <TableCell>Кількість продуктів</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Оновити статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.totalQuantity}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateStatus(order.id, "completed")}
                >
                  Завершити
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default OfflineOrder;
