import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { useHistory, Link } from "react-router-dom";
import { TextField, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./form.css";

export default function SignUp() {
  const emailRef = useRef();
  const passwordConfirmRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  console.log(history);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const pw = passwordRef.current.value;

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, pw);
      console.log("yay");
      history.push("/dashboard");
    } catch {
      setError("Failed to create an account");
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField style={{ backgroundColor: "white", borderRadius: 10, width: 300, margin: 10 }} label="Email:" variant="filled" inputRef={emailRef} />
          </div>
          <div>
            <TextField style={{ backgroundColor: "white", borderRadius: 10, width: 300, margin: 10 }} label="Password" type="password" variant="filled" inputRef={passwordRef} />
          </div>
          <div>
            <TextField style={{ backgroundColor: "white", borderRadius: 10, width: 300, margin: 10 }} label="Comfirm password:" type="password" variant="filled" inputRef={passwordConfirmRef} />
          </div>
          <Button variant="contained" style={{ backgroundColor: "#4A567C", width: 150, color: "white", margin: 20, borderRadius: 10 }} type="submit">
            Sign Up
          </Button>
        </form>
        <Link to="/log-in" style={{ color: "white", textDecoration: "none", fontSize: 15 }}>
          Already have an account? <span style={{ textDecoration: "underline" }}>Log In</span>
        </Link>
      </div>
    </>
  );
}
