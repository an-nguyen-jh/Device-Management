import React from "react";
import classNames from "classnames";
import "../styles/table.css";
import "../styles/listView.css";
import { Pagination } from "..";
import { deviceOptions } from "../../config/options/options";
import { FaCheck, FaTimes } from "react-icons/fa";
import ENV_CONFIG from "../../config";
import { getValuesByOption } from "../../utils/parser";

function Table({
  color,
  currentPage,
  deviceRequests,
  handleAccept,
  handleDeny,
  handlePagination,
  tableHeaders,
  totalItem,
}) {
  const pageLimit = ENV_CONFIG.REQUEST_LIMIT_ON_PAGE;

  return (
    <div className="table-wrapper">
      <div className={classNames({ [`table__header--${color}`]: true })}>
        {tableHeaders.map((tableHeader, i) => (
          <div
            key={tableHeader}
            className={classNames(
              "table__cell",
              {
                "table__first-cell": i === 0,
              },
              {
                "table__last-cell": i === tableHeaders.length - 1,
              }
            )}
          >
            {tableHeader}
          </div>
        ))}
      </div>
      <div className="table__body">
        {deviceRequests.map((deviceRequest, i) => (
          <div className="table__row" key={deviceRequest.id}>
            <div className="table__row__index">
              <span>{(currentPage - 1) * pageLimit + (i + 1)}</span>
            </div>
            <div className="table__cell table__first-cell">
              <p className="table__cell__name">{deviceRequest.name}</p>
              <p>{deviceRequest.email}</p>
            </div>
            <div className="table__cell">
              <p>{deviceRequest.team}</p>
            </div>
            <div className="table__cell">
              <p>{deviceRequest.createdTime.toLocaleDateString()}</p>
            </div>
            <div className="table__cell">
              <p>{getValuesByOption(deviceOptions, deviceRequest.device)}</p>
              <p>Số lượng: {deviceRequest.numberOfDevice}</p>
            </div>
            <div className="table__cell">
              <p>{deviceRequest.notice}</p>
            </div>
            {handleAccept && handleDeny ? (
              <div className="table__btn-group table__last-cell">
                <div
                  className="table__btn--resolve"
                  data-tooltip="Resolve this request"
                  onClick={() =>
                    handleAccept(
                      deviceRequest.id,
                      deviceRequest.email,
                      deviceRequest.device,
                      deviceRequest.numberOfDevice
                    )
                  }
                >
                  <FaCheck></FaCheck>
                </div>
                <div
                  className="table__btn--deny"
                  data-tooltip="Deny this request"
                  onClick={() => handleDeny(deviceRequest.id)}
                >
                  <FaTimes></FaTimes>
                </div>
              </div>
            ) : (
              <div className="table__last-cell"></div>
            )}
          </div>
        ))}
      </div>
      <div className="table__footer">
        <Pagination
          totalItem={totalItem}
          currentPage={currentPage}
          limit={pageLimit}
          handlePageChange={handlePagination}
        ></Pagination>
      </div>
    </div>
  );
}
export default Table;
