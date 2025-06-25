import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrderReceived,
  fetchUserOrders,
  returnOrder,
} from "../../../../../redux/user/userOrders/operationsUserOrders";
import {
  selectUserOrders,
  selectUserOrdersError,
  selectUserOrdersLoading,
} from "../../../../../redux/user/userOrders/selectorsUserOrders";
import Loader from "../../../../Loader";
import NoResults from "../../../../NoResults/NoResults";
import OrderDetailsCard from "./OrderDetailsCard";
import StatusChip from "./StatusChip";

const UserOrderDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const loading = useSelector(selectUserOrdersLoading);
  const error = useSelector(selectUserOrdersError);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleConfirmReceived = (orderId) => {
    dispatch(confirmOrderReceived(orderId));
  };

  const handleReturnOrder = (orderId) => {
    dispatch(returnOrder({ orderId, returnedProducts: [], returnAmount: 0 }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "unpaid":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "completed":
        return "success";
      case "returned":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom align="center">
        🧾{t("your_orders")}
      </Typography>

      {loading && <Loader />}
      {!loading && !orders.length && <NoResults message={t("no_orders")} />}

      <Stack spacing={2}>
        {orders.map((order) => (
          <Card key={order._id} variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                {t("order_id")}: {order.orderId}
              </Typography>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mt={1}
              >
                <Typography variant="h6">
                  {t("total_price")}: {order.totalPrice} zł
                </Typography>
                <StatusChip status={order.status} />
              </Stack>

              <Typography sx={{ mt: 1 }} color="text.secondary">
                {new Date(order.createdAt).toLocaleDateString()}
              </Typography>

              <Stack direction="row" spacing={1} mt={2}>
                {order.status === "shipped" && (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleConfirmReceived(order._id)}
                  >
                    {t("confirm_received")}
                  </Button>
                )}

                {order.status === "completed" && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleReturnOrder(order._id)}
                  >
                    {t("return_order")}
                  </Button>
                )}
              </Stack>
              <Button
                onClick={() =>
                  setSelected(selected?._id === order._id ? null : order)
                }
              >
                {" "}
                {selected?._id === order._id
                  ? t("hide_details")
                  : t("show_details")}
              </Button>

              {selected?._id === order._id && (
                <Box mt={2}>
                  <OrderDetailsCard order={order} />
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default UserOrderDetails;
