import React, { Component } from "react";
import "../styles/input.css";
import classNames from "classnames";
class Input extends Component {
  render() {
    const { className, error, errorMsg, placeholder, ...rest } = this.props;
    console.log(rest);
    return (
      <>
        <input
          className={classNames("input--outlined", className)}
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
