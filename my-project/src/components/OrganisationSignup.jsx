// import { useState } from "react";
// import { handleError, handleSucess } from "../utils";
// import {Navigate, useNavigate } from "react-router-dom";
// import { toast,ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

// const OrganisationSignup = () => {
//   const [signupInfo, setSignupInfo] = useState({
//     company_name: '',
//     years_old: '',
//     field_of_work: '',
//     email: '',
//     password:'',
//     emp_size:'',
//   });
// const navigate = useNavigate();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSignupInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSignup = async(e) => {
//     e.preventDefault();
//     const { company_name, email, field_of_work, years_old, password, emp_size } = signupInfo;

//     if (!company_name || !email || !field_of_work || !years_old || !emp_size || !password) {
//       return handleError("All fields are required. Please fill out every field.");
//     }

//     const formattedSignupInfo = {
//       ...signupInfo,
//       years_old: parseInt(years_old, 10),
//       emp_size: parseInt(emp_size, 10),
//     };
//     console.log("Signup Info Submitted:", formattedSignupInfo);
//     // Add logic here to send signupInfo to the backend

//     try {
//       const url = "http://localhost:8080/auth/signup";
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formattedSignupInfo),
//       });
//       const result = await response.json();
//       console.log(result);
//       const {sucess,message,error} = result;

//       if(sucess){
//         // handleSucess(message);
//         setTimeout(() =>{
//           navigate("/signin");
//         },1000)
//       }else if(error){
//         const details = error?.details[0].message
//       handleError(details);
//       }else if(!sucess){
//          handleError(message);
//       }
//     }catch (error) {
//        handleError(error);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row flex-grow">
//       {/* Left Side: Sign-Up Form */}
//       <ToastContainer/>
//       <div className="flex flex-col justify-center bg-gray-100 w-full lg:w-1/2 p-8 lg:p-16">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sign Up</h2>
//         <p className="text-gray-600 mb-8">
//           Join Kerplunk today to unlock new opportunities for your company!
//         </p>

//         <form onSubmit={handleSignup}>
//           {/* Input Fields */}
//           <label className="block mb-2 text-sm font-medium text-black">
//             Company Name*
//           </label>
//           <input
//             onChange={handleChange}
//             name="company_name"
//             type="text"
//             placeholder="e.g., Tech Solutions Inc."
//             className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
//             value={signupInfo.company_name}
//           />

//           <label className="block mb-2 text-sm font-medium text-black">
//             How Old is the Company?*
//           </label>
//           <input
//             onChange={handleChange}
//             type="number"
//             name="years_old"
//             placeholder="e.g., 5 years"
//             className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
//             value={signupInfo.years_old}
//           />

//           <label className="block mb-2 text-sm font-medium text-black">
//             Field of Work*
//           </label>
//           <input
//             onChange={handleChange}
//             type="text"
//             name="field_of_work"
//             placeholder="e.g., AI and Software Development"
//             className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
//             value={signupInfo.field_of_work}
//           />

//           <label className="block mb-2 text-sm font-medium text-black">
//             Email*
//           </label>
//           <input
//             onChange={handleChange}
//             type="email"
//             name="email"
//             placeholder="e.g., company@example.com"
//             className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
//             value={signupInfo.email}
//           />

//           <label className="block mb-2 text-sm font-medium text-black">
//             Password*
//           </label>
//           <input
//             onChange={handleChange}
//             type="password"
//             name="password"
//             placeholder="********"
//             className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
//             value={signupInfo.password}
//           />

//           <label className="block mb-2 text-sm font-medium text-black">
//             Employee Size*
//           </label>
//           <input
//             onChange={handleChange}
//             type="number"
//             name="emp_size"
//             placeholder="e.g., 50"
//             className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring focus:ring-blue-200"
//             value={signupInfo.emp_size}
//           />

//           {/* Sign Up Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition mb-4"
//           >
//             Sign Up
//           </button>
//         </form>

//         {/* Sign In Link */}
//         <p className="text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <a href="/SignIn" className="text-blue-600 hover:underline">
//             Sign In
//           </a>
//         </p>
//       </div>

//       {/* Right Side: Info Section */}
//       <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-900 to-gray-900 text-white w-full lg:w-1/2 p-16">
//         <h2 className="text-4xl font-bold mb-4">
//           Grow Your Business with Kerplunk.
//         </h2>
//         <p className="text-lg mb-8">
//           Collaborate with the best talent in the industry. Leverage AI-powered solutions to streamline your hiring process and drive growth.
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
//             Over <span className="font-semibold">7k+ companies</span> trust us for hiring. Join them today!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganisationSignup;



