import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const VisitsChart = ({ data, topPages }) => {
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

      {/* 🔥 ТОП-10 сторінок */}
      {topPages && topPages.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Топ 10 сторінок за популярністю
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Сторінка</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Візитів</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {topPages.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.page}</TableCell>
                  <TableCell>{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Paper>
  );
};

export default VisitsChart;
