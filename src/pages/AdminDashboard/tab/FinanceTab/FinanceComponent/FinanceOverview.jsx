import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2"; // 📊 Графік продажів
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";
import {
  fetchFinanceOverview,
  updateFinanceOverview,
} from "../../../../../redux/finance/overview/operationOverview";
import {
  selectCompletedSales,
  selectFinanceError,
  selectFinanceLoading,
  selectFinanceSettings,
  selectFinanceStats,
  selectLowStockItems,
  selectSalesOverview,
} from "../../../../../redux/finance/overview/selectorsOverview";
Chart.register(...registerables);

const FinanceOverview = () => {
  const dispatch = useDispatch();
  const stats = useSelector(selectFinanceStats);
  const salesOverview = useSelector(selectSalesOverview);
  const financeSettings = useSelector(selectFinanceSettings);
  const lowStockItems = useSelector(selectLowStockItems);
  const completedSales = useSelector(selectCompletedSales);
  const isLoading = useSelector(selectFinanceLoading);
  const error = useSelector(selectFinanceError);

  // 🔥 Локальний стан для оновлення налаштувань фінансів
  const [updatedSettings, setUpdatedSettings] = useState(financeSettings);
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, []);
  useEffect(() => {
    dispatch(fetchFinanceOverview());
  }, [dispatch]);

  const handleUpdateSettings = () => {
    dispatch(updateFinanceOverview(updatedSettings));
  };

  // 🔥 Сортування виконаних продажів за датою
  const sortedCompletedSales = [...completedSales].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (isLoading) return <Loader />;
  if (error) {
    return (
      <Typography color="error">Помилка завантаження даних: {error}</Typography>
    );
  }
  const onlineSales = Array(12).fill(0); // Масив для онлайн-продажів
  const offlineSales = Array(12).fill(0); // Масив для офлайн-продажів

  sortedCompletedSales.forEach((sale) => {
    const saleMonth = new Date(sale.createdAt).getMonth(); // Отримуємо місяць продажу
    if (sale.source === "online") {
      onlineSales[saleMonth] += sale.totalPrice; // Додаємо до онлайн-продажів
    } else {
      offlineSales[saleMonth] += sale.totalPrice; // Додаємо до офлайн-продажів
    }
  });

  const chartData = {
    labels: [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ],
    datasets: [
      {
        label: "Онлайн-продажі",
        data: onlineSales, // ✅ Реальні онлайн-продажі
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
      {
        label: "Офлайн-продажі",
        data: offlineSales, // ✅ Реальні офлайн-продажі
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
      },
    ],
  };

  return (
    <Box sx={{ maxHeight: "85vh", overflowY: "auto", padding: "10px" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Фінансовий огляд
      </Typography>

      {/* 🔹 Загальна статистика */}
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Загальна статистика</Typography>
        <Typography>Користувачі: {stats?.totalUsers ?? "N/A"}</Typography>
        <Typography>Продукти: {stats?.totalProducts ?? "N/A"}</Typography>
        <Typography>
          Онлайн-продажі: {stats?.totalOnlineSales ?? "N/A"}
        </Typography>
        <Typography>
          Офлайн-продажі: {stats?.totalOfflineSales ?? "N/A"}
        </Typography>
      </Paper>

      {/* 🔹 Редагування фінансових налаштувань */}
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Фінансові налаштування</Typography>
        <TextField
          label="Податкова ставка (%)"
          type="number"
          value={updatedSettings?.taxRate || ""}
          onChange={(e) =>
            setUpdatedSettings({ ...updatedSettings, taxRate: e.target.value })
          }
        />
        <TextField
          label="Операційні витрати (zł)"
          type="number"
          value={updatedSettings?.operatingCosts || ""}
          onChange={(e) =>
            setUpdatedSettings({
              ...updatedSettings,
              operatingCosts: e.target.value,
            })
          }
        />
        <TextField
          label="Бюджет на закупівлю (zł)"
          type="number"
          value={updatedSettings?.budgetForProcurement || ""}
          onChange={(e) =>
            setUpdatedSettings({
              ...updatedSettings,
              budgetForProcurement: e.target.value,
            })
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateSettings}
          sx={{ marginLeft: "50px" }}
        >
          Зберегти налаштування
        </Button>
      </Paper>

      {/* 🔹 Огляд продажів (з кольоровими індикаторами) */}
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Огляд продажів</Typography>
        <Typography
          sx={{ color: salesOverview?.online?.netProfit > 0 ? "green" : "red" }}
        >
          Чистий прибуток онлайн: {salesOverview?.online?.netProfit ?? "N/A"} zł
        </Typography>
        <Typography
          sx={{
            color: salesOverview?.offline?.netProfit > 0 ? "green" : "red",
          }}
        >
          Чистий прибуток офлайн: {salesOverview?.offline?.netProfit ?? "N/A"}{" "}
          zł
        </Typography>
      </Paper>

      {/* 🔹 Графік динаміки продажів */}
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          marginBottom: "20px",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6">Графік продажів</Typography>
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
          }}
          height={200}
          width={350}
        />
      </Paper>

      {/* 🔹 Виконані продажі (з сортуванням) */}
      {completedSales.length === 0 ? (
        <Typography variant="h6">Немає виконаних продажів</Typography>
      ) : (
        <Paper
          elevation={3}
          sx={{ padding: "20px", maxHeight: "300px", overflowY: "auto" }}
        >
          <Typography variant="h6">Виконані продажі</Typography>
          {sortedCompletedSales.map((sale, index) => (
            <Typography key={index}>
              {new Date(sale.createdAt).toLocaleDateString()} -{" "}
              {sale.totalPrice} zł ({sale.paymentMethod})
            </Typography>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default FinanceOverview;
