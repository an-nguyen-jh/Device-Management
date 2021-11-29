import ACTION_TAG from "../../config/redux/actionTag";

const updateInitState = Math.random();

const updateListReducer = (update = updateInitState, action) => {
  switch (action.type) {
    case ACTION_TAG.UPDATE_LIST:
      return action.payload.salt;

    default:
      return update;
  }
};

export default updateListReducer;
