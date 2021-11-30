import React from "react";
import "../styles/pagination.css";
import classNames from "classnames";

function Pagination({ currentPage, handlePageChange, totalItem, limit }) {
  const pageIndexes = [currentPage];

  for (let i = 1; i <= 2; i++) {
    if (currentPage - i >= 1) {
      pageIndexes.unshift(currentPage - i);
    }
    if (currentPage + i <= Math.ceil(totalItem / limit)) {
      pageIndexes.push(currentPage + i);
    }
  }

  return (
    <div className="container-fluid" style={{ display: "flex" }}>
      <ul className="pagination">
        {pageIndexes.map(function generatePagination(pageIndex) {
          return (
            <li
              className={classNames("pagination__link", {
                "pagination__link--active": pageIndex === currentPage,
              })}
              key={pageIndex}
              onClick={() => handlePageChange(pageIndex)}
            >
              {pageIndex}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Pagination;
