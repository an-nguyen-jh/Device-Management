import { combineReducers } from "redux";
import authenticationReducer from "./auth";
import deviceInfoReducer from "./deviceInfo";
import confirmDialogReducer from "./confirmDialog";
import updateListReducer from "./updateList";

const rootReducer = combineReducers({
  auth: authenticationReducer,
  deviceInfo: deviceInfoReducer,
  confirmDialog: confirmDialogReducer,
  updateList: updateListReducer,
});

export default rootReducer;
