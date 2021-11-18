import { combineReducers } from "redux";
import authenticationReducer from "./auth";

const rootReducer = combineReducers({
  auth: authenticationReducer,
});

export default rootReducer;
