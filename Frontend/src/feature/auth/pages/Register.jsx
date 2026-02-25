import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../styles/form.scss";

const Register = () => {
  const { user, loading, handleRegister } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    await handleRegister(username, email, password);

    navigate("/");

    console.log("User registered");
  }

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          <input
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have a account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
