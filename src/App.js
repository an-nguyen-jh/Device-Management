import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Login, NotFound, Auth } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <Route path="/auth">
          <Auth></Auth>
        </Route>
        <Route path="*">
          <NotFound></NotFound>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
