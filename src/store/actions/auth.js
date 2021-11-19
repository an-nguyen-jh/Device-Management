import ACTION_TAG from "../../config/redux/actionTag";

const authenticationAction = {
  storeUserAuthenticationInfo: (token, email, role) => ({
    type: ACTION_TAG.AUTH.SIGN_IN,
    payload: { token, email, role },
  }),

  removeUserAuthenticationInfo: () => ({ type: ACTION_TAG.AUTH.SIGN_OUT }),
};

export default authenticationAction;
