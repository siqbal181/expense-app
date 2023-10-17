import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

const authOConfig = {
  domain: process.env.REACT_APP_AUTHO_DOMAIN,
  clientId: process.env.REACT_APP_AUTHO_CLIENT_ID,
  redirectUri: window.location.origin,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Auth0Provider
        domain={authOConfig.domain}
        clientId={authOConfig.clientId}
        redirectUri={authOConfig.redirectUri}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </BrowserRouter>,
);
