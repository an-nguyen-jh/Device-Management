import React, { Component } from "react";
import { Admin, Employee } from "../index";
import { PrivateRoute } from "../../components";
import { Switch, withRouter } from "react-router-dom";
import { getUserByEmail } from "../../apiService";

class Auth extends Component {
  async componentDidMount() {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      //call firebase to get authorization
      try {
        const response = await getUserByEmail(userEmail);
        const user = response.data();
        if (user.role === "2") {
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
          component={Employee}
        ></PrivateRoute>
        <PrivateRoute
          path={"/auth/admin"}
          exact
          component={Admin}
        ></PrivateRoute>
      </Switch>
    );
  }
}

export default withRouter(Auth);
