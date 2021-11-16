import React, { Component } from "react";
import "../styles/button.css";

class Button extends Component {
  render() {
    const { children, handler, className } = this.props;
    return (
      <button
        className={`${className ? className : ""} contained-button`}
        onClick={handler}
      >
        {children}
      </button>
    );
  }
}

export default Button;
