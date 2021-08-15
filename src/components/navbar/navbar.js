import React from "react";
import { Paper, Grid } from "@material-ui/core";
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
      {
        currentUser ? (
          <div className="navbar">
            {/* <Grid className="navbar" container>
            <Grid item xs={3}>
              <a>
                <HomeIcon fontSize="large" />
                <Link to="dashboard">Dashboard</Link>
              </a>
            </Grid>
            <Grid item xs={3}>
              <a>
                <BubbleChartIcon fontSize="large" />
                <Link to="bubbles">Bubbles</Link>
              </a>
            </Grid>
            <Grid item xs={3}>
              <a>
                <BeenhereIcon fontSize="large" />
                <Link to="/awards">Awards</Link>
              </a>
            </Grid>
            <Grid item xs={3}>
              <a>
                <PersonIcon fontSize="large" />
                <Link to="user-profile">User Profile</Link>
              </a>
            </Grid> */}

            <ul>
              <li>
                <a>
                  <HomeIcon fontSize="large" />
                  <Link to="dashboard">Dashboard</Link>
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
                  <BeenhereIcon fontSize="large" />
                  <Link to="/awards">Awards</Link>
                </a>
              </li>
              <li>
                <a>
                  <PersonIcon fontSize="large" />
                  <Link to="user-profile">User Profile</Link>
                </a>
              </li>
            </ul>
          </div>
        ) : // </Grid>
        null
        // not logged in navbar
        // <div>
        //   <img src={logo} alt="Logo" />
        // </div>
      }
    </>
  );
};

export default Navbar;
