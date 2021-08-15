import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "./form.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const pw = passwordRef.current.value;
    console.log(emailRef.current.value, passwordRef.current.value);

    try {
      setError("");
      setLoading(true);
      await login(email, pw);
      console.log("yay");
      history.push("/dashboard");
    } catch {
      setError("Failed to login");
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div className="form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField style={{ backgroundColor: "white", borderRadius: 10, width: 300, margin: 10 }} label="Email:" variant="filled" inputRef={emailRef} />
        </div>
        <div>
          <TextField style={{ backgroundColor: "white", borderRadius: 10, width: 300, margin: 10 }} label="Password" type="password" variant="filled" inputRef={passwordRef} />
        </div>
        <Button variant="contained" style={{ backgroundColor: "#4A567C", width: 150, color: "white", margin: 20, borderRadius: 10 }} type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
}
