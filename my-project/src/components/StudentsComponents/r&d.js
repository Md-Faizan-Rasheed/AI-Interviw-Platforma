// controllers/AuthController.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Student from "../models/Student.js"; // adjust to your model path
import { sendOtp, verifyOtpCode } from "../utils/otpService.js"; // your OTP logic

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

// Utility: create JWT and set as cookie
const setAuthCookie = (res, student) => {
  const token = jwt.sign(
    { id: student._id, phone: student.phoneNumber },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

// ✅ Send OTP (shared for signup/signin)
export const sendOtpHandler = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) return res.json({ success: false, message: "Phone required" });

    await sendOtp(phoneNumber); // your existing OTP send logic
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
};

// ✅ Verify OTP → login/signup + JWT cookie
export const verifyOtpHandler = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const valid = await verifyOtpCode(phoneNumber, otp); // your OTP verification logic

    if (!valid) return res.json({ success: false, message: "Invalid or expired OTP" });

    // find or create student
    let student = await Student.findOne({ phoneNumber });
    if (!student) {
      student = await Student.create({ phoneNumber });
    }

    // set JWT cookie
    setAuthCookie(res, student);
    res.json({ success: true, studentId: student._id });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Check Auth — auto-login on refresh
export const checkAuth = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ success: false });

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch {
    res.json({ success: false });
  }
};

// ✅ Logout
export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
};




// routes/authRoutes.js
import express from "express";
import {
  sendOtpHandler,
  verifyOtpHandler,
  checkAuth,
  logout,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/send-otp", sendOtpHandler);
router.post("/verify-otp", verifyOtpHandler);
router.get("/check-auth", checkAuth);
router.post("/logout", logout);

export default router;



    <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl mx-auto"
      >
        {/* Your existing full UI (unchanged) */}
        {/* ✅ Everything below this line remains the same */}
        {/* Just ensure your <form onSubmit={handleSubmit}> remains */}
        {/* And buttons call handleVerifyPhone and handleVerifyOtp as before */}

        {/* ⚠️ PASTE your entire existing UI JSX below exactly as it is */}

      </motion.div>


