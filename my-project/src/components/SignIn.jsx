import React from "react";

const SignIn = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Side: Sign-In Form */}
      <div className="flex flex-col justify-center bg-gray-100 w-full lg:w-1/2 p-8 lg:p-16">
        {/* Logo */}
        <div className="flex items-center mb-6">
          {/* <img
            src="/logo.png" // Replace with your logo path
            alt="Kerplunk Logo"
            className="h-10 mr-2"
          /> */}

          <h1 className="text-2xl font-bold text-gray-800">kerclunk.</h1>
        </div>

        {/* Sign In Heading */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sign In</h2>

        {/* Google Sign In Button */}
        <button className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mb-6 shadow-md transition">
          <img
            src="https://coywolf.pro/wp-content/uploads/2021/05/google-emoji.png"
            alt="Google"
            className="h-5 w-5 mr-2"
          />
          Continue with Google
        </button>

        {/* Separator */}
        <div className="flex items-center mb-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Email Input */}
        <label className="block mb-2 text-sm text-gray-600">Email*</label>
        <input
          type="email"
          placeholder="jdoe@health.com"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
        />

        {/* Password Input */}
        <label className="block mb-2 text-sm text-gray-600">Password*</label>
        <input
          type="password"
          placeholder="********"
          className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring focus:ring-blue-200"
        />

        {/* Forgot Password */}
        <a
          href="#"
          className="text-sm text-blue-600 hover:underline mb-6 block text-right"
        >
          Forgot Password?
        </a>

        {/* Sign In Button */}
        <button className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition mb-4">
          Sign In
        </button>

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
