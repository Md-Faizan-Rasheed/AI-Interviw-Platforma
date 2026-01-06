// import { useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const StudentInfo = () => {
//   const [formData, setFormData] = useState({
//     phoneNumber: "",
//     studentName: "",
//     adharNumber: "",
//     otp: "",
//   });
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const jobid = id;

//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerificationStatus, setotpVerificationStatus] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleVerifyPhone = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:8080/jobs/send-otp", {
//         phoneNumber: formData.phoneNumber,
//       });

//       if (response.data.success) {
//         setShowOtpInput(true);
//         setOtpSent(true);
//       }
//     } catch (error) {
//       alert("Error sending OTP");
//     }
//     setLoading(false);
//   };

//   const handleVerifyOtp = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:8080/jobs/verify-otp", {
//         phoneNumber: formData.phoneNumber,
//         otp: formData.otp,
//       });
//       if (response.data.success) {
//         alert("OTP Verified Successfully");
//         setotpVerificationStatus(true);
//       } else {
//         alert("Invalid OTP");
//       }
//     } catch (error) {
//       alert("Error verifying OTP");
//     }
//     setLoading(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (otpVerificationStatus) {
//         const response = await axios.post("http://localhost:8080/jobs/save-student-details", formData);
//         if (response.data.success) {
//           alert("Student data saved successfully!");
//           setFormData({ phoneNumber: "", studentName: "", adharNumber: "", otp: "" });
//           setShowOtpInput(false);
//           setOtpSent(false);
//           navigate(`/interview/${jobid}`);
//         } else {
//           alert("This number is already registered for an interview.");
//         }
//       } else {
//         alert("Please Verify your OTP");
//       }
//     } catch (error) {
//       alert(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="max-w-lg mx-auto"
//       >
//         {/* Header Card */}
//         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
//           {/* Title Section with Gradient */}
//           <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-6">
//             <motion.h2
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="text-3xl font-bold text-white text-center tracking-tight"
//             >
//               Student Information
//             </motion.h2>
//             <p className="text-green-100 text-center text-sm mt-2">
//               Please provide your details to continue
//             </p>
//           </div>

//           {/* Form Section */}
//           <form className="px-8 py-8 space-y-6" onSubmit={handleSubmit}>
//             {/* Phone Number Field */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.4, delay: 0.2 }}
//             >
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Phone Number
//               </label>
//               <div className="flex gap-3">
//                 <div className="flex-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleInputChange}
//                     className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-gray-900"
//                     placeholder="Enter phone number"
//                     maxLength="10"
//                     required
//                   />
//                 </div>
//                 <motion.button
//                   type="button"
//                   onClick={handleVerifyPhone}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   disabled={loading}
//                   className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
//                 >
//                   {loading ? (
//                     <span className="flex items-center gap-2">
//                       <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Sending...
//                     </span>
//                   ) : otpSent ? (
//                     "Resend OTP"
//                   ) : (
//                     "Verify"
//                   )}
//                 </motion.button>
//               </div>
//             </motion.div>

//             {/* OTP Input Section */}
//             {showOtpInput && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 transition={{ duration: 0.4, ease: "easeOut" }}
//                 className="bg-green-50 border-2 border-green-200 rounded-2xl p-5"
//               >
//                 <div className="flex items-center gap-2 mb-3">
//                   <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <label className="block text-sm font-semibold text-green-700">
//                     Enter OTP
//                   </label>
//                 </div>
//                 <input
//                   type="text"
//                   name="otp"
//                   value={formData.otp}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-center text-lg tracking-widest font-semibold"
//                   placeholder="••••••"
//                   maxLength="6"
//                 />
//                 <motion.button
//                   type="button"
//                   onClick={handleVerifyOtp}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   disabled={loading}
//                   className="mt-4 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Verifying...
//                     </>
//                   ) : (
//                     <>
//                       <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       Verify OTP
//                     </>
//                   )}
//                 </motion.button>
//                 {otpVerificationStatus && (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="mt-3 flex items-center gap-2 text-green-700 text-sm font-medium bg-white px-3 py-2 rounded-lg"
//                   >
//                     <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     OTP Verified Successfully!
//                   </motion.div>
//                 )}
//               </motion.div>
//             )}

