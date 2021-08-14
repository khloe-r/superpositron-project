import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    <div>
      <h2>Welcome to</h2>
      <h1>Just 5 Minutes</h1>
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
