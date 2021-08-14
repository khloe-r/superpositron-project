import React from "react";
import CreateGoal from "./creategoal";
import firebase from "firebase/app";

const BubbleProfile = (bubbleName) => {
  const bubble = firebase.firestore().collection("bubbles").doc(bubbleName);
  const bubbleData = bubble.date();

  return (
    <div>
      <h2>{bubbleData.name}</h2>
      <h2>{bubbleData.users}</h2>
      <h2>{bubbleData.goals}</h2>
      <CreateGoal bubbleName={bubbleName} />
    </div>
  );
};

export default BubbleProfile;
