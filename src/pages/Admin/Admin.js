import React from "react";
import { Appbar, ConfirmDeleteDialog } from "../../components";
import { Toaster } from "react-hot-toast";
import { adminSubRouters } from "../../config/routes";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";

function Admin() {
  const match = useRouteMatch();
  return (
    <div className="container page-wrapper">
      <Toaster />
      <Appbar routers={adminSubRouters}></Appbar>
      <ConfirmDeleteDialog />
      <div className="content bg-white">
        <Switch>
          {adminSubRouters.map((router) => (
            <Route
              exact
              key={router.pathname}
              path={`${match.path}${router.pathname}`}
              component={router.component}
            ></Route>
          ))}
          <Route exact path={`${match.path}`}>
            <Redirect to={`${match.path}${adminSubRouters[0].pathname}`} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Admin;
