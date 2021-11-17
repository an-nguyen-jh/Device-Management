import React, { Component } from "react";
import "../styles/button.css";
import classNames from "classnames";
class Button extends Component {
  render() {
    const { children, handler, className } = this.props;
    return (
      <button
        className={classNames("contained-button", className)}
        onClick={handler}
      >
        {children}
      </button>
    );
  }
}

export default Button;
