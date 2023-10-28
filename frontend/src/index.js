import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BudgetsContextProvider } from './context/BudgetsContext';

const authConfig = require('./auth_config.json')

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={authConfig.domain}
    clientId={authConfig.clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      // audience: "https://dev-dkcsc3y8xpusyr42.us.auth0.com/api/v2",
      // scope: "read:current_user update:current_user_metadata"
    }}
  >
  <React.StrictMode>
    <BudgetsContextProvider>
    <App />
    </BudgetsContextProvider>
  </React.StrictMode>
  </Auth0Provider>
);

