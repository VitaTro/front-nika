import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const fetchMonthlyReports = createAsyncThunk(
  "monthlyReport/fetchMonthlyReports",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/accounting/monthly-report");
      return res.data;
    } catch (err) {
      return rejectWithValue("Помилка при завантаженні звітів");
    }
  }
);

export const fetchMonthlyReportByMonth = createAsyncThunk(
  "monthlyReport/fetchMonthlyReportByMonth",
  async (month, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/api/admin/accounting/monthly-report/${month}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Не вдалося отримати звіт за цей місяць");
    }
  }
);

export const generateMonthlyReport = createAsyncThunk(
  "monthlyReport/generateMonthlyReport",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/api/admin/accounting/monthly-report/generate"
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Помилка під час генерації звіту");
    }
  }
);
