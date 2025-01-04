import React from "react";

const OrganisationSignup = () => {
  return (
    <div className="flex flex-col lg:flex-row flex-grow">
    {/* Left Side: Sign-Up Form */}
    <div className="flex flex-col justify-center bg-gray-100 w-full lg:w-1/2 p-8 lg:p-16">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sign Up</h2>
      <p className="text-gray-600 mb-8">
        Join Kerplunk today to unlock new opportunities for your company!
      </p>

      {/* Input Fields */}
      <label className="block mb-2 text-sm font-medium text-black">
        Company Name*
      </label>
      <input
        type="text"
        placeholder="e.g., Tech Solutions Inc."
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
      />

      <label className="block mb-2 text-sm font-medium text-black">
        How Old is the Company?*
      </label>
      <input
        type="number"
        placeholder="e.g., 5 years"
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
      />

      <label className="block mb-2 text-sm font-medium text-black">
        Field of Work*
      </label>
      <input
        type="text"
        placeholder="e.g., AI and Software Development"
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
      />

      <label className="block mb-2 text-sm font-medium text-black">
        Email*
      </label>
      <input
        type="email"
        placeholder="e.g., company@example.com"
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
      />

      <label className="block mb-2 text-sm font-medium text-black">
        Password*
      </label>
      <input
        type="password"
        placeholder="********"
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
      />

      <label className="block mb-2 text-sm font-medium text-black">
        Employee Size*
      </label>
      <input
        type="number"
        placeholder="e.g., 50"
        className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring focus:ring-blue-200"
      />

      {/* Sign Up Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition mb-4">
        Sign Up
      </button>

      {/* Sign In Link */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-600 hover:underline">
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
        Collaborate with the best talent in the industry. Leverage
        AI-powered solutions to streamline your hiring process and drive
        growth.
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
          Over <span className="font-semibold">7k+ companies</span> trust us
          for hiring. Join them today!
        </p>
      </div>
    </div>
  </div>
  );
};

export default OrganisationSignup;
