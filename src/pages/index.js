import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Chat from "./Chat";
import Main from "./Main";
import Login from "./Login";
import Queue from "./Queue";
import Register from "./Register";
import Settings from "./Settings";
import NotFound from "./NotFound";
import PrivateRoute from "../components/Shared/PrivateRoute";

const Pages = () => {
  const user = useSelector((state) => state.user);

  return (
    <Switch>
      <PrivateRoute
        path="/"
        exact
        isAuthenticated={user}
        component={Main}
      />
      <PrivateRoute
        path="/chat"
        isAuthenticated={user}
        component={Chat}
      />
      <PrivateRoute
        path="/register"
        isAuthenticated={user}
        component={Register}
      />
      <PrivateRoute
        path="/queue"
        isAuthenticated={user}
        component={Queue}
      />
      <PrivateRoute
        path="/settings"
        isAuthenticated={user}
        component={Settings}
      />
      <Route path="/login" component={Login} />
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
};

export default Pages;
