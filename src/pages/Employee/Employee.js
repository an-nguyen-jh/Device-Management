import React, { Component, Suspense } from "react";
import { Redirect, Route, withRouter, Switch } from "react-router-dom";
import { Appbar } from "../../components";
import { employeeSubRouters } from "../../config/routes";

class Employee extends Component {
  render() {
    return (
      <div className="container page-wrapper">
        <Appbar></Appbar>
        <div className="content">
          <Suspense
            fallback={
              <div className="container">
                <h1>Loading...</h1>
              </div>
            }
          >
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
          </Suspense>
        </div>
      </div>
    );
  }
}

export default withRouter(Employee);
