// import React from "react";

const Home = () => {
  return (
    <div className="text-center py-20 px-6">
      <h1 className="text-5xl font-bold mb-4">
        {/* Simplify Your Hiring with */}
         <span className="text-purple-600">
          {/* AI Video Interviews */}
          </span>
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {/* Interview, vet, and hire thousands of job applicants through our AI-powered video interviewer in under 3 minutes & 95 languages. */}
      </p>
      <div className="flex justify-center space-x-4">
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600">
          Schedule Demo
        </button>
        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200">
          {/* 14 Days Free Trial */}
        </button>
      </div>
    </div>
  );
};

export default Home;
