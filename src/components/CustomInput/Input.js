import React, { Component } from "react";
import "../styles/input.css";

class Input extends Component {
  render() {
    const { className, error, errorMsg, ...rest } = this.props;

    return (
      <>
        <input
          className={`${className ? className : ""} outlined-input`}
          {...rest}
        />
        {error && <span className="input-error">* {errorMsg}</span>}
      </>
    );
  }
}

export default Input;
