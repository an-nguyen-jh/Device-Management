import React, { Component } from "react";
import "../styles/input.css";

class Input extends Component {
  render() {
    const { name, placeholder, type, className, onChange } = this.props;
    return (
      <input
        className={`${className ? className : ""} outlined-input`}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  }
}

export default Input;
