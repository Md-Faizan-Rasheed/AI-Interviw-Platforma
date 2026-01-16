// import { useContext, useState, useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { UserContext } from "../App";
// import CustomNavLink from "./CustomNavlink";
// import { AuthContext } from "./Context/AuthContext";
// import { 
//   Menu, 
//   X, 
//   Zap, 
//   LogOut, 
//   UserCircle2,
//   ChevronDown 
// } from "lucide-react";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();
//   const { isLoggedIn, login, logout } = useContext(AuthContext);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loggedInUser");
//     localStorage.removeItem("aiQuestions");
//     localStorage.removeItem("email");
//     localStorage.removeItem("jobPostData");
//     localStorage.removeItem("jobs");
//     logout();
//     navigate("/SignIn");
//   };

//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About" },
//     // { to: "/platform", label: "Platform" },
//     { to: "/PricingPage", label: "Pricing" },
//     { to: "/JDcreation", label: "JD Creation" },
//     { to: "/ContactUsPage", label: "Contact" }
//   ];

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mb-12 ${
//         scrolled
//           ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
//           : "bg-white shadow-md py-4"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <Link 
//             to="/" 
//             className="flex items-center space-x-2 group transition-transform hover:scale-105"
//           >
//             <div className="relative">
//               <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
//                 <Zap className="w-6 h-6 text-white" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full animate-ping opacity-75"></div>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-2xl font-bold bg-gradient-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
//                 Kerplunk
//               </span>
//               <span className="text-xs text-gray-500 -mt-1 hidden sm:block">
//                 AI Interview Platform
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation Links */}
//           <ul className="hidden lg:flex items-center space-x-6">
//             {navLinks.map((link) => (
//               <li key={link.to}>
//                 <CustomNavLink
//                   to={link.to}
//                   className={({ isActive }) =>
//                     `px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative group ${
//                       isActive
//                         ? "text-green-600"
//                         : "text-gray-700 hover:text-green-600"
//                     }`
//                   }
//                 >
//                   {link.label}
//                   <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-lime-400 to-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
//                 </CustomNavLink>
//               </li>
//             ))}
//           </ul>

//           {/* Desktop Auth Buttons */}
//           <div className="hidden lg:flex items-center space-x-3">
//             {isLoggedIn ? (
//               <div className="flex items-center gap-3">
//                 <Link
//                   to="/dashboard"
//                   className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 font-medium rounded-lg hover:bg-green-50 transition-all duration-200"
//                 >
//                   <UserCircle2 className="w-5 h-5" />
//                   <span>Dashboard</span>
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-200"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <Link
//                   to="/signin"
//                   className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   to="/organisationsignup"
//                   className="px-6 py-2.5 bg-gradient-to-r from-lime-400 to-green-500 text-white font-semibold rounded-lg hover:from-lime-500 hover:to-green-600 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
//           >
//             {menuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//           menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="px-4 pt-4 pb-6 bg-white border-t border-gray-100 shadow-lg">
//           {/* Mobile Navigation Links */}
//           <ul className="space-y-2 mb-4">
//             {navLinks.map((link) => (
//               <li key={link.to}>
//                 <CustomNavLink
//                   to={link.to}
//                   onClick={() => setMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
//                       isActive
//                         ? "bg-gradient-to-r from-lime-50 to-green-50 text-green-600 border-l-4 border-green-500"
//                         : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
//                     }`
//                   }
//                 >
//                   {link.label}
//                 </CustomNavLink>
//               </li>
//             ))}
//           </ul>

