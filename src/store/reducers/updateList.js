import ACTION_TAG from "../../config/redux/actionTag";

const updateInitState = 0;

const updateListReducer = (update = updateInitState, action) => {
  switch (action.type) {
    case ACTION_TAG.UPDATE_LIST:
      return ++action.payload.preCount;

    default:
      return update;
  }
};

export default updateListReducer;
