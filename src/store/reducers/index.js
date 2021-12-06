import { combineReducers } from "redux";
import authenticationReducer from "./auth";
import deviceInfoReducer from "./deviceInfo";
import confirmDialogReducer from "./confirmDialog";
import updateListReducer from "./updateList";
import deviceRequestReducer from "./deviceRequest";

const rootReducer = combineReducers({
  auth: authenticationReducer,
  deviceInfo: deviceInfoReducer,
  confirmDialog: confirmDialogReducer,
  updateList: updateListReducer,
  deviceRequest: deviceRequestReducer,
});

export default rootReducer;
