import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  returnOnlineOrder,
  updateOnlineOrder,
} from "../../../../../../redux/finance/onlineOrder/operationOnlineOrder";
import OnlineSaleButton from "./OnlineSaleButton";

const OnlineOrderActions = ({ order }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:768px)");

  const updateStatus = (status) => {
    dispatch(updateOnlineOrder({ orderId: order._id, status }));
  };

  const updatePayment = () => {
    dispatch(
      updateOnlineOrder({
        orderId: order._id,
        status: "paid",
      }),
    );
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        ⚙️ Дії
      </Typography>

      <Stack direction={isMobile ? "column" : "row"} spacing={2}>
        {/* NEW → RECEIVED */}
        {order.status === "new" && (
          <Button variant="contained" onClick={() => updateStatus("received")}>
            📥 Підтвердити отримання
          </Button>
        )}

        {/* RECEIVED → ASSEMBLED */}
        {order.status === "received" && (
          <Button variant="contained" onClick={() => updateStatus("assembled")}>
            🛠 Підтвердити зібране
          </Button>
        )}

        {/* ASSEMBLED → SHIPPED */}
        {order.status === "assembled" && (
          <Button
            variant="contained"
            color="success"
            onClick={() => updateStatus("shipped")}
          >
            📤 Відправити
          </Button>
        )}

        {/* SHIPPED → COMPLETED */}
        {order.status === "shipped" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateStatus("completed")}
          >
            ✅ Завершити замовлення
          </Button>
        )}

        {/* RETURN */}
        <Button
          variant="outlined"
          color="error"
          onClick={() => dispatch(returnOnlineOrder(order._id))}
        >
          ❌ Повернення
        </Button>
      </Stack>

      {/* PAYMENT */}
      {order.paymentStatus === "unpaid" && (
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={updatePayment}
        >
          💳 Позначити як оплачено
        </Button>
      )}

      {/* SALE BUTTON */}
      {order.status === "completed" && <OnlineSaleButton orderId={order._id} />}
    </Box>
  );
};

export default OnlineOrderActions;
