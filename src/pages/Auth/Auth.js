import React, { Component } from "react";
import { Admin, Employee } from "../index";
import { PrivateRoute } from "../../components";
import { Switch, withRouter } from "react-router-dom";

class Auth extends Component {
  render() {
    console.log(this.props);
    return (
      <Switch>
        <PrivateRoute
          path={"/auth/employee"}
          component={Employee}
        ></PrivateRoute>
        <PrivateRoute path={"/auth/admin"} component={Admin}></PrivateRoute>
      </Switch>
    );
  }
}

export default withRouter(Auth);
