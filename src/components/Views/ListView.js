import React from "react";
import "../styles/listView.css";
import classNames from "classnames";
import { MdOutlineDeleteOutline } from "react-icons/md";

function ListView({ tableHeaders, deviceInfos, handleDelete }) {
  return (
    <div className="list-layout-wrapper">
      <div className="list-layout__header-wrapper">
        <div className="container-fluid">
          <div className="list-layout__header">
            {tableHeaders.map((tableHeader, i) => (
              <div
                key={tableHeader}
                className={classNames(
                  "list-layout__cell",
                  {
                    "list-layout__first-cell": i === 0,
                  },
                  {
                    "list-layout__last-cell": i === tableHeaders.length - 1,
                  }
                )}
              >
                {tableHeader}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="list-layout__body">
          {deviceInfos.map((deviceInfo, i) => (
            <div className="list-layout__row" key={`${deviceInfo.name}${i}`}>
              <div className="list-layout__cell list-layout__first-cell">
                <div className="list-layout__row__img">
                  {deviceInfo.imageSrcs && deviceInfo.imageSrcs.length !== 0 ? (
                    <>
                      <img src={deviceInfo.imageSrcs[0]} alt="device" />
                      <span className="list-layout__row__img-overlay">
                        + {deviceInfo.imageSrcs.length}
                      </span>
                    </>
                  ) : (
                    <img
                      src={process.env.PUBLIC_URL + "/defaultImg.jpg"}
                      alt="device"
                    />
                  )}
                </div>
                <span>{deviceInfo.name}</span>
              </div>
              <div className="list-layout__cell">
                <span>{deviceInfo.team}</span>
              </div>
              <div className="list-layout__cell">
                <span> {deviceInfo.updatedTime.toLocaleDateString()}</span>
              </div>
              <div className="list-layout__last-cell">
                <div
                  className="list-layout__delete-btn"
                  onClick={() => handleDelete(deviceInfo.email)}
                >
                  <MdOutlineDeleteOutline></MdOutlineDeleteOutline>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ListView;
