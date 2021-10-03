/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import WalletConnect from "@walletconnect/client";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import useWalletConfig from "./views/hooks/useWalletConfig";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  saveConfiguration,
  saveConnector,
} from "./redux/walletReducer";

import "./assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Components from "./views/Components/Components.js";
import LandingPage from "./views/LandingPage/LandingPage.js";
import ProfilePage from "./views/ProfilePage/ProfilePage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.user && JSON.parse(localStorage.user).token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default function App() {
  var hist = createBrowserHistory();
  const dispatch = useDispatch();

  const onSessionUpdate = async (accounts, chainId) => {
    const address = accounts[0];
    await dispatch(
      saveConfiguration({ connected: true, chainId, accounts, address })
    );
    // await this.getAccountAssets();
  };

  const bridge = "https://wc--bridge.herokuapp.com";

  const connector = new WalletConnect({ bridge });

  if (connector.connected) {
    const { chainId, accounts } = connector;
    const address = accounts[0];
    onSessionUpdate(accounts, chainId);
  }
  dispatch(saveConnector(connector));

  return (
    <Router history={hist}>
      <Switch>
        <PrivateRoute path="/landing-page" component={LandingPage} />
        <PrivateRoute path="/profile-page" component={ProfilePage} />
        <Route path="/components" component={Components} />
        <Route path="/" component={LoginPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}
