import React, { Component } from "react";
import { Redirect, Route, withRouter, Switch } from "react-router-dom";
import { Appbar } from "../../components";
import { employeeSubRouters } from "../../config/routes";
import { Toaster } from "react-hot-toast";

class Employee extends Component {
  render() {
    return (
      <div className="container page-wrapper">
        <Toaster />
        <Appbar routers={employeeSubRouters}></Appbar>
        <div className="content">
          <Switch>
            {employeeSubRouters.map((router) => (
              <Route
                exact
                key={router.pathname}
                path={`${this.props.match.path}${router.pathname}`}
                component={router.component}
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

export default withRouter(Employee);