import { useState } from "react";
import { handleError, handleSucess } from "../utils";
import {Navigate, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const OrganisationSignup = () => {
  const [showRoleModal, setShowRoleModal] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const [orgSignupInfo, setOrgSignupInfo] = useState({
    company_name: '',
    years_old: '',
    field_of_work: '',
    email: '',
    password: '',
    emp_size: '',
  });

  const [studentSignupInfo, setStudentSignupInfo] = useState({
    studentName: '',
    email: '',
    phoneNumber: '',
    adharNumber: '',
    password: '',
    resumeUrl: '',
  });
  const navigate = useNavigate();


  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setShowRoleModal(false);
  };

  const handleOrgChange = (e) => {
    const { name, value } = e.target;
    setOrgSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrgSignup = async (e) => {
    e.preventDefault();
    const { company_name, email, field_of_work, years_old, password, emp_size } = orgSignupInfo;

    if (!company_name || !email || !field_of_work || !years_old || !emp_size || !password) {
      showToast("All fields are required. Please fill out every field.", "error");
      return;
    }

    const formattedSignupInfo = {
      ...orgSignupInfo,
      years_old: parseInt(years_old, 10),
      emp_size: parseInt(emp_size, 10),
    };

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
      const { sucess, message, error } = result;

      if (sucess) {
        showToast(message || "Signup successful!", "success");
        setTimeout(() => {
          navigate("/signin");
          console.log("Navigate to signin");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        showToast(details, "error");
      } else if (!sucess) {
        showToast(message, "error");
      }
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
    }
  };

  const handleStudentSignup = async (e) => {
    e.preventDefault();
    const { studentName, email, phoneNumber, adharNumber, password } = studentSignupInfo;

    if (!studentName || !email || !phoneNumber || !adharNumber || !password) {
      showToast("All required fields must be filled.", "error");
      return;
    }

    const formattedSignupInfo = {
      ...studentSignupInfo,
      phoneNumber: parseInt(phoneNumber, 10),
      adharNumber: parseInt(adharNumber, 10),
    };

    try {
      const url = "http://localhost:8080/auth/student-signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedSignupInfo),
      });
      const result = await response.json();
      const { sucess, message, error } = result;

      if (sucess) {
        showToast(message || "Signup successful!", "success");
        setTimeout(() => {
          console.log("Navigate to signin");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        showToast(details, "error");
      } else if (!sucess) {
        showToast(message, "error");
      }
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-12">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg transform transition-all duration-300 ${
          toast.type === "success" 
            ? "bg-green-500 text-white" 
            : "bg-red-500 text-white"
        }`}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              {toast.type === "success" ? (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              )}
            </svg>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 sm:p-8 md:p-12 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
                Join Kerplunk
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Choose how you'd like to sign up
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Organization Card */}
              <button
                onClick={() => handleRoleSelection('organization')}
                className="group relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-lime-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-green-400 to-lime-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-lime-400 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Organization
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Looking to hire top talent for your company
                  </p>
                </div>
              </button>

              {/* Student Card */}
              <button
                onClick={() => handleRoleSelection('student')}
                className="group relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-lime-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-green-400 to-lime-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-lime-400 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Student
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Searching for opportunities and growth
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Organization Signup Form */}
      {selectedRole === 'organization' && (
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
            <div className="mb-8">
              <button
                onClick={() => setShowRoleModal(true)}
                className="text-gray-600 hover:text-lime-600 flex items-center gap-2 mb-4 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to role selection
              </button>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                Organization Sign Up
              </h2>
              <p className="text-gray-600">
                Join Kerplunk to unlock new opportunities for your company
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name*
                </label>
                <input
                  onChange={handleOrgChange}
                  name="company_name"
                  type="text"
                  placeholder="e.g., Tech Solutions Inc."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  value={orgSignupInfo.company_name}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Age (Years)*
                  </label>
                  <input
                    onChange={handleOrgChange}
                    type="number"
                    name="years_old"
                    placeholder="e.g., 5"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                    value={orgSignupInfo.years_old}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee Size*
                  </label>
                  <input
                    onChange={handleOrgChange}
                    type="number"
                    name="emp_size"
                    placeholder="e.g., 50"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                    value={orgSignupInfo.emp_size}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Work*
                </label>
                <input
                  onChange={handleOrgChange}
                  type="text"
                  name="field_of_work"
                  placeholder="e.g., AI and Software Development"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  value={orgSignupInfo.field_of_work}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email*
                </label>
                <input
                  onChange={handleOrgChange}
                  type="email"
                  name="email"
                  placeholder="company@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  value={orgSignupInfo.email}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password*
                </label>
                <input
                  onChange={handleOrgChange}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  value={orgSignupInfo.password}
                />
              </div>

              <button
                onClick={handleOrgSignup}
                className="w-full bg-gradient-to-r from-green-400 to-lime-400 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:from-green-500 hover:to-lime-500 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Create Organization Account
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="font-semibold text-lime-600 hover:text-lime-700 transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Student Signup Form */}
      {selectedRole === 'student' && (
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
            <div className="mb-8">
              <button
                onClick={() => setShowRoleModal(true)}
                className="text-gray-600 hover:text-lime-600 flex items-center gap-2 mb-4 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to role selection
              </button>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                Student Sign Up
              </h2>
              <p className="text-gray-600">
                Create your profile and explore opportunities
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name*
                </label>
                <input
                  onChange={handleStudentChange}
                  name="studentName"
                  type="text"
                  placeholder="e.g., John Doe"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  value={studentSignupInfo.studentName}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email*
                </label>
                <input
                  onChange={handleStudentChange}
                  type="email"
                  name="email"
                  placeholder="student@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  value={studentSignupInfo.email}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number*
                  </label>
                  <input
                    onChange={handleStudentChange}
                    type="tel"
                    name="phoneNumber"
                    placeholder="e.g., 9876543210"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                    value={studentSignupInfo.phoneNumber}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhar Number*
                  </label>
                  <input
                    onChange={handleStudentChange}
                    type="text"
                    name="adharNumber"
                    placeholder="e.g., 123456789012"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                    value={studentSignupInfo.adharNumber}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password*
                </label>
                <input
                  onChange={handleStudentChange}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  value={studentSignupInfo.password}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume URL (Optional)
                </label>
                <input
                  onChange={handleStudentChange}
                  type="url"
                  name="resumeUrl"
                  placeholder="https://example.com/resume.pdf"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  value={studentSignupInfo.resumeUrl}
                />
              </div>

              <button
                onClick={handleStudentSignup}
                className="w-full bg-gradient-to-r from-green-400 to-lime-400 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:from-green-500 hover:to-lime-500 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Create Student Account
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="font-semibold text-lime-600 hover:text-lime-700 transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganisationSignup;