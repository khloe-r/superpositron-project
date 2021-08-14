import React, { useRef, useState } from "react";
import firebase from "../firebase";
import BubbleProfile from "./bubbleprofile.js";

const BubbleSearch = () => {
  const bubbleSearchRef = useRef();
  const bubbleRef = firebase.firestore().collection("bubbles");
  const [results, setResults] = useState([]);

  async function handleSearch(e) {
    const answers = [];
    e.preventDefault();
    const searchTerm = bubbleSearchRef.current.value;
    await bubbleRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const title = doc.data().name;
        if (title.toLowerCase().includes(searchTerm.toLowerCase())) {
          console.log(title);
          answers.push(doc.data());
        }
      });
      setResults(answers);
    });
    console.log(results);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>
          Search for Bubbles: <input type="text" ref={bubbleSearchRef}></input>
        </label>
        <button type="submit">Search</button>
        {results.map((result) => {
          return <BubbleProfile bubbleData={result} />;
        })}
      </form>
    </div>
  );
};

export default BubbleSearch;
