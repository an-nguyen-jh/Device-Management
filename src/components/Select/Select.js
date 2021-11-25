import React, { Component } from "react";
import "../styles/input.css";

class Select extends Component {
  render() {
    const { className, error, errorMsg, options, ...rest } = this.props;

    return (
      <>
        <select className="input--outlined" {...rest}>
          <option key={""} value={""}></option>
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
