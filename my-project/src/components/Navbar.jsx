
// import React, { useState } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        } md:flex flex-col md:flex-row absolute md:relative top-16 md:top-auto left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent text-gray-600 space-y-4 md:space-y-0 items-center justify-center sm:gap-1 md:gap-2 lg:gap-8 p-4 md:p-0`}
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
          {/* <Link to="/JDcreation" className="hover:text-green-600 block">
            JD Creation
          </Link> */}
        </li>
        <li>
          <Link to="/pricing" className="hover:text-green-600 block">
            Pricing
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-green-600 block">
            Contact
          </Link>
        </li>
        {/* Mobile Buttons */}
        <li className="flex flex-col space-y-4 md:hidden w-full items-center">
          <Link
            to="/Popuppreplace"
            className="text-gray-600 hover:text-green-600 font-medium"
          >
            Sign In
          </Link>
          <button className="bg-lime-400 text-blue-800 font-bold py-2 px-6 rounded-full hover:bg-lime-300">
            Get Started
          </button>
        </li>
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex space-x-4">
        <button className="text-gray-600 hover:text-green-600 font-medium">
          <Link to="/Popuppreplace" className="hover:text-green-600 block">
            Sign In
          </Link>
        </button>
        <button className="bg-lime-400 text-blue-800 font-bold py-2 px-6 rounded-full hover:bg-lime-300">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

