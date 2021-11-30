import ACTION_TAG from "../../config/redux/actionTag";

const confirmDialogAction = {
  visible: (employeeInfo) => ({
    type: ACTION_TAG.CONFIRM_DIALOG.SHOW,
    payload: employeeInfo,
  }),

  invisible: () => ({ type: ACTION_TAG.CONFIRM_DIALOG.HIDDEN }),
};

export default confirmDialogAction;
