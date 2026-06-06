import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import {
  createOnlineOrderFailure,
  createOnlineOrderRequest,
  createOnlineOrderSuccess,
  fetchOnlineOrderByIdFailure,
  fetchOnlineOrderByIdRequest,
  fetchOnlineOrderByIdSuccess,
  fetchOnlineOrdersFailure,
  fetchOnlineOrdersRequest,
  fetchOnlineOrdersSuccess,
  returnOnlineOrderFailure,
  returnOnlineOrderRequest,
  returnOnlineOrderSuccess,
  updateOnlineOrderDetailsFailure,
  updateOnlineOrderDetailsRequest,
  updateOnlineOrderDetailsSuccess,
  updateOnlineOrderFailure,
  updateOnlineOrderRequest,
  updateOnlineOrderSuccess,
} from "./actionsOnlineOrder";

// Отримати всі онлайн-замовлення
export const fetchOnlineOrders = () => async (dispatch) => {
  dispatch(fetchOnlineOrdersRequest());
  try {
    const response = await axios.get("/api/admin/finance/online/orders");
    console.log("ORDER BY ID RESPONSE:", response.data);

    dispatch(fetchOnlineOrdersSuccess(response.data.onlineOrders));
  } catch (error) {
    dispatch(fetchOnlineOrdersFailure(error.message));
  }
};

// Оновити статус онлайн-замовлення
export const updateOnlineOrder =
  ({ orderId, status }) =>
  async (dispatch) => {
    dispatch(updateOnlineOrderRequest());
    try {
      const response = await axios.patch(
        `/api/admin/finance/online/orders/${orderId}/status`,
        { status },
      );

      dispatch(updateOnlineOrderSuccess(response.data.order));
    } catch (error) {
      dispatch(updateOnlineOrderFailure(error.message));
    }
  };

export const createOnlineOrder = (orderData) => async (dispatch) => {
  dispatch(createOnlineOrderRequest());
  try {
    const response = await axios.post(
      "/api/admin/finance/online/orders",
      orderData,
    );
    dispatch(createOnlineOrderSuccess(response.data));
  } catch (error) {
    dispatch(createOnlineOrderFailure(error.message));
  }
};

// ✅ Отримати конкретне замовлення за ID (GET)
export const fetchOnlineOrderById = (orderId) => async (dispatch) => {
  dispatch(fetchOnlineOrderByIdRequest());
  try {
    const response = await axios.get(
      `/api/admin/finance/online/orders/${orderId}`,
    );

    // Бекенд повертає ОДИН об’єкт
    dispatch(fetchOnlineOrderByIdSuccess(response.data));
  } catch (error) {
    dispatch(fetchOnlineOrderByIdFailure(error.message));
  }
};

// ✅ Оновити всю інформацію про замовлення (PUT)
export const updateOnlineOrderDetails =
  (orderId, updatedData) => async (dispatch) => {
    dispatch(updateOnlineOrderDetailsRequest());
    try {
      const response = await axios.put(
        `/api/admin/finance/online/orders/${orderId}`,
        updatedData,
      );
      dispatch(updateOnlineOrderDetailsSuccess(response.data.order));
    } catch (error) {
      dispatch(updateOnlineOrderDetailsFailure(error.message));
    }
  };

// ✅ Часткове повернення товару (PUT /{id}/return)
export const returnOnlineOrder = (orderId, returnData) => async (dispatch) => {
  dispatch(returnOnlineOrderRequest());

  try {
    const response = await axios.put(
      `/api/admin/finance/online/orders/${orderId}/return`,
      returnData,
    );

    console.log("🔄 Отримані дані для повернення:", response.data); // ✅ Тепер `response.data` визначений
    dispatch(returnOnlineOrderSuccess(response.data.onlineOrder));
  } catch (error) {
    console.error(
      "❌ Помилка повернення:",
      error.response?.data || error.message,
    ); // ✅ Логуємо помилку коректно
    dispatch(returnOnlineOrderFailure(error.message));
  }
};
export const updateOnlineOrderStatus = createAsyncThunk(
  "onlineOrder/updateStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `/api/admin/finance/online/orders/${orderId}/status`,
        { status },
      );
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const updateOnlineOrderPayment =
  ({ orderId }) =>
  async (dispatch) => {
    dispatch(updateOnlineOrderRequest());
    try {
      const response = await axios.patch(
        `/api/admin/finance/online/orders/${orderId}/status`,
        { status: "paid" }, // бекенд сам поставить paymentStatus = "paid"
      );

      dispatch(updateOnlineOrderSuccess(response.data.order));
    } catch (error) {
      dispatch(updateOnlineOrderFailure(error.message));
    }
  };
