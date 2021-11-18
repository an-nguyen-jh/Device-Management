import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components";
import ENV_CONFIG from "./config";
import { Login, NotFound } from "./pages";
import privateRoute from "./config/routes";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Switch>
          <PrivateRoute
            path={privateRoute[ENV_CONFIG.ROLE.EMPLOYEE].pathname}
            exact
            requiredRole={ENV_CONFIG.ROLE.EMPLOYEE}
            component={privateRoute[ENV_CONFIG.ROLE.EMPLOYEE].component}
          ></PrivateRoute>
          <PrivateRoute
            path={privateRoute[ENV_CONFIG.ROLE.ADMIN].pathname}
            exact
            requiredRole={ENV_CONFIG.ROLE.ADMIN}
            component={privateRoute[ENV_CONFIG.ROLE.ADMIN].component}
          ></PrivateRoute>
          <Route exact path="/">
            <Login></Login>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
