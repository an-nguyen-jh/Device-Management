import React from "react";
import classNames from "classnames";
import "../styles/table.css";
import "../styles/listView.css";

function Table({
  tableHeaders,
  color,
  deviceRequests,
  handleAccept,
  handleDeny,
}) {
  return (
    <div className="table-wrapper">
      <div className={classNames({ [`table__header--${color}`]: true })}>
        <div className="table">
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
      </div>
    </div>
  );
}
export default Table;
