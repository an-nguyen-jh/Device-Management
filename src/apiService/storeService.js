import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function generateStorageService() {
  const firebaseStorage = getStorage();

  async function uploadEmployeeDeviceImage(file, userEmail) {
    const fileName = file.name.split(" ").join("_");

    const imageRef = ref(firebaseStorage, `img/${userEmail}/${fileName}`);
    await uploadBytes(imageRef, file);
    //return image download link
    return getDownloadURL(imageRef);
  }
  return { uploadEmployeeDeviceImage };
}
