import ACTION_TAG from "../../config/redux/actionTag";

const deviceInfoInitState = {
  deviceInfos: [],
  selectedEmail: "",
};

function deviceInfoReducer(authState = deviceInfoInitState, action) {
  switch (action.type) {
    case ACTION_TAG.DEVICE_INFO.STORE:
      return {
        ...authState,
        deviceInfos: [...action.payload],
      };
    case ACTION_TAG.DEVICE_INFO.REMOVE:
      return {
        ...authState,
        deviceInfos: [],
      };
    default:
      return deviceInfoInitState;
  }
}

export default deviceInfoReducer;
