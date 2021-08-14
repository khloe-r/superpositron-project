import React, { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext.js";
import { Link, useHistory } from "react-router-dom";

import firebase from "../firebase";

export default function SignUp() {
//     const emailRef = useRef();
//   const passwordRef = useRef();
//   const passwordConfirmRef = useRef();
//   // const nameRef = useRef()
//   const termsRef = useRef();
//   const { signup } = useAuth();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const history = useHistory();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const email = emailRef.current.value;
//     const pw = passwordRef.current.value;

//     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//       return setError("Passwords do not match");
//     }
//     if (!termsRef.current.checked) {
//       return setError("Please agree to the terms and conditions");
//     }

//     try {
//       setError("");
//       setLoading(true);
//       await signup(email, pw);
//       history.push("/dashboard");
//     } catch {
//       setError("Failed to create an account");
//     }
//     setLoading(false);
//   }

  return (
    <h1>Hello {name}</h1>
  );
}