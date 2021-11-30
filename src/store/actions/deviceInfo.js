import ACTION_TAG from "../../config/redux/actionTag";

const deviceInfoAction = {
  storeDeviceInfos: (deviceInfos) => ({
    type: ACTION_TAG.DEVICE_INFO.STORE,
    payload: deviceInfos,
  }),

  removeDeviceInfo: () => ({ type: ACTION_TAG.DEVICE_INFO.REMOVE }),
};

export default deviceInfoAction;
