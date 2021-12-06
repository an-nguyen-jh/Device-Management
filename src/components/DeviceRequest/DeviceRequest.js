import React, { useState, useEffect } from "react";
import { Appbar, Select, Table } from "..";
import { adminSubRouters } from "../../config/routes";
import "../styles/deviceRequest.css";
import { tableOptions } from "../../config/options/options";
import { useQuery } from "../../utils/routerHandler";
import ENV_CONFIG from "../../config";
import { useHistory, useLocation } from "react-router";
import { parseSortOption } from "../../utils/parser";
import { sortByElementProperty } from "../../utils/sort";
import { getDeviceRequest } from "../../apiService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const tableHeaders = [
  "Name",
  "Team",
  "Created Date",
  "Device",
  "Notification",
  "",
];

function DeviceRequest() {
  const [reload, setReload] = useState(false);
  const [deviceRequests, setDeviceRequests] = useState([]);

  const dispatch = useDispatch();
  const pageLimit = ENV_CONFIG.REQUEST_LIMIT;
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();
  const currentPage = parseInt(query.get("page")) || 1;
  const typeOption = parseInt(query.get("type")) || ENV_CONFIG.REQUEST.PENDING;

  const handleTableOptionChange = (e) => {
    history.push(
      `${location.pathname}?type=${e.target.value}&page=${currentPage}`
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
            currentPage={currentPage}
            deviceRequests={deviceRequests}
            handleAccept={handleAcceptRequest}
            handleDeny={handleDenyRequest}
          ></Table>
        );
      case ENV_CONFIG.REQUEST.SOLVE:
        return (
          <Table
            tableHeaders={tableHeaders}
            deviceRequests={deviceRequests}
            currentPage={currentPage}
            color="success"
          ></Table>
        );
      case ENV_CONFIG.REQUEST.DENY:
        return (
          <Table
            tableHeaders={tableHeaders}
            deviceRequests={deviceRequests}
            currentPage={currentPage}
            color="error"
          ></Table>
        );
      default:
        break;
    }
  };

  useEffect(() => {
    (async () => {
      if (typeof typeOption === "number") {
        //default sort option
        const sortTokens = parseSortOption("createdTime_asc", "_");
        try {
          const deviceRequestSnapShots = await getDeviceRequest(typeOption);
          let tempDeviceRequests = [];
          deviceRequestSnapShots.forEach((deviceRequestSnap) => {
            const tempDeviceRequest = deviceRequestSnap.data();
            const deviceRequestId = deviceRequestSnap.id;
            tempDeviceRequest.createdTime =
              tempDeviceRequest.createdTime.toDate();
            tempDeviceRequests.push({
              id: deviceRequestId,
              ...tempDeviceRequest,
            });
          });
          sortByElementProperty(tempDeviceRequests, sortTokens);

          const deviceRequestsInPage = tempDeviceRequests.slice(
            (currentPage - 1) * pageLimit,
            currentPage * pageLimit
          );
          setDeviceRequests(deviceRequestsInPage);
        } catch (error) {
          toast.error(`Can not get data of table`, {
            className: "toast-notification",
          });
        }
      }
    })();
  }, [currentPage, pageLimit, typeOption]);

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
                  value={typeOption}
                  options={tableOptions}
                  placeholder="--Table--"
                  onChange={handleTableOptionChange}
                ></Select>
              </div>
            </div>
          </div>
        </div>
        <div className="device-request-container">
          {createTableBaseOnTableOption(typeOption)}
        </div>
      </div>
    </>
  );
}
export default DeviceRequest;
