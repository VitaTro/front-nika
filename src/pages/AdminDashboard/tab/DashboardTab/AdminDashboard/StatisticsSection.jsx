import { Alert, Box, Button, Paper, Typography } from "@mui/material";
import VisitsChart from "./VisitsChart";

const StatisticsSection = ({ stats, graph, setViewMode }) => {
  if (!stats) return null;

  return (
    <Box sx={{ display: "grid", gap: 2, mt: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Статистика
        </Typography>
        <Typography>
          Загальна кількість користувачів: {stats.totalUsers}
        </Typography>
        <Typography>Активні користувачі: {stats.activeUsers}</Typography>
        <Typography>
          Загальна кількість товарів: {stats.totalProducts}
        </Typography>
        {stats.expiringReservations?.count > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            ⏳ Завтра закінчується {stats.expiringReservations.count} резервів
            <Button
              variant="outlined"
              size="small"
              sx={{ ml: 2 }}
              onClick={() => setViewMode("expiring")}
            >
              Переглянути
            </Button>
          </Alert>
        )}
        {stats.expiredReservations?.count > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            ⚠️ Є прострочені резерви: {stats.expiredReservations.count}
            <Button
              variant="outlined"
              size="small"
              sx={{ ml: 2 }}
              onClick={() => setViewMode("expired")}
            >
              Переглянути
            </Button>
          </Alert>
        )}
        <Box mt={2}>
          <Typography variant="h6" fontWeight={600} mt={2}>
            Візити
          </Typography>

          <Typography>Сьогодні: {stats.visitsToday}</Typography>
          <Typography>За 7 днів: {stats.visits7days}</Typography>
          <Typography>За 30 днів: {stats.visits30days}</Typography>
          <Typography>Всього: {stats.visitsTotal}</Typography>
        </Box>
      </Paper>

      <VisitsChart data={graph} />
    </Box>
  );
};

export default StatisticsSection;
