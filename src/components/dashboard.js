import React, { useState, useEffect, useRef } from "react";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext.js";
import { Link } from "react-router-dom";

import CreateBubble from "./createbubble";
import BubbleProfile from "./bubbleprofile";

export default function Dashboard() {
  const userRef = firebase.firestore().collection("users");
  const bubbleRef = firebase.firestore().collection("bubbles");
  const nameRef = useRef();
  const bubbleNameRef = useRef();
  const { currentUser, setDisplayName } = useAuth();

  const [user, setUser] = useState();
  const [unknown, setUnknown] = useState(false);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  function getUser() {
    setLoading(true);
    userRef
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUnknown(false);
          console.log(doc.data());
          setUser(doc.data());
        } else {
          setUnknown(true);
        }
      })
      .then(() => {
        console.log("loaded dashboard");
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
        awards: [],
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
        <h1>add ur goal</h1>
        {/* <CreateGoalUser userID={currentUser.uid} /> */}
        <button onClick={returnToDash}>return to dashboard</button>
      </>
    );
  }

  if (unknown) {
    return (
      <>
        <h1>Welcome! Let's learn more about you!</h1>{" "}
        <form onSubmit={handleName}>
          <label>
            Enter your name:
            <input type="text" ref={nameRef} required />
          </label>
          <button type="submit">Continue</button>
        </form>
      </>
    );
  }

  return (
    <>
      <h1>Hello {currentUser.displayName}</h1>
      <h5>My Bubbles</h5>
      <div className="flex-contain">
        {user?.bubbles.length > 0 ? (
          user?.bubbles.map((bubble) => {
            return (
              <div>
                <BubbleProfile bubbleID={bubble.id} />
              </div>
            );
          })
        ) : (
          <>
            <p>You don't have any bubbles!</p>
            <Link to="create-bubble">
              <button>Start your first one here!</button>
            </Link>
          </>
        )}
        {user?.bubbles.length > 0 && <button onClick={addGoal}>Add New Goal</button>}
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
