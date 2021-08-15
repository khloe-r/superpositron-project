import React, { useRef, useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import firebase from "../firebase";
import BubbleProfile from "./bubbleprofile.js";

const BubbleSearch = () => {
  const bubbleSearchRef = useRef();
  const bubbleRef = firebase.firestore().collection("bubbles");
  const [results, setResults] = useState([]);

  const categories = ["Health and Fitness", "Personal", "Social", "Educational", "Career and Finance"];

  async function handleSearch(e) {
    const answers = [];
    e.preventDefault();
    const searchTerm = bubbleSearchRef.current.value;
    if (searchTerm !== "") {
      await bubbleRef.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const title = doc.data().name;
          console.log(title);
          if (title.toLowerCase().includes(searchTerm.toLowerCase())) {
            answers.push(doc.id);
          }
        });
        setResults([]);
        setResults(answers);
      });
    }
    console.log(results);
  }

  function handleClick(e) {
    e.preventDefault();
    console.log(e.target.id);
    searchButton(e.target.id);
  }

  function searchButton(category) {
    console.log(category);
    const answers = [];
    bubbleRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const cats = doc.data().category;
        if (cats === category) {
          answers.push(doc.id);
        }
      });
      setResults([]);
      setResults(answers);
    });
    console.log(results);
  }

  return (
    <div style={{ postion: "static" }}>
      <form onSubmit={handleSearch}>
        <div>
          <TextField
            style={{ backgroundColor: "white", borderRadius: 10, width: 600, margin: 10 }}
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <SearchIcon />
            //     </InputAdornment>
            //   ),
            // }}
            label="Looking to join one? Search for Bubbles by name:"
            variant="filled"
            inputRef={bubbleSearchRef}
          />
          <Button variant="contained" style={{ backgroundColor: "#4A567C", width: 150, color: "white", margin: 20, borderRadius: 10 }} type="submit">
            Search
          </Button>
        </div>
        <br />
        {categories.map((cat) => {
          //double check
          return (
            <Button id={cat} variant="contained" style={{ backgroundColor: "#4A567C", width: 150, color: "white", margin: 20, borderRadius: 10 }} onClick={handleClick}>
              {cat}
            </Button>
          );
        })}
        <h4>Search Results</h4>
        {results.length === 0 && <p>Use an option above to find more bubbles!</p>}
        {results.map((result) => {
          return <BubbleProfile bubbleID={result} />;
        })}
      </form>
    </div>
  );
};

export default BubbleSearch;
