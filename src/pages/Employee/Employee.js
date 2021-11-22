import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter, Switch } from "react-router-dom";
import { signout } from "../../apiService";
import { Appbar, Button } from "../../components";
import { employeeSubRouters } from "../../config/routes";
import { authenticationAction } from "../../store/actions";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  async signOut() {
    try {
      await signout();
      this.props.removeUserAuthenticationInfo();
    } catch (error) {}
  }

  render() {
    return (
      <div className="container page-wrapper">
        <Appbar></Appbar>
        <div className="content">
          <Switch>
            {employeeSubRouters.map((router) => (
              <Route
                exact
                key={router.pathname}
                path={`${this.props.match.path}${router.pathname}`}
                render={(props) => <Button>Render device-info</Button>}
              ></Route>
            ))}
            <Route exact path={`${this.props.match.path}`}>
              <Redirect
                to={`${this.props.match.path}${employeeSubRouters[0].pathname}`}
              />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  removeUserAuthenticationInfo:
    authenticationAction.removeUserAuthenticationInfo,
};

export default withRouter(connect(null, mapDispatchToProps)(Employee));
