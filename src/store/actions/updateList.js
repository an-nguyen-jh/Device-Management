import ACTION_TAG from "../../config/redux/actionTag";

const updateListAction = {
  update: () => ({
    type: ACTION_TAG.UPDATE_LIST,
    payload: { salt: Math.random() },
  }),
};

export default updateListAction;
