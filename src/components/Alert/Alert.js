import React, { Component } from "react";
import classNames from "classnames";
import "../styles/alert.css";

class Alert extends Component {
  render() {
    const { type, children } = this.props;
    return (
      <div className={classNames({ [`${type}-alert`]: true })}>{children}</div>
    );
  }
}

export default Alert;
