export const CREATE_ONLINE_SALES_REQUEST = "CREATE_ONLINE_SALES_REQUEST";
export const CREATE_ONLINE_SALES_SUCCESS = "CREATE_ONLINE_SALES_SUCCESS";
export const CREATE_ONLINE_SALES_FAILURE = "CREATE_ONLINE_SALES_FAILURE";
export const FETCH_ONLINE_SALES_REQUEST = "FETCH_ONLINE_SALES_REQUEST";
export const FETCH_ONLINE_SALES_SUCCESS = "FETCH_ONLINE_SALES_SUCCESS";
export const FETCH_ONLINE_SALES_FAILURE = "FETCH_ONLINE_SALES_FAILURE";
export const UPDATE_ONLINE_SALES_REQUEST = "UPDATE_ONLINE_SALES_REQUEST";
export const UPDATE_ONLINE_SALES_SUCCESS = "UPDATE_ONLINE_SALES_SUCCESS";
export const UPDATE_ONLINE_SALES_FAILURE = "UPDATE_ONLINE_SALES_FAILURE";
export const RETURN_ONLINE_SALES_REQUEST = "RETURN_ONLINE_SALES_REQUEST";
export const RETURN_ONLINE_SALES_SUCCESS = "RETURN_ONLINE_SALES_SUCCESS";
export const RETURN_ONLINE_SALES_FAILURE = "RETURN_ONLINE_SALES_FAILURE";

export const returnOnlineSaleRequest = () => ({
  type: RETURN_ONLINE_SALES_REQUEST,
});

export const returnOnlineSaleSuccess = (sale) => ({
  type: RETURN_ONLINE_SALES_SUCCESS,
  payload: sale,
});

export const returnOnlineSaleFailure = (error) => ({
  type: RETURN_ONLINE_SALES_FAILURE,
  payload: error,
});
export const createOnlineSaleRequest = () => ({
  type: CREATE_ONLINE_SALES_REQUEST,
});

export const createOnlineSaleSuccess = (sale) => ({
  type: CREATE_ONLINE_SALES_SUCCESS,
  payload: sale,
});

export const createOnlineSaleFailure = (error) => ({
  type: CREATE_ONLINE_SALES_FAILURE,
  payload: error,
});
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
  type: UPDATE_ONLINE_SALES_REQUEST,
});

export const updateOnlineOrderSuccess = (order) => ({
  type: UPDATE_ONLINE_SALES_SUCCESS,
  payload: order,
});

export const updateOnlineOrderFailure = (error) => ({
  type: UPDATE_ONLINE_SALES_FAILURE,
  payload: error,
});
