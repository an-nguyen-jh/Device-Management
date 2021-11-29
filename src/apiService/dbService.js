import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  collection,
  query,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { parseSortOption } from "../utils/parser";
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

  function getDeviceInfos(currentPage, pageLimit, sortOption) {
    const deviceInfoRef = collection(firebaseDB, "deviceInfos");
    const sortTokens = parseSortOption(sortOption, "_");
    const deviceInfoQuery = query(
      deviceInfoRef,
      orderBy(sortTokens[0], sortTokens[1]),
      limit(pageLimit)
    );

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
