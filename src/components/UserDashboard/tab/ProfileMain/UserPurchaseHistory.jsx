import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchaseHistory } from "../../../../redux/user/userOrders/operationsUserOrders";
import {
  selectPurchaseHistory,
  selectUserOrdersError,
  selectUserOrdersLoading,
} from "../../../../redux/user/userOrders/selectorsUserOrders";
import shop from "../../../icons/shop.png";
import Loader from "../../../Loader";

const UserPurchaseHistory = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useSelector(selectPurchaseHistory);
  const loading = useSelector(selectUserOrdersLoading);
  const error = useSelector(selectUserOrdersError);

  useEffect(() => {
    dispatch(fetchPurchaseHistory());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t("order_history")}
      </Typography>

      {loading && <Loader />}
      {!loading && !history.length && (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img src={shop} alt="No orders" style={{ width: 200 }} />
          <Typography variant="h6" color="text.secondary">
            {t("no_purchase_history")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("no_orders_description")}
          </Typography>
        </Box>
      )}

      <Stack spacing={2}>
        {history.map((sale) => (
          <Card key={sale._id}>
            <CardContent>
              <Typography variant="subtitle1">
                {t("order_id")}: {sale.onlineOrderId?.orderId || "-"}
              </Typography>
              <Typography variant="body2">
                {t("date")}:{" "}
                {new Date(sale.saleDate).toLocaleDateString("pl-PL")}
              </Typography>
              <Typography variant="body2">
                {t("payment_method")}:{" "}
                {sale.onlineOrderId?.paymentMethod || "-"}
              </Typography>
              <Typography variant="body2">
                {t("total")}: {sale.onlineOrderId?.totalAmount || "-"} zł
              </Typography>
              <Chip label={t(sale.onlineOrderId?.status)} size="small" />
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default UserPurchaseHistory;
