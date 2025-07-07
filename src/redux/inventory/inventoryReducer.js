import { combineReducers } from "redux";
import bulkUploadReducer from "./bulkUpload/bulkUploadSlice";
import monthlyReportReducer from "./monthlyReport/monthlyReportSlice";
import stockMovementReducer from "./stockMovement/stockMovementSlice";
const inventoryReducer = combineReducers({
  bulkUpload: bulkUploadReducer,
  stockMovement: stockMovementReducer,
  monthlyReport: monthlyReportReducer,
});
export default inventoryReducer;
