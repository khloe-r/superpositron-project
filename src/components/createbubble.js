import React, { useRef } from "react";
import firebase from "../firebase";

import CreateGoal from "./creategoal";

const CreateBubble = (userId) => {
  const bubbleRef = firebase.firestore().collection("bubbles");
  const userRef = firebase.firestore().collection("users");

  const bubbleNameRef = useRef();

  function createBubble() {
    //setLoading(true)
    bubbleRef
      .doc(bubbleNameRef.current.value)
      .get()
      .then((doc) => {
        if (doc.exists) {
          alert("Name already taken");
          //return res.status(400).json({ name: "Name already taken" });
        } else {
          bubbleRef
            .doc(bubbleNameRef.current.value)
            .set({
              name: bubbleNameRef.current.value,
              tags: [],
              goals: [],
              users: [userId],
            })
            .then(() => {
              userRef.doc(userId).update({
                bubbles: firebase.firestore.FieldValue.arrayUnion(bubbleNameRef.current.value),
              });
            })
            .then(() => {
              console.log("complete!");
            });
        }
      });
    //setLoading(false)
  }
  function handleSubmit(e) {
    e.preventDefault();
    createBubble();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Bubble Name:
          <input type="text" ref={bubbleNameRef}></input>
        </label>
        <CreateGoal />
      </form>
    </div>
  );
};

export default CreateBubble;
