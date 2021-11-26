import React, { useState } from "react";
import { Toolbar, ListView, GridView } from "..";

const tableHeaders = ["Thông tin", "Team", "Sửa đổi lần cuối"];
function EmployeeDevice() {
  const [isListView, setIsListView] = useState(true);

  const changeLayoutView = () => setIsListView(!isListView);
  return (
    <div>
      <Toolbar
        changeLayout={changeLayoutView}
        isListView={isListView}
      ></Toolbar>
      {isListView ? (
        <ListView tableHeaders={tableHeaders}></ListView>
      ) : (
        <GridView></GridView>
      )}
    </div>
  );
}
export default EmployeeDevice;
