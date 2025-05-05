// src/redux/finance/offlineOrder/actionsOfflineOrder.js
export const FETCH_OFFLINE_ORDERS_REQUEST = "FETCH_OFFLINE_ORDERS_REQUEST";
export const FETCH_OFFLINE_ORDERS_SUCCESS = "FETCH_OFFLINE_ORDERS_SUCCESS";
export const FETCH_OFFLINE_ORDERS_FAILURE = "FETCH_OFFLINE_ORDERS_FAILURE";

export const UPDATE_OFFLINE_ORDER_REQUEST = "UPDATE_OFFLINE_ORDER_REQUEST";
export const UPDATE_OFFLINE_ORDER_SUCCESS = "UPDATE_OFFLINE_ORDER_SUCCESS";
export const UPDATE_OFFLINE_ORDER_FAILURE = "UPDATE_OFFLINE_ORDER_FAILURE";

export const fetchOfflineOrdersRequest = () => ({
  type: FETCH_OFFLINE_ORDERS_REQUEST,
});
export const fetchOfflineOrdersSuccess = (orders) => ({
  type: FETCH_OFFLINE_ORDERS_SUCCESS,
  payload: orders,
});
export const fetchOfflineOrdersFailure = (error) => ({
  type: FETCH_OFFLINE_ORDERS_FAILURE,
  payload: error,
});

export const updateOfflineOrderRequest = () => ({
  type: UPDATE_OFFLINE_ORDER_REQUEST,
});
export const updateOfflineOrderSuccess = (order) => ({
  type: UPDATE_OFFLINE_ORDER_SUCCESS,
  payload: order,
});
export const updateOfflineOrderFailure = (error) => ({
  type: UPDATE_OFFLINE_ORDER_FAILURE,
  payload: error,
});
