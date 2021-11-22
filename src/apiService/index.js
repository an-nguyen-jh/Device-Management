import firebase from "firebase/compat/app";
import config from "../config";
import generateAuthenticationService from "./authService";
import generatedDatabaseService from "./dbService";

// Initialize Firebase
firebase.initializeApp(config.FIREBASE_CONFIG);
const { loginWithEmailAndPassword, signout } = generateAuthenticationService();
const { getUserByEmail, getDeviceInfoOfUserByEmail } =
  generatedDatabaseService();

export {
  loginWithEmailAndPassword,
  signout,
  getUserByEmail,
  getDeviceInfoOfUserByEmail,
};
