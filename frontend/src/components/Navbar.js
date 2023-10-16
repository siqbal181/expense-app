import React from 'react';
import Button from '@mui/material/Button';
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <Button variant="contained" color="primary">Login</Button>
      <Button variant="contained" color="secondary">Logout</Button>
    </div>
  );
};

export default Navbar;