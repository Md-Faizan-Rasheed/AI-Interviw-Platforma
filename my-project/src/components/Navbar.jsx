
// import React, { useState } from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    // setIsLoggedIn(false);
    navigate("/SignIn"); // Redirect to the home page
  };
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold text-green-600">kerclunk.</div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden text-gray-600 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      {/* Navigation Links */}
      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row absolute md:relative top-16 md:top-auto left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent text-gray-600 space-y-4 md:space-y-0 items-center justify-around sm:gap-1 md:gap-2 lg:gap-8 p-4 md:p-0`}
      >
        <li>
          <Link to="/" className="hover:text-green-600 block">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-green-600 block">
            About
          </Link>
        </li>
        <li>
          <Link to="/platform" className="hover:text-green-600 block">
            Platform
          </Link>
        </li>
        <li>
          <Link to="/pricing" className="hover:text-green-600 block">
            Pricing
          </Link>
        </li>
        <li>
          <Link to="/JDcreation" className="hover:text-green-600 block">
            JDcreation
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-green-600 block">
            Contact
          </Link>
        </li>

      </ul>
<div className="flex flex-row gap-5 justify-center items-center">
{isLoggedIn ? (
          <div>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/signin" className="text-gray-600 hover:text-green-600">
              Sign In
            </Link>
          </div>
        )}
        <div>
        <button className="bg-lime-400 text-blue-800 font-bold py-2 px-6 rounded-full hover:bg-lime-300">
            Get Started
          </button>
        </div>
</div>
      {/* Desktop Buttons */}
      {/* <div className="hidden md:flex space-x-4">
      {isLoggedIn ? (
          <li>
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/signin" className="text-gray-600 hover:text-green-600">
              Sign In
            </Link>
          </li>
        )}
        <button className="bg-lime-400 text-blue-800 font-bold py-2 px-6 rounded-full hover:bg-lime-300">
          Get Started
        </button>
      </div> */}
    </nav>
  );
};

export default Navbar;

