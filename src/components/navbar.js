import React from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="user-profile">User Profile</Link>
      <Link>Bubbles</Link>
      <Link to="dashboard">Dashboard</Link>
      <Link to="/awards">Awards</Link>
    </div>
  );
};

export default Navbar;
