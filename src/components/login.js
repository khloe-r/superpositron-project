import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useHistory } from "react-router-dom";

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

    try {
      setError("");
      setLoading(true);
      await login(email, pw);
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          email:
          <input type="text" ref={emailRef}></input>
        </label>
        <label>
          password:
          <input type="password" ref={passwordRef}></input>
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}
