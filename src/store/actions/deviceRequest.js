import ACTION_TAG from "../../config/redux/actionTag";

const deviceRequestAction = {
  storeDeviceRequests: (deviceRequests) => ({
    type: ACTION_TAG.DEVICE_REQUEST.STORE,
    payload: deviceRequests,
  }),

  removeDeviceRequests: () => ({ type: ACTION_TAG.DEVICE_REQUEST.REMOVE }),
};

export default deviceRequestAction;
