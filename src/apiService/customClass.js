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
    this.name = name;
    this.team = team;
    this.computer = {
      companyName: computerCompanyName,
      config: computerConfig,
      seriNumber: computersSeriNumber,
    };
    this.mouse = {
      companyName: mouseCompanyName,
      numberOf: numberOfMouse || 0,
    };
    this.screen = {
      numberOf: numberOfScreen || 0,
      config: screenConfig || 0,
      size: screenSize,
    };
  }
}

export const deviceInfoConverter = {
  toFirestore: (deviceInfo) => {
    return {
      name: deviceInfo.name,
      team: deviceInfo.team,
      createdTime: deviceInfo.createdTime,
      computer: {
        ...deviceInfo.computer,
      },
      mouse: {
        ...deviceInfo.mouse,
      },
      screen: {
        ...deviceInfo.screen,
      },
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new DeviceInfo({ ...data });
  },
};

export class DeviceRequest {
  constructor({ name, team, device, numberOfDevice, notice }) {
    this.team = team;
    this.device = device;
    this.name = name;
    this.numberOfDevice = numberOfDevice;
    this.createdTime = new Date();
    this.status = ENV_CONFIG.REQUEST.PENDING;
    this.notice = notice;
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
      notice: deviceRequest.notice,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new DeviceRequest({ ...data });
  },
};
