import DEV_CONFIG from "../config";
const URLFirebase = DEV_CONFIG.URL_FIRESTORE;
export default function parsefullFileURL(fileURL) {
  const filename = fileURL.split(URLFirebase)[1].split("?")[0];

  return filename;
}
