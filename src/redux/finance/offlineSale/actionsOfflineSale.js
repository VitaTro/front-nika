// src/redux/finance/offlineSale/actionsOfflineSale.js
export const FETCH_OFFLINE_SALES_REQUEST = "FETCH_OFFLINE_SALES_REQUEST";
export const FETCH_OFFLINE_SALES_SUCCESS = "FETCH_OFFLINE_SALES_SUCCESS";
export const FETCH_OFFLINE_SALES_FAILURE = "FETCH_OFFLINE_SALES_FAILURE";
export const CREATE_OFFLINE_SALE_REQUEST = "CREATE_OFFLINE_SALE_REQUEST";
export const CREATE_OFFLINE_SALE_SUCCESS = "CREATE_OFFLINE_SALE_SUCCESS";
export const CREATE_OFFLINE_SALE_FAILURE = "CREATE_OFFLINE_SALE_FAILURE";
export const UPDATE_OFFLINE_SALE_REQUEST = "UPDATE_OFFLINE_SALE_REQUEST";
export const UPDATE_OFFLINE_SALE_SUCCESS = "UPDATE_OFFLINE_SALE_SUCCESS";
export const UPDATE_OFFLINE_SALE_FAILURE = "UPDATE_OFFLINE_SALE_FAILURE";
export const RETURN_OFFLINE_SALE_REQUEST = "RETURN_OFFLINE_SALE_REQUEST";
export const RETURN_OFFLINE_SALE_SUCCESS = "RETURN_OFFLINE_SALE_SUCCESS";
export const RETURN_OFFLINE_SALE_FAILURE = "RETURN_OFFLINE_SALE_FAILURE";

export const fetchOfflineSalesRequest = () => ({
  type: FETCH_OFFLINE_SALES_REQUEST,
});
export const fetchOfflineSalesSuccess = (sales) => ({
  type: FETCH_OFFLINE_SALES_SUCCESS,
  payload: sales,
});
export const fetchOfflineSalesFailure = (error) => ({
  type: FETCH_OFFLINE_SALES_FAILURE,
  payload: error,
});
export const createOfflineSaleRequest = () => ({
  type: CREATE_OFFLINE_SALE_REQUEST,
});
export const createOfflineSaleSuccess = (sale) => ({
  type: CREATE_OFFLINE_SALE_SUCCESS,
  payload: sale,
});
export const createOfflineSaleFailure = (error) => ({
  type: CREATE_OFFLINE_SALE_FAILURE,
  payload: error,
});
export const updateOfflineSaleRequest = () => ({
  type: UPDATE_OFFLINE_SALE_REQUEST,
});
export const updateOfflineSaleSuccess = (sale) => ({
  type: UPDATE_OFFLINE_SALE_SUCCESS,
  payload: sale,
});
export const updateOfflineSaleFailure = (error) => ({
  type: UPDATE_OFFLINE_SALE_FAILURE,
  payload: error,
});
export const returnOfflineSaleRequest = () => ({
  type: RETURN_OFFLINE_SALE_REQUEST,
});
export const returnOfflineSaleSuccess = (sale) => ({
  type: RETURN_OFFLINE_SALE_SUCCESS,
  payload: sale,
});
export const returnOfflineSaleFailure = (error) => ({
  type: RETURN_OFFLINE_SALE_FAILURE,
  payload: error,
});
