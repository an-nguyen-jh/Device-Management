import React, { useEffect, useState } from "react";
import { Toolbar, ListView, GridView } from "..";
import { sortOptions } from "../../config/options/options";
import ENV_CONFIG from "../../config";
import { getDeviceInfos } from "../../apiService";
import toast from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";

const tableHeaders = ["Thông tin", "Team", "Sửa đổi lần cuối"];

//trigger component re render
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function EmployeeDevice() {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  const [isListView, setIsListView] = useState(true);
  const sortOption = query.get("sort") || sortOptions[0].key;
  const [currentPage, setCurrentPage] = useState(0);
  const [deviceInfos, setDeviceInfos] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const changeLayoutView = () => setIsListView(!isListView);

  const handleSortChange = (e) =>
    history.push(`${location.pathname}?sort=${e.target.value}`);

  const handlePagination = (selectedPage) => setCurrentPage(selectedPage);

  useEffect(() => {
    (async () => {
      const pageLimit = isListView
        ? ENV_CONFIG.ITEM_LIMIT.LIST_LAYOUT
        : ENV_CONFIG.ITEM_LIMIT.GRID_LAYOUT;
      try {
        const deviceInfoSnapshots = await getDeviceInfos(
          currentPage,
          pageLimit,
          sortOption
        );

        const tempDeviceInfos = [];
        deviceInfoSnapshots.forEach((deviceInfo) => {
          const temp = deviceInfo.data();
          temp.updatedTime = temp.updatedTime.toDate().toLocaleDateString();
          tempDeviceInfos.push(temp);
        });

        setStartPoint(deviceInfoSnapshots[deviceInfoSnapshots.length - 1]);
        console.log(tempDeviceInfos);
        setDeviceInfos(tempDeviceInfos);
      } catch (error) {
        console.log(error);
        toast.error("Can not get devices list of employee", {
          className: "toast-notification",
        });
      }
    })();
  }, [currentPage, isListView, sortOption]);

  return (
    <div>
      <Toolbar
        changeLayout={changeLayoutView}
        isListView={isListView}
        sortOptions={sortOptions}
        selectOption={sortOption}
        sortHandler={handleSortChange}
      ></Toolbar>
      {isListView ? (
        <ListView
          tableHeaders={tableHeaders}
          deviceInfos={deviceInfos}
        ></ListView>
      ) : (
        <GridView deviceInfos={deviceInfos}></GridView>
      )}
    </div>
  );
}
export default EmployeeDevice;
