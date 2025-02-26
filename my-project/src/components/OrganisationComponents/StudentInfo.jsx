import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const StudentInfo = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    studentName: "",
    aadharLastDigits: "",
    otp: "",
  });

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVerifyPhone = async () => {
    setLoading(true);
    console.log("Phone Number at frontend",formData.phoneNumber);
        try {
      const response = await axios.post("http://localhost:8080/jobs/send-otp", {
        phoneNumber: formData.phoneNumber,
      });
      console.log("REsponse  at frontend",response.data);

      if (response.data.success) {
        setShowOtpInput(true);
        setOtpSent(true);
      }
    } catch (error) {
      alert("Error sending OTP");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/jobs/verify-otp", {
        phoneNumber: formData.phoneNumber,
        otp: formData.otp,
      });
      if (response.data.success) {
        alert("OTP Verified Successfully");
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      alert("Error verifying OTP");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-8 p-6 bg-blue-50 rounded-2xl shadow-lg border border-blue-200 hover:shadow-2xl transition-all duration-300"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold mb-6 text-blue-700 text-center"
      >
        Student Information
      </motion.h2>

      <form className="space-y-6">
        {/* Phone Number with Verify Button */}
        <motion.div whileHover={{ scale: 1.02 }} className="flex space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-blue-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Enter phone number"
              maxLength="10"
              required
            />
          </div>
          <motion.button
            type="button"
            onClick={handleVerifyPhone}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={loading}
            className="self-end px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            {loading ? "Sending..." : otpSent ? "Resend OTP" : "Verify"}
          </motion.button>
        </motion.div>

        {/* OTP Input (Conditional Rendering) */}
        {showOtpInput && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <label className="block text-sm font-semibold text-blue-700 mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Enter OTP"
              maxLength="6"
            />
            <motion.button
              type="button"
              onClick={handleVerifyOtp}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="mt-2 w-full py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </motion.button>
          </motion.div>
        )}

        {/* Student Name */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-semibold text-blue-700 mb-1">
            Student Name
          </label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Enter student name"
            required
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
};

export default StudentInfo;
