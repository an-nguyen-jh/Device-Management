import classNames from "classnames";
import React, { Component } from "react";
import "../styles/input.css";

class Select extends Component {
  render() {
    const { className, error, errorMsg, options, placeholder, ...rest } =
      this.props;

    return (
      <>
        <select
          className={classNames("input--outlined", { [className]: className })}
          {...rest}
        >
          <option key={""} value={""}>
            {placeholder ? placeholder : ""}
          </option>
          {options.map((option) => {
            return (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            );
          })}
        </select>
        <span
          className="input--error"
          style={{ visibility: `${error ? "visible" : "hidden"}` }}
        >
          * {errorMsg}
        </span>
      </>
    );
  }
}

export default Select;
