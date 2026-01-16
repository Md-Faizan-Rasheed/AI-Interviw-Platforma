
// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { handleError, handleSucess } from "../utils";
// import { AuthContext } from "./Context/AuthContext"; // Corrected usage
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const SignIn = () => {
//   const { isLoggedIn, login, logout} = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [loginInfo, setLoginInfo] = useState({
//     email: "",
//     password: "",
//   });

//   const [pwShown, setPwShown] = useState(false);

//   const togglePasswordVisibility = () => {
//     setPwShown(!pwShown);
//   };


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const [toastType, setToastType] = useState(""); // success or error

//   const showToastMessage = (message, type) => {
//     setToastMessage(message);
//     setToastType(type);
//     setShowToast(true);
//     setTimeout(() => {
//       setShowToast(false);
//     }, 3000);
//   };

//   const Toast = () => {
//     const bgColor = toastType === "success" ? "bg-green-500" : "bg-red-500";
//     return showToast ? (
//       <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-md shadow-lg transition-all duration-300 transform ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
//         {toastMessage}
//       </div>
//     ) : null;
//   };

//   const handleSubmit = async (e) => {
//     console.log("Youe are in sign page");
//     e.preventDefault();

//     const { email, password } = loginInfo;

//     if (!email || !password) {
//       alert("Both email and password are required!");
//       return;
//     }
//     console.log("Youe are in sign page!!");

//     try {
//       const response = await fetch("http://localhost:8080/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const result = await response.json();
//       console.log("Reuslt",result)

//       const { sucess, message, jwtToken, name, error } = result;
//       console.log("sucess",sucess)
//       if (sucess) {
//         console.log("Reuslt2")
//         handleSucess(message);
//         localStorage.setItem("token", jwtToken);
//         toast.success(message);
//         localStorage.setItem("loggedInUser", name);
//         login();  
//         console.log("Reuslt3")


//         navigate("/dashboard");
//       } else {
//         toast.error(error?.details?.[0]?.message || message);
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

// return (
//   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a8edea] to-[#fed6e3] font-abel">
//     <ToastContainer />
//     <div className="w-[450px] min-h-[500px] bg-gradient-to-r from-[#E3FDF5] to-[#FFE6FA] rounded-lg shadow-2xl p-8">
//       <div className="text-center mb-8">
//         <h2 className="text-4xl font-playfair text-[#3e403f]">Sign In</h2>
//         <p className="text-sm tracking-widest mt-2">
//           Sigin here using your Email and password
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Username Input */}
//         <div className="flex items-center bg-white rounded-lg">
//           <span className="p-3 text-gray-500">
//             <i className="fas fa-user-circle"></i>
//           </span>
//           <input
//            type="email"
//            id="email"
//            name="email"
//            placeholder="jdoe@health.com"
//            value={loginInfo.email}
//            onChange={handleChange}
//             className="w-full p-3 outline-none rounded-r-lg"
//             // value={username}
//             // onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>

//         {/* Password Input */}
//         <div className="flex items-center bg-white rounded-lg">
//           <span className="p-3 text-gray-500">
//             <i className="fas fa-key"></i>
//           </span>
//           <input
//             type={pwShown ? "text" : "password"}
//             // type="password"
//              name="password"
//              id="password"
//             placeholder="****"
//             value={loginInfo.password}
//               onChange={handleChange}
//             className="w-full p-3 outline-none rounded-r-lg"
//             // value={password}
//             // onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <span
//             className="p-3 text-gray-500 cursor-pointer"
//             onClick={togglePasswordVisibility}
//           >
//             <i className={`fas ${pwShown ? "fa-eye-slash" : "fa-eye"}`}></i>
//           </span>
//         </div>

//         {/* Login Button */}
//         <button
//           type="submit"
//           className="w-full bg-white font-bold text-[#252537] py-3 rounded-lg hover:translate-y-1 transition-transform"
//         >
//           Sign In
//         </button>
//       </form>

//       {/* Forgot Password and Sign Up Buttons */}
//       <div className="flex justify-between mt-6">
//         <button className="text-sm bg-transparent text-[#252537] hover:underline">
//           Forgot Password
//         </button>
//         <button className="text-sm bg-[#B8F2E6] text-[#252537] px-4 py-2 rounded-lg hover:translate-y-1 transition-transform">
//         <a href="/OrganisationSignup" className="text-blue-600 hover:underline">
//              Sign Up
//         </a>      
//           <i className="fas fa-user-plus ml-1"></i>
//         </button>
//       </div>
//     </div>
//   </div>
// );
// };

// export default SignIn;



import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext"; // Corrected usage



const SignIn = () => {
    const { isLoggedIn, login, logout} = useContext(AuthContext);
      const navigate = useNavigate();


  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [pwShown, setPwShown] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const togglePasswordVisibility = () => {
    setPwShown(!pwShown);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign in page");

    const { email, password } = loginInfo;

    if (!email || !password) {
      showToast("Both email and password are required!", "error");
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
      console.log("Result", result);

      const { sucess, message, jwtToken, name, error } = result;
      
      if (sucess) {
          console.log("Reuslt2")
//         handleSucess(message);
//         localStorage.setItem("token", jwtToken);
//         toast.success(message);
//         localStorage.setItem("loggedInUser", name);
//         login();  
//         console.log("Reuslt3")

        showToast(message, "success");
         localStorage.setItem("token", jwtToken);
         localStorage.setItem("loggedInUser", name);
         login();
         navigate("/dashboard");
        console.log("Login successful!");
      } else {
        showToast(error?.details?.[0]?.message || message, "error");
      }
    } catch (error) {
      console.error("Error during login:", error);
      showToast("An error occurred. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8s">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg transform transition-all duration-300 ${
          toast.type === "success" 
            ? "bg-green-500 text-white" 
            : "bg-red-500 text-white"
        } ${toast.show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
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
      
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg 
                    className="h-5 w-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="jdoe@health.com"
                  value={loginInfo.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg 
                    className="h-5 w-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" 
                    />
                  </svg>
                </div>
                <input
                  type={pwShown ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={loginInfo.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg 
                    className="h-5 w-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {pwShown ? (
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
                      />
                    ) : (
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-lime-600 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-400 to-lime-400 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:from-green-500 hover:to-lime-500 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Sign In
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() =>navigate("/OrganisationSignup")}
                className="font-semibold text-lime-600 hover:text-lime-700 transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-6 text-center text-xs text-gray-500 px-4">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SignIn;