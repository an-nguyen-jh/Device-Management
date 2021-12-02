import { deleteOldEmployeeImage } from "../apiService";

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
