import React, { useState, useEffect } from "react";
import firebase from "./firebase";

export default function Dashboard() {
    const userRef = firebase.firestore().collection("users")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    function getName() {
        setLoading(true)
        userRef.doc('hello@world.com').get().then((doc) => {
            console.log(doc.data())
            setName(doc.data().name)
        })
        setLoading(false)
    }

    useEffect(() => {
        getName();
      }, []);

      if(loading) {
          return <h1>Loading...</h1>
      }

  return (
    <h1>Hello {name}</h1>
  );
}
