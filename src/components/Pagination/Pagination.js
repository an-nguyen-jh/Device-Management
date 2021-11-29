import React from "react";
import "../styles/pagination.css";

function Pagination({ currentPage, handlePageChange, totalItem, limit }) {
  return (
    <div className="container-fluid" style={{ display: "flex" }}>
      <ul className="pagination">
        {[2, 1].map(function generatePrevPage(index) {
          if (currentPage - index < 1) {
            return null;
          }
          return (
            <li
              className="pagination__link"
              key={currentPage - index}
              onClick={() => handlePageChange(currentPage - index)}
            >
              {currentPage - index}
            </li>
          );
        })}
        <li className="pagination__link--active pagination__link">
          {currentPage}
        </li>
        {[1, 2].map(function generatePrevPage(index) {
          if (currentPage + index > Math.ceil(totalItem / limit)) {
            return null;
          }
          return (
            <li
              className="pagination__link"
              key={currentPage + index}
              onClick={() => handlePageChange(currentPage + index)}
            >
              {currentPage + index}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Pagination;
