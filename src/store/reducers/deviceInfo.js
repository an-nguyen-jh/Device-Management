import ACTION_TAG from "../../config/redux/actionTag";

const deviceInfoInitState = {
  deviceInfos: [],
  selectedEmail: "",
};

function deviceInfoReducer(deviceInfoState = deviceInfoInitState, action) {
  switch (action.type) {
    case ACTION_TAG.DEVICE_INFO.STORE:
      return {
        ...deviceInfoState,
        deviceInfos: [...action.payload],
      };
    case ACTION_TAG.DEVICE_INFO.REMOVE:
      return {
        ...deviceInfoState,
        deviceInfos: [],
      };
    default:
      return deviceInfoState;
  }
}

export default deviceInfoReducer;
