import React, { Component } from "react";
import "../styles/button.css";
import classNames from "classnames";
class Button extends Component {
  render() {
    const { children, className, color, ...rest } = this.props;
    return (
      <button
        {...rest}
        className={classNames(
          "button--contained",
          className,
          `${color ? color : "primary"}-color`
        )}
      >
        {children}
      </button>
    );
  }
}

export default Button;
