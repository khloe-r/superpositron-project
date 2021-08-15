import React, { useState, useEffect } from "react";
import BubbleProfile from "./bubbleprofile";
import BubbleSearch from "./bubblesearch";
import { useAuth } from "../contexts/AuthContext.js";
import firebase from "../firebase";

const Bubbles = () => {
  const userRef = firebase.firestore().collection("users");

  const [userBubbles, setUserBubbles] = useState([]);
  const [loading, setLoading] = useState([]);
  const { currentUser } = useAuth();

  function getUserBubbles() {
    setLoading(true);
    userRef
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        console.log(doc.data());
        setUserBubbles(doc.data().bubbles);
      })
      .then(() => {
        console.log("loaded bubbles");
      });
    setLoading(false);
  }

  useEffect(() => {
    getUserBubbles();
  }, []);

  return (
    <div>
      <h1>Bubbles</h1>
      <BubbleSearch />
      <h1>My Bubbles</h1>
      {userBubbles.map((bub) => {
        console.log(bub);
        return <BubbleProfile bubbleID={bub.id} />;
      })}
    </div>
  );
};

export default Bubbles;
