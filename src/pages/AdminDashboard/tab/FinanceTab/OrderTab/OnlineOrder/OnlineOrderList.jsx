import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOnlineOrders } from "../../../../../../redux/finance/onlineOrder/operationOnlineOrder";

const OnlineOrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");

  const { onlineOrders } = useSelector((state) => state.onlineOrders);

  useEffect(() => {
    dispatch(fetchOnlineOrders());
  }, [dispatch]);

  if (!onlineOrders || onlineOrders.length === 0) {
    return <Typography>Немає онлайн‑замовлень</Typography>;
  }
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        📦 Онлайн‑замовлення
      </Typography>

      <Table size={isMobile ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Клієнт</TableCell>
            <TableCell>Телефон</TableCell>
            <TableCell>Сума</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {onlineOrders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id.slice(-6)}</TableCell>
              <TableCell>{order.buyerName}</TableCell>
              <TableCell>{order.buyerPhone}</TableCell>
              <TableCell>{order.finalPrice} zł</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() =>
                    navigate(`/admin/finance/orders/online/${order._id}`)
                  }
                >
                  Деталі
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
export default OnlineOrderList;
