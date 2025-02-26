import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const InterviewPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500`}>
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-30 blur-3xl h-full w-full -z-10 animate-pulse" />
      
      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 p-2 rounded-full shadow-lg bg-gray-800 text-white hover:scale-110 transition-all"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
      
      {/* Interview Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-300"
      >
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          AI-Powered Interview
        </h1>
        
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
            <p className="font-semibold">AI: "Tell me about yourself."</p>
          </div>
          <input
            type="text"
            placeholder="Your response..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Submit Answer
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewPage;