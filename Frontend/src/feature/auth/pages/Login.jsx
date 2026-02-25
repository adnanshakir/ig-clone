import React, { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { user, loading, handleLogin } = useAuth();

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate()

  async function submitHandler(e) {
    e.preventDefault();

    await handleLogin(username, password)

    navigate("/")

    console.log("User loggedIn")
  }

  if(loading){
    return <main>
      <h1>Loading...</h1>
    </main>
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have a account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
