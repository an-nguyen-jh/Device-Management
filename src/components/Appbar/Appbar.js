import classNames from "classnames";
import React, { Component } from "react";
import { GoThreeBars } from "react-icons/go";
import { Link, withRouter } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { employeeSubRouters } from "../../config/routes";

import "../styles/appbar.css";

class Appbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarToggle: false,
      title: "",
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  componentDidMount() {}

  toggleSidebar() {
    console.log(this.state.sidebarToggle);
    this.setState({
      sidebarToggle: !this.state.sidebarToggle,
    });
  }

  render() {
    // const pathname = this.props.match.path;
    // console.log(pathname);
    // const navigationTitle = employeeSubRouters.find(
    //   (router) => router.pathname === pathname
    // ).title;
    const toggle = this.state.sidebarToggle;
    return (
      <div className="appbar">
        <div className="appbar__title">
          Write something longger than container
        </div>
        <div className="appbar__dropdown">
          <MdArrowDropDown
            className="appbar__dropdown__icon"
            color="white"
          ></MdArrowDropDown>
        </div>
      </div>
    );
  }
}
export default withRouter(Appbar);
