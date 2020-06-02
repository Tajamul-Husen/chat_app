import React, { useEffect, useContext, useState } from "react";
import { LogIn, MainContainer } from "./components";

import { ClientProfileContext } from "./contexts/clientProfileContext";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.scss";

import Div100vh from "react-div-100vh";

function App() {
  const { clientProfile } = useContext(ClientProfileContext);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (clientProfile) {
      setAuth(true);
    }
  }, [clientProfile]);

  return (
    <Div100vh>
      <Switch>
        <Route exact path="/login" component={LogIn} />
        <Route
          path="/chat"
          render={() =>
            auth ? (
              <MainContainer></MainContainer>
            ) : (
              <Redirect to="/login"></Redirect>
            )
          }
        ></Route>
        <Route path="*" component={LogIn} />
      </Switch>
    </Div100vh>
  );
}

export default App;
