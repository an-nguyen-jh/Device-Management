import { createStore, compose } from "redux";
import rootReducer from "./reducers";

//enable Window Redux devtool
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reduxStore = createStore(rootReducer, composeEnhancers());

export default reduxStore;
