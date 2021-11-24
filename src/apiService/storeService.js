import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import parseFullFileURL from "../utils/parser";

export default function generateStorageService() {
  const firebaseStorage = getStorage();
  async function uploadEmployeeDeviceImage(file, userIdentifier) {
    const fileName = file.name.split(" ").join("_");
    const imageRef = ref(firebaseStorage, `img/${userIdentifier}/${fileName}`);
    await uploadBytes(imageRef, file);
    //return image download link
    return getDownloadURL(imageRef);
  }

  function deleteOldEmployeeImage(fileURL) {
    const webFileURL = parseFullFileURL(fileURL);
    const normalizedFileURL = webFileURL.replace(/%2F/g, "/");
    const imageRef = ref(firebaseStorage, normalizedFileURL);
    return deleteObject(imageRef);
  }

  return { uploadEmployeeDeviceImage, deleteOldEmployeeImage };
}
