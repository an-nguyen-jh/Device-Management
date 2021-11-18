import { ACTION_TAG } from "../../config";

const authInitState = {
  token: null,
  email: null,
  role: null,
};

function authenticationReducer(authState = authInitState, action) {
  switch (action.type) {
    case ACTION_TAG.AUTH.SIGN_IN:
      return {
        token: action.payload.token,
        email: action.payload.email,
        role: action.payload.role,
      };
    case ACTION_TAG.AUTH.SIGN_OUT:
      return {
        token: null,
        email: null,
        role: null,
      };
    default:
      return authState;
  }
}

export default authenticationReducer;
