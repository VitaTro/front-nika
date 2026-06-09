import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";

import { fetchAdminProducts } from "../../../../../redux/admin/operationsAdmin";
import { fetchFinanceOverview } from "../../../../../redux/finance/overview/operationOverview";

import {
  selectCompletedSales,
  selectExpensesSummary,
  selectFinanceError,
  selectFinanceLoading,
  selectFinanceStats,
} from "../../../../../redux/finance/overview/selectorsOverview";

import { selectStockMovements } from "../../../../../redux/inventory/stockMovement/selectorsStockMovement";
import { selectProducts } from "../../../../../redux/products/selectorsProducts";

import { fetchOnlineSales } from "../../../../../redux/finance/onlineSale/operationOnlineSale";
import {
  selectOnlineSales,
  selectOnlineSalesLoading,
} from "../../../../../redux/finance/onlineSale/selectorsOnlineSale";

Chart.register(...registerables);

const FinanceOverview = () => {
  const dispatch = useDispatch();

  const stats = useSelector(selectFinanceStats);
  const completedSales = useSelector(selectCompletedSales);
  const onlineSales = useSelector(selectOnlineSales);
  console.log("🟦 ONLINE SALES FROM REDUX:", onlineSales);

  const isLoading = useSelector(selectFinanceLoading);
  const onlineLoading = useSelector(selectOnlineSalesLoading);
  const error = useSelector(selectFinanceError);

  const expenses = useSelector(selectExpensesSummary);
  const movements = useSelector(selectStockMovements);
  const products = useSelector(selectProducts);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(fetchFinanceOverview());
    dispatch(fetchAdminProducts());
    dispatch(fetchOnlineSales());
  }, [dispatch]);

  // -----------------------------
  // ONLINE FINANCIALS (from backend)
  // -----------------------------
  // 🔥 ТЕСТОВИЙ ВАРІАНТ — рахуємо все з onlineSales

  const onlineTotalSales = onlineSales.reduce(
    (sum, s) => sum + (s.finalPrice || 0),
    0,
  );

  const onlineShipping = onlineSales.reduce(
    (sum, s) => sum + (s.shippingCost || 0),
    0,
  );

  // дохід магазину = тільки товари
  const onlineRevenue = onlineSales.reduce(
    (sum, s) =>
      sum + (s.totalAmount || (s.finalPrice || 0) - (s.shippingCost || 0)),
    0,
  );

  // тимчасово: прибуток = дохід (бо собівартість не чіпаємо)
  const onlineProfit = onlineRevenue;

  console.log("🟦 onlineTotalSales (sum finalPrice):", onlineTotalSales);
  console.log("🟦 onlineShipping (sum shippingCost):", onlineShipping);
  console.log("🟦 onlineRevenue (sum totalAmount):", onlineRevenue);
  console.log("🟦 onlineProfit (TEMP = revenue):", onlineProfit);

  // -----------------------------
  // OFFLINE & PLATFORM PROFIT
  // -----------------------------
  const getNetProfit = (sale) => {
    const products = sale.products || [];
    let profit = 0;

    products.forEach((p) => {
      const quantity = Number(p.quantity) || 0;
      const salePrice = Number(p.price) || 0;
      const purchasePrice =
        Number(p.purchasePrice) || Number(p.unitPurchasePrice) || 0;

      profit += quantity * (salePrice - purchasePrice);
    });

    return profit;
  };

  const offlineProfit = completedSales
    .filter((s) => s.source === "offline")
    .reduce((sum, s) => sum + getNetProfit(s), 0);

  const platformProfit = completedSales
    .filter((s) => s.source === "platform")
    .reduce((sum, s) => sum + getNetProfit(s), 0);

  // -----------------------------
  // STOCK PROFIT
  // -----------------------------
  const saleMovements = movements.filter(
    (m) => m.type === "sale" && m.saleSource !== "OfflineReservation",
  );

  const stockProfit = saleMovements.reduce((total, sale) => {
    const purchaseBeforeSale = movements
      .filter(
        (m) =>
          m.type === "purchase" &&
          m.productIndex === sale.productIndex &&
          new Date(m.date) < new Date(sale.date),
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const lastPurchase = purchaseBeforeSale[0];
    if (!lastPurchase) return total;

    const profit =
      (sale.unitSalePrice - lastPurchase.unitPurchasePrice) * sale.quantity;

    return total + profit;
  }, 0);

  // -----------------------------
  // GROUPED SALES (offline + platform + online)
  // -----------------------------
  const getSaleDate = (sale) => {
    const rawDate =
      sale.saleDate ||
      sale.completedAt ||
      sale.createdAt ||
      sale.products?.[0]?.saleDate;

    if (!rawDate) return null;

    const date = new Date(rawDate);
    return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
  };

  const formatDisplayDate = (isoDate) => {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "—";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  // const allSales = [
  //   ...completedSales, // offline + platform
  //   ...onlineSales.map((s) => ({
  //     ...s,
  //     source: "online",
  //   })),
  // ];
  const allSales = [
    ...completedSales.filter((s) => s.source !== "online"), // тільки офлайн + платформа
    ...onlineSales.map((s) => ({
      ...s,
      source: "online",
    })),
  ];

  const groupSalesByDate = (sales) => {
    const grouped = {};

    sales.forEach((sale) => {
      const date = getSaleDate(sale);
      if (!date) return;

      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(sale);
    });

    return grouped;
  };

  const groupedSales = groupSalesByDate(allSales);
  const formatPLN = (value) =>
    new Intl.NumberFormat("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value) || 0) + " zł";

  if (isLoading || onlineLoading) return <Loader />;
  if (error)
    return (
      <Typography color="error">Помилка завантаження даних: {error}</Typography>
    );

  return (
    <Box sx={{ maxHeight: "85vh", overflowY: "auto", p: isMobile ? 1 : 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        📊 Фінансовий огляд
      </Typography>

      {/* -----------------------------
          Загальна статистика
      ----------------------------- */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Загальна статистика</Typography>

        <Typography>📦 Продукти: {stats?.totalProducts ?? "—"}</Typography>
        <Typography>
          🛒 Онлайн-продажі: {stats?.totalOnlineSales ?? "—"}
        </Typography>
        <Typography>
          🏪 Офлайн-продажі: {stats?.totalOfflineSales ?? "—"}
        </Typography>
        <Typography>
          🌐 Продажі з платформ: {stats?.totalPlatformSales ?? "—"}
        </Typography>
      </Paper>

      {/* -----------------------------
          Витрати та прибуток
      ----------------------------- */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">💰 Витрати та прибуток</Typography>

        <Typography>
          💸 Витрати: {expenses?.totalFromRecords ?? 0} zł
        </Typography>

        <Typography
          sx={{
            color:
              onlineProfit + offlineProfit + platformProfit > 0
                ? "green"
                : "red",
            mt: 1,
          }}
        >
          💹 Загальний прибуток:{" "}
          {(onlineProfit + offlineProfit + platformProfit).toFixed(2)} zł
        </Typography>

        <Typography
          sx={{
            color:
              onlineProfit +
                platformProfit +
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
            platformProfit +
            offlineProfit -
            (expenses?.totalFromRecords || 0)
          ).toFixed(2)}{" "}
          zł
        </Typography>
      </Paper>

      {/* -----------------------------
          Онлайн статистика
      ----------------------------- */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">🌐 Онлайн статистика</Typography>

        <Typography>
          Онлайн дохід (товари): {onlineRevenue.toFixed(2)} zł
        </Typography>

        <Typography>
          Онлайн доставка (не дохід): {onlineShipping.toFixed(2)} zł
        </Typography>

        <Typography sx={{ fontWeight: "bold" }}>
          Онлайн загальна оплата клієнтів: {onlineTotalSales.toFixed(2)} zł
        </Typography>

        <Typography sx={{ color: onlineProfit > 0 ? "green" : "red" }}>
          Онлайн чистий прибуток: {onlineProfit.toFixed(2)} zł
        </Typography>
      </Paper>

      {/* -----------------------------
          Огляд продажів
      ----------------------------- */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">📈 Огляд продажів</Typography>

        <Typography sx={{ color: onlineProfit > 0 ? "green" : "red" }}>
          Онлайн чистий прибуток: {onlineProfit.toFixed(2)} zł
        </Typography>

        <Typography sx={{ color: offlineProfit > 0 ? "green" : "red" }}>
          Офлайн чистий прибуток: {offlineProfit.toFixed(2)} zł
        </Typography>

        <Typography sx={{ color: platformProfit > 0 ? "green" : "red" }}>
          Платформа чистий прибуток: {platformProfit.toFixed(2)} zł
        </Typography>
      </Paper>

      {/* -----------------------------
          Прибуток за складом
      ----------------------------- */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">📦 Прибуток за складом</Typography>

        <Typography>Продажів: {saleMovements.length}</Typography>

        <Typography sx={{ color: stockProfit >= 0 ? "green" : "red" }}>
          Чистий прибуток: {stockProfit.toFixed(2)} zł
        </Typography>
      </Paper>

      {/* -----------------------------
          Виконані продажі
      ----------------------------- */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          ✅ Виконані продажі
        </Typography>

        {Object.entries(groupedSales)
          .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
          .map(([date, sales], idx) => {
            const total = sales.reduce((sum, s) => {
              if (s.source === "online") {
                return sum + (Number(s.totalAmount) || 0);
              }
              return (
                sum +
                s.products.reduce(
                  (acc, p) =>
                    acc + (Number(p.price) || 0) * (Number(p.quantity) || 0),
                  0,
                )
              );
            }, 0);

            return (
              <Accordion key={idx}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    bgcolor: sales.some(
                      (s) => s.source === "online" && s.discount > 0,
                    )
                      ? "#ede7f6" // фіолетовий: онлайн + знижка
                      : sales.some((s) => s.source === "online")
                        ? "#e3f2fd" // блакитний: онлайн
                        : sales.some((s) => s.discount > 0)
                          ? "#fff3e0" // помаранчевий: знижка
                          : "inherit",

                    borderLeft: sales.some(
                      (s) => s.source === "online" && s.discount > 0,
                    )
                      ? "4px solid #7e57c2" // фіолетова смуга
                      : sales.some((s) => s.source === "online")
                        ? "4px solid #2196f3" // синя смуга
                        : sales.some((s) => s.discount > 0)
                          ? "4px solid orange"
                          : "none",
                  }}
                >
                  <Typography component="div">
                    📅 {formatDisplayDate(date)} — 💰 {formatPLN(total)}
                    {sales.some((s) => s.discount > 0) && (
                      <span style={{ marginLeft: "8px" }}>
                        → зі знижками:{" "}
                        {formatPLN(
                          sales.reduce(
                            (sum, s) =>
                              sum +
                              (Number(s.finalPrice) ||
                                Number(s.totalAmount) ||
                                0),
                            0,
                          ),
                        )}
                      </span>
                    )}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <List dense>
                    {sales.map((sale, i) => (
                      <ListItem key={i}>
                        <ListItemText
                          primary={
                            <>
                              💰{" "}
                              {formatPLN(
                                sale.source === "online"
                                  ? Number(sale.totalAmount) || 0
                                  : sale.products.reduce(
                                      (acc, p) =>
                                        acc +
                                        (Number(p.price) || 0) *
                                          (Number(p.quantity) || 0),
                                      0,
                                    ),
                              )}
                              {sale.discount > 0 && (
                                <Typography
                                  component="span"
                                  sx={{ color: "red", ml: 1 }}
                                >
                                  −{formatPLN(sale.discount)}
                                </Typography>
                              )}
                              <Typography
                                component="span"
                                sx={{ fontWeight: "bold", ml: 1 }}
                              >
                                ={" "}
                                {formatPLN(
                                  sale.finalPrice || sale.totalAmount || 0,
                                )}
                              </Typography>
                            </>
                          }
                          secondary={`💳 ${sale.paymentMethod}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </Paper>
    </Box>
  );
};

export default FinanceOverview;
