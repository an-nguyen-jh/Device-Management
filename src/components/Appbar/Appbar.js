import classNames from "classnames";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { employeeSubRouters } from "../../config/routes";
import "../styles/appbar.css";
import { getRouterTile } from "../../utils/routerHandler";
import { Button } from "..";
import { signout } from "../../apiService";
import { authenticationAction } from "../../store/actions";
import { connect } from "react-redux";

class Appbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarToggle: false,
      title: "",
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  toggleSidebar() {
    this.setState({
      sidebarToggle: !this.state.sidebarToggle,
    });
  }

  async signOut() {
    try {
      await signout();
      this.props.removeUserAuthenticationInfo();
    } catch (error) {}
  }

  componentDidMount() {
    const subPathname = this.props.location.pathname.split("/")[2];
    const routerTitle = getRouterTile(employeeSubRouters, subPathname);
    this.setState({
      title: routerTitle,
    });
  }

  componentDidUpdate(prevProps) {
    const subPathname = this.props.location.pathname.split("/")[2];
    if (subPathname !== prevProps.location.pathname.split("/")[2]) {
      const routerTitle = getRouterTile(employeeSubRouters, subPathname);
      this.setState({
        title: routerTitle,
      });
    }
  }

  render() {
    const { sidebarToggle: toggle, title } = this.state;
    const path = this.props.match.path;
    const subPathname = this.props.location.pathname.split("/")[2];

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
        <div
          className={classNames("appbar__nav-menu", {
            "appbar__nav-menu--expand": toggle,
          })}
        >
          <ul className="appbar__nav-list">
            {employeeSubRouters.map((router) => (
              <li
                key={router.pathname}
                className={classNames("appbar__nav-item", {
                  "appbar__nav-item--active ":
                    router.pathname === `/${subPathname}`,
                })}
              >
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
          <div className="appbar__nav-btn">
            <Button color="secondary" onClick={this.signOut}>
              Sign out
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  removeUserAuthenticationInfo:
    authenticationAction.removeUserAuthenticationInfo,
};

export default withRouter(connect(null, mapDispatchToProps)(Appbar));
