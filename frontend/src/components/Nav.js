import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const admin = localStorage.getItem("admin");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      {auth !== null || admin !== null ? (
        <div className="nav__single">
          <ul className="nav-ul">
            <li>
              <img
                alt="logo"
                className="img1"
                src="https://play-lh.googleusercontent.com/dndY2DwNIKV9cwyMWW3sT6lVUYXtFyJrkeRXZFvSlMmdCUPQsz_2Z0r7-5eIxD3ebqU"
              />
            </li>
            <li>
              <Link to="/">Home </Link>
            </li>

            <li>
              <Link to="/properties">Properties</Link>
            </li>
            <li>
              <Link to="/add-property">Add Property</Link>
            </li>
            <li>
              <Link to="/my-properties">My Properties</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/aboutus"> About Us</Link>
            </li>
            <li>
              <Link to="/contactus">contact us</Link>
            </li>
          </ul>

          <ul className="nav__logout">
            {auth === null && (
              <li style={{ fontWeight: "600" }}>Admin Panal</li>
            )}
            <Link onClick={logout} to="/signup">
              Logout
              {auth !== null ? JSON.parse(auth).name : JSON.parse(admin).name}
            </Link>{" "}
          </ul>
        </div>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/admin-login">Admin Login</Link>
          </li>
        </ul>
      )
      }
    </div >
  );
};

export default Nav;
