import React, { useRef } from "react";
import firebase from "firebase/app";

//bubble: a bubbleRef from the parent component
const CreateGoal = (bubbleId) => {
  const bubbleRef = firebase.firestore().collection("bubbles");
  const nameRef = useRef();
  const goalTypeRef = useRef();
  const numberRef = useRef();

  function createGoal() {
    console.log("Creating goal!");
    //setLoading(true);
    bubbleRef
      .doc(bubbleId) //to be replaced with bubble id
      .update({
        //firebase.firestore.FieldValue.arrayUnion
        goals: firebase.firestore.FieldValue.arrayUnion({
          name: nameRef.current.value,
          type: goalTypeRef.current.value,
          number: numberRef.current.value,
          progress: 0,
        }),
      })
      .then(() => {
        console.log("Create goal completed!");
      })
      .catch((err) => {
        console.log(err);
      });
    //setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    createGoal();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Goal Name:
          <input type="text" ref={nameRef}></input>
        </label>
        <label>
          * a label for goal type *<input type="text" ref={goalTypeRef}></input>
        </label>
        <label>
          * a label for goal length *<input type="text" ref={numberRef}></input>
        </label>
        <button type="submit">add goal</button>
      </form>
    </div>
  );
};

export default CreateGoal;
