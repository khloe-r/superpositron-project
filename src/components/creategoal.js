import React, { useRef, useState, useEffect } from "react";
import { useForkRef, TextField, Button, MenuItem, FormControl, Select, FormHelperText, InputLabel } from "@material-ui/core";
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext.js";
import { useHistory } from "react-router-dom";
import "./form.css";

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
  const [bubblecat, setBubblecat] = useState();
  const history = useHistory();

  console.log(Object.keys(bubbleId).length === 0);

  const [bubbles, setBubbles] = useState();
  // const [bubbleIdRef, setBubbleIdRef] = useState();

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
    setLoading(true);
    const theID = Object.keys(bubbleId).length > 0 ? bubbleId.bubbleId : bubbleIdRef.currentValue;
    console.log(bubbleIdRef.currentValue);
    bubbleRef
      .doc(bubblecat)
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
        window.location.reload();
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

  function handleChange(e) {
    setBubblecat(e.target.value);
  }

  useEffect(() => {
    getBubbles();
  }, []);

  // const handleChange = (event) => {
  //   setBubbleIdRef(event.target.value);
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField style={{ backgroundColor: "white", borderRadius: 10, width: 300, margin: 10 }} label="What is the goal? (ex. Run 30km)" variant="filled" inputRef={nameRef} required />
        </div>
        <div>
          <TextField style={{ backgroundColor: "white", borderRadius: 10, width: 300, margin: 10 }} label="A unit to measure your goal (ex. km)" variant="filled" inputRef={goalTypeRef} required />
        </div>
        <div>
          <TextField style={{ backgroundColor: "white", borderRadius: 10, width: 300, margin: 10 }} label={`How many ${goalTypeRef?.current?.value ? goalTypeRef?.current?.value + "s" : "items"}? (ex.30)`} variant="filled" inputRef={numberRef} required />
        </div>
        <div>
          <TextField onChange={handleChange} style={{ backgroundColor: "white", borderRadius: 10, width: 300, margin: 10 }} label="Which bubble is this goal linked to?" variant="filled" select inputRef={bubbleIdRef} required>
            <MenuItem value="" disabled>
              Which bubble is this goal linked to?
            </MenuItem>
            {bubbles?.map((c) => {
              return <MenuItem value={c.id}>{c.name}</MenuItem>;
            })}
          </TextField>
        </div>
        <Button variant="contained" style={{ backgroundColor: "#4A567C", width: 150, color: "white", margin: 20, borderRadius: 10 }} type="submit">
          Create!
        </Button>
      </form>
    </div>
  );
};

export default CreateGoal;
