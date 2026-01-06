import { useState } from "react";
import { handleError, handleSucess } from "../utils";
import {Navigate, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const OrganisationSignup = () => {
  const [signupInfo, setSignupInfo] = useState({
    company_name: '',
    years_old: '',
    field_of_work: '',
    email: '',
    password:'',
    emp_size:'',
  });
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async(e) => {
    e.preventDefault();
    const { company_name, email, field_of_work, years_old, password, emp_size } = signupInfo;

    if (!company_name || !email || !field_of_work || !years_old || !emp_size || !password) {
      return handleError("All fields are required. Please fill out every field.");
    }

    const formattedSignupInfo = {
      ...signupInfo,
      years_old: parseInt(years_old, 10),
      emp_size: parseInt(emp_size, 10),
    };
    console.log("Signup Info Submitted:", formattedSignupInfo);
    // Add logic here to send signupInfo to the backend

    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedSignupInfo),
      });
      const result = await response.json();
      console.log(result);
      const {sucess,message,error} = result;

      if(sucess){
        // handleSucess(message);
        setTimeout(() =>{
          navigate("/signin");
        },1000)
      }else if(error){
        const details = error?.details[0].message
      handleError(details);
      }else if(!sucess){
         handleError(message);
      }
    }catch (error) {
       handleError(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row flex-grow">
      {/* Left Side: Sign-Up Form */}
      <ToastContainer/>
      <div className="flex flex-col justify-center bg-gray-100 w-full lg:w-1/2 p-8 lg:p-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sign Up</h2>
        <p className="text-gray-600 mb-8">
          Join Kerplunk today to unlock new opportunities for your company!
        </p>

        <form onSubmit={handleSignup}>
          {/* Input Fields */}
          <label className="block mb-2 text-sm font-medium text-black">
            Company Name*
          </label>
          <input
            onChange={handleChange}
            name="company_name"
            type="text"
            placeholder="e.g., Tech Solutions Inc."
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
            value={signupInfo.company_name}
          />

          <label className="block mb-2 text-sm font-medium text-black">
            How Old is the Company?*
          </label>
          <input
            onChange={handleChange}
            type="number"
            name="years_old"
            placeholder="e.g., 5 years"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
            value={signupInfo.years_old}
          />

          <label className="block mb-2 text-sm font-medium text-black">
            Field of Work*
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="field_of_work"
            placeholder="e.g., AI and Software Development"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
            value={signupInfo.field_of_work}
          />

          <label className="block mb-2 text-sm font-medium text-black">
            Email*
          </label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="e.g., company@example.com"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
            value={signupInfo.email}
          />

          <label className="block mb-2 text-sm font-medium text-black">
            Password*
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="********"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
            value={signupInfo.password}
          />

          <label className="block mb-2 text-sm font-medium text-black">
            Employee Size*
          </label>
          <input
            onChange={handleChange}
            type="number"
            name="emp_size"
            placeholder="e.g., 50"
            className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring focus:ring-blue-200"
            value={signupInfo.emp_size}
          />

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition mb-4"
          >
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/SignIn" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>

      {/* Right Side: Info Section */}
      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-900 to-gray-900 text-white w-full lg:w-1/2 p-16">
        <h2 className="text-4xl font-bold mb-4">
          Grow Your Business with Kerplunk.
        </h2>
        <p className="text-lg mb-8">
          Collaborate with the best talent in the industry. Leverage AI-powered solutions to streamline your hiring process and drive growth.
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
            Over <span className="font-semibold">7k+ companies</span> trust us for hiring. Join them today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganisationSignup;

