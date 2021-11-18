import React, { Component } from "react";
import "../styles/button.css";
import classNames from "classnames";
class Button extends Component {
  render() {
    const { children, onClickHandle, className } = this.props;
    return (
      <button
        className={classNames("button--contained", className)}
        onClick={onClickHandle}
      >
        {children}
      </button>
    );
  }
}

export default Button;
