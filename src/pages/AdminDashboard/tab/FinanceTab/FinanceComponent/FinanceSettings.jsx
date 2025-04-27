import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";
import { fetchFinanceSettings } from "../../../../../redux/finance/overview/operationOverview";
import {
  selectFinanceError,
  selectFinanceLoading,
  selectFinanceOverview,
} from "../../../../../redux/finance/overview/selectorsOverview";

const FinanceSettings = () => {
  const dispatch = useDispatch();
  const overview = useSelector(selectFinanceOverview);
  const isLoading = useSelector(selectFinanceLoading);
  const error = useSelector(selectFinanceError);

  useEffect(() => {
    dispatch(fetchFinanceSettings());
  }, [dispatch]);
  if (isLoading) return <Loader />;
  if (error) {
    return (
      <Typography color="error">Помилка завантаження даних: {error}</Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Фінансова статистика
      </Typography>

      <Typography variant="h6">
        Загальна кількість продуктів: {overview?.stats?.totalProducts || "N/A"}
      </Typography>
      <Typography variant="h6">
        Загальні замовлення онлайн:{" "}
        {overview?.stats?.totalOnlineOrders || "N/A"}
      </Typography>
      <Typography variant="h6">
        Загальні замовлення офлайн:{" "}
        {overview?.stats?.totalOfflineOrders || "N/A"}
      </Typography>
      <Typography variant="h6">
        Чистий дохід онлайн-продажів:{" "}
        {overview?.salesOverview?.online?.netProfit || "N/A"} zł
      </Typography>
      <Typography variant="h6">
        Чистий дохід офлайн-продажів:{" "}
        {overview?.salesOverview?.offline?.netProfit || "N/A"} zł
      </Typography>
    </Box>
  );
};
export default FinanceSettings;
