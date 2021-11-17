import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import config from "../config";
import "firebase/compat/auth";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Initialize Firebase
firebase.initializeApp(config.FIREBASE_CONFIG);

const firebaseAuth = getAuth();

function loginWithEmailAndPassword(email, password) {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
}

function signout() {
  return signOut(firebaseAuth);
}

export { loginWithEmailAndPassword, signout };
