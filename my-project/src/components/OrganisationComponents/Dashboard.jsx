import { useContext, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Onavbar from "./Onavbar";
import { ChevronDown, User } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const Dashboard = () => {
  const [isNameDropdownOpen, setIsNameDropdownOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [loggedInUser] = useState("Admin");
  const [initial] = useState("A");

  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) return <Navigate to="/signin" />;

  const handleResetPassword = async () => {
    try {
      toast.success("Password reset link sent!");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#a8edea] to-[#fed6e3]">
      {/* Sidebar */}
      <Onavbar />

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Home</h1>

          {/* Profile */}
          <div className="relative flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
              className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={() => setIsNameDropdownOpen(!isNameDropdownOpen)}
              className="flex items-center gap-1 bg-white px-3 py-1 rounded-md shadow text-sm"
            >
              {loggedInUser}
              <ChevronDown className="w-4 h-4" />
            </button>

            {isNameDropdownOpen && (
              <div className="absolute right-0 top-12 bg-white rounded-md shadow w-48 z-20">
                <Link to="/setting" className="block px-4 py-2 hover:bg-gray-100">
                  ⚙️ Organisation Settings
                </Link>
                <div className="px-4 py-2 text-sm bg-gray-50">
                  {loggedInUser}
                </div>
              </div>
            )}

            {isAvatarDropdownOpen && (
              <div className="absolute right-0 top-12 bg-white rounded-md shadow w-44 z-20">
                <button
                  onClick={handleResetPassword}
                  className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                >
                  🔒 Reset Password
                </button>
                <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left">
                  🪪 Profile Info
                </button>
                <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left">
                  ↪️ Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Welcome */}
        <section className="bg-gradient-to-r from-blue-700 to-purple-600 text-white rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold">Welcome to Kerplunk!</h2>
          <p className="text-sm opacity-80">👓 Get Started →</p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { title: "New Interviews", count: 0 },
            { title: "Job Applications", count: 0 },
            { title: "Resumes", count: 0 },
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-lg shadow text-center">
              <p className="text-gray-600 text-sm">{item.title}</p>
              <p className="text-2xl font-bold text-blue-700">{item.count}</p>
            </div>
          ))}
        </section>

        {/* Quick Links */}
        <section className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Post a Job", icon: "✏️", path: "/Jobpost" },
              { label: "All Jobs", icon: "📋" },
              { label: "Candidates", icon: "🕵️‍♂️" },
              { label: "Settings", icon: "⚙️" },
              { label: "Interviews", icon: "⏰" },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.path || "#"}
                className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg hover:shadow transition"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm mt-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 p-6 rounded-lg flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <h4 className="font-bold text-gray-800">
              Just getting started?
            </h4>
            <p className="text-sm text-gray-500">
              Learn tips & tricks to get the most out of Kerplunk.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="border px-4 py-2 rounded-lg text-blue-700 border-blue-700">
              Not Now
            </button>
            <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">
              Learn More
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
