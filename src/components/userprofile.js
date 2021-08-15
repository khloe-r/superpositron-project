import React, { useState, useEffect } from "react";
import CreateBubble from "./createbubble";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import firebase from "../firebase";

import { useAuth } from "../contexts/AuthContext.js";

import "./userprofile.css";

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();
  const userRef = firebase.firestore().collection("users");

  const [user, setUser] = useState();

  function getUser() {
    console.log("loading user");
    userRef
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setUser(doc.data());
      })
      .then(() => {
        console.log("yay");
      });
  }
  async function handleLogout(e) {
    e.preventDefault();
    setError("");
    try {
      await logout();
      history.push("/log-in");
    } catch {
      setError("Failed to log out");
    }
    console.log("logging out");
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="row">
      <div className="profile-panel">
        <AccountCircleIcon style={{ fontSize: 100, marginTop: "50px", color: "#FEBD06" }} />
        <h4>{currentUser.displayName}</h4>
        {/* <p>Goals in Progress: {user.goalsInProgress ? user.goalsInProgress : 0}</p> */}
        <p className="text">Goals completed: {user?.goalsComplete}</p>
        <p className="text">Bubbles joined: {user?.bubbles.length}</p>
        <Button component={Link} to="/create-bubble" variant="contained" style={{ backgroundColor: "#5bc4ff", fontSize: "12px", color: "white", margin: 10, height: 70, width: 120, borderRadius: 10 }} type="submit">
          Create new Bubble
        </Button>
      </div>
      <div className="account-panel">
        <h2 style={{ color: "#f8f8f8" }}>Your Account</h2>
        <div className="inner-panel">
          <p>Name</p>
          <p style={{ fontWeight: "normal" }}>{currentUser.displayName}</p>
          <Divider light={true} />
          <p>Password</p>
          <p>********</p>
          <Divider light={true} />
          <p>Email</p>
          <p style={{ fontWeight: "normal" }}>{currentUser.email}</p>
          <div align="right">
            <Button onClick={handleLogout} variant="contained" style={{ backgroundColor: "#5bc4ff", width: 100, color: "white", margin: 20, borderRadius: 10 }} type="submit">
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>

    // <div className="userprofile">
    //   <Grid container spacing={1}>
    //     <Grid item xs={4}>
    //       <h3>{currentUser.displayName}</h3>
    //       {/* <p>Goals in Progress: {user.goalsInProgress ? user.goalsInProgress : 0}</p> */}
    //       <p>Goals completed: {user?.goalsComplete}</p>
    //       <p>Bubbles joined: {user?.bubbles.length}</p>
    //       <Link to="create-bubble" style={{ textDecoration: "none" }}>
    //         <Button variant="contained" style={{ backgroundColor: "#5bc4ff", color: "white", margin: 10, height: 70, width: 120, borderRadius: 10 }} type="submit">
    //           ADD NEW BUBBLE
    //         </Button>
    //       </Link>
    //     </Grid>
    //     <Grid item xs={8} style={{ margin: "10px" }}>
    //       <div style={{ margin: "10px" }}>
    //         <h2>Your Account</h2>
    //         <p>Name</p>
    //         <p>{currentUser.displayName}</p>
    //         <Divider light={true} />
    //         <p>Password</p>
    //         <p>********</p>
    //         <Divider light={true} />
    //         <p>Email</p>
    //         <p>{currentUser.email}</p>
    //         <Button onClick={handleLogout} variant="contained" style={{ backgroundColor: "#5bc4ff", width: 100, color: "white", margin: 20, borderRadius: 10 }} type="submit">
    //           Log Out
    //         </Button>
    //       </div>
    //     </Grid>
    //   </Grid>
    // </div>
  );
};

export default UserProfile;
