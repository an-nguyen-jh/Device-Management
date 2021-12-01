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
      <ConfirmDeleteDialog />
      <div className="content bg-white">
        <Switch>
          {adminSubRouters.map((router) => (
            <Route
              exact
              key={router.pathname}
              path={`${match.path}${router.pathname}`}
              render={(props) => (
                <>
                  <Appbar routers={adminSubRouters}></Appbar>
                  <router.component {...props}></router.component>
                </>
              )}
            ></Route>
            /* {router.hasDetailsPage && (
                <Route path={`${match.path}${router.pathname}/:id`}>
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      background: "red",
                      position: "fixed",
                      zIndex: 2000,
                    }}
                  ></div>
                </Route>
              )} */
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
