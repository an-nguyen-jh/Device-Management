import { ACTION_TAG } from "../../config";

const authenticationAction = {
  storeUserAuthenticationInfo: (token, email, role) => ({
    type: ACTION_TAG.AUTH.SIGN_IN,
    payload: { token, email, role },
  }),

  removeUserAuthenticationInfo: () => ({ type: ACTION_TAG.AUTH.SIGN_OUT }),
};

export default authenticationAction;