//           {/* Mobile Auth Buttons */}
//           <div className="space-y-3 pt-4 border-t border-gray-100">
//             {isLoggedIn ? (
//               <>
//                 <Link
//                   to="/dashboard"
//                   onClick={() => setMenuOpen(false)}
//                   className="flex items-center justify-center gap-2 w-full px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-all duration-200"
//                 >
//                   <UserCircle2 className="w-5 h-5" />
//                   <span>Dashboard</span>
//                 </Link>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMenuOpen(false);
//                   }}
//                   className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 shadow-lg transition-all duration-200"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   <span>Logout</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/signin"
//                   onClick={() => setMenuOpen(false)}
//                   className="block w-full px-4 py-3 text-center text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-all duration-200"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   to="/signup"
//                   onClick={() => setMenuOpen(false)}
//                   className="block w-full px-4 py-3 text-center bg-gradient-to-r from-lime-400 to-green-500 text-white font-semibold rounded-lg hover:from-lime-500 hover:to-green-600 shadow-lg transition-all duration-200"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Footer */}
//           <div className="mt-4 pt-4 border-t border-gray-100 text-center">
//             <p className="text-xs text-gray-500">
//               © 2024 Kerplunk. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Overlay for mobile menu */}
//       {menuOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// import { useContext, useState, useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { UserContext } from "../App";
// import CustomNavLink from "./CustomNavlink";
// import { AuthContext } from "./Context/AuthContext";
// import { 
//   Menu, 
//   X, 
//   Zap, 
//   LogOut, 
//   UserCircle2,
//   ChevronRight,
//   Sparkles
// } from "lucide-react";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();
//   const { isLoggedIn, login, logout } = useContext(AuthContext);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loggedInUser");
//     localStorage.removeItem("aiQuestions");
//     localStorage.removeItem("email");
//     localStorage.removeItem("jobPostData");
//     localStorage.removeItem("jobs");
//     logout();
//     navigate("/SignIn");
//   };

//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About" },
//     { to: "/PricingPage", label: "Pricing" },
//     { to: "/JDcreation", label: "JD Creation" },
//     { to: "/ContactUsPage", label: "Contact" }
//   ];

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           scrolled
//             ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100"
//             : "bg-white shadow-sm"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16 sm:h-18">
            
//             {/* Logo */}
//             <Link 
//               to="/" 
//               className="flex items-center gap-3 group"
//             >
//               <div className="relative">
//                 <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-lime-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:shadow-xl group-hover:shadow-green-500/30 transition-all duration-300">
//                   <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
//                 </div>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent tracking-tight">
//                   Kerplunk
//                 </span>
//                 <span className="text-[10px] sm:text-xs text-gray-500 -mt-0.5 hidden sm:block font-medium">
//                   AI Interview Platform
//                 </span>
//               </div>
//             </Link>

//             {/* Desktop Navigation Links */}
//             <ul className="hidden lg:flex items-center gap-1">
//               {navLinks.map((link) => (
//                 <li key={link.to}>
//                   <CustomNavLink
//                     to={link.to}
//                     className={({ isActive }) =>
//                       `relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 group ${
//                         isActive
//                           ? "text-green-600"
//                           : "text-gray-700 hover:text-green-600 hover:bg-green-50/50"
//                       }`
//                     }
//                   >
//                     {({ isActive }) => (
//                       <>
//                         {link.label}
//                         <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-green-500 to-lime-500 rounded-full transition-all duration-300 ${
//                           isActive ? "w-6" : "w-0 group-hover:w-6"
//                         }`}></span>
//                       </>
//                     )}
//                   </CustomNavLink>
//                 </li>
//               ))}
//             </ul>

//             {/* Desktop Auth Buttons */}
//             <div className="hidden lg:flex items-center gap-2">
//               {isLoggedIn ? (
//                 <div className="flex items-center gap-2">
//                   <Link
//                     to="/dashboard"
//                     className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 font-semibold text-sm rounded-xl hover:bg-green-50 transition-all duration-200"
//                   >
//                     <UserCircle2 className="w-4 h-4" strokeWidth={2} />
//                     <span>Dashboard</span>
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-200 border border-gray-200 transition-all duration-200"
//                   >
//                     <LogOut className="w-4 h-4" strokeWidth={2} />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <Link
//                     to="/signin"
//                     className="px-4 py-2 text-gray-700 hover:text-green-600 font-semibold text-sm rounded-xl hover:bg-green-50 transition-all duration-200"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/organisationsignup"
//                     className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] transition-all duration-200"
//                   >
//                     <span>Get Started</span>
//                     <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
//                   </Link>
//                 </>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
//               aria-label="Toggle menu"
//             >
//               {menuOpen ? (
//                 <X className="w-6 h-6" strokeWidth={2} />
//               ) : (
//                 <Menu className="w-6 h-6" strokeWidth={2} />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay */}
//       {menuOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       {/* Mobile Menu Drawer */}
//       <div
//         className={`lg:hidden fixed top-16 sm:top-18 left-0 right-0 z-40 transition-all duration-300 ease-out ${
//           menuOpen 
//             ? "translate-y-0 opacity-100" 
//             : "-translate-y-4 opacity-0 pointer-events-none"
//         }`}
//       >
//         <div className="bg-white border-b border-gray-100 shadow-xl mx-4 mt-2 rounded-2xl overflow-hidden">
//           <div className="px-4 py-5">
            
