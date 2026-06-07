import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserOrderById } from "../../../../redux/user/userOrders/operationsUserOrders";
import {
  selectCurrentUserOrder,
  selectUserOrdersError,
  selectUserOrdersLoading,
} from "../../../../redux/user/userOrders/selectorsUserOrders";
import Pending from "../../../icons/shop_pending.png";
import Success from "../../../icons/shop_success.png";
import Loader from "../../../Loader";
import OrderDetailsCard from "./OrderDetailsCard";
import StatusChip from "./StatusChip";

const UserSingleOrder = ({ orderId: orderIdProp, onBack }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const orderId = orderIdProp || params.orderId;
  const loading = useSelector(selectUserOrdersLoading);
  const error = useSelector(selectUserOrdersError);
  const order = useSelector(selectCurrentUserOrder);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchUserOrderById(orderId));
    }
  }, [dispatch, orderId]);

  if (loading || !order) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">{t("error_loading_order")}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {t("order_details")} #{order.orderId}
      </Typography>

      {/* ВІЗУАЛЬНИЙ СТАТУС */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          {/* Іконка оплати */}
          <Stack direction="column" spacing={1} alignItems="center">
            <img
              src={order.paymentStatus === "paid" ? Success : Pending}
              alt="Payment status"
              style={{ width: 80 }}
            />
            <Typography variant="body2" color="text.secondary">
              {t(`status.${order.paymentStatus}`)}
            </Typography>
          </Stack>

          {/* Іконка статусу замовлення */}
          <Stack direction="column" spacing={1} alignItems="center">
            <StatusChip status={order.status} />
          </Stack>
        </Stack>

        {/* ДОДАТКОВІ ТЕКСТОВІ ПОВІДОМЛЕННЯ */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          {order.paymentStatus === "unpaid" && (
            <>
              <Typography variant="body2" color="text.secondary">
                {t("order_waiting_payment")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("payment_link_sent")}
              </Typography>
            </>
          )}

          {order.paymentStatus === "paid" && order.status !== "shipped" && (
            <>
              <Typography variant="body2" color="text.secondary">
                {t("payment_successful")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("order_will_be_sent")}
              </Typography>
            </>
          )}
          {order.status === "shipped" && (
            <>
              <Typography variant="body2" color="text.secondary">
                {t("payment_successful")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("order_tracking_info")}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      {/* ІНФОРМАЦІЯ ПРО ЗАМОВЛЕННЯ */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1">
          {t("created_at")}: {new Date(order.createdAt).toLocaleString("pl-PL")}
        </Typography>

        <Typography variant="body1">
          {t("delivery_type")}: {order.deliveryType}
        </Typography>

        {order.deliveryAddress && (
          <Typography variant="body1">
            {t("delivery_address")}: {order.deliveryAddress.street}{" "}
            {order.deliveryAddress.houseNumber}, {order.deliveryAddress.city}
          </Typography>
        )}

        <Typography variant="h6" sx={{ mt: 2 }}>
          {t("total")}: {order.totalPrice} zł
        </Typography>
      </Box>

      {/* ТОВАРИ */}
      <Box sx={{ mt: 4 }}>
        <OrderDetailsCard order={order} />
      </Box>

      {/* ПОВЕРНУТИСЯ ДО СПИСКУ */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="outlined" onClick={onBack}>
          {t("back_to_orders")}
        </Button>
      </Box>
    </Box>
  );
};

export default UserSingleOrder;
