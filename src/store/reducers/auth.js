import { ACTION_TAG } from "../../config";

const authInitState = {
  userToken: null,
  userEmail: null,
  userRole: null,
};

function authenticationReducer(authState = authInitState, action) {
  switch (action.type) {
    case ACTION_TAG.AUTH.SIGN_IN:
      return {
        userToken: action.payload.token,
        userEmail: action.payload.email,
        userRole: action.payload.role,
      };
    case ACTION_TAG.AUTH.SIGN_OUT:
      return {
        userToken: null,
        userEmail: null,
        userRole: null,
      };
    default:
      return authState;
  }
}

export default authenticationReducer;
