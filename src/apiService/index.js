import firebase from "firebase/compat/app";
import config from "../config";
import generateAuthenticationService from "./authService";
import generatedDatabaseService from "./dbService";
import generateStorageService from "./storeService";

// Initialize Firebase
firebase.initializeApp(config.FIREBASE_CONFIG);
const { loginWithEmailAndPassword, signout } = generateAuthenticationService();
const { getUserByEmail, getDeviceInfoOfUserByEmail, updateDeviceInfoForm } =
  generatedDatabaseService();

const { uploadEmployeeDeviceImage } = generateStorageService();

export {
  loginWithEmailAndPassword,
  signout,
  getUserByEmail,
  getDeviceInfoOfUserByEmail,
  updateDeviceInfoForm,
  uploadEmployeeDeviceImage,
};
