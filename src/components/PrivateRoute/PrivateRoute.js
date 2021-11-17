import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //get user info and check authrization
  const authenticatedUser = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        authenticatedUser ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

export default PrivateRoute;
