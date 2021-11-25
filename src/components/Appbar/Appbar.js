import classNames from "classnames";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import "../styles/appbar.css";
import {
  getRouterLastSubDirectory,
  getRouterTitle,
} from "../../utils/routerHandler";
import { Button } from "..";
import { signout } from "../../apiService";
import { authenticationAction } from "../../store/actions";
import { connect } from "react-redux";

class Appbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appbarToggle: false,
      title: "",
    };
    this.toggleAppbar = this.toggleAppbar.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  toggleAppbar() {
    this.setState({
      appbarToggle: !this.state.appbarToggle,
    });
  }

  async signOut() {
    try {
      await signout();
      this.props.removeUserAuthenticationInfo();
    } catch (error) {}
  }

  componentDidMount() {
    const routers = this.props.routers;
    const lastSubDirectory = getRouterLastSubDirectory(
      this.props.location.pathname
    );
    const routerTitle = getRouterTitle(routers, lastSubDirectory);
    this.setState({
      title: routerTitle,
    });
  }

  componentDidUpdate(prevProps) {
    const routers = this.props.routers;
    const lastSubDirectory = getRouterLastSubDirectory(
      this.props.location.pathname
    );
    if (
      lastSubDirectory !==
      getRouterLastSubDirectory(prevProps.location.pathname)
    ) {
      const routerTitle = getRouterTitle(routers, lastSubDirectory);
      this.setState({
        title: routerTitle,
        appbarToggle: false,
      });
    }
  }

  render() {
    const { appbarToggle: toggle, title } = this.state;
    const path = this.props.match.path;
    const routers = this.props.routers;
    const subPathname = this.props.location.pathname.split("/")[2];

    return (
      <div className="appbar">
        <div className="appbar__dropdown">
          <div className="appbar__dropdown__title">{title}</div>
          <div className="appbar__dropdown__btn">
            <MdArrowDropDown
              onClick={this.toggleAppbar}
              className="appbar__dropdown__icon"
              color="white"
            ></MdArrowDropDown>
          </div>
        </div>
        <div
          className={classNames({ appbar__overlay: toggle })}
          onClick={this.toggleAppbar}
        ></div>
        <div
          className={classNames("appbar__nav-menu", {
            "appbar__nav-menu--expand": toggle,
          })}
        >
          <ul className="appbar__nav-list">
            {routers.map((router) => (
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
