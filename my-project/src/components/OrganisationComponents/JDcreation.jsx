import { useState } from "react";
import {Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Onavbar from "./Onavbar";
// import { AuthContext } from '../../Context/AuthContext.jsx';
// import { useContext } from 'react';

const Dashboard = () => {
  // const { isLoggedIn } = useContext(AuthContext);
  // if (!isLoggedIn) {
  //   return <Navigate to="/SignIn" replace />;
  // }

  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
     <Onavbar/>
      {/* Main Content */}
      <div className="bg-blue-50 min-h-screen p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Home</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Custom Date</span>
            <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md">
              Dec 06, 2024 - Jan 06, 2025
            </button>
          </div>
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
            M
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
