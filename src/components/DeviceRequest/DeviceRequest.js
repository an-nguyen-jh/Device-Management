import React, { useState } from "react";
import { Toolbar, ListView } from "..";

const tableHeaders = ["Thông tin", "Team", "Sửa đổi lần cuối"];

function DeviceRequest() {
  const [isListView, setIsListView] = useState(true);

  const changeLayoutView = () => setIsListView(!isListView);
  return (
    <div>
      <Toolbar
        changeLayout={changeLayoutView}
        isListView={isListView}
      ></Toolbar>
      {isListView ? <ListView tableHeaders={tableHeaders}></ListView> : null}
    </div>
  );
}
export default DeviceRequest;
