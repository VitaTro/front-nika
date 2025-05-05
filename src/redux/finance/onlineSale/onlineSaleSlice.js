import {
  FETCH_ONLINE_SALES_FAILURE,
  FETCH_ONLINE_SALES_REQUEST,
  FETCH_ONLINE_SALES_SUCCESS,
  UPDATE_ONLINE_ORDER_FAILURE,
  UPDATE_ONLINE_ORDER_REQUEST,
  UPDATE_ONLINE_ORDER_SUCCESS,
} from "./actionsOnlineSales";

const initialState = {
  onlineSales: [],
  loading: false,
  error: null,
};

const onlineSalesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ONLINE_SALES_REQUEST:
    case UPDATE_ONLINE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_ONLINE_SALES_SUCCESS:
      return { ...state, onlineSales: action.payload, loading: false };

    case UPDATE_ONLINE_ORDER_SUCCESS:
      return {
        ...state,
        onlineSales: state.onlineSales.map((sale) =>
          sale._id === action.payload._id ? action.payload : sale
        ),
        loading: false,
      };

    case FETCH_ONLINE_SALES_FAILURE:
    case UPDATE_ONLINE_ORDER_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default onlineSalesReducer;
