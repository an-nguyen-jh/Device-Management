import { getFirestore, getDoc, doc } from "firebase/firestore";

export default function databaseService() {
  const firebaseDB = getFirestore();

  function getUserByEmail(email) {
    const userRef = doc(firebaseDB, "users", email);
    return getDoc(userRef);
  }
  return { getUserByEmail };
}
