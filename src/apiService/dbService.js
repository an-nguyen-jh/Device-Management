import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";

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

  function updateDeviceInfoForm(values, email) {
    return updateDoc(doc(firebaseDB, "deviceInfos", email), {
      ...values,
    });
  }
  return {
    getUserByEmail,
    getDeviceInfoOfEmployeeByEmail,
    updateDeviceInfoForm,
  };
}
