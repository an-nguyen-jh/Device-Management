import {
  deleteOldEmployeeImage,
  uploadEmployeeDeviceImage,
} from "../apiService";

export async function deleteOldEmployeeDeviceImages(images) {
  try {
    const imageDeletePromises = images.map((imageURL) => {
      return deleteOldEmployeeImage(imageURL);
    });
    await Promise.all(imageDeletePromises);
  } catch (error) {
    //ignore error
  }
}

export async function uploadEmployeeDeviceImages(images, userEmail) {
  try {
    const userIdentifier = userEmail.split(/@/)[0];
    const imageUploadPromises = images.map((image) => {
      return uploadEmployeeDeviceImage(image, userIdentifier);
    });
    const imageDownloadURLs = await Promise.all(imageUploadPromises);
    return imageDownloadURLs;
  } catch (error) {
    //ignore error
    return [];
  }
}