//             {/* Mobile Navigation Links */}
//             <div className="space-y-1 mb-5">
//               <p className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
//                 Navigation
//               </p>
//               {navLinks.map((link) => (
//                 <CustomNavLink
//                   key={link.to}
//                   to={link.to}
//                   onClick={() => setMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
//                       isActive
//                         ? "bg-gradient-to-r from-green-50 to-lime-50 text-green-600 border border-green-100"
//                         : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
//                     }`
//                   }
//                 >
//                   {({ isActive }) => (
//                     <>
//                       <span>{link.label}</span>
//                       {isActive && (
//                         <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
//                       )}
//                     </>
//                   )}
//                 </CustomNavLink>
//               ))}
//             </div>

//             {/* Mobile Auth Buttons */}
//             <div className="space-y-2 pt-4 border-t border-gray-100">
//               <p className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
//                 Account
//               </p>
//               {isLoggedIn ? (
//                 <>
//                   <Link
//                     to="/dashboard"
//                     onClick={() => setMenuOpen(false)}
//                     className="flex items-center justify-between w-full px-4 py-3 text-gray-700 bg-gray-50 hover:bg-gray-100 font-semibold text-sm rounded-xl transition-all duration-200 border border-gray-100"
//                   >
//                     <div className="flex items-center gap-2">
//                       <UserCircle2 className="w-4 h-4" strokeWidth={2} />
//                       <span>Dashboard</span>
//                     </div>
//                     <ChevronRight className="w-4 h-4 text-gray-400" strokeWidth={2} />
//                   </Link>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setMenuOpen(false);
//                     }}
//                     className="flex items-center justify-between w-full px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 font-semibold text-sm rounded-xl transition-all duration-200 border border-red-100"
//                   >
//                     <div className="flex items-center gap-2">
//                       <LogOut className="w-4 h-4" strokeWidth={2} />
//                       <span>Logout</span>
//                     </div>
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     to="/signin"
//                     onClick={() => setMenuOpen(false)}
//                     className="flex items-center justify-between w-full px-4 py-3 text-gray-700 bg-gray-50 hover:bg-gray-100 font-semibold text-sm rounded-xl transition-all duration-200 border border-gray-100"
//                   >
//                     <span>Sign In</span>
//                     <ChevronRight className="w-4 h-4 text-gray-400" strokeWidth={2} />
//                   </Link>
//                   <Link
//                     to="/organisationsignup"
//                     onClick={() => setMenuOpen(false)}
//                     className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-200"
//                   >
//                     <span>Get Started</span>
//                     <Sparkles className="w-4 h-4" strokeWidth={2.5} />
//                   </Link>
//                 </>
//               )}
//             </div>

//             {/* Mobile Footer */}
//             <div className="mt-5 pt-4 border-t border-gray-100">
//               <p className="text-xs text-gray-500 text-center font-medium">
//                 © 2024 Kerplunk. All rights reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Spacer to prevent content from going under fixed navbar */}
//       <div className="h-16 sm:h-18"></div>
//     </>
//   );
// };

// export default Navbar;




// import { useContext, useState, useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { UserContext } from "../App";
// import CustomNavLink from "./CustomNavlink";
// import { AuthContext } from "./Context/AuthContext";
// import { 
//   Menu, 
//   X, 
//   Zap, 
//   LogOut, 
//   UserCircle2,
//   ChevronRight,
//   Sparkles
// } from "lucide-react";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();
//   const { isLoggedIn, login, logout } = useContext(AuthContext);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loggedInUser");
//     localStorage.removeItem("aiQuestions");
//     localStorage.removeItem("email");
//     localStorage.removeItem("jobPostData");
//     localStorage.removeItem("jobs");
//     logout();
//     navigate("/SignIn");
//   };

