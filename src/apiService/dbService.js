import {
  getFirestore,
  getDoc,
  doc,
  updateDoc,
  setDoc,
  collection,
} from "firebase/firestore";

export default function generateDatabaseService() {
  const firebaseDB = getFirestore();

  function getUserByEmail(email) {
    const userRef = doc(firebaseDB, "users", email);
    return getDoc(userRef);
  }

  function getDeviceInfoOfEmployeeByEmail(email) {
    const deviceInfoRef = doc(firebaseDB, "deviceInfos", email);
    return getDoc(deviceInfoRef);
  }

  function updateDeviceInfoForm(data, email) {
    return updateDoc(doc(firebaseDB, "deviceInfos", email), {
      ...data,
    });
  }

  function addNewRequestDevice(data) {
    const deviceRequestRef = doc(collection(firebaseDB, "deviceRequests"));
    return setDoc(deviceRequestRef, data);
  }
  return {
    getUserByEmail,
    getDeviceInfoOfEmployeeByEmail,
    updateDeviceInfoForm,
    addNewRequestDevice,
  };
}
