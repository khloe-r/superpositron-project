import React, { useState, useEffect } from "react";
import firebase from "../firebase";

export default function Dashboard() {
    const userRef = firebase.firestore().collection("users")
    const bubbleRef = firebase.firestore().collection("bubbles")
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(false)

    function getName() {
        setLoading(true)
        userRef.doc('lQfCErGBqJdLzBbag3hNEj2iKMT2').get().then((doc) => {
            console.log(doc.data())
            setUser(doc.data())
        })
        setLoading(false)
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

    useEffect(() => {
        getName();
      }, []);

      if(loading) {
          return <h1>Loading...</h1>
      }

  return (
      <>
    <h1>Hello {user.name}</h1>
    {user.awards?.map((award) => {
        return <p>{award}</p>
    })}
    </>
  );
}
