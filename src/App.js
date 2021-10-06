import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";

import { getAuthCheck } from "./api";
import { ModalProvider } from "./contexts/ModalContext";

import GlobalStyles from "./styles";
import theme from "./styles/theme";

import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Queue from "./pages/Queue";
import PrivateRoute from "./components/Shared/PrivateRoute";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState({});

  const checkLoginStatus = async () => {
    try {
      const { data, result } = await getAuthCheck();

      if (result === "success") {
        setUser(data);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <ModalProvider>
          <Switch>
            <PrivateRoute
              path="/chat"
              user={user}
              component={Chat}
            />
            <PrivateRoute
              path="/register"
              user={user}
              component={Register}
              setUser={setUser}
            />
            <PrivateRoute
              path="/queue"
              user={user}
              component={Queue}
              userInfo={user}
            />
            <Route path="/login">
              <Login setUser={setUser} />
            </Route>
            <Route path="/" exact>
              <Redirect to="/" />
            </Route>
          </Switch>
        </ModalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
