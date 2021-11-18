import ACTION_TAG from "./redux/actionTag";

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

const ENV_CONFIG = {
  FIREBASE_CONFIG,
  ROLE,
};

export { ACTION_TAG };

export default ENV_CONFIG;
