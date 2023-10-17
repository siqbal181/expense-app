import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      {/* <Auth0ProviderWithNavigate> */}
        <App />
      {/* </Auth0ProviderWithNavigate> */}
    </React.StrictMode>
  </BrowserRouter>,
);
