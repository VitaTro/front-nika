import {
  CREATE_ONLINE_SALES_FAILURE,
  CREATE_ONLINE_SALES_REQUEST,
  CREATE_ONLINE_SALES_SUCCESS,
  FETCH_ONLINE_SALES_FAILURE,
  FETCH_ONLINE_SALES_REQUEST,
  FETCH_ONLINE_SALES_SUCCESS,
  RETURN_ONLINE_SALES_FAILURE,
  RETURN_ONLINE_SALES_REQUEST,
  RETURN_ONLINE_SALES_SUCCESS,
  UPDATE_ONLINE_SALES_FAILURE,
  UPDATE_ONLINE_SALES_REQUEST,
  UPDATE_ONLINE_SALES_SUCCESS,
} from "./actionsOnlineSales";

const initialState = {
  onlineSales: [],
  loading: false,
  error: null,
};

const onlineSalesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ONLINE_SALES_REQUEST:
    case UPDATE_ONLINE_SALES_REQUEST:
    case CREATE_ONLINE_SALES_REQUEST:
    case RETURN_ONLINE_SALES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_ONLINE_SALES_SUCCESS:
      return { ...state, onlineSales: action.payload, loading: false };

    case UPDATE_ONLINE_SALES_SUCCESS:
    case CREATE_ONLINE_SALES_SUCCESS:
      return {
        ...state,
        onlineSales: [...state.onlineSales, action.payload],
        loading: false,
      };
    case RETURN_ONLINE_SALES_SUCCESS:
      return {
        ...state,
        onlineSales: state.onlineSales.map((sale) =>
          sale.id === action.payload.id ? action.payload : sale
        ),
        loading: false,
      };
    case FETCH_ONLINE_SALES_FAILURE:
    case UPDATE_ONLINE_SALES_FAILURE:
    case CREATE_ONLINE_SALES_FAILURE:
    case RETURN_ONLINE_SALES_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default onlineSalesReducer;
