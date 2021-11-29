export function sortDeviceInfos(deviceInfos, sortTokens) {
  if (sortTokens[0] === "name") {
    if (sortTokens[1] === "desc") {
      deviceInfos.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    } else {
      deviceInfos.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
  }
  if (sortTokens[0] === "updatedTime") {
    if (sortTokens[1] === "desc") {
      deviceInfos.sort((a, b) => {
        return b.updatedTime > a.updatedTime ? 1 : -1;
      });
    } else {
      deviceInfos.sort((a, b) => {
        return a.updatedTime > b.updatedTime ? 1 : -1;
      });
    }
  }
}
