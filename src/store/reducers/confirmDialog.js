import ACTION_TAG from "../../config/redux/actionTag";

const confirmDialogInitState = {
  name: "",
  email: "",
  imageSrcs: null,
  open: false,
  callback: null,
};

function confirmDialogReducer(
  confirmDialogState = confirmDialogInitState,
  action
) {
  switch (action.type) {
    case ACTION_TAG.CONFIRM_DIALOG.SHOW:
      return {
        ...action.payload,
        open: true,
      };
    case ACTION_TAG.CONFIRM_DIALOG.HIDDEN:
      return {
        name: "",
        email: "",
        open: false,
        imageSrcs: null,
        callback: null,
      };
    default:
      return confirmDialogState;
  }
}

export default confirmDialogReducer;
