import React, { Component } from "react";
import "../styles/button.css";
import classNames from "classnames";
class Button extends Component {
  render() {
    const { children, className, color, type, ...rest } = this.props;
    return (
      <button
        {...rest}
        className={classNames(
          `button--${type ? type : "contained"}`,
          className,
          { [`button--${color}-color`]: color }
        )}
      >
        {children}
      </button>
    );
  }
}

export default Button;
