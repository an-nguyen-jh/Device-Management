import React from "react";
import "../styles/listView.css";
import classNames from "classnames";

function ListView({ tableHeaders, deviceInfos }) {
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
          {deviceInfos.map((deviceInfos, i) => (
            <div className="list-layout__row">
              <div className="list-layout__cell list-layout__first-cell">
                <div className="list-layout__row__img">
                  {deviceInfos.imageSrcs.length !== 0 ? (
                    <>
                      <img src={deviceInfos.imageSrcs[0]} alt="device" />
                      <span className="list-layout__row__img-overlay">
                        + {deviceInfos.imageSrcs.length}
                      </span>
                    </>
                  ) : (
                    <img
                      src={process.env.PUBLIC_URL + "/defaultImg.jpg"}
                      alt="device"
                    />
                  )}
                </div>
                <span>{deviceInfos.name}</span>
              </div>
              <div className="list-layout__cell">
                <span>{deviceInfos.team}</span>
              </div>
              <div className="list-layout__cell">
                <span> {deviceInfos.updatedTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ListView;
