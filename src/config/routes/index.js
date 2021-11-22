import { lazy } from "react";
import ENV_CONFIG from "..";
import { MdOutlineDevices, MdOutlineDeviceUnknown } from "react-icons/md";

const Employee = lazy(() => import("../../pages/Employee/Employee"));
const Admin = lazy(() => import("../../pages/Admin/Admin"));

const privateRoute = {
  [ENV_CONFIG.ROLE.EMPLOYEE]: {
    pathname: "/employee",
    component: Employee,
  },
  [ENV_CONFIG.ROLE.ADMIN]: {
    pathname: "/admin",
    component: Admin,
  },
};

const employeeSubRouters = [
  {
    pathname: "/device-info",
    title: "Device's Info Form",
    icon: <MdOutlineDeviceUnknown />,
  },
  {
    pathname: "/device-request",
    title: "Device Request Form",
    icon: <MdOutlineDevices />,
  },
];

const adminSubRouters = [];

export { employeeSubRouters, adminSubRouters };

export default privateRoute;
