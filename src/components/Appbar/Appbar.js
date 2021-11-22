import classNames from "classnames";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { employeeSubRouters } from "../../config/routes";

import "../styles/appbar.css";
import { getRouterTile } from "../../utils/routerHandler";
import { Button } from "..";

class Appbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarToggle: false,
      title: "",
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState({
      sidebarToggle: !this.state.sidebarToggle,
    });
  }

  componentDidMount() {
    const path = this.props.location.pathname.split("/")[2];
    const routerTitle = getRouterTile(employeeSubRouters, path);
    this.setState({
      title: routerTitle,
    });
  }

  componentDidUpdate(prevProps) {
    const path = this.props.location.pathname.split("/")[2];
    if (path !== prevProps.location.pathname.split("/")[2]) {
      const routerTitle = getRouterTile(employeeSubRouters, path);
      this.setState({
        title: routerTitle,
      });
    }
  }

  render() {
    const { sidebarToggle: toggle, title } = this.state;
    const path = this.props.match.path;
    return (
      <div className="appbar">
        <div className="appbar__dropdown">
          <div className="appbar__dropdown__title">{title}</div>
          <div className="appbar__dropdown__btn">
            <MdArrowDropDown
              onClick={this.toggleSidebar}
              className="appbar__dropdown__icon"
              color="white"
            ></MdArrowDropDown>
          </div>
        </div>
        <div
          className={classNames({ appbar__overlay: toggle })}
          onClick={this.toggleSidebar}
        ></div>
        <ul
          className={classNames("appbar__nav-list", {
            "appbar__nav-list--expand": toggle,
          })}
        >
          {employeeSubRouters.map((router) => (
            <li key={router.pathname} className="appbar__nav-item">
              <Link
                className="appbar__nav-link"
                to={`${path}${router.pathname}`}
              >
                {router.icon}
                <span>{router.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Button>Sign out</Button>
      </div>
    );
  }
}
export default withRouter(Appbar);
