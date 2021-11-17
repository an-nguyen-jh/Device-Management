import firebase from "firebase/compat/app";
import { collection, getFirestore, getDoc, doc } from "firebase/firestore";
import config from "../config";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Initialize Firebase
firebase.initializeApp(config.FIREBASE_CONFIG);

const firebaseAuth = getAuth();
const firebaseDB = getFirestore();

const usersRef = collection(firebaseDB, "users");

function loginWithEmailAndPassword(email, password) {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
}

function signout() {
  return signOut(firebaseAuth);
}

function getUserByEmail(email) {
  const userRef = doc(firebaseDB, "users", email);
  return getDoc(userRef);
}

export { loginWithEmailAndPassword, signout, getUserByEmail };
