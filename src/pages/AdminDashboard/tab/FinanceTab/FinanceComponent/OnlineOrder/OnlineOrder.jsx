import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../../components/Loader";
import { fetchOnlineOrders } from "../../../../../../redux/finance/onlineOrder/operationOnlineOrder";
import {
  selectOnlineOrders,
  selectOnlineOrdersError,
  selectOnlineOrdersLoading,
} from "../../../../../../redux/finance/onlineOrder/selectorsOnlineOrder";
import OnlineOrderDetails from "./OnlineOrderDetails";
import OrderStatus from "./OrderStatus";

const statusColors = {
  new: "info",
  received: "primary",
  assembled: "warning",
  shipped: "success",
  completed: "success",
  cancelled: "error",
};

const OnlineOrder = () => {
  const dispatch = useDispatch();
  const onlineOrders = useSelector(selectOnlineOrders);
  const loading = useSelector(selectOnlineOrdersLoading);
  const error = useSelector(selectOnlineOrdersError);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    dispatch(fetchOnlineOrders());
  }, [dispatch]);

  const handleCloseDetails = () => setSelectedOrder(null);

  if (loading) return <Loader />;
  if (error) return <Typography color="error">❌ Помилка: {error}</Typography>;

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Typography variant="h5" gutterBottom>
        📦 Онлайн-замовлення
      </Typography>

      <Stack spacing={2}>
        {onlineOrders.map((order) => (
          <Card key={order._id}>
            <CardContent>
              <Stack
                direction={isMobile ? "column" : "row"}
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="subtitle1">
                    ID: {order.orderId}
                  </Typography>
                  <Chip
                    label={order.status}
                    color={statusColors[order.status]}
                    sx={{ mt: 1 }}
                  />
                </Box>

                <Stack
                  direction={isMobile ? "column" : "row"}
                  spacing={1}
                  alignItems={isMobile ? "stretch" : "center"}
                >
                  <Button
                    variant="contained"
                    onClick={() => setSelectedOrder(order)}
                    fullWidth={isMobile}
                  >
                    🔎 Деталі
                  </Button>

                  <OrderStatus order={order} isMobile={isMobile} />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {selectedOrder && (
        <OnlineOrderDetails
          order={selectedOrder}
          onClose={handleCloseDetails}
        />
      )}
    </Box>
  );
};

export default OnlineOrder;
