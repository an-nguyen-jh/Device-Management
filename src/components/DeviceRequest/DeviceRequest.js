import React, { useState, useEffect } from "react";
import { Appbar, Select, Table } from "..";
import { adminSubRouters } from "../../config/routes";
import "../styles/deviceRequest.css";
import { sortOptions, tableOptions } from "../../config/options/options";
import { useQuery } from "../../utils/routerHandler";
import ENV_CONFIG from "../../config";
import { useHistory, useLocation } from "react-router";
import { parseSortOption } from "../../utils/parser";
import { sortByElementProperty } from "../../utils/sort";

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
  const [reload, setReload] = useState(false);

  const query = useQuery();
  const history = useHistory();
  const location = useLocation();
  const sortOption = query.get("sort") || sortOptions[0].key;
  const currentPage = parseInt(query.get("page")) || 1;
  const tableOption = parseInt(query.get("type")) || ENV_CONFIG.REQUEST.PENDING;

  const handleTableOptionChange = (e) => {
    history.push(
      `${location.pathname}?type=${e.target.value}&sort=${sortOption}&page=${currentPage}`
    );
  };

  const handleSortChange = (e) => {
    const sortTokens = parseSortOption(e.target.value, "_");
    // const tempDeviceInfos = [...totalDeviceInfos];
    // sortByElementProperty(tempDeviceInfos, sortTokens);
    // dispatch(deviceInfoAction.storeDeviceInfos(tempDeviceInfos));
    // const deviceInfoInPage = tempDeviceInfos.slice(
    //   (currentPage - 1) * pageLimit,
    //   currentPage * pageLimit
    // );
    // setDeviceInfos(deviceInfoInPage);
    history.push(
      `${location.pathname}?type=${tableOption}&sort=${e.target.value}&page=${currentPage}`
    );
  };

  const handleAcceptRequest = () => {};

  const handleDenyRequest = () => {};

  const createTableBaseOnTableOption = (option) => {
    switch (option) {
      case ENV_CONFIG.REQUEST.PENDING:
        return (
          <Table
            tableHeaders={tableHeaders}
            color="light"
            deviceRequests={fakeData}
            handleAccept={handleAcceptRequest}
            handleDeny={handleDenyRequest}
          ></Table>
        );
      case ENV_CONFIG.REQUEST.SOLVE:
        return (
          <Table
            tableHeaders={tableHeaders}
            deviceRequests={fakeData}
            color="success"
          ></Table>
        );
      case ENV_CONFIG.REQUEST.DENY:
        return (
          <Table
            tableHeaders={tableHeaders}
            deviceRequests={fakeData}
            color="error"
          ></Table>
        );
      default:
        break;
    }
  };

  useEffect(() => {
    (async () => {
      console.log("Update");
    })();
  }, []);

  return (
    <>
      <Appbar routers={adminSubRouters}></Appbar>
      <div className="main-container bg-primary">
        <div className="toolbar-wrapper">
          <div className="container-fluid">
            <div className="toolbar">
              <div className="toolbar__functional-group">
                <Select
                  className="toolbar__functional-sort "
                  value={tableOption}
                  options={tableOptions}
                  placeholder="--Table--"
                  onChange={handleTableOptionChange}
                ></Select>
                <Select
                  className="toolbar__functional-sort table__toolbar__select"
                  value={sortOption}
                  onChange={handleSortChange}
                  options={sortOptions}
                  placeholder="--Sort by--"
                ></Select>
              </div>
            </div>
          </div>
        </div>
        <div className="device-request-container">
          {createTableBaseOnTableOption(tableOption)}
        </div>
      </div>
    </>
  );
}
export default DeviceRequest;
