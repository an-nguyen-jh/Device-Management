import ENV_CONFIG from "..";

export const teamOptions = [
  { key: "Sweet Cake", value: "Sweet Cake" },
  { key: "Yin Yang", value: "Yin Yang" },
  { key: "Designer", value: "Designer" },
  { key: "Admin", value: "Admin" },
];
export const deviceOptions = [
  { key: ENV_CONFIG.DEVICE.COMPUTER, value: "Máy tính" },
  { key: ENV_CONFIG.DEVICE.MONITOR, value: "Màn hình" },
  { key: ENV_CONFIG.DEVICE.MOUSE, value: "Chuột" },
];

export const sortOptions = [
  {
    key: ENV_CONFIG.SORT.ASCEND_NAME,
    value: "Name ascending",
  },
  {
    key: ENV_CONFIG.SORT.DESCEND_NAME,
    value: "Name descending",
  },
  {
    key: ENV_CONFIG.SORT.ASCEND_UPDATE_DATE,
    value: "UpdatedDate ascending",
  },
  {
    key: ENV_CONFIG.SORT.DESCEND_UPDATE_DATE,
    value: "UpdatedDate descending",
  },
];

export const tableOptions = [
  {
    key: ENV_CONFIG.REQUEST.PENDING,
    value: "Pending Request",
  },
  {
    key: ENV_CONFIG.REQUEST.SOLVE,
    value: "Solve Request",
  },
  {
    key: ENV_CONFIG.REQUEST.DENY,
    value: "Deny Request",
  },
];
