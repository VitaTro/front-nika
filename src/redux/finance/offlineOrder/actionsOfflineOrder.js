export const FETCH_OFFLINE_ORDERS_REQUEST = "FETCH_OFFLINE_ORDERS_REQUEST";
export const FETCH_OFFLINE_ORDERS_SUCCESS = "FETCH_OFFLINE_ORDERS_SUCCESS";
export const FETCH_OFFLINE_ORDERS_FAILURE = "FETCH_OFFLINE_ORDERS_FAILURE";

export const CREATE_OFFLINE_ORDER_REQUEST = "CREATE_OFFLINE_ORDER_REQUEST";
export const CREATE_OFFLINE_ORDER_SUCCESS = "CREATE_OFFLINE_ORDER_SUCCESS";
export const CREATE_OFFLINE_ORDER_FAILURE = "CREATE_OFFLINE_ORDER_FAILURE";

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

export const createOfflineOrderRequest = () => ({
  type: CREATE_OFFLINE_ORDER_REQUEST,
});
export const createOfflineOrderSuccess = (order) => ({
  type: CREATE_OFFLINE_ORDER_SUCCESS,
  payload: order,
});
export const createOfflineOrderFailure = (error) => ({
  type: CREATE_OFFLINE_ORDER_FAILURE,
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
export const CONFIRM_OFFLINE_ORDER_REQUEST = "CONFIRM_OFFLINE_ORDER_REQUEST";
export const CONFIRM_OFFLINE_ORDER_SUCCESS = "CONFIRM_OFFLINE_ORDER_SUCCESS";
export const CONFIRM_OFFLINE_ORDER_FAILURE = "CONFIRM_OFFLINE_ORDER_FAILURE";
