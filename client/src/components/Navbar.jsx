import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import search from "../assets/search-solid.svg";
import Avatar from "./Avatar";
import { useSelector, useDispatch } from "react-redux";
import { authSuccess, logoutSuccess } from "../redux/Slices/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user.name);
  const userToken = useSelector((state) => state.auth.user.token);
  console.log(user);
  console.log(userToken);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/");
  };

  useEffect(() => {
    if (userToken) {
      const decodedToken = decode(userToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authSuccess({ token }));
    }
  }, [dispatch]);

  return (
    <nav className="navbar-container">
      <div className="navbar">
        <Link to="/" className="nav-item nav-logo">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/" className="nav-item nav-btn">
          About
        </Link>
        <Link to="/" className="nav-item nav-btn">
          Products
        </Link>
        <Link to="/" className="nav-item nav-btn">
          For Teams
        </Link>
        <form>
          <input type="text" placeholder="Search..." />
          <img src={search} alt="search" width="18" className="icon" />
        </form>
        {user === null ? (
          <Link to="/auth" className="nav-item nav-links">
            Login
          </Link>
        ) : (
          <>
            <Link to="/">
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                cursor="white"
              >
                M
              </Avatar>
            </Link>
            <button className="nav-item nav-links" onClick={handleLogout}>
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
