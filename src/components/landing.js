import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link to="/sign-up">
        <button>Sign Up</button>
      </Link>
      <Link to="/log-in">
        <button>Log In</button>
      </Link>
    </div>
  );
};

export default Landing;
