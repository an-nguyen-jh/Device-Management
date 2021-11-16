import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import config from "../config";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";

// Initialize Firebase
firebase.initializeApp(config.FIREBASE_CONFIG);

const firebaseAuth = getAuth();

export { firebaseAuth };
