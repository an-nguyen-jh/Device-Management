import React from "react";
import { generateAvatarByName } from "../../utils/generateAvatar";
import "../styles/gridView.css";

function GridView() {
  return (
    <div className="grid-layout-wrapper">
      <div className="container-fluid grid-layout">
        <div className="grid-layout__card">
          <div className="grid-layout__card-header">
            <img
              className="grid-layout__card-header__img"
              src="https://firebasestorage.googleapis.com/v0/b/device-management-911c9.appspot.com/o/img%2Fjh.employee%2FemailTemplate.png?alt=media&token=5f18ba3a-6514-4012-a825-bc1d5123c8dd"
              alt=""
            />
          </div>
          <div className="grid-layout__card-footer">
            {generateAvatarByName(
              "Nguyễn Hồng Ân",
              "grid-layout__card-footer__avatar"
            )}
            <div className="grid-layout__card-footer__owner">
              Nguyễn Hồng Ân:
            </div>
            <div className="grid-layout__card-footer__team"> Yin Yang</div>

            <div className="grid-layout__card-footer__update-date">
              Update Date: 26/11/2021
            </div>
          </div>
        </div>
        <div className="grid-layout__card">
          <div className="grid-layout__card-header">
            <img
              className="grid-layout__card-header__img"
              src="https://firebasestorage.googleapis.com/v0/b/device-management-911c9.appspot.com/o/img%2Fjh.employee%2F2_journeyhorizon.png?alt=media&token=5af2c80f-1f0a-4100-860b-eba0913eb97b"
              alt=""
            />
          </div>
          <div className="grid-layout__card-footer">
            {generateAvatarByName(
              "Nguyễn Hồng Ân",
              "grid-layout__card-footer__avatar"
            )}
            <div className="grid-layout__card-footer__owner">
              Nguyễn Hồng Ân:
            </div>
            <div className="grid-layout__card-footer__team"> Yin Yang</div>

            <div className="grid-layout__card-footer__update-date">
              Update Date: 26/11/2021
            </div>
          </div>
        </div>
        <div className="grid-layout__card"></div>
        <div className="grid-layout__card"></div>
      </div>
    </div>
  );
}
export default GridView;
