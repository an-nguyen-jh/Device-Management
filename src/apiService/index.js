import firebase from "firebase/compat/app";
import config from "../config";
import authenticationService from "./authService";
import databaseService from "./dbService";

// Initialize Firebase
firebase.initializeApp(config.FIREBASE_CONFIG);
const { loginWithEmailAndPassword, signout } = authenticationService();
const { getUserByEmail } = databaseService();

export { loginWithEmailAndPassword, signout, getUserByEmail };
