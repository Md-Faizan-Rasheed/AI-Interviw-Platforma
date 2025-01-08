
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSucess } from "../utils";
import { AuthContext } from "../context/AuthContext.jsx";

const SignIn = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    // Validate inputs
    if (!email || !password) {
      alert("Both email and password are required!");
      return;
    }

    try {

      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
       const {sucess,message,jwtToken,name,error} = result;

      if (sucess) {
        handleSucess(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name); 
        setIsLoggedIn(true); // Update the state to indicate the user is logged in

        setTimeout(() => {
          navigate('/JDcreation');
        })

      }else if(error){
             const details = error?.details[0].message
           handleError(details);
           }else if(!sucess){
              handleError(message);
           }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
      handleError(error);

    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    navigate("/SignIn"); // Redirect to the home page
  };
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Side: Sign-In Form */}
      <div className="flex flex-col justify-center bg-gray-100 w-full lg:w-1/2 p-8 lg:p-16">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">kerclunk.</h1>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          {/* Sign In */}
          {isLoggedIn ? "Welcome Back!" : "Sign In"}

          </h2>

          {!isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="jdoe@health.com"
            value={loginInfo.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />

          {/* Password Input */}
          <label
            htmlFor="password"
            className="block mb-2 text-sm text-gray-600"
          >
            Password*
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={loginInfo.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />

          {/* Forgot Password */}
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline mb-6 block text-right"
          >
            Forgot Password?
          </a>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition mb-4"
          >
            Sign In
          </button>
        </form>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition"
          >
            Logout
          </button>
        )}

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/OrganisationSignup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {/* Right Side: Info Section */}
      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-900 to-gray-900 text-white w-full lg:w-1/2 p-16">
        <h2 className="text-4xl font-bold mb-4">
          Build your career on Kerplunk.
        </h2>
        <p className="text-lg mb-8">
          Unlock the future of staffing, where organizations across all sectors
          leverage AI to source, recruit, and retain the world's top talent.
          Join us today to connect with leading companies and accelerate your
          career on Kerclunk.
        </p>
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/women/46.jpg"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
          <p className="text-sm">
            Over <span className="font-semibold">7k+ strong</span> and growing!
            Your journey begins here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

