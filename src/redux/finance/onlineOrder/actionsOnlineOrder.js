export const FETCH_ONLINE_ORDERS_REQUEST = "FETCH_ONLINE_ORDERS_REQUEST";
export const FETCH_ONLINE_ORDERS_SUCCESS = "FETCH_ONLINE_ORDERS_SUCCESS";
export const FETCH_ONLINE_ORDERS_FAILURE = "FETCH_ONLINE_ORDERS_FAILURE";

export const UPDATE_ONLINE_ORDER_REQUEST = "UPDATE_ONLINE_ORDER_REQUEST";
export const UPDATE_ONLINE_ORDER_SUCCESS = "UPDATE_ONLINE_ORDER_SUCCESS";
export const UPDATE_ONLINE_ORDER_FAILURE = "UPDATE_ONLINE_ORDER_FAILURE";
export const CREATE_ONLINE_ORDER_REQUEST = "CREATE_ONLINE_ORDER_REQUEST";
export const CREATE_ONLINE_ORDER_SUCCESS = "CREATE_ONLINE_ORDER_SUCCESS";
export const CREATE_ONLINE_ORDER_FAILURE = "CREATE_ONLINE_ORDER_FAILURE";

export const FETCH_ONLINE_ORDER_BY_ID_REQUEST =
  "FETCH_ONLINE_ORDER_BY_ID_REQUEST";
export const FETCH_ONLINE_ORDER_BY_ID_SUCCESS =
  "FETCH_ONLINE_ORDER_BY_ID_SUCCESS";
export const FETCH_ONLINE_ORDER_BY_ID_FAILURE =
  "FETCH_ONLINE_ORDER_BY_ID_FAILURE";

export const UPDATE_ONLINE_ORDER_DETAILS_REQUEST =
  "UPDATE_ONLINE_ORDER_DETAILS_REQUEST";
export const UPDATE_ONLINE_ORDER_DETAILS_SUCCESS =
  "UPDATE_ONLINE_ORDER_DETAILS_SUCCESS";
export const UPDATE_ONLINE_ORDER_DETAILS_FAILURE =
  "UPDATE_ONLINE_ORDER_DETAILS_FAILURE";

export const RETURN_ONLINE_ORDER_REQUEST = "RETURN_ONLINE_ORDER_REQUEST";
export const RETURN_ONLINE_ORDER_SUCCESS = "RETURN_ONLINE_ORDER_SUCCESS";
export const RETURN_ONLINE_ORDER_FAILURE = "RETURN_ONLINE_ORDER_FAILURE";
export const UPDATE_ONLINE_ORDER_STATUS_REQUEST =
  "UPDATE_ONLINE_ORDER_STATUS_REQUEST";
export const UPDATE_ONLINE_ORDER_STATUS_SUCCESS =
  "UPDATE_ONLINE_ORDER_STATUS_SUCCESS";
export const UPDATE_ONLINE_ORDER_STATUS_FAILURE =
  "UPDATE_ONLINE_ORDER_STATUS_FAILURE";

// Екшни для оновлення статусу замовлення
export const updateOnlineOrderStatusRequest = () => ({
  type: UPDATE_ONLINE_ORDER_STATUS_REQUEST,
});

export const updateOnlineOrderStatusSuccess = (order) => ({
  type: UPDATE_ONLINE_ORDER_STATUS_SUCCESS,
  payload: order,
});

export const updateOnlineOrderStatusFailure = (error) => ({
  type: UPDATE_ONLINE_ORDER_STATUS_FAILURE,
  payload: error,
});

// Екшни
export const createOnlineOrderRequest = () => ({
  type: CREATE_ONLINE_ORDER_REQUEST,
});
export const createOnlineOrderSuccess = (order) => ({
  type: CREATE_ONLINE_ORDER_SUCCESS,
  payload: order,
});
export const createOnlineOrderFailure = (error) => ({
  type: CREATE_ONLINE_ORDER_FAILURE,
  payload: error,
});

export const fetchOnlineOrderByIdRequest = () => ({
  type: FETCH_ONLINE_ORDER_BY_ID_REQUEST,
});
export const fetchOnlineOrderByIdSuccess = (order) => ({
  type: FETCH_ONLINE_ORDER_BY_ID_SUCCESS,
  payload: order,
});
export const fetchOnlineOrderByIdFailure = (error) => ({
  type: FETCH_ONLINE_ORDER_BY_ID_FAILURE,
  payload: error,
});

export const updateOnlineOrderDetailsRequest = () => ({
  type: UPDATE_ONLINE_ORDER_DETAILS_REQUEST,
});
export const updateOnlineOrderDetailsSuccess = (order) => ({
  type: UPDATE_ONLINE_ORDER_DETAILS_SUCCESS,
  payload: order,
});
export const updateOnlineOrderDetailsFailure = (error) => ({
  type: UPDATE_ONLINE_ORDER_DETAILS_FAILURE,
  payload: error,
});

export const returnOnlineOrderRequest = () => ({
  type: RETURN_ONLINE_ORDER_REQUEST,
});
export const returnOnlineOrderSuccess = (order) => ({
  type: RETURN_ONLINE_ORDER_SUCCESS,
  payload: order,
});
export const returnOnlineOrderFailure = (error) => ({
  type: RETURN_ONLINE_ORDER_FAILURE,
  payload: error,
});

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
