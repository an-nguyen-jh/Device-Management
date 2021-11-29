import React from "react";
import { Button } from "..";
import { generateAvatarByName } from "../../utils/generateAvatar";
import "../styles/gridView.css";

function GridView({ deviceInfos, handleDelete }) {
  return (
    <div className="grid-layout-wrapper">
      <div className="container-fluid">
        <div className="grid-layout">
          {deviceInfos.map((deviceInfo, i) => (
            <div className="grid-layout__card" key={`${deviceInfo.name}${i}`}>
              <div className="grid-layout__card-header">
                {deviceInfo.imageSrcs && deviceInfo.imageSrcs.length !== 0 ? (
                  <>
                    <img
                      className="grid-layout__card-header__img"
                      src={deviceInfo.imageSrcs[0]}
                      alt="device"
                    />
                    <span className="list-layout__row__img-overlay">
                      + {deviceInfo.imageSrcs.length}
                    </span>
                  </>
                ) : (
                  <img
                    className="grid-layout__card-header__img"
                    src={process.env.PUBLIC_URL + "/defaultImg.jpg"}
                    alt="device"
                  />
                )}
              </div>
              <div className="grid-layout__card-body">
                {generateAvatarByName(
                  deviceInfo.name,
                  "grid-layout__card-body__avatar"
                )}
                <div className="grid-layout__card-body__owner">
                  {deviceInfo.name}
                </div>
                <div className="grid-layout__card-body__team">
                  {deviceInfo.team}
                </div>

                <div className="grid-layout__card-body__update-date">
                  Update Date: {deviceInfo.updatedTime.toLocaleDateString()}
                </div>
              </div>
              <div className="grid-layout__card-footer">
                <Button className="grid-layout__card-footer__delete">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default GridView;
