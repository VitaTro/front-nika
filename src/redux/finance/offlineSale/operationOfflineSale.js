import axios from "../../axiosConfig";
import {
  createOfflineSaleFailure,
  createOfflineSaleRequest,
  createOfflineSaleSuccess,
  fetchOfflineSalesFailure,
  fetchOfflineSalesRequest,
  fetchOfflineSalesSuccess,
  returnOfflineSaleFailure,
  returnOfflineSaleRequest,
  returnOfflineSaleSuccess,
  updateOfflineSaleFailure,
  updateOfflineSaleRequest,
  updateOfflineSaleSuccess,
} from "./actionsOfflineSale";

// Отримати всі офлайн-продажі
export const fetchOfflineSales = () => async (dispatch) => {
  dispatch(fetchOfflineSalesRequest());
  try {
    const response = await axios.get("/api/admin/finance/offline/sales");
    dispatch(fetchOfflineSalesSuccess(response.data));
  } catch (error) {
    dispatch(fetchOfflineSalesFailure(error.message));
  }
};

export const createOfflineSale = (saleData) => async (dispatch) => {
  dispatch(createOfflineSaleRequest());
  try {
    const response = await axios.post(
      "/api/admin/finance/offline/sales",
      saleData
    );
    dispatch(createOfflineSaleSuccess(response.data));
  } catch (error) {
    dispatch(createOfflineSaleFailure(error.message));
  }
};

// Оновити інформацію про офлайн-продаж
export const updateOfflineSale = (saleId, updatedData) => async (dispatch) => {
  dispatch(updateOfflineSaleRequest());
  try {
    const response = await axios.patch(
      `/api/admin/finance/offline/sales/${saleId}`,
      updatedData
    );
    dispatch(updateOfflineSaleSuccess(response.data));
  } catch (error) {
    dispatch(updateOfflineSaleFailure(error.message));
  }
};

export const returnOfflineSale = (saleId, refundAmount) => async (dispatch) => {
  dispatch(returnOfflineSaleRequest());
  try {
    const response = await axios.put(
      `/api/admin/finance/offline/sales/${saleId}/return`,
      { refundAmount }
    );
    dispatch(returnOfflineSaleSuccess(response.data));
  } catch (error) {
    dispatch(returnOfflineSaleFailure(error.message));
  }
};
