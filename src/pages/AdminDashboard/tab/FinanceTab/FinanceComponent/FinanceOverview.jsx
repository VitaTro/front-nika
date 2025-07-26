import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";
import { fetchFinanceOverview } from "../../../../../redux/finance/overview/operationOverview";
import {
  selectCompletedSales,
  selectExpensesSummary,
  selectFinanceError,
  selectFinanceLoading,
  selectFinanceStats,
} from "../../../../../redux/finance/overview/selectorsOverview";
import { selectStockMovements } from "../../../../../redux/inventory/stockMovement/selectorsStockMovement";

Chart.register(...registerables);

const FinanceOverview = () => {
  const dispatch = useDispatch();
  const stats = useSelector(selectFinanceStats);
  const completedSales = useSelector(selectCompletedSales);
  const isLoading = useSelector(selectFinanceLoading);
  const error = useSelector(selectFinanceError);
  const expenses = useSelector(selectExpensesSummary);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const movements = useSelector(selectStockMovements);
  const chartRef = useRef(null);
  const conversionRates = {
    USD: 0.25,
    PLN: 1,
  };

  const getNetProfit = (sale) => {
    const products = sale.products || [];
    let profit = 0;

    products.forEach((p) => {
      const quantity = Number(p.quantity) || 0;
      const price = Number(p.price) || 0;
      const purchase = Number(p.purchasePrice) || 0;
      const currency = p.currency || "USD";
      const rate = conversionRates[currency] || 1;

      profit += quantity * (price - purchase * rate);
    });

    return profit;
  };
  const getNetProfitFromMovement = (saleMovement, purchaseMovements) => {
    const relevantPurchases = purchaseMovements
      .filter(
        (p) =>
          p.productIndex === saleMovement.productIndex &&
          p.date < saleMovement.date
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // беремо останній

    const lastPurchase = relevantPurchases[0];

    if (!lastPurchase) return 0;

    const purchasePrice = lastPurchase.unitPurchasePrice;
    const salePrice = saleMovement.unitSalePrice;
    const quantity = saleMovement.quantity;

    return (salePrice - purchasePrice) * quantity;
  };

  const getTotalPrice = (sale) => {
    return (sale.products || []).reduce((sum, p) => {
      return sum + (Number(p.price) || 0) * (Number(p.quantity) || 1);
    }, 0);
  };
  const saleMovements = movements.filter((m) => m.type === "sale");

  const stockProfit = saleMovements.reduce((total, sale) => {
    const purchaseBeforeSale = movements
      .filter(
        (m) =>
          m.type === "purchase" &&
          m.productIndex === sale.productIndex &&
          new Date(m.date) < new Date(sale.date)
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const lastPurchase = purchaseBeforeSale[0];
    if (!lastPurchase) return total;

    const profit =
      (sale.unitSalePrice - lastPurchase.unitPurchasePrice) * sale.quantity;
    return total + profit;
  }, 0);

  useEffect(() => {
    dispatch(fetchFinanceOverview());
  }, [dispatch]);

  const onlineProfit = completedSales
    .filter((s) => s.source === "online")
    .reduce((sum, s) => sum + getNetProfit(s), 0);

  const offlineProfit = completedSales
    .filter((s) => s.source === "offline")
    .reduce((sum, s) => sum + getNetProfit(s), 0);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Typography color="error">Помилка завантаження даних: {error}</Typography>
    );

  return (
    <Box sx={{ maxHeight: "85vh", overflowY: "auto", p: isMobile ? 1 : 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        📊 Фінансовий огляд
      </Typography>

      {/* Загальна статистика */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Загальна статистика</Typography>
        <Typography>📦 Продукти: {stats?.totalProducts ?? "—"}</Typography>
        <Typography>
          🛒 Онлайн-продажі: {stats?.totalOnlineSales ?? "—"}
        </Typography>
        <Typography>
          🏪 Офлайн-продажі: {stats?.totalOfflineSales ?? "—"}
        </Typography>
      </Paper>

      {/* Витрати та прибуток */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">💰 Витрати та прибуток</Typography>
        <Typography>
          💸 Витрати: {expenses?.totalFromRecords ?? 0} zł
        </Typography>
        <Typography
          sx={{
            color: onlineProfit + offlineProfit > 0 ? "green" : "red",
            mt: 1,
          }}
        >
          💹 Загальний прибуток: {(onlineProfit + offlineProfit).toFixed(2)} zł
        </Typography>
        <Typography
          sx={{
            color:
              onlineProfit +
                offlineProfit -
                (expenses?.totalFromRecords || 0) >=
              0
                ? "green"
                : "red",
            mt: 1,
          }}
        >
          🧾 Чистий фінансовий результат:{" "}
          {(
            onlineProfit +
            offlineProfit -
            (expenses?.totalFromRecords || 0)
          ).toFixed(2)}{" "}
          zł
        </Typography>
      </Paper>

      {/* Огляд продажів */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">📈 Огляд продажів</Typography>
        <Typography sx={{ color: onlineProfit > 0 ? "green" : "red" }}>
          Онлайн чистий прибуток: {onlineProfit.toFixed(2)} zł
        </Typography>
        <Typography sx={{ color: offlineProfit > 0 ? "green" : "red" }}>
          Офлайн чистий прибуток: {offlineProfit.toFixed(2)} zł
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">📦 Прибуток за складом</Typography>
        <Typography>Продажів: {saleMovements.length}</Typography>
        <Typography sx={{ color: stockProfit >= 0 ? "green" : "red" }}>
          Чистий прибуток: {stockProfit.toFixed(2)} zł
        </Typography>
      </Paper>

      {/* Виконані продажі */}
      <Paper elevation={3} sx={{ p: 2, maxHeight: 300, overflowY: "auto" }}>
        <Typography variant="h6" gutterBottom>
          ✅ Виконані продажі
        </Typography>
        {completedSales.length === 0 ? (
          <Typography>Немає виконаних продажів</Typography>
        ) : (
          completedSales.map((sale, idx) => (
            <Typography key={idx}>
              {new Date(sale.createdAt).toLocaleDateString()} —{" "}
              {getTotalPrice(sale).toFixed(2)} zł ({sale.paymentMethod})
            </Typography>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default FinanceOverview;
