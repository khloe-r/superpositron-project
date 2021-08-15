import React from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../contexts/AuthContext.js";

import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import BeenhereIcon from "@material-ui/icons/Beenhere";

import logo from "./logo.png";

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser ? (
        <div className="topnav">
          <ul>
            <li>
              <a>
                <PersonIcon fontSize="large" />
                <Link to="user-profile">User Profile</Link>
              </a>
            </li>

            <li>
              <a>
                <BubbleChartIcon fontSize="large" />
                <Link to="bubbles">Bubbles</Link>
              </a>
            </li>

            <li>
              <a>
                <HomeIcon fontSize="large" />
                <Link to="dashboard">Dashboard</Link>
              </a>
            </li>

            <li>
              <a>
                <BeenhereIcon fontSize="large" />
                <Link to="/awards">Awards</Link>
              </a>
            </li>
          </ul>
        </div>
      ) : null
      // not logged in navbar
      // <div>
      //   <img src={logo} alt="Logo" />
      // </div>
      }
    </>
  );
};

export default Navbar;
