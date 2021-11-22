import { getFirestore, getDoc, doc } from "firebase/firestore";

export default function generateDatabaseService() {
  const firebaseDB = getFirestore();

  function getUserByEmail(email) {
    const userRef = doc(firebaseDB, "users", email);
    return getDoc(userRef);
  }

  function getDeviceInfoOfUserByEmail(email) {
    const deviceInfoRef = doc(firebaseDB, "deviceInfos", email);
    return getDoc(deviceInfoRef);
  }
  return { getUserByEmail, getDeviceInfoOfUserByEmail };
}
