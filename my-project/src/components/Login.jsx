import React, { useState } from "react";

const LoginForm = () => {
  const [pwShown, setPwShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPwShown(!pwShown);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a8edea] to-[#fed6e3] font-abel">
      <div className="w-[450px] min-h-[500px] bg-gradient-to-r from-[#E3FDF5] to-[#FFE6FA] rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-playfair text-[#3e403f]">Log In</h2>
          <p className="text-sm tracking-widest mt-2">
            Login here using your username and password
          </p>
        </div>

        <div className="space-y-6">
          {/* Username Input */}
          <div className="flex items-center bg-white rounded-lg">
            <span className="p-3 text-gray-500">
              <i className="fas fa-user-circle"></i>
            </span>
            <input
              type="text"
              placeholder="@UserName"
              className="w-full p-3 outline-none rounded-r-lg"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center bg-white rounded-lg">
            <span className="p-3 text-gray-500">
              <i className="fas fa-key"></i>
            </span>
            <input
              type={pwShown ? "text" : "password"}
              placeholder="Password"
              id="pwd"
              className="w-full p-3 outline-none rounded-r-lg"
              required
            />
            <span
              className="p-3 text-gray-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <i className={`fas ${pwShown ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </div>

          {/* Login Button */}
          <button className="w-full bg-white text-[#252537] py-3 rounded-lg hover:translate-y-1 transition-transform">
            Log In
          </button>
        </div>

        {/* Forgot Password and Sign Up Buttons */}
        <div className="flex justify-between mt-6">
          <button className="text-sm bg-transparent text-[#252537] hover:underline">
            Forgot Password
          </button>
          <button className="text-sm bg-[#B8F2E6] text-[#252537] px-4 py-2 rounded-lg hover:translate-y-1 transition-transform">
            Sign Up <i className="fas fa-user-plus ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;