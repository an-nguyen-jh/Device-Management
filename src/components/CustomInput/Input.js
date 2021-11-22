import React, { Component } from "react";
import "../styles/input.css";
import classNames from "classnames";
class Input extends Component {
  render() {
    const { className, error, errorMsg, placeholder, ...rest } = this.props;
    return (
      <>
        <input
          className={classNames("input--outlined", className)}
          placeholder={placeholder ? placeholder : "Your answer"}
          {...rest}
        />
        {error && <span className="input--error">* {errorMsg}</span>}
      </>
    );
  }
}

export default Input;
