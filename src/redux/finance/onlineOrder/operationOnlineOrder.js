// src/redux/finance/onlineOrder/operationsOnlineOrder.js
import axios from "../../axiosConfig";
import {
  fetchOnlineOrdersFailure,
  fetchOnlineOrdersRequest,
  fetchOnlineOrdersSuccess,
  updateOnlineOrderFailure,
  updateOnlineOrderRequest,
  updateOnlineOrderSuccess,
} from "./actionsOnlineOrder";

// Отримати всі онлайн-замовлення
export const fetchOnlineOrders = () => async (dispatch) => {
  dispatch(fetchOnlineOrdersRequest());
  try {
    const response = await axios.get("/api/admin/finance/online/orders");
    dispatch(fetchOnlineOrdersSuccess(response.data.onlineOrders));
  } catch (error) {
    dispatch(fetchOnlineOrdersFailure(error.message));
  }
};

// Оновити статус онлайн-замовлення
export const updateOnlineOrder = (orderId, updatedData) => async (dispatch) => {
  dispatch(updateOnlineOrderRequest());
  try {
    const response = await axios.patch(
      `/api/admin/finance/online/orders/${orderId}`,
      updatedData
    );
    dispatch(updateOnlineOrderSuccess(response.data.onlineOrder));
  } catch (error) {
    dispatch(updateOnlineOrderFailure(error.message));
  }
};
