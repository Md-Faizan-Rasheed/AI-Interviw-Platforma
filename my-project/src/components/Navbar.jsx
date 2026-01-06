
import  { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {UserContext} from "../App"
import  CustomNavLink from "./CustomNavlink"
import { AuthContext } from "./Context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const { isLoggedIn, login, logout} = useContext(AuthContext);
  
  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
// const {state,dispatch} = useContext(UserContext)
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("aiQuestions");
    localStorage.removeItem("email");
    localStorage.removeItem("jobPostData");
    localStorage.removeItem("jobs");
    // setIsLoggedIn(false);
    // dispatch({type:"USER",payload:false})
    // const { dispatch } = useContext(UserContext);
    logout()
    navigate("/SignIn"); // Redirect to the home page
  };

  const RenderMenu = () =>{
    if(isLoggedIn){
      return(
        <div>
       <NavLink
  to="/signin"
  onClick={handleLogout}
  className={({ isActive }) =>
    isActive
      ? "bg-green-600 text-white rounded-lg px-4 py-2"
      : "text-red-700 font-bold hover:text-green-600 hover:bg-green-600 p-2 rounded-md"
  }
>
  Logout
</NavLink>

      </div>
      )
    }
    else{
      return (
        <>
        <div className="flex flex-row gap-5 justify-center items-center">
         <div>
         <CustomNavLink
  to="/signin"
  className="text-gray-600 hover:text-green-600"
>
  Sign In
</CustomNavLink>
         </div>
        <div>
       <button className="bg-lime-400 text-blue-800 font-bold py-2 px-6 rounded-full hover:bg-lime-300">
           Get Started
         </button>
       </div>
</div>
       </>
      )
    }
  }
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
          <CustomNavLink to="/" className="hover:text-green-600 block">
            Home
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/about" className="hover:text-green-600 block">
            About
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/platform" className="hover:text-green-600 block">
            Platform
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/pricing" className="hover:text-green-600 block">
            Pricing
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/JDcreation" className="hover:text-green-600 block">
            JDcreation
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/contact" className="hover:text-green-600 block">
            Contact
          </CustomNavLink>
        </li>

      </ul>

      <RenderMenu/>
{/* <div className="flex flex-row gap-5 justify-center items-center">
          <div>
            <Link to="/signin" className="text-gray-600 hover:text-green-600">
              Sign In
            </Link>
          </div>
=        <div>
        <button className="bg-lime-400 text-blue-800 font-bold py-2 px-6 rounded-full hover:bg-lime-300">
            Get Started
          </button>
        </div>
</div> */}

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

