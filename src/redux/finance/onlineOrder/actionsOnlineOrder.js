// src/redux/finance/onlineOrder/actionsOnlineOrder.js
export const FETCH_ONLINE_ORDERS_REQUEST = "FETCH_ONLINE_ORDERS_REQUEST";
export const FETCH_ONLINE_ORDERS_SUCCESS = "FETCH_ONLINE_ORDERS_SUCCESS";
export const FETCH_ONLINE_ORDERS_FAILURE = "FETCH_ONLINE_ORDERS_FAILURE";

export const UPDATE_ONLINE_ORDER_REQUEST = "UPDATE_ONLINE_ORDER_REQUEST";
export const UPDATE_ONLINE_ORDER_SUCCESS = "UPDATE_ONLINE_ORDER_SUCCESS";
export const UPDATE_ONLINE_ORDER_FAILURE = "UPDATE_ONLINE_ORDER_FAILURE";

export const fetchOnlineOrdersRequest = () => ({
  type: FETCH_ONLINE_ORDERS_REQUEST,
});
export const fetchOnlineOrdersSuccess = (orders) => ({
  type: FETCH_ONLINE_ORDERS_SUCCESS,
  payload: orders,
});
export const fetchOnlineOrdersFailure = (error) => ({
  type: FETCH_ONLINE_ORDERS_FAILURE,
  payload: error,
});

export const updateOnlineOrderRequest = () => ({
  type: UPDATE_ONLINE_ORDER_REQUEST,
});
export const updateOnlineOrderSuccess = (order) => ({
  type: UPDATE_ONLINE_ORDER_SUCCESS,
  payload: order,
});
export const updateOnlineOrderFailure = (error) => ({
  type: UPDATE_ONLINE_ORDER_FAILURE,
  payload: error,
});
