import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Onavbar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const navigate = useNavigate();
  
  return (
    <div
    className={`${
      isOpen ? "w-64" : "w-16"
    } bg-blue-900 h-screen p-4 flex flex-col transition-all duration-300`}
  >
    {/* Sidebar Header */}
    <div className="flex items-center justify-between">
      <div className={`${isOpen ? "block" : "hidden"} text-white font-bold text-xl`}>
        <span className="text-lime-500">Kerplunk.</span>
      </div>
      <button
        className="text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "⟨" : "⟩"}
      </button>
    </div>

    {/* Sidebar Items */}
    <div className="mt-8 flex-1">
      <ul>
        <li className="text-gray-300 flex items-center mb-4 cursor-pointer hover:bg-blue-700 rounded-md p-2">
        <Link to="/Jobpost" className="flex items-center w-full">
        <span className="material-icons">✍️</span>
        <span className={`${isOpen ? "ml-4" : "hidden"} text-sm`}>
          Post a Job
        </span>
      </Link>
        </li>
        <li className="text-gray-300 flex items-center mb-4 cursor-pointer hover:bg-blue-700 rounded-md p-2">
          <span className="material-icons">🧊</span>
          <span className={`${isOpen ? "ml-4" : "hidden"} text-sm`}>
            Dashboard
          </span>
        </li>
        <li className="text-gray-300 flex items-center mb-4 cursor-pointer hover:bg-blue-700 rounded-md p-2">
          <span className="material-icons">📄</span>
          <span className={`${isOpen ? "ml-4" : "hidden"} text-sm`}>
            All Jobs
          </span>
        </li>
        <li className="text-gray-300 flex items-center mb-4 cursor-pointer hover:bg-blue-700 rounded-md p-2">
          <span className="material-icons">⏰</span>
          <span className={`${isOpen ? "ml-4" : "hidden"} text-sm`}>
            Recent Interviews
          </span>
        </li>
        {/* Job Details */}
        <div className="text-gray-500 text-xs uppercase mt-8 mb-4">
          {isOpen && <span>Job Details</span>}
        </div>
        <li className="text-gray-300 flex items-center mb-4 cursor-pointer hover:bg-blue-700 rounded-md p-2">
          <span className="material-icons">📒</span>
          <span className={`${isOpen ? "ml-4" : "hidden"} text-sm`}>
            Categories
          </span>
        </li>
        <li className="text-gray-300 flex items-center mb-4 cursor-pointer hover:bg-blue-700 rounded-md p-2">
          <span className="material-icons">📚</span>
          <span className={`${isOpen ? "ml-4" : "hidden"} text-sm`}>
            Subcategories
          </span>
        </li>
        <li className="text-gray-300 flex items-center mb-4 cursor-pointer hover:bg-blue-700 rounded-md p-2">
          <span className="material-icons">🎁</span>
          <span className={`${isOpen ? "ml-4" : "hidden"} text-sm`}>
            Benefits
          </span>
        </li>
        {/* Organization */}
        <div className="text-gray-500 text-xs uppercase mt-8 mb-4">
          {isOpen && <span>Organization</span>}
        </div>
        <li className="text-gray-300 flex items-center mb-4 cursor-pointer hover:bg-blue-700 rounded-md p-2">
          <span className="material-icons">👥</span>
          <span className={`${isOpen ? "ml-4" : "hidden"} text-sm`}>Users</span>
        </li>
        <li className="text-gray-300 flex items-center mb-4 cursor-pointer hover:bg-blue-700 rounded-md p-2">
          <span className="material-icons">🗃️</span>
          <span className={`${isOpen ? "ml-4" : "hidden"} text-sm`}>
            Integrations
          </span>
        </li>
      </ul>
    </div>
  </div>
)
}

export default Onavbar