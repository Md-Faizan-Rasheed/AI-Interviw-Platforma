import { useContext, useEffect, useState } from "react";
import {Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Onavbar from "./Onavbar";
import { ChevronDown, User } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { response } from "express";
import { AuthContext } from "../Context/AuthContext";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [isNameDropdownOpen, setIsNameDropdownOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [initial, setInitial] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);

  const {isLoggedIn} = useContext(AuthContext);
  console.log("you came to dashboard");

  if(!isLoggedIn){
    return <Navigate to="/signin"></Navigate>
  }
    const handleResetPassword = async () => {
      const email = localStorage.getItem('email');
       console.log("Email in Dashboaard SEction",email)
      const resetToken = localStorage.getItem('token');
  
      
      try {
        const response = await fetch("http://localhost:8080/jobs/api/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email , resetToken}),
        });
  
        const data = await response.json();
        if (response.ok) {
          toast.message("Password reset link sent! Check your email.", {
            position: "top-center",
          });
          // alert("");
        } else {
         toast.message(data.message || "Failed to send reset link.", {
        position: "top-center",
      });       
     }
      } catch (error) {
        toast.error("Something went wrong. Please try again.", {
          position: "top-center",
      });
    };
    }

  return (
    <div className="flex h-screen  bg-gradient-to-br from-[#a8edea] to-[#fed6e3] font-abel">
      {/* Sidebar */}
     <Onavbar/>
      {/* Main Content */}
      <div className=" bg-gradient-to-br from-[#a8edea] to-[#fed6e3] font-abel min-h-screen p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Home</h1>
        <div className="flex items-center space-x-4">
          {/* <div className="flex items-center space-x-2">
            <span className="text-gray-500">Custom Date</span>
            <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md">
              Dec 06, 2024 - Jan 06, 2025
            </button>
          </div> */}

          {/* <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
          {initial}
          </div> */}

<div className="flex items-center justify-between p-4 text-white w-96 rounded-lg">
      {/* Left Section - Profile Info */}
      <div className="relative flex items-center space-x-2">
        {/* Profile Image (Placeholder) */}
        <div
          className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
        >
          <User className="w-5 h-5 text-gray-700" />
        </div>

        {/* Username with dropdown */}
        <div
          className="flex items-center space-x-1 cursor-pointer bg-white px-3 py-1 rounded-md text-gray-800"
          onClick={() => setIsNameDropdownOpen(!isNameDropdownOpen)}
        >
          <span className="font-medium">{loggedInUser}</span>
          <ChevronDown className="w-4 h-4" />
        </div>

        {/* Dropdown for Name */}
        {isNameDropdownOpen && (
          <div className="absolute left-0 top-10 bg-white text-gray-800 shadow-md rounded-md w-full">
            <Link to="/setting">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
            ⚙️ Organisational Settings
            </button>
            </Link>
            <button className="block w-full border-2 bg-lime-50 text-left px-4 py-2 hover:bg-gray-200">
              {loggedInUser}
            </button>
          </div>
        )}
      </div>

      {/* Right Section - Initial Badge */}
      <div
        className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center cursor-pointer"
        onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
      >
        {initial}
      </div>

      {/* Dropdown for Avatar */}
      {isAvatarDropdownOpen && (
        <div className="absolute right-4  md:right-16 lg:right-56  top-36 bg-white text-gray-800 shadow-md rounded-md w-40">
          <button 
          onClick={handleResetPassword}
          className="block border-b-2 w-full text-left px-4 py-2 hover:bg-gray-200">
          🔒  Reset Password
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
          🪪 Profile Info
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
          ↪️ Logout
          </button>
        </div>
      )}
    </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-purple-600 text-white rounded-lg p-6 mb-8 shadow-lg">
        <h2 className="text-lg font-bold">Welcome to Kerplunk!</h2>
        <p className="text-sm opacity-80 mb-4">👓 Get Started →</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "New interviews", count: 0, subText: "Across 0 opening(s)" },
          { title: "Job Applications", count: 0, subText: "0 daily change" },
          { title: "Resumes", count: 0, subText: "0 Candidates" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 text-center"
          >
            <h3 className="text-gray-700 font-bold">{item.title}</h3>
            <p className="text-2xl font-bold text-blue-700">{item.count}</p>
            <p className="text-gray-500 text-sm">{item.subText}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Recent Interviews", icon: "⏰" },
            { label: "All Jobs", icon: "📋" },
            { label: "Post a Job", icon: "✏️",path: "/Jobpost" },
            { label: "Candidate Search", icon: "🕵️‍♂️" },
            { label: "Settings", icon: "⚙️" },
          ].map((link, index) => (

           <Link
            key={index}
            to={link.path}
            className="bg-gray-100 flex flex-col items-center justify-center rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="text-2xl mb-2">{link.icon}</div>
            <p className="text-gray-700 text-sm">{link.label}</p>
          </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-6 rounded-lg flex justify-between items-center">
        <div>
          <h4 className="text-gray-800 font-bold text-lg">
            Just getting started?
          </h4>
          <p className="text-gray-500 text-sm">
            Check out our full library of tips and tricks on how to make the
            most out of Kerplunk.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-blue-700 border border-blue-700 px-4 py-2 rounded-lg">
            Not Now
          </button>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">
            Learn More
          </button>
        </div>
      </div>
    </div>
      
    </div>
  );
};

export default Dashboard;
