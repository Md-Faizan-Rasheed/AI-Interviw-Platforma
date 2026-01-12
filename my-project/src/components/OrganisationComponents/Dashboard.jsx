import { useContext, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Onavbar from "./Onavbar";
import {
  ChevronDown,
  User,
  Bell,
  Search,
  Settings,
  LogOut,
  Lock,
  IdCard,
  PenSquare,
  Briefcase,
  Clock,
  TrendingUp,
  FileText,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  BarChart3
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const Dashboard = () => {
  const [isNameDropdownOpen, setIsNameDropdownOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [loggedInUser] = useState("Admin");
  const [initial] = useState("A");
  const navigate = useNavigate();

  const { isLoggedIn, logout } = useContext(AuthContext);

  if (!isLoggedIn) return <Navigate to="/signin" />;

  const handleResetPassword = async () => {
    try {
      toast.success("Password reset link sent to your email!");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };
   /* ================= API HELPERS ================= */
  const fetchUserId = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/jobs/api/user-id", {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    });

    const data = await res.json();
    return data.userId;
  };


  const stats = [
    {
      title: "New Interviews",
      count: 0,
      icon: Clock,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Job Applications",
      count: 0,
      icon: Briefcase,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      title: "Resumes",
      count: 0,
      icon: FileText,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    }
  ];

  const quickLinks = [
    { label: "Post a Job", icon: PenSquare, path: "/Jobpost", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "All Jobs", icon: Briefcase, path: "/alljobs", color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Recent Interviews", icon: Clock, path: "/RecentInterviews", color: "text-green-600", bg: "bg-green-50" },
    { label: "Settings", icon: Settings, path: "/settings", color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Analytics", icon: BarChart3, path: "/analytics", color: "text-pink-600", bg: "bg-pink-50" }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 mt-14">
      {/* Sidebar */}
      <Onavbar />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
        {/* Top Bar */}
        <header className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">Welcome back, {loggedInUser}!</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-sm">{initial}</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-800">{loggedInUser}</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isAvatarDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isAvatarDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsAvatarDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-14 bg-white rounded-xl shadow-xl border border-gray-200 w-64 z-20 overflow-hidden">
                      {/* User Info */}
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center shadow-md">
                            <span className="text-white font-bold">{initial}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{loggedInUser}</p>
                            <p className="text-xs text-gray-600">admin@kerplunk.com</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/setting"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                          onClick={() => setIsAvatarDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span className="text-sm">Organization Settings</span>
                        </Link>
                        <button
                          onClick={() => {
                            handleResetPassword();
                            setIsAvatarDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                        >
                          <Lock className="w-4 h-4" />
                          <span className="text-sm">Reset Password</span>
                        </button>
                        <button
                          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                          onClick={() => setIsAvatarDropdownOpen(false)}
                        >
                          <IdCard className="w-4 h-4" />
                          <span className="text-sm">Profile Info</span>
                        </button>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-200">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Welcome Banner */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 mb-6 shadow-xl overflow-hidden relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span className="text-yellow-300 text-sm font-semibold">Welcome to Kerplunk!</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Let's Get Started 🚀
            </h2>
            <p className="text-blue-100 text-sm md:text-base mb-4 max-w-2xl">
              Manage your interviews, track candidates, and make data-driven hiring decisions all in one place.
            </p>
            <button className="flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">+0%</span>
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {stat.count}
                </p>
                <p className="text-xs text-gray-500 mt-2">vs last month</p>
              </div>
            );
          })}
        </section>

        {/* Quick Links */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
              <p className="text-sm text-gray-500">Access your most used features</p>
            </div>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  to={item.path || "#"}
                  className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`${item.bg} p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform w-fit`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">
                    {item.label}
                  </span>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Getting Started Footer */}
        <footer className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">
                Just getting started?
              </h4>
              <p className="text-sm text-gray-600">
                Learn tips & tricks to get the most out of Kerplunk AI Platform.
              </p>
            </div>
          </div>
          <div className="flex gap-3 sm:flex-shrink-0">
            <button className="px-5 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all">
              Not Now
            </button>
            <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;