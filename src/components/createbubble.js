import React, { useRef, useState } from "react";
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext.js";

import { Link, useHistory } from "react-router-dom";
import { Button, TextField, MenuItem } from "@material-ui/core";

import CreateGoal from "./creategoal";
import "./createbubble.css";

const CreateBubble = () => {
  const bubbleRef = firebase.firestore().collection("bubbles");
  const userRef = firebase.firestore().collection("users");
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
              //setBubbled(bubid);
              console.log("complete!");
              history.push("/dashboard");
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
    <div className="bubble-form-header">
      <h3>Create your bubble!</h3>
      <p>(You can be the only one in your bubble if you wish!)</p>
      <div className="bubble-form">
        <form onSubmit={handleSubmit}>
          <div align="center">
            <TextField style={{ backgroundColor: "white", borderRadius: 10, width: 400, margin: 10 }} label="Bubble Name:" variant="filled" inputRef={bubbleNameRef} />
          </div>
          <div align="center">
            <TextField style={{ backgroundColor: "white", borderRadius: 10, width: 400, margin: 10 }} label="Select a category:" variant="filled" select inputRef={categoryRef}>
              <MenuItem value="" disabled>
                Select a category:
              </MenuItem>
              {categories?.map((c) => {
                return <MenuItem value={c}>{c}</MenuItem>;
              })}
            </TextField>
          </div>
          <div align="center">
            <Button variant="contained" style={{ backgroundColor: "#AD68F2", width: 150, color: "white", margin: 10, borderRadius: 10 }} type="submit">
              Add Bubble
            </Button>
            <Button component={Link} to="/dashboard" variant="contained" style={{ backgroundColor: "#AD68F2", width: 130, color: "white", margin: 10, marginBottom: 10, borderRadius: 10 }}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBubble;
