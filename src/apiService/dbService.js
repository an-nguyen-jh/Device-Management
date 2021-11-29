import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  collection,
  query,
  getDocs,
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

  function addDeviceInfoForm(data, email) {
    const deviceInfoDoc = doc(firebaseDB, "deviceInfos", email).withConverter(
      deviceInfoConverter
    );
    const deviceInfoData = new DeviceInfo(data);
    return setDoc(deviceInfoDoc, deviceInfoData, { merge: true });
  }

  function addNewRequestDevice(data) {
    const deviceRequestRef = doc(
      collection(firebaseDB, "deviceRequests")
    ).withConverter(deviceRequestConverter);
    const deviceRequestNewData = new DeviceRequest(data);

    return setDoc(deviceRequestRef, deviceRequestNewData);
  }

  function getDeviceInfos() {
    const deviceInfoRef = collection(firebaseDB, "deviceInfos");
    const deviceInfoQuery = query(deviceInfoRef);

    return getDocs(deviceInfoQuery);
  }

  return {
    getUserByEmail,
    getDeviceInfoOfEmployeeByEmail,
    addDeviceInfoForm,
    addNewRequestDevice,
    getDeviceInfos,
  };
}
