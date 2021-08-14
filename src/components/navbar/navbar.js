import React from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import "./navbar.css";
import HomeIcon from "@material-ui/icons/Home";

const Navbar = () => {
  return (
    <div className="topnav">
      <ul>
        <li>
          <a>
            <HomeIcon />
            <Link to="user-profile">User Profile</Link>
          </a>
        </li>

        <li>
          <a>
            <Link to="bubbles">Bubbles</Link>
          </a>
        </li>

        <li>
          <a>
            <Link to="dashboard">Dashboard</Link>
          </a>
        </li>

        <li>
          <a>
            <Link to="/awards">Awards</Link>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
