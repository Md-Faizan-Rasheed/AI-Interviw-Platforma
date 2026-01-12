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
  ChevronDown 
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
    // { to: "/platform", label: "Platform" },
    { to: "/pricing", label: "Pricing" },
    { to: "/JDcreation", label: "JD Creation" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mb-12 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-white shadow-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group transition-transform hover:scale-105"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
                Kerplunk
              </span>
              <span className="text-xs text-gray-500 -mt-1 hidden sm:block">
                AI Interview Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <CustomNavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative group ${
                      isActive
                        ? "text-green-600"
                        : "text-gray-700 hover:text-green-600"
                    }`
                  }
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-lime-400 to-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </CustomNavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 font-medium rounded-lg hover:bg-green-50 transition-all duration-200"
                >
                  <UserCircle2 className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/organisationsignup"
                  className="px-6 py-2.5 bg-gradient-to-r from-lime-400 to-green-500 text-white font-semibold rounded-lg hover:from-lime-500 hover:to-green-600 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-4 pb-6 bg-white border-t border-gray-100 shadow-lg">
          {/* Mobile Navigation Links */}
          <ul className="space-y-2 mb-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <CustomNavLink
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-lime-50 to-green-50 text-green-600 border-l-4 border-green-500"
                        : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                    }`
                  }
                >
                  {link.label}
                </CustomNavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Auth Buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-all duration-200"
                >
                  <UserCircle2 className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 shadow-lg transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center bg-gradient-to-r from-lime-400 to-green-500 text-white font-semibold rounded-lg hover:from-lime-500 hover:to-green-600 shadow-lg transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Footer */}
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              © 2024 Kerplunk. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;

