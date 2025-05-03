import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    dispatch(fetchFinanceOverview());
  }, [dispatch]);

  useEffect(() => {
    console.log("📊 Поточний Redux-стан:", {
      stats,
      salesOverview,
      financeSettings,
    });
  }, [stats, salesOverview, financeSettings]);

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
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Графік продажів</Typography>
        <Line
          data={{
            labels: ["Січень", "Лютий", "Березень", "Квітень", "Травень"],
            datasets: [
              {
                label: "Онлайн-продажі",
                data: [
                  1200,
                  1500,
                  1700,
                  1300,
                  salesOverview?.online?.totalSales || 0,
                ],
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
              },
              {
                label: "Офлайн-продажі",
                data: [
                  1000,
                  1400,
                  1600,
                  1500,
                  salesOverview?.offline?.totalSales || 0,
                ],
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
              },
            ],
          }}
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
