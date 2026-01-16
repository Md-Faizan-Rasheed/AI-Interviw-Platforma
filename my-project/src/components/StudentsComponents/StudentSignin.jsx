import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const StudentSignin = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get("companyId");

  const navigate = useNavigate();
  const { id } = useParams();
  const jobid = id;

  /* ===================== STATE ===================== */
  const [formData, setFormData] = useState({
    phoneNumber: "",
    otp: "",
  });

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [studentId, setStudentId] = useState(null);

  /* ===================== AXIOS CONFIG ===================== */
  const api = axios.create({
    baseURL: "http://localhost:8080/students",
    withCredentials: true, // enables JWT cookie handling
  });

  /* ===================== AUTO LOGIN CHECK ===================== */
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.get("/check-auth");

        if (res.data.success) {
          const studentId =  localStorage.getItem("studentId");
          navigate(`/StudentHomePage/${studentId}`);
        }
      } catch (err) {
        console.log("User not logged in yet");
      }
    };
    checkLogin();
  }, [navigate]);

  /* ===================== HANDLERS ===================== */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===================== SEND OTP ===================== */
  const handleSendOtp = async () => {
    if (formData.phoneNumber.length !== 10) {
      alert("Enter valid 10 digit phone number");
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Check if student exists
      const checkResponse = await api.post("/check-student", {
        phoneNumber: formData.phoneNumber,
      });

      if (!checkResponse.data.exists) {
        alert(checkResponse.data.message || "Student not found. Please sign up first.");
        setLoading(false);
        return;
      }

      const StudentId = checkResponse.data.studentId;
      setStudentId(StudentId);

      // 2️⃣ Send OTP
      const response = await api.post("/send-otp", {
        phoneNumber: formData.phoneNumber,
      });

      if (response.data.success) {
        setShowOtpInput(true);
        setOtpSent(true);
        alert("OTP sent successfully!");
      } else {
        alert(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ===================== VERIFY OTP & SIGN IN ===================== */
  const handleSignin = async (e) => {
    e.preventDefault();

    if (!formData.otp) {
      alert("Please enter OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/verify-otp", {
        phoneNumber: formData.phoneNumber,
        otp: formData.otp,
      });

      if (response.data.success) {
        alert("Sign in successful! ✅");

        // store student ID in localStorage temporarily (optional)
        const studentIdFromBackend = response.data.studentId || studentId;
        localStorage.setItem("studentId", studentIdFromBackend);

        // reset state
        setFormData({ phoneNumber: "", otp: "" });
        setShowOtpInput(false);
        setOtpSent(false);

        // navigate to home page
        navigate(`/StudentHomePage/${studentIdFromBackend}`);
      } else {
        alert(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-xl mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold text-white mb-2">
                Student Sign In
              </h2>
              <p className="text-blue-100 text-sm">
                Sign in to continue your interview
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <form className="px-8 py-10 space-y-6" onSubmit={handleSignin}>
            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="flex gap-3">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 border-2 rounded-xl"
                  placeholder="Enter phone number"
                  maxLength="10"
                  required
                  disabled={showOtpInput}
                />
                {!showOtpInput && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl"
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                )}
              </div>
            </div>

            {/* OTP */}
            {showOtpInput && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5">
                <label className="block text-sm font-semibold mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-xl text-center text-lg"
                  maxLength="6"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="mt-3 text-sm text-blue-600"
                >
                  Resend OTP
                </button>
              </div>
            )}

            {/* Submit */}
            {showOtpInput && (
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            )}

            {/* Signup */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm">
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/signup/${jobid}?companyId=${companyId}`)
                  }
                  className="text-blue-600 font-semibold"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentSignin;