//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About" },
//     { to: "/PricingPage", label: "Pricing" },
//     { to: "/JDcreation", label: "JD Creation" },
//     { to: "/ContactUsPage", label: "Contact" }
//   ];

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           scrolled
//             ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100"
//             : "bg-white shadow-sm"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16 sm:h-18">
            
//             {/* Logo */}
//             <Link 
//               to="/" 
//               className="flex items-center gap-3 group"
//             >
//               <div className="relative">
//                 <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-lime-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:shadow-xl group-hover:shadow-green-500/30 transition-all duration-300">
//                   <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
//                 </div>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent tracking-tight">
//                   Kerplunk
//                 </span>
//                 <span className="text-[10px] sm:text-xs text-gray-500 -mt-0.5 hidden sm:block font-medium">
//                   AI Interview Platform
//                 </span>
//               </div>
//             </Link>

//             {/* Desktop Navigation Links */}
//             <ul className="hidden lg:flex items-center gap-4">
//               {navLinks.map((link) => (
//                 <li key={link.to}>
//                   <CustomNavLink
//                     to={link.to}
//                     className={({ isActive }) =>
//                       `relative px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 group ${
//                         isActive
//                           ? "text-green-600"
//                           : "text-gray-700 hover:text-green-600 hover:bg-green-50/50"
//                       }`
//                     }
//                   >
//                     {({ isActive }) => (
//                       <>
//                         {link.label}
//                         <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-green-500 to-lime-500 rounded-full transition-all duration-300 ${
//                           isActive ? "w-6" : "w-0 group-hover:w-6"
//                         }`}></span>
//                       </>
//                     )}
//                   </CustomNavLink>
//                 </li>
//               ))}
//             </ul>

//             {/* Desktop Auth Buttons */}
//             <div className="hidden lg:flex items-center gap-2">
//               {isLoggedIn ? (
//                 <div className="flex items-center gap-2">
//                   <Link
//                     to="/dashboard"
//                     className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 font-semibold text-sm rounded-xl hover:bg-green-50 transition-all duration-200"
//                   >
//                     <UserCircle2 className="w-4 h-4" strokeWidth={2} />
//                     <span>Dashboard</span>
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-200 border border-gray-200 transition-all duration-200"
//                   >
//                     <LogOut className="w-4 h-4" strokeWidth={2} />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <Link
//                     to="/signin"
//                     className="px-4 py-2 text-gray-700 hover:text-green-600 font-semibold text-sm rounded-xl hover:bg-green-50 transition-all duration-200"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/organisationsignup"
//                     className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] transition-all duration-200"
//                   >
//                     <span>Get Started</span>
//                     <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
//                   </Link>
//                 </>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
//               aria-label="Toggle menu"
//             >
//               {menuOpen ? (
//                 <X className="w-6 h-6" strokeWidth={2} />
//               ) : (
//                 <Menu className="w-6 h-6" strokeWidth={2} />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay */}
//       {menuOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       {/* Mobile Menu Drawer */}
//       <div
//         className={`lg:hidden fixed top-0 left-0 right-0 bottom-0 z-40 transition-all duration-300 ease-in-out ${
//           menuOpen 
//             ? "opacity-100 pointer-events-auto" 
//             : "opacity-0 pointer-events-none"
//         }`}
//       >
//         {/* Backdrop */}
//         <div 
//           className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//           onClick={() => setMenuOpen(false)}
//         />
        
