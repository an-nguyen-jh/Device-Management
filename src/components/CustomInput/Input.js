import React, { Component } from "react";
import "../styles/input.css";
import classNames from "classnames";
class Input extends Component {
  render() {
    const { className, error, errorMsg, placeholder, type, onChange, ...rest } =
      this.props;
    return (
      <>
        <input
          className={classNames("input--outlined", className)}
          type={type}
          onChange={onChange}
          placeholder={placeholder ? placeholder : "Your answer"}
          {...rest}
        />
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

export default Input;
