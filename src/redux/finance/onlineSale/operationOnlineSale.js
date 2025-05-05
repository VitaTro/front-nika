import axios from "../../axiosConfig";
import {
  fetchOnlineSalesFailure,
  fetchOnlineSalesRequest,
  fetchOnlineSalesSuccess,
} from "./actionsOnlineSales";

export const fetchOnlineSales = () => async (dispatch) => {
  dispatch(fetchOnlineSalesRequest());
  try {
    const response = await axios.get("/api/admin/finance/online/sales");
    console.log("📦 Отримані дані від API:", response.data); // 🔍 Перевір, що API повертає
    dispatch(fetchOnlineSalesSuccess(response.data)); // Можливо потрібно `response.data`
  } catch (error) {
    console.error("🔥 Помилка API:", error.response?.data || error.message);
    dispatch(fetchOnlineSalesFailure(error.message));
  }
};

export const updateOnlineSale = (saleId, updatedData) => async (dispatch) => {
  dispatch(updateOnlineSaleRequest());
  try {
    const response = await axios.patch(
      `/api/admin/finance/online/sales/${saleId}`,
      updatedData
    );
    dispatch(updateOnlineSaleSuccess(response.data));
  } catch (error) {
    dispatch(updateOnlineSaleFailure(error.message));
  }
};
