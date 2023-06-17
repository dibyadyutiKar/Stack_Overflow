import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Auth.css";
import icon from "../assets/icon.png";
import AboutAuth from "../components/AboutAuth";
import { authSuccess, logoutSuccess } from "../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import * as api from "../api";
const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    console.log({ name, email, password });
    e.preventDefault();
    if (!email && !password) {
      alert("Enter email and password");
    }
    if (isSignup) {
      try {
        const response = await axios.post("http://localhost:5000/user/signup", {
          name,
          email,
          password,
        });
        // const response = await api.signUp({ name, email, password });
        console.log(response);
        const token = response.data.token;
        const decodedToken = jwt_decode(token);
        console.log(decodedToken.username);
        dispatch(authSuccess({ token }));
        navigate("/");
      } catch (error) {
        console.log("error");
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5000/user/login", {
          email,
          password,
        });
        // const response = await api.logIn({ email, password });
        console.log(response);
        const token = response.data.token;
        dispatch(authSuccess({ token }));
        navigate("/");
      } catch (error) {
        console.log("error");
      }
    }
  };

  return (
    <section className="auth-section">
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password?
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
