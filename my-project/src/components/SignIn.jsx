// import React from "react";

// const SignIn = () => {
//   const [loginInfo, setloginInfo] = useState({
//       email: '',
//       password:'',
//     });
//   return (
//     <div className="flex flex-col lg:flex-row h-screen">
//       {/* Left Side: Sign-In Form */}
//       <div className="flex flex-col justify-center bg-gray-100 w-full lg:w-1/2 p-8 lg:p-16">
//         {/* Logo */}
//         <div className="flex items-center mb-6">
//           {/* <img
//             src="/logo.png" // Replace with your logo path
//             alt="Kerplunk Logo"
//             className="h-10 mr-2"
//           /> */}

//           <h1 className="text-2xl font-bold text-gray-800">kerclunk.</h1>
//         </div>

//         {/* Sign In Heading */}
//         <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sign In</h2>

//         {/* Google Sign In Button */}
//         <button className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mb-6 shadow-md transition">
//           <img
//             src="https://coywolf.pro/wp-content/uploads/2021/05/google-emoji.png"
//             alt="Google"
//             className="h-5 w-5 mr-2"
//           />
//           Continue with Google
//         </button>

//         {/* Separator */}
//         <div className="flex items-center mb-6">
//           <div className="flex-grow h-px bg-gray-300"></div>
//           <span className="px-4 text-sm text-gray-500">or</span>
//           <div className="flex-grow h-px bg-gray-300"></div>
//         </div>

//         {/* Email Input */}
//         <label className="block mb-2 text-sm text-gray-600">Email*</label>
//         <input
//           type="email"
//           placeholder="jdoe@health.com"
//           className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
//         />

//         {/* Password Input */}
//         <label className="block mb-2 text-sm text-gray-600">Password*</label>
//         <input
//           type="password"
//           placeholder="********"
//           className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring focus:ring-blue-200"
//         />

//         {/* Forgot Password */}
//         <a
//           href="#"
//           className="text-sm text-blue-600 hover:underline mb-6 block text-right"
//         >
//           Forgot Password?
//         </a>

//         {/* Sign In Button */}
//         <button className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition mb-4">
//           Sign In
//         </button>

//         {/* Sign Up Link */}
//         <p className="text-center text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <a href="/OrganisationSignup" className="text-blue-600 hover:underline">
//             Sign Up
//           </a>
//         </p>
//       </div>

//       {/* Right Side: Info Section */}
//       <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-900 to-gray-900 text-white w-full lg:w-1/2 p-16">
//         <h2 className="text-4xl font-bold mb-4">
//           Build your career on Kerplunk.
//         </h2>
//         <p className="text-lg mb-8">
//           Unlock the future of staffing, where organizations across all sectors
//           leverage AI to source, recruit, and retain the world's top talent.
//           Join us today to connect with leading companies and accelerate your
//           career on Kerclunk.
//         </p>
//         <div className="flex items-center space-x-4">
//           <div className="flex -space-x-2">
//             <img
//               src="https://randomuser.me/api/portraits/men/32.jpg"
//               alt="User"
//               className="w-10 h-10 rounded-full border-2 border-white"
//             />
//             <img
//               src="https://randomuser.me/api/portraits/women/44.jpg"
//               alt="User"
//               className="w-10 h-10 rounded-full border-2 border-white"
//             />
//             <img
//               src="https://randomuser.me/api/portraits/men/45.jpg"
//               alt="User"
//               className="w-10 h-10 rounded-full border-2 border-white"
//             />
//             <img
//               src="https://randomuser.me/api/portraits/women/46.jpg"
//               alt="User"
//               className="w-10 h-10 rounded-full border-2 border-white"
//             />
//           </div>
//           <p className="text-sm">
//             Over <span className="font-semibold">7k+ strong</span> and growing!
//             Your journey begins here.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSucess } from "../utils";

const SignIn = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

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
        // navigate("/dashboard"); // Replace with your target route
           
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

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Side: Sign-In Form */}
      <div className="flex flex-col justify-center bg-gray-100 w-full lg:w-1/2 p-8 lg:p-16">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">kerclunk.</h1>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sign In</h2>

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

