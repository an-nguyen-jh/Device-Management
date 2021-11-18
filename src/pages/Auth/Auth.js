import React, { Component } from "react";
import { Admin, Employee } from "../index";
import { PrivateRoute } from "../../components";
import { Switch, withRouter } from "react-router-dom";
import { getUserByEmail } from "../../apiService";
import ENV_CONFIG from "../../config";
class Auth extends Component {
  async componentDidMount() {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      //call firebase to get authorization
      try {
        const userSnapshot = await getUserByEmail(userEmail);
        const user = userSnapshot.data();
        localStorage.setItem("userRole", user.role);
        if (user.role === ENV_CONFIG.ROLE.EMPLOYEE) {
          this.props.history.push({
            pathname: "/auth/employee",
          });
        } else {
          this.props.history.push({
            pathname: "/auth/admin",
          });
        }
      } catch (error) {}
    } else {
      this.props.history.push({
        pathname: "/",
      });
    }
  }

  render() {
    return (
      <Switch>
        <PrivateRoute
          path={"/auth/employee"}
          exact
          requiredRole={ENV_CONFIG.ROLE.EMPLOYEE}
          component={Employee}
        ></PrivateRoute>
        <PrivateRoute
          path={"/auth/admin"}
          exact
          requiredRole={ENV_CONFIG.ROLE.ADMIN}
          component={Admin}
        ></PrivateRoute>
      </Switch>
    );
  }
}

export default withRouter(Auth);
