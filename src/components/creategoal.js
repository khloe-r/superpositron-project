import React, { useRef, useState, useEffect } from "react";
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext.js";
import { useHistory } from "react-router-dom";
import { useForkRef } from "@material-ui/core";

//bubble: a bubbleRef from the parent component
const CreateGoal = (bubbleId) => {
  const bubbleRef = firebase.firestore().collection("bubbles");
  const userRef = firebase.firestore().collection("users");
  const { currentUser } = useAuth();
  const nameRef = useRef();
  const bubbleIdRef = useRef();
  const goalTypeRef = useRef();
  const numberRef = useRef();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  console.log(Object.keys(bubbleId).length === 0);

  const [bubbles, setBubbles] = useState();

  const categories = ["Health and Fitness", "Personal", "Social", "Educational", "Career and Finance"];

  function getBubbles() {
    userRef
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setBubbles(doc.data().bubbles);
      });
  }

  function createGoal() {
    console.log("Creating goal!");
    console.log("hi");
    setLoading(true);
    const theID = Object.keys(bubbleId).length > 0 ? bubbleId.bubbleId : bubbleIdRef.current.value;
    bubbleRef
      .doc(theID)
      .update({
        goals: firebase.firestore.FieldValue.arrayUnion({
          name: nameRef.current.value,
          type: goalTypeRef.current.value,
          number: numberRef.current.value,
          progress: 0,
        }),
      })
      .then(() => {
        console.log("Create goal completed!");
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    createGoal();
  }

  useEffect(() => {
    getBubbles();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Goal Name:
          <input type="text" ref={nameRef} required></input>
        </label>
        <label>
          * a label for goal type *<input type="text" ref={goalTypeRef} required></input>
        </label>
        <label>
          * a label for goal length *<input type="number" ref={numberRef} required></input>
        </label>
        {Object.keys(bubbleId).length === 0 && (
          <label>
            * which bubble is this goal linked to? *
            <select id="category" ref={bubbleIdRef}>
              {bubbles?.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </label>
        )}
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default CreateGoal;
