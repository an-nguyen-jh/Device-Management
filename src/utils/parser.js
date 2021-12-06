import DEV_CONFIG from "../config";
const urlFirestorage = DEV_CONFIG.URL_FIRESTORAGE;

export default function parseFullFileURL(fileURL) {
  const filename = fileURL.split(urlFirestorage)[1].split("?")[0];
  return filename;
}

export function parseSortOption(option, separator) {
  return option.split(separator);
}

export function getValuesByOption(options, key) {
  const option = options.find((option) => option.key === key);
  return option.value;
}
