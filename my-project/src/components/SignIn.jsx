
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSucess } from "../utils";
import { AuthContext } from "./Context/AuthContext"; // Corrected usage
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignIn = () => {
  const { isLoggedIn, login, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [pwShown, setPwShown] = useState(false);

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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // success or error

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const Toast = () => {
    const bgColor = toastType === "success" ? "bg-green-500" : "bg-red-500";
    return showToast ? (
      <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-md shadow-lg transition-all duration-300 transform ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        {toastMessage}
      </div>
    ) : null;
  };

  const handleSubmit = async (e) => {
    console.log("Youe are in sign page");
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      alert("Both email and password are required!");
      return;
    }
    console.log("Youe are in sign page!!");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("Reuslt",result)

      const { sucess, message, jwtToken, name, error } = result;
      console.log("sucess",sucess)
      if (sucess) {
        console.log("Reuslt2")
        handleSucess(message);
        localStorage.setItem("token", jwtToken);
        toast.success(message);
        localStorage.setItem("loggedInUser", name);
        login();  
        console.log("Reuslt3")


        navigate("/dashboard");
      } else {
        toast.error(error?.details?.[0]?.message || message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("loggedInUser");
  //   logout();
  //   navigate("/SignIn");
  // };

//   return (
//     <div className="flex flex-col lg:flex-row h-screen">
//  <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} /> 

//       <div className="flex flex-col justify-center bg-gray-100 w-full lg:w-1/2 p-8 lg:p-16">
//         <h1 className="text-2xl font-bold text-gray-800">kerplunk.</h1>

//        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
//           {isLoggedIn ? "Welcome Back!" : "Sign In"}
//         </h2>

//         {!isLoggedIn ? (
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
//               Email*
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="jdoe@health.com"
//               value={loginInfo.email}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-3 mb-4"
//               required
//             />

//             <label htmlFor="password" className="block mb-2 text-sm text-gray-600">
//               Password*
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="****"
//               value={loginInfo.password}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-3 mb-2"
//               required
//             />

//             <a href="#" className="text-sm text-blue-600 hover:underline mb-6 block text-right">
//               Forgot Password?
//             </a>

//             <button type="submit" className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg">
//               Sign In
//             </button>
//           </form>
//         ) : (
//           <button onClick={handleLogout} className="w-full bg-red-600 text-white py-3 px-4 rounded-lg">
//             Logout
//           </button>
//         )}

//         <p className="text-center text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <a href="/OrganisationSignup" className="text-blue-600 hover:underline">
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );





return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a8edea] to-[#fed6e3] font-abel">
    <ToastContainer />
    <div className="w-[450px] min-h-[500px] bg-gradient-to-r from-[#E3FDF5] to-[#FFE6FA] rounded-lg shadow-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-playfair text-[#3e403f]">Sign In</h2>
        <p className="text-sm tracking-widest mt-2">
          Sigin here using your Email and password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Input */}
        <div className="flex items-center bg-white rounded-lg">
          <span className="p-3 text-gray-500">
            <i className="fas fa-user-circle"></i>
          </span>
          <input
           type="email"
           id="email"
           name="email"
           placeholder="jdoe@health.com"
           value={loginInfo.email}
           onChange={handleChange}
            className="w-full p-3 outline-none rounded-r-lg"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
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
            // type="password"
             name="password"
             id="password"
            placeholder="****"
            value={loginInfo.password}
              onChange={handleChange}
            className="w-full p-3 outline-none rounded-r-lg"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
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
        <button
          type="submit"
          className="w-full bg-white font-bold text-[#252537] py-3 rounded-lg hover:translate-y-1 transition-transform"
        >
          Sign In
        </button>
      </form>

      {/* Forgot Password and Sign Up Buttons */}
      <div className="flex justify-between mt-6">
        <button className="text-sm bg-transparent text-[#252537] hover:underline">
          Forgot Password
        </button>
        <button className="text-sm bg-[#B8F2E6] text-[#252537] px-4 py-2 rounded-lg hover:translate-y-1 transition-transform">
        <a href="/OrganisationSignup" className="text-blue-600 hover:underline">
             Sign Up
        </a>      
          <i className="fas fa-user-plus ml-1"></i>
        </button>
      </div>
    </div>
  </div>
);
};

export default SignIn;

