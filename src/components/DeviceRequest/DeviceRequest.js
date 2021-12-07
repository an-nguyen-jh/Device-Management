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
import {
  getDeviceInfoOfEmployeeByEmail,
  getDeviceRequests,
  updateEmployeeDeviceInfo,
  updateStatusOfDeviceRequest,
} from "../../apiService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deviceRequestAction } from "../../store/actions";

const tableHeaders = [
  "Name",
  "Team",
  "Created Date",
  "Device",
  "Notification",
  "",
];

function DeviceRequest() {
  const [reload, setReload] = useState(0);
  const [deviceRequests, setDeviceRequests] = useState([]);
  const { totalDeviceRequests } = useSelector((state) => ({
    totalDeviceRequests: state.deviceRequest.deviceRequests,
  }));
  const dispatch = useDispatch();
  const pageLimit = ENV_CONFIG.REQUEST_LIMIT_ON_PAGE;
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();
  const currentPage = parseInt(query.get("page")) || 1;
  const typeOption = parseInt(query.get("type")) || ENV_CONFIG.REQUEST.PENDING;

  const handleTableOptionChange = (e) => {
    history.push(`${location.pathname}?type=${e.target.value}`);
  };

  const handlePagination = (selectedPage) => {
    const deviceRequestsOnPage = totalDeviceRequests.slice(
      (selectedPage - 1) * pageLimit,
      selectedPage * pageLimit
    );
    setDeviceRequests(deviceRequestsOnPage);
    history.push(
      `${location.pathname}?type=${typeOption}&page=${selectedPage}`
    );
  };

  const updateDeviceInfo = async (email, device, amount) => {
    try {
      const deviceInfoSnap = await getDeviceInfoOfEmployeeByEmail(email);
      const updatedDeviceInfo = { ...deviceInfoSnap.data() };
      if (device === ENV_CONFIG.DEVICE.COMPUTER) {
        updatedDeviceInfo.computer = {};
      } else {
        updatedDeviceInfo[device].numberOf += amount;
      }
      await updateEmployeeDeviceInfo(updatedDeviceInfo, email);
    } catch (error) {
      //ignore error
    }
  };

  const handleAcceptRequest = async (requestId, email, device, amount) => {
    try {
      await updateStatusOfDeviceRequest(requestId, ENV_CONFIG.REQUEST.SOLVE);
      await updateDeviceInfo(email, device, amount);
      setReload(Math.random());
      let notice = "Accept employee's device request";
      if (device === ENV_CONFIG.DEVICE.COMPUTER) {
        notice = `Provided new computer for ${email}, You need update computer info in device details page`;
      }
      toast.success(notice, {
        className: "toast-notification",
      });
    } catch (error) {
      //ignore error
    }
  };

  const handleDenyRequest = async (requestId) => {
    try {
      await updateStatusOfDeviceRequest(requestId, ENV_CONFIG.REQUEST.DENY);
      setReload(Math.random());
      toast.success("Deny employee's device request", {
        className: "toast-notification",
      });
    } catch (error) {
      //ignore error
    }
  };

  const createTableBaseOnTableOption = (option) => {
    switch (option) {
      case ENV_CONFIG.REQUEST.PENDING:
        return (
          <Table
            color="light"
            currentPage={currentPage}
            deviceRequests={deviceRequests}
            handleAccept={handleAcceptRequest}
            handleDeny={handleDenyRequest}
            handlePagination={handlePagination}
            tableHeaders={tableHeaders}
            totalItem={totalDeviceRequests.length}
          ></Table>
        );
      case ENV_CONFIG.REQUEST.SOLVE:
        return (
          <Table
            color="success"
            currentPage={currentPage}
            deviceRequests={deviceRequests}
            handlePagination={handlePagination}
            tableHeaders={tableHeaders}
            totalItem={totalDeviceRequests.length}
          ></Table>
        );
      case ENV_CONFIG.REQUEST.DENY:
        return (
          <Table
            color="error"
            currentPage={currentPage}
            deviceRequests={deviceRequests}
            handlePagination={handlePagination}
            tableHeaders={tableHeaders}
            totalItem={totalDeviceRequests.length}
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
          const deviceRequestSnapShots = await getDeviceRequests(typeOption);
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
          dispatch(deviceRequestAction.storeDeviceRequests(tempDeviceRequests));
          const deviceRequestsOnPage = tempDeviceRequests.slice(
            (currentPage - 1) * pageLimit,
            currentPage * pageLimit
          );
          setDeviceRequests(deviceRequestsOnPage);
        } catch (error) {
          toast.error(`Can not get data of table`, {
            className: "toast-notification",
          });
        }
      }
    })();

    //free memory in localStorage
    return dispatch(deviceRequestAction.removeDeviceRequests());
  }, [dispatch, pageLimit, typeOption, reload]);

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