//             {/* Student Name Field */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.4, delay: 0.3 }}
//             >
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Student Name
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   name="studentName"
//                   value={formData.studentName}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-gray-900"
//                   placeholder="Enter student name"
//                   required
//                 />
//               </div>
//             </motion.div>

//             {/* Aadhar Number Field */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.4, delay: 0.4 }}
//             >
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Aadhar Number (Last 4 digits)
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   name="adharNumber"
//                   value={formData.adharNumber}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-gray-900"
//                   placeholder="Enter last 4 digits"
//                   required
//                 />
//               </div>
//             </motion.div>

//             {/* Submit Button */}
//             <motion.button
//               type="submit"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: 0.5 }}
//               className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:from-green-700 hover:to-emerald-800 transition-all duration-200 flex items-center justify-center gap-3 group"
//             >
//               <span>Submit</span>
//               <svg className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//               </svg>
//             </motion.button>
//           </form>
//         </div>

//         {/* Footer Info */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//           className="mt-6 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-4 text-center"
//         >
//           <p className="text-sm text-gray-600">
//             Your information is secure and will only be used for interview purposes.
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default StudentInfo;



import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const StudentInfo = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    studentName: "",
    email: "",
    adharNumber: "",
    otp: "",
    resumeUrl: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const jobid = id;

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerificationStatus, setotpVerificationStatus] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVerifyPhone = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/jobs/send-otp", {
        phoneNumber: formData.phoneNumber,
      });

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
        setotpVerificationStatus(true);
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      alert("Error verifying OTP");
    }
    setLoading(false);
  };

  // const handleResumeChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // Validate file type
  //     const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  //     if (!validTypes.includes(file.type)) {
  //       alert("Please upload a PDF or DOC file");
  //       return;
  //     }

  //     // Validate file size (5MB max)
  //     if (file.size > 5 * 1024 * 1024) {
  //       alert("File size should be less than 5MB");
  //       return;
  //     }

  //     setResumeFile(file);
  //     setResumeUploading(true);

  //     try {
  //       const formDataResume = new FormData();
  //       formDataResume.append("resume", file);

  //       const response = await axios.post("http://localhost:8080/jobs/upload-resume", formDataResume, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
        

  //       if (response.data.success && response.data.url) {
  //         setFormData((prevState) => ({
  //           ...prevState,
  //           resumeUrl: response.data.url,
  //         }));
  //         setResumeUploaded(true);
  //         alert("Resume uploaded successfully!");
  //       } else {
  //         alert("Failed to upload resume");
  //       }
  //     } catch (error) {
  //       alert("Error uploading resume");
  //       setResumeFile(null);
  //     } finally {
  //       setResumeUploading(false);
  //     }
  //   }
  // };


//   const handleResumeChange = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   // ✅ Validate file type
//   const validTypes = [
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   ];

//   if (!validTypes.includes(file.type)) {
//     alert("Please upload a PDF or DOC/DOCX file");
//     e.target.value = ""; // reset input
//     return;
//   }

//   // ✅ Validate file size (5MB max)
//   if (file.size > 5 * 1024 * 1024) {
//     alert("File size should be less than 5MB");
//     e.target.value = "";
//     return;
//   }

//   setResumeFile(file);
//   setResumeUploading(true);

//   try {
//     const formData = new FormData();
//     formData.append("resume", file); // MUST match backend field name

//     const response = await axios.post(
//       "http://localhost:9000/jobs/upload-resume",
//       formData
//       // ❌ DO NOT set Content-Type manually
//     );
//     console.log("resume url",response)

//     if (response.data?.success && response.data?.url) {
//       setFormData((prev) => ({
//         ...prev,
//         resumeUrl: response.data.url,
//       }));

//       setResumeUploaded(true);
//       alert("Resume uploaded successfully!");
//     } else {
//       alert("Upload failed. Please try again.");
//     }
//   } catch (error) {
//     console.error(error);

//     const message =
//       error.response?.data?.detail ||
//       error.response?.data?.message ||
//       "Error uploading resume";

//     alert(message);
//     setResumeFile(null);
//   } finally {
//     setResumeUploading(false);
//   }
// };



const handleResumeChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const validTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!validTypes.includes(file.type)) {
    alert("Please upload a PDF or DOC/DOCX file");
    e.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("File size should be less than 5MB");
    e.target.value = "";
    return;
  }

  setResumeFile(file);
  setResumeUploading(true);

  try {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await axios.post(
      "http://localhost:9000/jobs/upload-resume",
      formData
    );

    console.log("Full response:", response);

    // ✅ CORRECT ACCESS
    const resumeUrl = response.data?.url;

    if (resumeUrl) {
      setFormData((prev) => ({
        ...prev,
        resumeUrl: resumeUrl,
      }));

      setResumeUploaded(true);
      alert("Resume uploaded successfully!");
    } else {
      alert("Upload succeeded but URL not returned");
    }
  } catch (error) {
    console.error(error);

    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Error uploading resume";

    alert(message);
    setResumeFile(null);
  } finally {
    setResumeUploading(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (otpVerificationStatus) {
        if (!formData.resumeUrl) {
          alert("Please upload your resume");
          return;
        }

        const response = await axios.post("http://localhost:8080/jobs/save-student-details", formData);
        if (response.data.success) {
          alert("Student data saved successfully!");
          setFormData({ phoneNumber: "", studentName: "", email: "", adharNumber: "", otp: "", resumeUrl: "" });
          setShowOtpInput(false);
          setOtpSent(false);
          setResumeFile(null);
          setResumeUploaded(false);
          navigate(`/interview/${jobid}`);
        } else {
          alert("This number is already registered for an interview.");
        }
      } else {
        alert("Please Verify your OTP");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl mx-auto"
      >
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Title Section with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex p-3 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white tracking-tight mb-2">
                Student Registration
              </h2>
              <p className="text-blue-100 text-sm">
                Complete your profile to begin the interview process
              </p>
            </motion.div>
          </div>

          {/* Form Section */}
          <form className="px-8 py-10 space-y-6" onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-200">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
              </div>

              {/* Student Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-900"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-900"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </motion.div>

              {/* Phone Number Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-900"
                      placeholder="Enter phone number"
                      maxLength="10"
                      required
                    />
                  </div>
                  <motion.button
                    type="button"
                    onClick={handleVerifyPhone}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : otpSent ? (
                      "Resend OTP"
                    ) : (
                      "Verify"
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* OTP Input Section */}
              {showOtpInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <label className="block text-sm font-semibold text-blue-700">
                      Enter OTP
                    </label>
                  </div>
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-center text-lg tracking-widest font-semibold"
                    placeholder="••••••"
                    maxLength="6"
                  />
                  <motion.button
                    type="button"
                    onClick={handleVerifyOtp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="mt-4 w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verify OTP
                      </>
                    )}
                  </motion.button>
                  {otpVerificationStatus && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 flex items-center gap-2 text-blue-700 text-sm font-medium bg-white px-3 py-2 rounded-lg"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      OTP Verified Successfully!
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Aadhar Number Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Aadhar Number (Last 4 digits) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="adharNumber"
                    value={formData.adharNumber}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-900"
                    placeholder="Enter last 4 digits"
                    maxLength="4"
                    required
                  />
                </div>
              </motion.div>
            </div>

            {/* Resume Upload Section */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-200">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
                  <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Resume Upload</h3>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Resume <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume-upload"
                    className={`flex flex-col items-center justify-center w-full px-6 py-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
                      resumeUploaded
                        ? "border-green-400 bg-green-50"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-blue-400"
                    }`}
                  >
                    {resumeUploading ? (
                      <div className="text-center">
                        <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-sm font-semibold text-blue-600">Uploading...</p>
                      </div>
                    ) : resumeUploaded ? (
                      <div className="text-center">
                        <svg className="h-12 w-12 text-green-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-semibold text-green-700 mb-1">Resume Uploaded Successfully!</p>
                        <p className="text-xs text-gray-600">{resumeFile?.name}</p>
                        <p className="text-xs text-blue-600 mt-2 hover:underline">Click to change</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <svg className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              <span>Submit Application</span>
              <svg className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </form>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-4"
        >
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">Your Privacy Matters</p>
              <p className="text-xs text-gray-600">
                All information provided is encrypted and will only be used for interview purposes. We respect your privacy and handle your data with care.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentInfo;