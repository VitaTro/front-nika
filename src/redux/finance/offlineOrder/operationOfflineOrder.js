import axios from "../../axiosConfig";
import {
  createOfflineOrderFailure,
  createOfflineOrderRequest,
  createOfflineOrderSuccess,
  fetchOfflineOrdersFailure,
  fetchOfflineOrdersRequest,
  fetchOfflineOrdersSuccess,
  updateOfflineOrderFailure,
  updateOfflineOrderRequest,
  updateOfflineOrderSuccess,
} from "./actionsOfflineOrder";

// Отримати всі офлайн-замовлення
export const fetchOfflineOrders = () => async (dispatch) => {
  dispatch(fetchOfflineOrdersRequest());
  try {
    const response = await axios.get("/api/admin/finance/offline/orders");
    dispatch(fetchOfflineOrdersSuccess(response.data.offlineOrders));
  } catch (error) {
    dispatch(fetchOfflineOrdersFailure(error.message));
  }
};

// Створити нове офлайн-замовлення
export const createOfflineOrder = (orderData) => async (dispatch) => {
  dispatch(createOfflineOrderRequest());
  try {
    const response = await axios.post(
      "/api/admin/finance/offline/orders",
      orderData
    );

    dispatch(createOfflineOrderSuccess(response.data.order));
  } catch (error) {
    console.error(
      "❌ createOfflineOrder помилка:",
      error.response?.data || error.message
    );
    dispatch(
      createOfflineOrderFailure(error.response?.data?.error || error.message)
    );
  }
};

// Оновити статус офлайн-замовлення
export const updateOfflineOrder =
  (orderId, updatedData) => async (dispatch) => {
    dispatch(updateOfflineOrderRequest());
    try {
      const response = await axios.patch(
        `/api/admin/finance/offline/orders/${orderId}`,
        updatedData
      );
      dispatch(updateOfflineOrderSuccess(response.data.order));
    } catch (error) {
      dispatch(updateOfflineOrderFailure(error.message));
    }
  };
