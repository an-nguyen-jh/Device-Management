import ENV_CONFIG from "../config";

export class DeviceInfo {
  constructor({
    name,
    computerCompanyName,
    computerConfig,
    computersSeriNumber,
    mouseCompanyName,
    numberOfMouse,
    numberOfScreen,
    screenConfig,
    screenSize,
    team,
  }) {
    this.createdTime = new Date();
    this.computerCompanyName = computerCompanyName;
    this.computerConfig = computerConfig;
    this.computersSeriNumber = computersSeriNumber;
    this.mouseCompanyName = mouseCompanyName;
    this.name = name;
    this.numberOfMouse = numberOfMouse || 0;
    this.numberOfScreen = numberOfScreen || 0;
    this.screenConfig = screenConfig || 0;
    this.screenSize = screenSize;
    this.team = team;
  }
}

export const deviceInfoConverter = {
  toFirestore: (deviceInfo) => {
    return {
      name: deviceInfo.name,
      computerCompanyName: deviceInfo.computerCompanyName,
      computerConfig: deviceInfo.computerConfig,
      computersSeriNumber: deviceInfo.computersSeriNumber,
      mouseCompanyName: deviceInfo.mouseCompanyName,
      numberOfMouse: deviceInfo.numberOfMouse,
      numberOfScreen: deviceInfo.numberOfScreen,
      screenConfig: deviceInfo.screenConfig,
      screenSize: deviceInfo.screenSize,
      team: deviceInfo.team,
      createdTime: deviceInfo.createdTime,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new DeviceInfo({ ...data });
  },
};

export class DeviceRequest {
  constructor({ name, team, device, numberOfDevice }) {
    this.team = team;
    this.device = device;
    this.name = name;
    this.numberOfDevice = numberOfDevice;
    this.createdTime = new Date();
    this.status = ENV_CONFIG.REQUEST.PENDING;
  }
}

export const deviceRequestConverter = {
  toFirestore: (deviceRequest) => {
    return {
      name: deviceRequest.name,
      createdTime: deviceRequest.createdTime,
      device: deviceRequest.device,
      numberOfDevice: deviceRequest.numberOfDevice,
      team: deviceRequest.team,
      status: deviceRequest.status,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new DeviceRequest({ ...data });
  },
};
