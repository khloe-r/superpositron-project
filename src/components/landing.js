import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./navbar/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <div style={{ marginTop: "2em" }}>
      <h2>Welcome to</h2>
      <div>
        <img src={logo} />
      </div>
      <h4>An app helps you organize your fragmented time</h4>
      <div className={classes.root}>
        <Button variant="contained" component={Link} to="/sign-up">
          Sign Up
        </Button>
        <Button variant="contained" component={Link} to="/log-in">
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Landing;
