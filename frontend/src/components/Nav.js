import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(JSON.parse(localStorage.getItem("user")).role);
  }, []);
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      {auth ? (
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
            <Link to="/aboutus"> About Us</Link>
          </li>
          <li>
            <Link to="/properties">Properties</Link>
          </li>
          {localStorage.getItem("token") && (
            <li>
              <Link to="/add-property">Add Property</Link>
            </li>
          )}
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/contactus">contact us</Link>
          </li>
          <ul className="nav-ul nav-right">
            <li>
              <Link onClick={logout} to="/signup">
                Logout ({JSON.parse(auth).name})
              </Link>{" "}
            </li>
          </ul>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
