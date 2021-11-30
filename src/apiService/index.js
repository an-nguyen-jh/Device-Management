import firebase from "firebase/compat/app";
import config from "../config";
import generateAuthenticationService from "./authService";
import generatedDatabaseService from "./dbService";
import generateStorageService from "./storeService";

// Initialize Firebase
firebase.initializeApp(config.FIREBASE_CONFIG);
const { loginWithEmailAndPassword, signout } = generateAuthenticationService();
const {
  getUserByEmail,
  getDeviceInfoOfEmployeeByEmail,
  addDeviceInfoForm,
  addNewRequestDevice,
  getAllDeviceInfos,
  deleteDeviceInfoByEmail,
  deleteAllRelativeDeviceRequests,
} = generatedDatabaseService();

const { uploadEmployeeDeviceImage, deleteOldEmployeeImage } =
  generateStorageService();

export {
  loginWithEmailAndPassword,
  signout,
  getUserByEmail,
  getDeviceInfoOfEmployeeByEmail,
  addDeviceInfoForm,
  uploadEmployeeDeviceImage,
  deleteOldEmployeeImage,
  addNewRequestDevice,
  getAllDeviceInfos,
  deleteDeviceInfoByEmail,
  deleteAllRelativeDeviceRequests,
};
