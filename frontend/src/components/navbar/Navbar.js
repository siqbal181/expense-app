import React from "react";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.css";

const Navbar = () => {
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = async () => {
      await loginWithRedirect({
        appState: {
          returnTo: "/",
        },
      });
    };

    return (
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    );
  };

  const LogoutButton = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    };

    return (
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    );
  };

  return (
    <div className="navbar">
      <LoginButton />
      <LogoutButton />
    </div>
  );
};

export default Navbar;
