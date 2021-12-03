import React from "react";
import { ConfirmDeleteDialog } from "../../components";
import { Toaster } from "react-hot-toast";
import { adminSubRouters } from "../../config/routes";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import { flattenRouters } from "../../utils/routerHandler";

function Admin() {
  const match = useRouteMatch();
  const flatSubRouters = flattenRouters(adminSubRouters);

  return (
    <div className="container page-wrapper">
      <Toaster />
      <ConfirmDeleteDialog />
      <div className="content bg-white">
        <Switch>
          {flatSubRouters.map((router) => (
            <Route
              key={router.pathname}
              exact
              path={`${match.path}${router.pathname}`}
              render={() => <router.component></router.component>}
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
