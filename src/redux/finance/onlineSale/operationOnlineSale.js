import { toast } from "react-toastify";
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

/* ============================================================
   📌 FETCH — Отримати всі онлайн‑продажі
============================================================ */
export const fetchOnlineSales = () => async (dispatch) => {
  dispatch(fetchOnlineSalesRequest());
  try {
    const response = await axios.get("/api/admin/finance/online/sales");
    dispatch(fetchOnlineSalesSuccess(response.data));
  } catch (error) {
    toast.error("Не вдалося отримати онлайн‑продажі");
    dispatch(fetchOnlineSalesFailure(error.message));
  }
};

/* ============================================================
   📌 UPDATE — Оновити онлайн‑продаж
============================================================ */
export const updateOnlineSale = (saleId, updatedData) => async (dispatch) => {
  dispatch(updateOnlineOrderRequest());
  try {
    const response = await axios.patch(
      `/api/admin/finance/online/sales/${saleId}`,
      updatedData,
    );

    toast.success("Продаж оновлено успішно");
    dispatch(updateOnlineOrderSuccess(response.data));
  } catch (error) {
    toast.error("Помилка оновлення продажу");
    dispatch(updateOnlineOrderFailure(error.message));
  }
};

/* ============================================================
   📌 CREATE — Створити новий онлайн‑продаж
============================================================ */
export const createOnlineSale = (saleData) => async (dispatch) => {
  dispatch({ type: "CREATE_ONLINE_SALE_REQUEST" });

  try {
    const response = await axios.post(
      "/api/admin/finance/online/sales",
      saleData,
    );

    toast.success(response.data.message); // 💛 Комунікат з бекенду
    dispatch({ type: "CREATE_ONLINE_SALE_SUCCESS", payload: response.data });
    dispatch(fetchOnlineSales());
  } catch (error) {
    toast.error(error.response?.data?.error || "Помилка створення продажу");
    dispatch({ type: "CREATE_ONLINE_SALE_FAILURE", payload: error.message });
  }
};

/* ============================================================
   📌 RETURN — Повернення онлайн‑продажу
============================================================ */
export const returnOnlineSale = (saleId, returnData) => async (dispatch) => {
  dispatch(returnOnlineSaleRequest());
  try {
    const response = await axios.put(
      `/api/admin/finance/online/sales/${saleId}/return`,
      returnData,
    );

    toast.success("Повернення успішно оформлено");
    dispatch(returnOnlineSaleSuccess(response.data));
  } catch (error) {
    toast.error("Помилка оформлення повернення");
    dispatch(returnOnlineSaleFailure(error.message));
  }
};
