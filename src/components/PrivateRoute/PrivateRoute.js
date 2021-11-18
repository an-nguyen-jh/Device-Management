import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({ component: Component, ...rest }) => {
  //get user info and check authorization
  const { userRole } = useSelector((state) => state.auth);
  if (userRole === rest.requiredRole) {
    return (
      <Route {...rest} render={(routeProps) => <Component {...routeProps} />} />
    );
  } else {
    return <Redirect to={{ pathname: "/" }} />;
  }
};

export default PrivateRoute;
