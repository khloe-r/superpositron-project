import React, { useRef, useState } from "react";
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext.js";
import { Link } from "react-router-dom";

import CreateGoal from "./creategoal";

const CreateBubble = () => {
  const bubbleRef = firebase.firestore().collection("bubbles");
  const userRef = firebase.firestore().collection("users");
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const bubbleNameRef = useRef();
  const categoryRef = useRef();

  const [bubbled, setBubbled] = useState(false);

  const categories = ["Health and Fitness", "Personal", "Social", "Educational", "Career and Finance"];

  const [bID, setBID] = useState(false);

  async function createBubble() {
    const bubid = bubbleNameRef.current.value + " " + btoa(Date.now().toString().substring(10, 16));
    setLoading(true);
    bubbleRef
      .doc(bubid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          alert("Name already taken");
        } else {
          bubbleRef
            .doc(bubid)
            .set({
              name: bubbleNameRef.current.value,
              category: categoryRef.current.value,
              goals: [],
              users: [currentUser.uid],
            })
            .then(() => {
              userRef.doc(currentUser.uid).update({
                bubbles: firebase.firestore.FieldValue.arrayUnion({
                  name: bubbleNameRef.current.value,
                  id: bubid,
                }),
              });
            })
            .then(() => {
              setBubbled(bubid);
              console.log("complete!");
            });
        }
      });
    setLoading(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    createBubble();
  }

  if (bubbled !== false) {
    return <CreateGoal bubbleId={bubbled} />;
  }

  return (
    <div>
      <h1>Name your bubble!</h1>
      <p>(You can be the only one in your bubble if you wish!)</p>
      <form onSubmit={handleSubmit}>
        <label>
          Bubble Name:
          <input type="text" ref={bubbleNameRef} required></input>
        </label>
        <label>
          {" "}
          select a category
          <select id="category" ref={categoryRef}>
            {categories.map((c) => {
              return <option value={c}>{c}</option>;
            })}
          </select>
        </label>
        <button type="submit">Add Bubble</button>
      </form>
      <Link to="dashboard">
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default CreateBubble;
