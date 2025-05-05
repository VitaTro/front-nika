import axios from "../../axiosConfig";
import {
  fetchOfflineSalesFailure,
  fetchOfflineSalesRequest,
  fetchOfflineSalesSuccess,
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
