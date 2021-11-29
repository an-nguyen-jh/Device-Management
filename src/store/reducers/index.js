import { combineReducers } from "redux";
import authenticationReducer from "./auth";
import deviceInfoReducer from "./deviceInfo";

const rootReducer = combineReducers({
  auth: authenticationReducer,
  deviceInfo: deviceInfoReducer,
});

export default rootReducer;