//         {/* Menu Content */}
//         <div className={`absolute top-0 right-0 w-full sm:w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
//           menuOpen ? "translate-x-0" : "translate-x-full"
//         }`}>
//           <div className="h-full overflow-y-auto">
//             {/* Mobile Menu Header */}
//             <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
//               <div className="flex items-center gap-3">
//                 <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-lime-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20">
//                   <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
//                 </div>
//                 <div>
//                   <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent tracking-tight">
//                     Kerplunk
//                   </span>
//                   <p className="text-xs text-gray-500 font-medium">Menu</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setMenuOpen(false)}
//                 className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
//                 aria-label="Close menu"
//               >
//                 <X className="w-5 h-5" strokeWidth={2} />
//               </button>
//             </div>

//             <div className="px-6 py-6">
//               {/* Mobile Navigation Links */}
//               <div className="space-y-1.5 mb-6">
//                 <p className="px-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
//                   Navigation
//                 </p>
//                 {navLinks.map((link) => (
//                   <CustomNavLink
//                     key={link.to}
//                     to={link.to}
//                     onClick={() => setMenuOpen(false)}
//                     className={({ isActive }) =>
//                       `flex items-center justify-between px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
//                         isActive
//                           ? "bg-gradient-to-r from-green-50 to-lime-50 text-green-600 shadow-sm"
//                           : "text-gray-700 hover:bg-gray-50"
//                       }`
//                     }
//                   >
//                     {({ isActive }) => (
//                       <>
//                         <span>{link.label}</span>
//                         {isActive ? (
//                           <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-lime-500"></div>
//                         ) : (
//                           <ChevronRight className="w-4 h-4 text-gray-400" strokeWidth={2} />
//                         )}
//                       </>
//                     )}
//                   </CustomNavLink>
//                 ))}
//               </div>

//               {/* Mobile Auth Buttons */}
//               <div className="space-y-3 pt-6 border-t border-gray-100">
//                 <p className="px-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
//                   Account
//                 </p>
//                 {isLoggedIn ? (
//                   <>
//                     <Link
//                       to="/dashboard"
//                       onClick={() => setMenuOpen(false)}
//                       className="flex items-center justify-between w-full px-4 py-3.5 text-gray-700 bg-gray-50 hover:bg-gray-100 font-semibold text-sm rounded-xl transition-all duration-200"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
//                           <UserCircle2 className="w-5 h-5 text-gray-600" strokeWidth={2} />
//                         </div>
//                         <span>Dashboard</span>
//                       </div>
//                       <ChevronRight className="w-4 h-4 text-gray-400" strokeWidth={2} />
//                     </Link>
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         setMenuOpen(false);
//                       }}
//                       className="flex items-center justify-between w-full px-4 py-3.5 bg-red-50 text-red-600 hover:bg-red-100 font-semibold text-sm rounded-xl transition-all duration-200"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
//                           <LogOut className="w-5 h-5 text-red-600" strokeWidth={2} />
//                         </div>
//                         <span>Logout</span>
//                       </div>
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       to="/signin"
//                       onClick={() => setMenuOpen(false)}
//                       className="flex items-center justify-between w-full px-4 py-3.5 text-gray-700 bg-gray-50 hover:bg-gray-100 font-semibold text-sm rounded-xl transition-all duration-200"
//                     >
//                       <span>Sign In</span>
//                       <ChevronRight className="w-4 h-4 text-gray-400" strokeWidth={2} />
//                     </Link>
//                     <Link
//                       to="/organisationsignup"
//                       onClick={() => setMenuOpen(false)}
//                       className="flex items-center justify-center gap-2 w-full px-4 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-200"
//                     >
//                       <Sparkles className="w-5 h-5" strokeWidth={2.5} />
//                       <span>Get Started</span>
//                     </Link>
//                   </>
//                 )}
//               </div>

//               {/* Mobile Footer */}
//               <div className="mt-8 pt-6 border-t border-gray-100">
//                 <p className="text-xs text-gray-500 text-center font-medium">
//                   © 2024 Kerplunk. All rights reserved.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Spacer to prevent content from going under fixed navbar */}
//       <div className="h-16 sm:h-18"></div>
//     </>
//   );
// };

// export default Navbar;




// good 

