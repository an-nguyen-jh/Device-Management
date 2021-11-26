import React from "react";
import "../styles/toolbar.css";
import { AiOutlineTable, AiOutlineUnorderedList } from "react-icons/ai";
import { Select } from "..";
import { sortOptions } from "../../config/options/options";

function Toolbar({ isListView, changeLayout }) {
  return (
    <div className="toolbar-wrapper">
      <div className="container-fluid">
        <div className="toolbar">
          <div className="toolbar__functional-group">
            <Select
              className="toolbar__functional-sort"
              placeholder="--Sort by --"
              options={sortOptions}
            ></Select>
          </div>
          <div className="toolbar__layout-btn" onClick={changeLayout}>
            {isListView ? (
              <AiOutlineTable className="toolbar__layout-btn__icon" />
            ) : (
              <AiOutlineUnorderedList className="toolbar__layout-btn__icon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Toolbar;
