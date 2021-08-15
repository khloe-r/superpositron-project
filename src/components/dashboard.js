import React, { useState, useEffect, useRef } from "react";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext.js";
import { Link } from "react-router-dom";
import "./form.css";
import { TextField, Button, Input } from "@material-ui/core";

import CreateGoal from "./creategoal";
import BubbleProfile from "./bubbleprofile";
import GoalCard from "./goalcard-";

export default function Dashboard() {
  const userRef = firebase.firestore().collection("users");
  const bubbleRef = firebase.firestore().collection("bubbles");
  const nameRef = useRef();
  const bubbleNameRef = useRef();
  const { currentUser, setDisplayName } = useAuth();

  const [user, setUser] = useState();
  const [unknown, setUnknown] = useState(false);
  const [goalList, setGoalList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  function getUser() {
    let goals = [];
    setLoading(true);
    userRef
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUnknown(false);
          setUser(doc.data());
        } else {
          setUnknown(true);
        }
      })
      .then(() => {
        bubbleRef.onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().users.includes(currentUser.uid)) {
              console.log(doc.data().goals);
              goals = goals.concat(
                doc.data().goals.map((goal, index) => ({
                  goal: goal,
                  bubble: { name: doc.data().name, id: doc.id, index: index, category: doc.data().category },
                }))
              );
              setGoalList(goals);
            }
          });
        });
      })
      .then(() => {
        console.log("loaded dashboard");
        console.log(goals);
        setGoalList(goals);
      });
    setLoading(false);
  }

  function addGoal() {
    console.log("adding goal!");
    setAdding(true);
  }

  function returnToDash() {
    console.log("returning");
    getUser();
    setAdding(false);
  }

  function handleName(e) {
    e.preventDefault();
    setLoading(true);

    console.log("handling name");
    console.log(currentUser.uid);
    setLoading(true);
    userRef
      .doc(currentUser.uid)
      .set({
        name: nameRef.current.value,
        email: currentUser.email,
        bubbles: [],
        goalsComplete: 0,
      })
      .then(() => {
        setDisplayName(nameRef.current.value);
        console.log("complete!");
        getUser();
      });
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (adding) {
    return (
      <>
        <h1>Add your Goal!</h1>
        <CreateGoal />
        <Button onClick={returnToDash} style={{ color: "white" }}>
          return to dashboard
        </Button>
      </>
    );
  }

  if (unknown) {
    return (
      <div className="form">
        <h1>Welcome! Let's learn more about you!</h1>{" "}
        <form onSubmit={handleName}>
          <div>
            <TextField style={{ backgroundColor: "white", borderRadius: 10, width: 300, margin: 10 }} label="What's your name?" variant="filled" inputRef={nameRef} />
          </div>
          <Button variant="contained" style={{ backgroundColor: "#4A567C", width: 150, color: "white", margin: 20, borderRadius: 10 }} type="submit">
            Continue
          </Button>
        </form>
      </div>
    );
  }

  return !currentUser ? null : (
    <>
      <div>
        <h1>Hello {currentUser.displayName}!</h1>
        {user?.bubbles.length > 0 && (
          <>
            <Button onClick={addGoal} variant="contained" style={{ backgroundColor: "#4A567C", width: 150, color: "white", margin: 20, borderRadius: 10 }}>
              Create <br /> New Goal
            </Button>
            <Button component={Link} to="create-bubble" variant="contained" style={{ backgroundColor: "#4A567C", width: 150, color: "white", margin: 20, borderRadius: 10 }}>
              Create New Bubble
            </Button>{" "}
          </>
        )}
      </div>
      <h5>My Goals</h5>
      <div className="flex-contain">
        {user?.bubbles?.length > 0 ? (
          goalList.map((goal) => {
            return (
              <div>
                <GoalCard goal={goal.goal} bubble={goal.bubble} />
              </div>
            );
          })
        ) : (
          <>
            <p>You don't have any bubbles!</p>
            <Button style={{ color: "white", backgroundColor: "#c082ff", borderRadius: 15, padding: 10 }} component={Link} to="create-bubble">
              Start your first one here!
            </Button>
          </>
        )}
        {goalList.length === 0 && <p>Use the buttons above to add new goals for your bubbles!</p>}
      </div>
    </>
  );
}

// Adding User Function
// function addUser() {
//     setLoading(true)
//     userRef.doc(currentUser.uid).set({
//         name: nameRef.current.value,
//         email: currentUser.email,
//         bubbles: [],
//         goals: [],
//         awards: []
//     }).then(() => {
//         console.log("complete!")
//     })
//     setLoading(false)
// }

// Adding Bubbles Function
// function addBubble() {
//     setLoading(true)
//     bubbleRef.doc(bubbleIdRef.current.value).set({
//         name: bubbleNameRef.current.value,
//         tags: [],
//         goals: [],
//         users: []
//     }).then(() => {
//         console.log("complete!")
//     })
//     setLoading(false)
// }

// Adding Goal Function
// function addGoal() {
//     setLoading(true)
//     userRef.doc(currentUser.uid).update({
//         ['goals']: firebase.firestore.FieldValue.arrayUnion({
//             title: titleRef.current.value,
//             type: goalType.current.value,
//             number: goalNumber.current.value,
//             progress: progressState.current.value
//          })
//     }).then(() => {
//         console.log("complete!")
//     })
//     setLoading(false)
// }
