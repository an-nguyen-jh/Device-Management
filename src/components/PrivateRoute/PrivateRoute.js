import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //get user info and check authrization
  const userRole = localStorage.getItem("userRole");

  if (userRole === rest.requiredRole) {
    return (
      <Route {...rest} render={(routeProps) => <Component {...routeProps} />} />
    );
  } else {
    return <Redirect to={{ pathname: "/" }} />;
  }
};

export default PrivateRoute;
