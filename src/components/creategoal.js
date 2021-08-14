import React, { useRef, useState } from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

//bubble: a bubbleRef from the parent component
const CreateGoal = (bubbleId) => {
  const bubbleRef = firebase.firestore().collection("bubbles");
  const nameRef = useRef();
  const categoryRef = useRef();
  const goalTypeRef = useRef();
  const numberRef = useRef();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const categories = ["Health and Fitness", "Personal", "Social", "Educational", "Career and Finance"];

  function createGoal() {
    console.log("Creating goal!");
    console.log("hi");
    setLoading(true);
    bubbleRef
      .doc(bubbleId.bubbleId)
      .update({
        goals: firebase.firestore.FieldValue.arrayUnion({
          name: nameRef.current.value,
          type: goalTypeRef.current.value,
          number: numberRef.current.value,
          progress: 0,
          category: categoryRef.current.value,
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
          * a label for goal length *<input type="number" ref={numberRef}></input>
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
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default CreateGoal;
