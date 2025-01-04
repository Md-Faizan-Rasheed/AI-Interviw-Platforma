// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Popuppreplace = () => {
//   const navigate = useNavigate();

//   const handleClose = () => {
//     navigate('/home'); // Replace '/home' with your home route
//   };

//   const handleSignIn = () => {
//     navigate('/signin'); // Replace '/signin' with your sign-in route
//   };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-gray-900 px-4">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          className="absolute top-4 right-4 text-gray-600 text-xl hover:text-gray-900"
        >
             <Link to="/">
             &times;
          </Link>
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          How are you logging in today?
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Select your login path, are you accessing as an Organization or joining as Talent to explore Kerplunk?
        </p>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
             <Link to="/SignIn">
             Organization
          </Link>
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
           <Link to="/SignIn">
             Talent
          </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popuppreplace;
