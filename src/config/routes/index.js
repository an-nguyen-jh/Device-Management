import { lazy } from "react";
import ENV_CONFIG from "..";
import { MdOutlineDevices, MdOutlineDeviceUnknown } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi";
import { FaList } from "react-icons/fa";
const Employee = lazy(() => import("../../pages/Employee/Employee"));
const Admin = lazy(() => import("../../pages/Admin/Admin"));
const DeviceInfoForm = lazy(() =>
  import("../../components/Form/DeviceInfoForm")
);
const DeviceRequestForm = lazy(() =>
  import("../../components/Form/DeviceRequestForm")
);

const DeviceRequest = lazy(() =>
  import("../../components/DeviceRequest/DeviceRequest")
);
const EmployeeDevice = lazy(() =>
  import("../../components/EmployeeDevice/EmployeeDevice")
);
const EmployeeDeviceDetail = lazy(() =>
  import("../../components/EmployeeDevice/EmployeeDeviceDetail")
);

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
    title: "Device Information Form",
    icon: <MdOutlineDeviceUnknown />,
    component: DeviceInfoForm,
  },
  {
    pathname: "/device-request",
    title: "Device Request Form",
    icon: <MdOutlineDevices />,
    component: DeviceRequestForm,
  },
];

const adminSubRouters = [
  {
    pathname: "/items-list",
    title: "Employee Devices List",
    icon: <HiDocumentDuplicate />,
    component: EmployeeDevice,
    hasDetailsPage: {
      component: EmployeeDeviceDetail,
    },
  },
  {
    pathname: "/device-request-list",
    title: "Device Request list",
    icon: <FaList />,
    component: DeviceRequest,
  },
];

export { employeeSubRouters, adminSubRouters };

export default privateRoute;
