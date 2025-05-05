// src/redux/actions/onlineSalesActions.js
export const FETCH_ONLINE_SALES_REQUEST = "FETCH_ONLINE_SALES_REQUEST";
export const FETCH_ONLINE_SALES_SUCCESS = "FETCH_ONLINE_SALES_SUCCESS";
export const FETCH_ONLINE_SALES_FAILURE = "FETCH_ONLINE_SALES_FAILURE";

export const UPDATE_ONLINE_ORDER_REQUEST = "UPDATE_ONLINE_ORDER_REQUEST";
export const UPDATE_ONLINE_ORDER_SUCCESS = "UPDATE_ONLINE_ORDER_SUCCESS";
export const UPDATE_ONLINE_ORDER_FAILURE = "UPDATE_ONLINE_ORDER_FAILURE";

export const fetchOnlineSalesRequest = () => ({
  type: FETCH_ONLINE_SALES_REQUEST,
});

export const fetchOnlineSalesSuccess = (sales) => ({
  type: FETCH_ONLINE_SALES_SUCCESS,
  payload: sales,
});

export const fetchOnlineSalesFailure = (error) => ({
  type: FETCH_ONLINE_SALES_FAILURE,
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
