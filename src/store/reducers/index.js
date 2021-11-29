import { combineReducers } from "redux";
import authenticationReducer from "./auth";
import deviceInfoReducer from "./deviceInfo";
import confirmDialogReducer from "./confirmDialog";

const rootReducer = combineReducers({
  auth: authenticationReducer,
  deviceInfo: deviceInfoReducer,
  confirmDialog: confirmDialogReducer,
});

export default rootReducer;
