import React from "react";
import "../styles/listView.css";
import classNames from "classnames";

function ListView({ tableHeaders }) {
  return (
    <div className="list-layout-wrapper">
      <div className="list-layout__header-wrapper">
        <div className="container-fluid">
          <div className="list-layout__header">
            {tableHeaders.map((tableHeader, i) => (
              <div
                key={tableHeader}
                className={classNames("list-layout__cell", {
                  "list-layout__first-cell": i === 0,
                })}
              >
                {tableHeader}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="list-layout__body">
          <div className="list-layout__row">
            {/* template */}
            <div className="list-layout__cell list-layout__first-cell">
              <div className="list-layout__row__img">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/device-management-911c9.appspot.com/o/img%2Fjh.employee%2FemailTemplate.png?alt=media&token=5f18ba3a-6514-4012-a825-bc1d5123c8dd"
                  alt="device"
                />
                <span className="list-layout__row__img-overlay">+ 3</span>
              </div>
              <span>Nguyễn Hồng Ân</span>
            </div>
            <div className="list-layout__cell">
              <span>Yin Yang</span>
            </div>
            <div className="list-layout__cell">
              <span> 15.06.1999 </span>
            </div>
          </div>
          <div className="list-layout__row">
            <div className="list-layout__cell list-layout__first-cell">
              <div className="list-layout__row__img">
                <img
                  src={process.env.PUBLIC_URL + "/defaultImg.jpg"}
                  alt="device"
                />
              </div>
              <span>Nguyễn Hồng Ân</span>
            </div>
            <div className="list-layout__cell">
              <span>Yin Yang</span>
            </div>
            <div className="list-layout__cell">
              <span> 15.06.1999 </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListView;
