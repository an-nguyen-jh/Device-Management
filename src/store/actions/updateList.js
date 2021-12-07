import ACTION_TAG from "../../config/redux/actionTag";

const updateListAction = {
  update: (preCount) => ({
    type: ACTION_TAG.UPDATE_LIST,
    payload: { preCount },
  }),
};

export default updateListAction;
