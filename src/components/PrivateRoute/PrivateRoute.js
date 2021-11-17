import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //get user info and check authrization
  const authenticatedUser = localStorage.getItem("token");
  console.log(rest);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        true ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

export default PrivateRoute;
