import { createStore, compose } from "redux";
import { loadStateFromLocal, saveStateToLocal } from "./localStorage";
import rootReducer from "./reducers";
import throttle from "lodash/throttle";

function configStore() {
  //load storage state in localStorage
  const persistedState = loadStateFromLocal();

  //enable Window Redux devtool
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const reduxStore = createStore(
    rootReducer,
    persistedState,
    composeEnhancers()
  );

  reduxStore.subscribe(
    //prevent store state to localStorage many times in a period
    throttle(() => {
      saveStateToLocal({
        auth: reduxStore.getState().auth,
      });
    }, 1000)
  );
  return reduxStore;
}

export default configStore;
