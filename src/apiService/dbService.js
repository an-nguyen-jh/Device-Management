import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  collection,
} from "firebase/firestore";
import {
  DeviceInfo,
  deviceInfoConverter,
  DeviceRequest,
  deviceRequestConverter,
} from "./customClass";

export default function generateDatabaseService() {
  const firebaseDB = getFirestore();

  function getUserByEmail(email) {
    const userRef = doc(firebaseDB, "users", email);
    return getDoc(userRef);
  }

  function getDeviceInfoOfEmployeeByEmail(email) {
    const deviceInfoRef = doc(firebaseDB, "deviceInfos", email).withConverter(
      deviceInfoConverter
    );
    return getDoc(deviceInfoRef);
  }

  function updateDeviceInfoForm(data, email) {
    const deviceUpdateDoc = doc(firebaseDB, "deviceInfos", email).withConverter(
      deviceInfoConverter
    );
    const deviceUpdateData = new DeviceInfo(data);
    return setDoc(deviceUpdateDoc, deviceUpdateData, { merge: true });
  }

  function addNewRequestDevice(data) {
    const deviceRequestRef = doc(
      collection(firebaseDB, "deviceRequests")
    ).withConverter(deviceRequestConverter);
    const deviceRequestNewData = new DeviceRequest(data);

    return setDoc(deviceRequestRef, deviceRequestNewData);
  }
  return {
    getUserByEmail,
    getDeviceInfoOfEmployeeByEmail,
    updateDeviceInfoForm,
    addNewRequestDevice,
  };
}
