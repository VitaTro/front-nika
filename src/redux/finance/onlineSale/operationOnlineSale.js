import axios from "../../axiosConfig";
import {
  fetchOnlineSalesFailure,
  fetchOnlineSalesRequest,
  fetchOnlineSalesSuccess,
  returnOnlineSaleFailure,
  returnOnlineSaleRequest,
  returnOnlineSaleSuccess,
  updateOnlineOrderFailure,
  updateOnlineOrderRequest,
  updateOnlineOrderSuccess,
} from "./actionsOnlineSales";

export const fetchOnlineSales = () => async (dispatch) => {
  dispatch(fetchOnlineSalesRequest());
  try {
    const response = await axios.get("/api/admin/finance/online/sales");
    console.log("📦 Отримані онлайн-продажі:", response.data);
    dispatch(fetchOnlineSalesSuccess(response.data));
  } catch (error) {
    console.error("🔥 Помилка API:", error.response?.data || error.message);
    dispatch(fetchOnlineSalesFailure(error.message));
  }
};

export const updateOnlineSale = (saleId, updatedData) => async (dispatch) => {
  dispatch(updateOnlineOrderRequest());
  try {
    const response = await axios.patch(
      `/api/admin/finance/online/sales/${saleId}`,
      updatedData
    );
    dispatch(updateOnlineOrderSuccess(response.data));
  } catch (error) {
    console.error("❌ Помилка оновлення:", error.message);
    dispatch(updateOnlineOrderFailure(error.message));
  }
};

// ✅ Додаємо `POST` для створення нового онлайн-продажу
export const createOnlineSale = (saleData) => async (dispatch) => {
  dispatch({ type: "CREATE_ONLINE_SALE_REQUEST" });

  try {
    const response = await axios.post(
      "/api/admin/finance/online/sales",
      saleData
    );
    console.log("✅ Новий онлайн-продаж створено:", response.data);
    dispatch({ type: "CREATE_ONLINE_SALE_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("❌ Помилка створення онлайн-продажу:", error.message);
    dispatch({ type: "CREATE_ONLINE_SALE_FAILURE", payload: error.message });
  }
};

export const returnOnlineSale = (saleId, returnData) => async (dispatch) => {
  dispatch(returnOnlineSaleRequest());
  try {
    const response = await axios.put(
      `/api/admin/finance/online/sales/${saleId}/return`,
      returnData
    );
    console.log("✅ Продаж повернуто:", response.data);
    dispatch(returnOnlineSaleSuccess(response.data));
  } catch (error) {
    console.error("❌ Помилка повернення:", error.message);
    dispatch(returnOnlineSaleFailure(error.message));
  }
};
