import {
  Alert,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetMonthlyStatus } from "../../../../../redux/inventory/monthlyReport/monthlyReportSlice";
import {
  fetchMonthlyReports,
  generateMonthlyReport,
} from "../../../../../redux/inventory/monthlyReport/operationsMonthlyReport";
import {
  selectMonthlyError,
  selectMonthlyLoading,
  selectMonthlyReports,
  selectMonthlySuccess,
} from "../../../../../redux/inventory/monthlyReport/selectorsMonthlyReport";

const MonthlyReportPage = () => {
  const dispatch = useDispatch();
  const reports = useSelector(selectMonthlyReports);
  const loading = useSelector(selectMonthlyLoading);
  const error = useSelector(selectMonthlyError);
  const success = useSelector(selectMonthlySuccess);

  useEffect(() => {
    dispatch(fetchMonthlyReports());
    return () => dispatch(resetMonthlyStatus());
  }, [dispatch]);
  const handleGenerate = () => {
    dispatch(generateMonthlyReport());
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Щомісячні фінансові звіти
      </Typography>
      <Button onClick={handleGenerate} variant="contained" sx={{ mb: 2 }}>
        ➕ Згенерувати новий звіт
      </Button>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      {reports.length > 0 ? (
        <List>
          {reports.map((report, i) => (
            <ListItem key={report.month || i} divider>
              <ListItemText
                primary={`Місяць: ${report.month}`}
                secondary={`Створено: ${new Date(
                  report.createdAt
                ).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        !loading && <Typography>Немає звітів</Typography>
      )}
    </Box>
  );
};

export default MonthlyReportPage;
