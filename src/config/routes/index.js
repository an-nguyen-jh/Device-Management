import { lazy } from "react";
import ENV_CONFIG from "..";
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

export default privateRoute;
