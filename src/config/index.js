const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "device-management-911c9.firebaseapp.com",
  databaseURL:
    "https://device-management-911c9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "device-management-911c9",
  storageBucket: "device-management-911c9.appspot.com",
  messagingSenderId: "421265665293",
  appId: "1:421265665293:web:1b0efee457fc93cf7cd444",
  measurementId: "G-T8B08LMKEX",
};

const ROLE = {
  EMPLOYEE: "2",
  ADMIN: "1",
};

const REQUEST = {
  SOLVE: 1,
  PENDING: 0,
  DENY: -1,
};

const SORT = {
  ASCEND_NAME: "name_asc",
  DESCEND_NAME: "name_desc",
  ASCEND_UPDATE_DATE: "updatedTime_asc",
  DESCEND_UPDATE_DATE: "updatedTime_desc",
};

const DEVICE = {
  COMPUTER: "computer",
  MOUSE: "mouse",
  MONITOR: "screen",
};

const ITEM_LIMIT = 12;

const REQUEST_LIMIT_ON_PAGE = 10;

const ENV_CONFIG = {
  FIREBASE_CONFIG,
  ROLE,
  URL_FIRESTORAGE:
    "https://firebasestorage.googleapis.com/v0/b/device-management-911c9.appspot.com/o/",
  REQUEST,
  SORT,
  ITEM_LIMIT,
  REQUEST_LIMIT_ON_PAGE,
  DEVICE,
};

export default ENV_CONFIG;
