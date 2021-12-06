import ACTION_TAG from "../../config/redux/actionTag";

const deviceRequestInitState = {
  deviceRequests: [],
};

function deviceRequestReducer(
  deviceRequestState = deviceRequestInitState,
  action
) {
  switch (action.type) {
    case ACTION_TAG.DEVICE_REQUEST.STORE:
      return {
        deviceRequests: [...action.payload],
      };
    case ACTION_TAG.DEVICE_REQUEST.REMOVE:
      return {
        deviceRequests: [],
      };
    default:
      return deviceRequestState;
  }
}

export default deviceRequestReducer;
