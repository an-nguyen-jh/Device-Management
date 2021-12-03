import React from "react";
import { Appbar, Table } from "..";
import { adminSubRouters } from "../../config/routes";
import "../styles/deviceRequest.css";

const tableHeaders = [
  "Name",
  "Team",
  "Created Date",
  "Device",
  "Notification",
  "",
];

const fakeData = [
  {
    createdTime: new Date(),
    device: "screen",
    email: "jh.employee19@gmail.com",
    name: "Phạm Hoài Dung",
    notice: "Hư hỏng",
    numberOfDevice: 1,
    status: 0,
    team: "Designer",
  },
];

function DeviceRequest() {
  return (
    <>
      <Appbar routers={adminSubRouters}></Appbar>
      <div className="main-container bg-primary">
        <div className="device-request-container">
          <Table
            tableHeaders={tableHeaders}
            color="light"
            deviceRequests={fakeData}
          ></Table>
          {/* <Table tableHeaders={tableHeaders} color="warning"></Table>
          <Table tableHeaders={tableHeaders} color="success"></Table> */}
        </div>
      </div>
    </>
  );
}
export default DeviceRequest;