// import { useContext, useState, useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { UserContext } from "../App";
// import CustomNavLink from "./CustomNavlink";
// import { AuthContext } from "./Context/AuthContext";
// import { 
//   Menu, 
//   X, 
//   Zap, 
//   LogOut, 
//   UserCircle2,
//   ChevronRight,
//   Sparkles
// } from "lucide-react";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();
//   const { isLoggedIn, login, logout } = useContext(AuthContext);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loggedInUser");
//     localStorage.removeItem("aiQuestions");
//     localStorage.removeItem("email");
//     localStorage.removeItem("jobPostData");
//     localStorage.removeItem("jobs");
//     logout();
//     navigate("/SignIn");
//   };

//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About" },
//     { to: "/PricingPage", label: "Pricing" },
//     { to: "/JDcreation", label: "JD Creation" },
//     { to: "/ContactUsPage", label: "Contact" }
//   ];

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           scrolled
//             ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100"
//             : "bg-white shadow-sm"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16 sm:h-18">
            
//             {/* Logo */}
//             <Link 
//               to="/" 
//               className="flex items-center gap-3 group"
//             >
//               <div className="relative">
//                 <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-lime-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:shadow-xl group-hover:shadow-green-500/30 transition-all duration-300">
//                   <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
//                 </div>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent tracking-tight">
//                   Kerplunk
//                 </span>
//                 <span className="text-[10px] sm:text-xs text-gray-500 -mt-0.5 hidden sm:block font-medium">
//                   AI Interview Platform
//                 </span>
//               </div>
//             </Link>

//             {/* Desktop Navigation Links */}
//             <ul className="hidden lg:flex items-center gap-6">
//               {navLinks.map((link) => (
//                 <li key={link.to}>
//                   <CustomNavLink
//                     to={link.to}
//                     className={({ isActive }) =>
//                       `relative px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 group ${
//                         isActive
//                           ? "text-green-600"
//                           : "text-gray-700 hover:text-green-600 hover:bg-green-50/50"
//                       }`
//                     }
//                   >
//                     {({ isActive }) => (
//                       <>
//                         {link.label}
//                         <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-green-500 to-lime-500 rounded-full transition-all duration-300 ${
//                           isActive ? "w-6" : "w-0 group-hover:w-6"
//                         }`}></span>
//                       </>
//                     )}
//                   </CustomNavLink>
//                 </li>
//               ))}
//             </ul>

//             {/* Desktop Auth Buttons */}
//             <div className="hidden lg:flex items-center gap-2">
//               {isLoggedIn ? (
//                 <div className="flex items-center gap-2">
//                   <Link
//                     to="/dashboard"
//                     className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 font-semibold text-sm rounded-xl hover:bg-green-50 transition-all duration-200"
//                   >
//                     <UserCircle2 className="w-4 h-4" strokeWidth={2} />
//                     <span>Dashboard</span>
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-200 border border-gray-200 transition-all duration-200"
//                   >
//                     <LogOut className="w-4 h-4" strokeWidth={2} />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <Link
//                     to="/signin"
//                     className="px-4 py-2 text-gray-700 hover:text-green-600 font-semibold text-sm rounded-xl hover:bg-green-50 transition-all duration-200"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/organisationsignup"
//                     className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] transition-all duration-200"
//                   >
//                     <span>Get Started</span>
//                     <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
//                   </Link>
//                 </>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
//               aria-label="Toggle menu"
//             >
//               {menuOpen ? (
//                 <X className="w-6 h-6" strokeWidth={2} />
//               ) : (
//                 <Menu className="w-6 h-6" strokeWidth={2} />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay */}
//       {menuOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       {/* Mobile Menu Drawer */}
//       <div
//         className={`lg:hidden fixed top-0 left-0 right-0 bottom-0 z-50 transition-all duration-300 ease-in-out ${
//           menuOpen 
//             ? "opacity-100 pointer-events-auto" 
//             : "opacity-0 pointer-events-none"
//         }`}
//       >
//         {/* Backdrop */}
//         <div 
//           className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//           onClick={() => setMenuOpen(false)}
//         />
        
