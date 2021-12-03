import React from "react";
import { Appbar } from "..";
import { adminSubRouters } from "../../config/routes";

function DeviceRequest() {
  return (
    <>
      <Appbar routers={adminSubRouters}></Appbar>
    </>
  );
}
export default DeviceRequest;
