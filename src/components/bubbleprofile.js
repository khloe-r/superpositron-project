import React, { useEffect, useState } from "react";
import CreateGoal from "./creategoal";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

const BubbleProfile = (bubbleID) => {
  const history = useHistory();
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

  useEffect(() => {
    getBubble();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h2>{bubbleData?.name}</h2>
      <p>Goals:</p>
      {bubbleData?.goals.map((goal) => {
        return <p>{goal.name}</p>;
      })}
      <p>Users:</p>
      {bubbleData?.users.map((user) => {
        return <p>{user.name}</p>;
      })}
      <p>Tags:</p>
      {bubbleData?.tags.map((tag) => {
        return <p>{tag}</p>;
      })}
      {/* {history.location.pathname !== "/bubbles" && <CreateGoal bubbleName={bubbleData.bubbleData.name} />} */}
    </div>
  );
};

export default BubbleProfile;

// const bubble = firebase.firestore().collection("bubbles").doc(bubbleName);
// const bubbleData = bubble.date();
