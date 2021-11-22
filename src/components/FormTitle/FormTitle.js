import React, { Component } from "react";
import "../styles/form.css";

class FormTitle extends Component {
  // constructor(props){
  //   super(props);
  // }
  render() {
    return <h1 className="form__title"> {this.props.children}</h1>;
  }
}
export default FormTitle;
