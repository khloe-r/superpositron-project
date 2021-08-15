import React from "react";
import {Tabs,Tab } from "@material-ui/core";
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
          <Tabs className="navbar" variant="fullWidth" centered>
            <Tab label="Dashboard"  icon={<HomeIcon fontSize="large" />} component={Link} to="/dashboard" />
            <Tab label="Bubbles" icon={<BubbleChartIcon fontSize="large" />} component={Link} to="/bubbles" />
            <Tab label="Awards" icon={<BeenhereIcon fontSize="large" />} component={Link} to="/awards" />
            <Tab label="User Profile" icon={<PersonIcon fontSize="large" />} component={Link} to="/user-profile" />
          </Tabs>
        ) : 
        null
      }
    </>
  );
};

export default Navbar;
