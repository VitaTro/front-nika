import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

export const uploadBulkMovements = createAsyncThunk(
  "bulkUpload/uploadBulkMovements",
  async (movementsArray, { rejectWithValue }) => {
    try {
      const cleaned = movementsArray.map((movement) => ({
        productIndex: movement.productIndex,
        productName: movement.productName,
        type: movement.type,
        quantity: Number(movement.quantity),
        unitPurchasePrice: Number(movement.unitPurchasePrice),
        price: Number(movement.price),
        note: movement.note || "",
        date: new Date(movement.date).toISOString(),
      }));

      console.log("📦 Масові рухи:", cleaned);

      const response = await axios.post(
        "/api/admin/stock/movement/bulk",
        cleaned // ✅ передаємо масив
      );

      return response.data;
    } catch (error) {
      console.error("❌ Error during bulk upload:", error);
      return rejectWithValue(
        error.response?.data?.error || "Помилка при імпорті"
      );
    }
  }
);
