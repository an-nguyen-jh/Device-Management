import React, { useEffect, useState } from "react";
import { Toolbar, ListView, GridView } from "..";
import { sortOptions } from "../../config/options/options";
import ENV_CONFIG from "../../config";
import { getDeviceInfos } from "../../apiService";
import toast from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deviceInfoAction } from "../../store/actions";
import { parseSortOption } from "../../utils/parser";
import { sortDeviceInfos } from "../../utils/sort";
const tableHeaders = ["Thông tin", "Team", "Sửa đổi lần cuối"];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

//trigger component re render
function EmployeeDevice() {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  const dispatch = useDispatch();
  const { deviceInfos } = useSelector((state) => state.deviceInfo);
  const [isListView, setIsListView] = useState(true);
  const sortOption = query.get("sort") || sortOptions[0].key;

  const [currentPage, setCurrentPage] = useState(0);
  const changeLayoutView = () => setIsListView(!isListView);

  const handleSortChange = (e) => {
    const sortTokens = parseSortOption(e.target.value, "_");
    const tempDeviceInfos = [...deviceInfos];
    sortDeviceInfos(tempDeviceInfos, sortTokens);
    dispatch(deviceInfoAction.storeDeviceInfos(tempDeviceInfos));
    history.push(`${location.pathname}?sort=${e.target.value}`);
  };

  const handlePagination = (selectedPage) => setCurrentPage(selectedPage);

  useEffect(() => {
    (async () => {
      const pageLimit = isListView
        ? ENV_CONFIG.ITEM_LIMIT.LIST_LAYOUT
        : ENV_CONFIG.ITEM_LIMIT.GRID_LAYOUT;
      const sortTokens = parseSortOption(sortOption, "_");

      try {
        const deviceInfoSnapshots = await getDeviceInfos();
        const tempDeviceInfos = [];
        deviceInfoSnapshots.forEach((deviceInfoSnap) => {
          const temp = deviceInfoSnap.data();
          temp.updatedTime = temp.updatedTime.toDate();
          const email = deviceInfoSnap.id;
          tempDeviceInfos.push({ email, ...temp });
        });
        sortDeviceInfos(tempDeviceInfos, sortTokens);
        dispatch(deviceInfoAction.storeDeviceInfos(tempDeviceInfos));
      } catch (error) {
        console.log(error);
        toast.error("Can not get devices list of employee", {
          className: "toast-notification",
        });
      }
    })();

    //free memory in localStorage
    return dispatch(deviceInfoAction.removeDeviceInfo());
    //useEffect run once after mounting
  }, []);

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