//         {/* Menu Content */}
//         <div className={`absolute top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
//           menuOpen ? "translate-x-0" : "translate-x-full"
//         }`}>
//           <div className="h-full overflow-y-auto flex flex-col">
//             {/* Mobile Menu Header */}
//             <div className="flex-shrink-0 sticky top-0 bg-gradient-to-r from-green-500 to-lime-500 px-6 py-5 flex items-center justify-between z-10 shadow-lg">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
//                   <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
//                 </div>
//                 <div>
//                   <span className="text-xl font-bold text-white tracking-tight">
//                     Kerplunk
//                   </span>
//                   <p className="text-xs text-white/80 font-medium">Navigation Menu</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setMenuOpen(false)}
//                 className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
//                 aria-label="Close menu"
//               >
//                 <X className="w-6 h-6" strokeWidth={2} />
//               </button>
//             </div>

//             <div className="flex-1 px-6 py-6 bg-gradient-to-b from-gray-50 to-white">
//               {/* Mobile Navigation Links */}
//               <div className="mb-8">
//                 <p className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
//                   Navigation
//                 </p>
//                 <div className="space-y-6">
//                   {navLinks.map((link) => (
//                     <CustomNavLink
//                       key={link.to}
//                       to={link.to}
//                       onClick={() => setMenuOpen(false)}
//                       className={({ isActive }) =>
//                         `border-2 flex items-center  justify-between px-5 py-4 rounded-xl font-semibold text-base transition-all duration-200 ${
//                           isActive
//                             ? "bg-red-100 text-white shadow-lg shadow-green-500/30"
//                             : "text-gray-700 bg-red-400 hover:bg-gray-50 "
//                         }`
//                       }
//                     >
//                       {({ isActive }) => (
//                         <>
//                           <span>{link.label}</span>
//                           {isActive ? (
//                             <div className="w-2 h-2 rounded-full  bg-white"></div>
//                           ) : (
//                             <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
//                           )}
//                         </>
//                       )}
//                     </CustomNavLink>
//                   ))}
//                 </div>
//               </div>

//               {/* Mobile Auth Buttons */}
//               <div className="space-y-3">
//                 <p className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
//                   Account
//                 </p>
//                 {isLoggedIn ? (
//                   <>
//                     <Link
//                       to="/dashboard"
//                       onClick={() => setMenuOpen(false)}
//                       className="flex items-center justify-between w-full px-5 py-4 text-gray-700 bg-white hover:bg-gray-50 font-semibold text-base rounded-xl transition-all duration-200 border border-gray-100"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center">
//                           <UserCircle2 className="w-5 h-5 text-green-600" strokeWidth={2} />
//                         </div>
//                         <span>Dashboard</span>
//                       </div>
//                       <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
//                     </Link>
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         setMenuOpen(false);
//                       }}
//                       className="flex items-center justify-between w-full px-5 py-4 bg-red-50 text-red-600 hover:bg-red-100 font-semibold text-base rounded-xl transition-all duration-200 border border-red-100"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
//                           <LogOut className="w-5 h-5 text-red-600" strokeWidth={2} />
//                         </div>
//                         <span>Logout</span>
//                       </div>
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       to="/signin"
//                       onClick={() => setMenuOpen(false)}
//                       className="flex items-center justify-between w-full px-5 py-4 text-gray-700 bg-white hover:bg-gray-50 font-semibold text-base rounded-xl transition-all duration-200 border border-gray-100"
//                     >
//                       <span>Sign In</span>
//                       <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
//                     </Link>
//                     <Link
//                       to="/organisationsignup"
//                       onClick={() => setMenuOpen(false)}
//                       className="flex items-center justify-center gap-2 w-full px-5 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold text-base rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-200"
//                     >
//                       <Sparkles className="w-5 h-5" strokeWidth={2.5} />
//                       <span>Get Started</span>
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Mobile Footer */}
//             <div className="flex-shrink-0 px-6 py-5 bg-gray-50 border-t border-gray-100">
//               <p className="text-xs text-gray-500 text-center font-medium">
//                 © 2024 Kerplunk. All rights reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Spacer to prevent content from going under fixed navbar */}
//       <div className="h-16 sm:h-18"></div>
//     </>
//   );
// };

// export default Navbar;


