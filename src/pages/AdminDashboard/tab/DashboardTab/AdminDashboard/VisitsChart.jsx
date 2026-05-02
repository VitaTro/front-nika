import { Box, Paper, Typography } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const VisitsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography>Немає даних для графіка</Typography>;
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Візити за останні 30 днів
      </Typography>

      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#1976d2"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default VisitsChart;
