import React, { useEffect, useState } from "react";
import CreateGoal from "./creategoal";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

import { useAuth } from "../contexts/AuthContext.js";
import "./bubbleprofile.css";

const BubbleProfile = (bubbleID) => {
  const history = useHistory();
  const { currentUser } = useAuth();
  const userRef = firebase.firestore().collection("users");

  const bubbleRef = firebase.firestore().collection("bubbles");

  const [bubbleData, setBubbleData] = useState();
  const [loading, setLoading] = useState(false);

  function getBubble() {
    setLoading(true);
    console.log("getting bubble");
    bubbleRef
      .doc(bubbleID.bubbleID)
      .get()
      .then((doc) => {
        setBubbleData(doc.data());
      });
    setLoading(false);
  }

  function joinBubble(name, id) {
    setLoading(true);
    userRef.doc(currentUser.uid).update({
      bubbles: firebase.firestore.FieldValue.arrayUnion({ name: name, id: id }),
    });
    bubbleRef.doc(id).update({
      users: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
    });
  }

  useEffect(() => {
    getBubble();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return !currentUser ? null : (
    <div className="bubbleprof">
      <h2>{bubbleData?.name}</h2>
      <p>Number of Goals: {bubbleData?.goals.length}</p>
      <p>Number of Users: {bubbleData?.users.length}</p>
      <p>Category: {bubbleData?.category}</p>
      {bubbleData?.users.includes(currentUser.uid) ? (
        <Button variant="contained" style={{ backgroundColor: "#61B13C", width: 700, color: "white", margin: 20, borderRadius: 10 }} onClick={() => history.push("/dashboard")}>
          Joined! Go to dashboard and work on the goals with your Bubblemates!
        </Button>
      ) : (
        <Button variant="contained" style={{ backgroundColor: "#4A567C", width: 150, color: "white", margin: 20, borderRadius: 10 }} onClick={() => joinBubble(bubbleData?.name, bubbleID.bubbleID)}>
          Join Bubble!
        </Button>
      )}
      {/* {history.location.pathname !== "/bubbles" && <CreateGoal bubbleName={bubbleData.bubbleData.name} />} */}
    </div>
  );
};

export default BubbleProfile;

// const bubble = firebase.firestore().collection("bubbles").doc(bubbleName);
// const bubbleData = bubble.date();