import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import CustomNavLink from "./CustomNavlink";
import { AuthContext } from "./Context/AuthContext";
import { 
  Menu, 
  X, 
  Zap, 
  LogOut, 
  UserCircle2,
  ChevronRight,
  Sparkles
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("aiQuestions");
    localStorage.removeItem("email");
    localStorage.removeItem("jobPostData");
    localStorage.removeItem("jobs");
    logout();
    navigate("/SignIn");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/PricingPage", label: "Pricing" },
    { to: "/JDcreation", label: "JD Creation" },
    { to: "/ContactUsPage", label: "Contact" }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-lime-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:shadow-xl group-hover:shadow-green-500/30 transition-all duration-300">
                  <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent tracking-tight">
                  Kerplunk
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 -mt-0.5 hidden sm:block font-medium">
                  AI Interview Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <CustomNavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `relative px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 group ${
                        isActive
                          ? "text-green-600"
                          : "text-gray-700 hover:text-green-600 hover:bg-green-50/50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-green-500 to-lime-500 rounded-full transition-all duration-300 ${
                          isActive ? "w-6" : "w-0 group-hover:w-6"
                        }`}></span>
                      </>
                    )}
                  </CustomNavLink>
                </li>
              ))}
            </ul>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 font-semibold text-sm rounded-xl hover:bg-green-50 transition-all duration-200"
                  >
                    <UserCircle2 className="w-4 h-4" strokeWidth={2} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-200 border border-gray-200 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" strokeWidth={2} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-gray-700 hover:text-green-600 font-semibold text-sm rounded-xl hover:bg-green-50 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/organisationsignup"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] transition-all duration-200"
                  >
                    <span>Get Started</span>
                    <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6" strokeWidth={2} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          menuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Menu Content - Slide from Right */}
        <div 
          className={`absolute top-0 right-0 bottom-0 w-[85%] sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-out overflow-hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Scrollable Content */}
          <div className="h-full overflow-y-auto">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-green-500 to-lime-500 px-5 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Kerplunk</h2>
                  <p className="text-xs text-white/90 font-medium">Navigation Menu</p>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2.5 rounded-xl text-white hover:bg-white/20 active:bg-white/30 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" strokeWidth={2.5} />
              </button>
            </div>

            {/* Navigation Section */}
            <div className="px-5 pt-6 pb-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">
                Navigation
              </h3>
              <nav className="space-y-1.5">
                {navLinks.map((link) => (
                  <CustomNavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                  >
                    {({ isActive }) => (
                      <div
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-green-500 to-lime-500 text-white shadow-md shadow-green-500/20"
                            : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive ? (
                          <div className="w-2 h-2 rounded-full bg-white shadow-sm"></div>
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
                        )}
                      </div>
                    )}
                  </CustomNavLink>
                ))}
              </nav>
            </div>

            {/* Account Section */}
            <div className="px-5 pt-4 pb-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">
                Account
              </h3>
              <div className="space-y-2.5">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between w-full px-4 py-3.5 text-gray-700 hover:bg-gray-50 active:bg-gray-100 font-semibold text-[15px] rounded-xl transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-50 to-lime-50 border border-green-100 flex items-center justify-center">
                          <UserCircle2 className="w-5 h-5 text-green-600" strokeWidth={2.5} />
                        </div>
                        <span>Dashboard</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
                    </Link>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-3.5 bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200 font-semibold text-[15px] rounded-xl transition-all duration-200 border border-red-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                          <LogOut className="w-5 h-5 text-red-600" strokeWidth={2.5} />
                        </div>
                        <span>Logout</span>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between w-full px-4 py-3.5 text-gray-700 hover:bg-gray-50 active:bg-gray-100 font-semibold text-[15px] rounded-xl transition-all duration-200"
                    >
                      <span>Sign In</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
                    </Link>
                    
                    <Link
                      to="/organisationsignup"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2.5 w-full px-4 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold text-[15px] rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl active:scale-[0.98] transition-all duration-200"
                    >
                      <Sparkles className="w-5 h-5" strokeWidth={2.5} />
                      <span>Get Started</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto px-5 py-5 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500 text-center font-medium">
                © 2024 Kerplunk. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 sm:h-18"></div>
    </>
  );
};

export default Navbar;