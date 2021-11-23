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
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        {error && <span className="input--error">* {errorMsg}</span>}
      </>
    );
  }
}

export default Select;
