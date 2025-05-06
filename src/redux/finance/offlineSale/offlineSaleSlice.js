import {
  CREATE_OFFLINE_SALE_FAILURE,
  CREATE_OFFLINE_SALE_REQUEST,
  CREATE_OFFLINE_SALE_SUCCESS,
  FETCH_OFFLINE_SALES_FAILURE,
  FETCH_OFFLINE_SALES_REQUEST,
  FETCH_OFFLINE_SALES_SUCCESS,
  RETURN_OFFLINE_SALE_FAILURE,
  RETURN_OFFLINE_SALE_REQUEST,
  RETURN_OFFLINE_SALE_SUCCESS,
  UPDATE_OFFLINE_SALE_FAILURE,
  UPDATE_OFFLINE_SALE_REQUEST,
  UPDATE_OFFLINE_SALE_SUCCESS,
} from "./actionsOfflineSale";

const initialState = {
  offlineSales: [],
  loading: false,
  error: null,
};

const offlineSalesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OFFLINE_SALES_REQUEST:
    case CREATE_OFFLINE_SALE_REQUEST:
    case UPDATE_OFFLINE_SALE_REQUEST:
    case RETURN_OFFLINE_SALE_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_OFFLINE_SALES_SUCCESS:
      return { ...state, offlineSales: action.payload, loading: false };

    case CREATE_OFFLINE_SALE_SUCCESS:
      return {
        ...state,
        offlineSales: [...state.offlineSales, action.payload], // ✅ Додаємо новий продаж
        loading: false,
      };

    case UPDATE_OFFLINE_SALE_SUCCESS:
      return {
        ...state,
        offlineSales: state.offlineSales.map((sale) =>
          sale._id === action.payload._id ? action.payload : sale
        ),
        loading: false,
      };
    case RETURN_OFFLINE_SALE_SUCCESS:
      return {
        ...state,
        offlineSales: state.offlineSales.map((sale) =>
          sale._id === action.payload._id ? action.payload : sale
        ),
        loading: false,
      };
    case FETCH_OFFLINE_SALES_FAILURE:
    case CREATE_OFFLINE_SALE_FAILURE:
    case UPDATE_OFFLINE_SALE_FAILURE:
    case RETURN_OFFLINE_SALE_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
export default offlineSalesReducer;
