import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  selectCurrentUserOrder,
  selectUserOrdersError,
  selectUserOrdersLoading,
} from "../../../../redux/user/userOrders/selectorsUserOrders";

import OrderDetailsCard from "./OrderDetailsCard";
import StatusChip from "./StatusChip";

import { fetchUserOrderById } from "../../../../redux/user/userOrders/operationsUserOrders";
import Pending from "../../../icons/shop_pending.png";
import Success from "../../../icons/shop_success.png";
import Loader from "../../../Loader";

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

  const isUnpaid = order.paymentStatus === "unpaid";

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {t("order_details")} #{order.orderId}
      </Typography>

      {/* ВІЗУАЛЬНИЙ СТАТУС */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <img
          src={isUnpaid ? Pending : Success}
          alt="Order status"
          style={{ width: 180, marginBottom: 10 }}
        />

        {isUnpaid ? (
          <>
            <Typography variant="h6" sx={{ mt: 1 }}>
              {t("order_waiting_payment")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("payment_link_sent")}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ mt: 1 }}>
              {t("payment_successful")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("order_will_be_sent")}
            </Typography>
          </>
        )}
        <StatusChip status={order.status} />
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
