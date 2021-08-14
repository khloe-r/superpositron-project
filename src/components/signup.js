import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
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
      <h1>Sign Up</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div>
            <TextField id="outlined-basic" label="Email:" variant="filled" ref={emailRef} />
          </div>
          <div>
            <TextField id="outlined-basic" label="Password" variant="filled" ref={passwordRef} />
          </div>
          <div>
            <TextField id="outlined-basic" label="Comfirm password:" variant="filled" ref={passwordConfirmRef} />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}
