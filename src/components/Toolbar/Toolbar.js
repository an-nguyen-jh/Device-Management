import React from "react";
import "../styles/toolbar.css";
import { AiOutlineTable, AiOutlineUnorderedList } from "react-icons/ai";
import { Select } from "..";

function Toolbar({
  isListView,
  changeLayout,
  sortOptions,
  sortHandler,
  selectOption,
}) {
  return (
    <div className="toolbar-wrapper">
      <div className="container-fluid">
        <div className="toolbar">
          <div className="toolbar__functional-group">
            <Select
              className="toolbar__functional-sort"
              value={selectOption}
              onChange={sortHandler}
              options={sortOptions}
            ></Select>
          </div>
          <div className="toolbar__layout-btn" onClick={changeLayout}>
            {isListView ? (
              <AiOutlineUnorderedList className="toolbar__layout-btn__icon" />
            ) : (
              <AiOutlineTable className="toolbar__layout-btn__icon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Toolbar;
