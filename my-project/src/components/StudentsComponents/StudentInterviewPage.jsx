// import { useState, useEffect, useRef, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sun, Moon, Mic, MicOff, FileText, Play, Volume2, VolumeX } from "lucide-react";
// import { useParams ,useSearchParams} from "react-router-dom";
// import { createSession, pushTranscript, completeSession ,extractAIReport} from "../OrganisationComponents/helpers.js";

// const StudentInterviewPage = () => {
//   /* ================= STATE ================= */
//   const [darkMode, setDarkMode] = useState(false);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [interviewStarted, setInterviewStarted] = useState(false);
//   const [interviewComplete, setInterviewComplete] = useState(false);
//   const [conversation, setConversation] = useState([]);

//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [processingAI, setProcessingAI] = useState(false);

//   const [transcript, setTranscript] = useState("");
//   const [interimTranscript, setInterimTranscript] = useState("");
//   const [report, setReport] = useState(null);
//   const [muteAI, setMuteAI] = useState(false);

//   /* ================= REFS ================= */
//   const recognitionRef = useRef(null);
//   const synthRef = useRef(window.speechSynthesis);
//   const silenceTimerRef = useRef(null);
//   const conversationEndRef = useRef(null);
//   const systemPromptRef = useRef("");
//   const conversationHistoryRef = useRef([]);
//   const transcriptRef = useRef("");
//   const sessionIdRef = useRef(null); // ✅ Use ref for sessionId
  
//   // State refs for callbacks
//   const isListeningRef = useRef(false);
//   const processingAIRef = useRef(false);
//   const interviewStartedRef = useRef(false);
//   const interviewCompleteRef = useRef(false);
//   const [studentSkills, setStudentSkills] = useState([]);
//  const [jobId, setJobId] = useState("695b9465d4f905b31427de23");

//   const { studentId } = useParams();
  
//   console.log("Student ID in Interview Page:", studentId);


//   /* ================= SYNC STATE TO REFS ================= */
//   useEffect(() => {
//     isListeningRef.current = isListening;
//   }, [isListening]);

//   useEffect(() => {
//     processingAIRef.current = processingAI;
//   }, [processingAI]);

//   useEffect(() => {
//     interviewStartedRef.current = interviewStarted;
//   }, [interviewStarted]);

//   useEffect(() => {
//     interviewCompleteRef.current = interviewComplete;
//   }, [interviewComplete]);

//   /* ================= FETCH JOB FROM API ================= */
//  useEffect(() => {
//   if (!studentId) return;

//   const fetchJobAndStudent = async () => {
//     setLoading(true);
//     try {
//       /* ===================== FETCH STUDENT ===================== */
//       const studentResponse = await fetch(
//         `http://localhost:8080/jobs/student-skill/${studentId}`
//       );

//       if (!studentResponse.ok) {
//         throw new Error(`Student fetch failed: ${studentResponse.status}`);
//       }

//       const studentResult = await studentResponse.json();
//       console.log("Student API result:", studentResult.student.skills);

//       const skills = studentResult?.student?.skills || [];
//       setStudentSkills(skills);

//       setData({
//         title: "Skill-Based Technical Interview",
//         description: "Interview based strictly on candidate skills",
//         numberOfQuestions: 3,
//       });

//       setLoading(false);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to load job or student details");
//       setLoading(false);
//     }
//   };

//   fetchJobAndStudent();
// }, [studentId]);

//   useEffect(() => {
//     conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [conversation]);

//   /* ================= VOICE HELPERS ================= */
//   const speak = useCallback((text) => {
//     if (muteAI) return Promise.resolve();

//     return new Promise((resolve) => {
//       synthRef.current.cancel();
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.rate = 1.0;
//       utterance.pitch = 1.0;
      
//       utterance.onstart = () => setIsSpeaking(true);
//       utterance.onend = () => {
//         setIsSpeaking(false);
//         resolve();
//       };
//       utterance.onerror = () => {
//         setIsSpeaking(false);
//         resolve();
//       };
      
//       synthRef.current.speak(utterance);
//     });
//   }, [muteAI]);

//   const startListening = useCallback(() => {
//     console.log('👂 Attempting to start listening...', {
//       hasRecognition: !!recognitionRef.current,
//       processingAI: processingAIRef.current,
//       isListening: isListeningRef.current
//     });

//     if (!recognitionRef.current || processingAIRef.current || isListeningRef.current) {
//       console.log('❌ Cannot start listening');
//       return;
//     }

//     clearTimeout(silenceTimerRef.current);
//     setTranscript("");
//     setInterimTranscript("");
//     transcriptRef.current = "";
//     setIsListening(true);

//     try {
//       recognitionRef.current.start();
//       console.log('✅ Recognition started successfully');
//     } catch (e) {
//       console.log("⚠️ Recognition already started:", e);
//     }
//   }, []);

//   const stopListening = useCallback(() => {
//     console.log('🛑 Stopping listening...');
//     clearTimeout(silenceTimerRef.current);
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.stop();
//       } catch (e) {
//         console.log('Stop error:', e);
//       }
//     }
//     setIsListening(false);
//   }, []);

//   /* ================= SUBMIT ANSWER ================= */
// const submitResponseWithText = useCallback(async (messageText) => {
//   if (processingAIRef.current) return;

//   const message = messageText.trim();
//   if (!message) {
//     setTimeout(() => startListening(), 500);
//     return;
//   }

//   stopListening();
//   setProcessingAI(true);

//   conversationHistoryRef.current.push({
//     role: "user",
//     content: message
//   });

//   setConversation(prev => [...prev, { role: "user", content: message }]);

//   try {
//     const res = await fetch("http://localhost:9000/api/openai", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         model: "gpt-4o",
//         messages: [
//           { role: "system", content: systemPromptRef.current },
//           ...conversationHistoryRef.current
//         ]
//       })
//     });

//     const json = await res.json();
//     const aiMessage = json.choices?.[0]?.message?.content;

//     conversationHistoryRef.current.push({
//       role: "assistant",
//       content: aiMessage
//     });

//     setConversation(prev => [...prev, { role: "assistant", content: aiMessage }]);

//     await speak(aiMessage);

//     if (aiMessage.includes("INTERVIEW_COMPLETE")) {
//       setInterviewComplete(true);
//       await completeSession(sessionIdRef.current);
//       await generateReport();
//       return;
//     }

//     setProcessingAI(false);
//     setTimeout(() => startListening(), 500);

//   } catch (err) {
//     setProcessingAI(false);
//     setTimeout(() => startListening(), 1000);
//   }
// }, []);

//   /* ================= SPEECH RECOGNITION SETUP ================= */
//   useEffect(() => {
//     if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
//       setError("Speech recognition not supported. Please use Chrome or Edge.");
//       return;
//     }

//     const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const rec = new SR();

//     rec.lang = "en-US";
//     rec.continuous = true;
//     rec.interimResults = true;

//     rec.onresult = (event) => {
//       console.log('🎤 Speech result received');
//       clearTimeout(silenceTimerRef.current);

//       let interim = "";
//       let final = "";

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const text = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           final += text + " ";
//         } else {
//           interim += text;
//         }
//       }

//       if (final) {
//         const newTranscript = transcriptRef.current + final;
//         transcriptRef.current = newTranscript;
//         setTranscript(newTranscript);
//         setInterimTranscript("");
//         console.log('✅ Final transcript:', newTranscript);
//       } else {
//         setInterimTranscript(interim);
//       }

//       silenceTimerRef.current = setTimeout(() => {
//         console.log('⏱️ Silence detected, submitting...');
//         if (transcriptRef.current.trim()) {
//           stopListening();
//           submitResponseWithText(transcriptRef.current);
//         }
//       }, 2000);
//     };

//     rec.onend = () => {
//       console.log('🔚 Recognition ended');

//       if (isListeningRef.current && 
//           !processingAIRef.current && 
//           interviewStartedRef.current && 
//           !interviewCompleteRef.current) {
//         console.log('🔄 Auto-restarting recognition...');
//         try {
//           rec.start();
//         } catch (e) {
//           console.log("⚠️ Recognition restart failed:", e);
//         }
//       }
//     };

//     rec.onerror = (event) => {
//       console.error("❌ Speech recognition error:", event.error);
      
//       if (event.error === "no-speech" || event.error === "aborted") {
//         return;
//       }
      
//       setIsListening(false);
//       setTimeout(() => {
//         if (interviewStartedRef.current && 
//             !interviewCompleteRef.current && 
//             !processingAIRef.current) {
//           startListening();
//         }
//       }, 1000);
//     };

//     recognitionRef.current = rec;

//     return () => {
//       clearTimeout(silenceTimerRef.current);
//       if (rec) {
//         rec.stop();
//       }
//       if (synthRef.current) {
//         synthRef.current.cancel();
//       }
//     };
//   }, [submitResponseWithText, startListening, stopListening]);


// //   const startInterview = async () => {
// //     console.log("Starting interview for job:", data);
// //     console.log("Student Skills:", studentSkills);
// //   if (!data) {
// //     setError("No skills found for this candidate");
// //     return;
// //   }

// //   const skillsText = studentSkills.join(", ");
// //   console.log("Skills Text:", skillsText);

// //   const systemPrompt = `
// // You are an experienced IIT interview panelist conducting a real-time technical interview.

// // CANDIDATE SKILLS:
// // ${skillsText}

// // STRICT RULES:
// // - Ask questions ONLY from the listed skills
// // - Do NOT ask anything outside these skills
// // - Adjust difficulty based on answers
// // - Ask ONE question at a time
// // - Be conversational and human
// // - Ask approximately ${data.numberOfQuestions} questions
// // - End with the exact phrase: INTERVIEW_COMPLETE

// // INTERVIEW STYLE:
// // - Natural, human tone
// // - Short acknowledgements
// // - Follow-up questions allowed only within skills
// // - No solutions unless asked

// // Begin the interview naturally.
// // `.trim();

// //   systemPromptRef.current = systemPrompt;
// //   setInterviewStarted(true);
// //   setProcessingAI(true);

// //   try {
// //     console.log("Creating interview session for student:", studentId);
// //     console.log("Only Id",id)
// //     const session = await createSession(studentId, id);
// //     sessionIdRef.current = session._id;

// //     const res = await fetch("http://localhost:9000/api/openai", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         model: "gpt-4o",
// //         messages: [
// //           { role: "system", content: systemPrompt },
// //           { role: "user", content: "Hello, I'm ready." }
// //         ]
// //       })
// //     });

// //     const json = await res.json();
// //     const aiMessage = json.choices?.[0]?.message?.content;

// //     conversationHistoryRef.current = [
// //       { role: "assistant", content: aiMessage }
// //     ];

// //     setConversation([{ role: "assistant", content: aiMessage }]);

// //     await speak(aiMessage);
// //     setProcessingAI(false);
// //     setTimeout(() => startListening(), 500);

// //   } catch (err) {
// //     setError("Failed to start interview");
// //     setInterviewStarted(false);
// //     setProcessingAI(false);
// //   }
// // };


// const startInterview = async () => {
//   console.log("Starting interview");
//   console.log("Student ID:", studentId);
//   console.log("Job ID:", jobId);
//   console.log("Skills:", studentSkills);

//   if (!data) {
//     setError("Interview data not ready");
//     return;
//   }

//   if (!Array.isArray(studentSkills) || studentSkills.length === 0) {
//     setError("No skills found for this candidate");
//     return;
//   }

//   const skillsText = studentSkills.join(", ");

//   const systemPrompt = `
// You are an experienced IIT interview panelist conducting a real-time technical interview.

// CANDIDATE SKILLS:
// ${skillsText}

// STRICT RULES:
// - Ask questions ONLY from the listed skills
// - Do NOT ask anything outside these skills
// - Ask ONE question at a time
// - Be conversational and human
// - Ask approximately ${data.numberOfQuestions} questions
// - End with the exact phrase: INTERVIEW_COMPLETE

// Begin the interview naturally.
// `.trim();

//   systemPromptRef.current = systemPrompt;
//   setInterviewStarted(true);
//   setProcessingAI(true);

//   try {
//     const session = await createSession(studentId, jobId);
//     sessionIdRef.current = session._id;

//     const res = await fetch("http://localhost:9000/api/openai", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         model: "gpt-4o",
//         messages: [
//           { role: "system", content: systemPrompt },
//           { role: "user", content: "Hello, I'm ready." }
//         ]
//       })
//     });

//     if (!res.ok) {
//       throw new Error(`OpenAI API failed: ${res.status}`);
//     }

//     const json = await res.json();
//     const aiMessage = json.choices?.[0]?.message?.content;

//     if (!aiMessage) {
//       throw new Error("Empty AI response");
//     }

//     conversationHistoryRef.current = [
//       { role: "assistant", content: aiMessage }
//     ];

//     setConversation([{ role: "assistant", content: aiMessage }]);

//     await speak(aiMessage);
//     setProcessingAI(false);
//     setTimeout(() => startListening(), 500);

//   } catch (err) {
//     console.error("Start interview error:", err);
//     setError(err.message || "Failed to start interview");
//     setInterviewStarted(false);
//     setProcessingAI(false);
//   }
// };


//   /* ================= GENERATE REPORT ================= */
//   const generateReport = async () => {
//     setProcessingAI(true);

//     const conversationText = conversationHistoryRef.current
//       .map(msg => `${msg.role === 'assistant' ? 'Interviewer' : 'Candidate'}: ${msg.content}`)
//       .join('\n\n');

//     console.log("Generating report for conversation:", conversationText);

//     try {
//       const res = await fetch("http://localhost:9000/api/openai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "gpt-4o",
//           messages: [{
//             role: "user",
//             content:`
//             Based on the following interview transcript for the position of "${data?.title}", generate a comprehensive evaluation.

// INTERVIEW TRANSCRIPT:
// ${conversationText}

// Return the response in TWO PARTS:

// ====================
// PART 1: STRUCTURED JSON (for storage)
// ====================

// Return ONLY valid JSON in the following schema:

// {
//   "overallRating": number (0–10),
//   "scores": {
//     "technical": number (0–10),
//     "communication": number (0–10),
//     "problemSolving": number (0–10)
//   },
//   "strengths": [string],
//   "weaknesses": [string],
//   "areasForDevelopment": [string],
//   "highlights": [string],
//   "recommendation": {
//     "decision": "Strongly Recommend" | "Recommend" | "Consider" | "Do Not Recommend",
//     "confidence": number (0–1)
//   }
// }

// Rules:
// - Numbers must be numeric (not strings)
// - Arrays must contain concise bullet points
// - Do not add extra fields
// - Do not include explanations outside JSON

// ====================
// PART 2: HUMAN-READABLE REPORT
// ====================

// Generate a professional evaluation report with the following sections:

// 1. OVERALL ASSESSMENT (Rating out of 10)
// 2. TECHNICAL COMPETENCE
// 3. COMMUNICATION SKILLS
// 4. PROBLEM-SOLVING ABILITY
// 5. KEY HIGHLIGHTS
// 6. AREAS FOR DEVELOPMENT
// 7. FINAL RECOMMENDATION

// Tone:
// - Professional
// - Constructive
// - Specific
// - Suitable for hiring managers
//             `
//           }]
//         })
//       });

     
//   if (!res.ok) {
//     throw new Error(`API Error: ${res.status}`);
//   }

//   const json = await res.json();
//   const aiContent = json.choices?.[0]?.message?.content;
//   console.log("ai Report content",aiContent)

//   const { structured, reportText } = extractAIReport(aiContent);

//   // UI rendering (same as today)
//      setReport(reportText || "Report generation failed");
//       setProcessingAI(false);


//     // send once interview ends
//    try {
//   const reportSave = await fetch("http://localhost:8080/api/interview-report", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       aiContent,
//       sessionId: sessionIdRef.current,
//       candidateId: studentId,
//       jobId: jobId,
//       // jobTitle: data?.title
//       jobTitle:"Intern"
//     }),
//   })

//   // ❌ HTTP-level failure
//   if (!reportSave.ok) {
//     console.error("❌ Report save failed (HTTP):", reportSave.status);
//     return;
//   }

//   const saveResult = await reportSave.json();

//   if (saveResult.success) {
//     console.log("✅ Interview report saved successfully");
//     console.log("📄 Report ID:", saveResult.reportId);
//   } else {
//     console.error("❌ Report save failed:", saveResult.message);
//   }
//     } catch (err) {
//       console.error("Report Saving  error:", err);
//       setReport("Error In saving  report. Please try again.");
//     }
//   } catch (err) {
//   // Report generation error
//       console.error("Report generation error:", err);
//       setReport("Error generating report. Please try again.");
//       setProcessingAI(false);
// }
//   }

//   const resetInterview = () => {
//     setInterviewStarted(false);
//     setInterviewComplete(false);
//     setConversation([]);
//     setReport(null);
//     setTranscript("");
//     setInterimTranscript("");
//     transcriptRef.current = "";
//     setError(null);
//     conversationHistoryRef.current = [];
//     systemPromptRef.current = "";
//     sessionIdRef.current = null; // ✅ Clear session ref
//     synthRef.current.cancel();
//     stopListening();
//   };

//   const handleManualSubmit = () => {
//     if (transcriptRef.current.trim()) {
//       stopListening();
//       submitResponseWithText(transcriptRef.current);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
//         <div className="text-2xl animate-pulse">Loading interview details...</div>
//       </div>
//     );
//   }

//   return (
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-gray-900"} min-h-screen transition-all duration-300`}>
//       {/* Dark Mode Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="fixed top-6 right-6 p-3.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 z-50"
//       >
//         {darkMode ? <Sun size={22} /> : <Moon size={22} />}
//       </button>

//       {/* Mute Toggle */}
//       {interviewStarted && (
//         <button
//           onClick={() => setMuteAI(!muteAI)}
//           className="fixed top-6 right-24 p-3.5 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 z-50"
//           title={muteAI ? "Unmute AI voice" : "Mute AI voice"}
//         >
//           {muteAI ? <VolumeX size={22} /> : <Volume2 size={22} />}
//         </button>
//       )}

//       <div className="container mx-auto px-4 py-12 max-w-6xl">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
//             AI Voice Interview
//           </h1>
          
//           {data && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto`}
//             >
//               <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
//               <span className="px-5 py-2.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
//                 {data.numberOfQuestions} Questions
//               </span>
//             </motion.div>
//           )}
//         </motion.div>

//         {/* Error */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-8 p-5 bg-red-100 dark:bg-red-900 rounded-2xl text-center text-red-800 dark:text-red-200"
//           >
//             ⚠️ {error}
//           </motion.div>
//         )}

//         {/* Pre-Interview */}
//         {!interviewStarted && !interviewComplete && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center"
//           >
//             <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-10 rounded-3xl shadow-2xl max-w-xl mx-auto`}>
//               <h3 className="text-2xl font-bold mb-4">Ready to begin?</h3>
//               <p className="text-gray-600 dark:text-gray-400 mb-8">
//                 Enable your microphone and speak clearly.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={startInterview}
//                 disabled={!data}
//                 className="w-full px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
//               >
//                 <Play size={26} />
//                 Start Interview
//               </motion.button>
//             </div>
//           </motion.div>
//         )}

//         {/* Active Interview */}
//         {interviewStarted && !interviewComplete && (
//           <div className="space-y-8">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8 max-h-[500px] overflow-y-auto`}
//             >
//               <AnimatePresence>
//                 {conversation.map((msg, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className={`mb-6 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div className={`max-w-[80%] px-6 py-4 rounded-2xl ${
//                       msg.role === 'assistant'
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
//                         : 'bg-gray-100 dark:bg-gray-700'
//                     }`}>
//                       <p className="text-xs font-semibold mb-1 opacity-80">
//                         {msg.role === 'assistant' ? '🎓 Interviewer' : '👤 You'}
//                       </p>
//                       <p className="text-sm">{msg.content}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//               <div ref={conversationEndRef} />
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-10`}
//             >
//               <div className="flex flex-col items-center gap-6">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={isListening ? stopListening : startListening}
//                   disabled={isSpeaking || processingAI}
//                   className={`p-10 rounded-full ${
//                     isListening
//                       ? 'bg-red-500 animate-pulse'
//                       : 'bg-blue-500'
//                   } text-white disabled:opacity-50 shadow-2xl`}
//                 >
//                   {isListening ? <MicOff size={48} /> : <Mic size={48} />}
//                 </motion.button>

//                 <div className="text-center">
//                   {isSpeaking && <p className="text-blue-500 font-semibold">🎤 AI is speaking...</p>}
//                   {processingAI && !isSpeaking && <p className="text-purple-500 font-semibold">⚡ Processing...</p>}
//                   {isListening && !isSpeaking && !processingAI && <p className="text-green-500 font-semibold">🎙️ Listening...</p>}
//                   {!isListening && !isSpeaking && !processingAI && <p className="text-gray-500">Click to speak</p>}
//                 </div>

//                 {(transcript || interimTranscript) && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="w-full p-6 bg-gray-100 dark:bg-gray-700 rounded-2xl"
//                   >
//                     <p className="text-sm mb-3">
//                       <span className="font-semibold">You're saying: </span>
//                       {transcript}
//                       <span className="text-gray-400 italic">{interimTranscript}</span>
//                     </p>
//                     {transcript && !processingAI && (
//                       <button
//                         onClick={handleManualSubmit}
//                         className="w-full px-6 py-3 bg-green-500 text-white rounded-xl font-semibold"
//                       >
//                         ✓ Submit Now
//                       </button>
//                     )}
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {/* Report */}
//             {/* Interview Complete - Report */}
//          {interviewComplete && report && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-3xl shadow-2xl p-10 border`}
//           >
//             <div className="flex flex-col items-center mb-8">
//               <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-4">
//                 <FileText size={56} className="text-blue-600 dark:text-blue-400" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
//                 Interview Evaluation Report
//               </h2>
//               <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4"></div>
//             </div>

//             <div className="prose dark:prose-invert max-w-none">
//               <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} p-8 rounded-2xl border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-green-600 dark:text-green-400 m-0">
//                   {report}
//                 </pre>
//               </div>
//             </div>

//             <div className="mt-10 flex justify-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={resetInterview}
//                 className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-200 flex items-center gap-3 group"
//               >
//                 <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//                 Start New Interview
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };


// export default StudentInterviewPage;


import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Moon, Mic, MicOff, FileText, Play, Volume2, VolumeX,LogOut
} from "lucide-react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios"; // ✅ Added axios
import { createSession, pushTranscript, completeSession ,extractAIReport} from "../OrganisationComponents/helpers.js";



const api = axios.create({
  baseURL: "http://localhost:8080/students",
  withCredentials: true,
});

const pageVariants = {
  initial: { opacity: 0, x: 60 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const StudentInterviewPage = () => {
  const [step, setStep] = useState(1); // 1=Welcome, 2=Interview, 3=Report
  const [darkMode, setDarkMode] = useState(false);
  const [muteAI, setMuteAI] = useState(false);
  const [processingAI, setProcessingAI] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [report, setReport] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [studentSkills, setStudentSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [interviewComplete, setInterviewComplete] = useState(false);

// Add these new state variables at the top with other useState declarations:
const [fullscreenExitCount, setFullscreenExitCount] = useState(0);
const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
const [warningMessage, setWarningMessage] = useState("");
const [requiresUserAction, setRequiresUserAction] = useState(false);

  // Demo student ID and job ID
const { studentId } = useParams();
  const jobId = "695b9465d4f905b31427de23";
  const navigate = useNavigate();
  const isInterviewActiveRef = useRef(false);



  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const silenceTimerRef = useRef(null);
  const systemPromptRef = useRef("");
  const conversationHistoryRef = useRef([]);
  const transcriptRef = useRef("");
  const sessionIdRef = useRef(null);
  const conversationEndRef = useRef(null);
  
  // State refs for callbacks
  const isListeningRef = useRef(false);
  const processingAIRef = useRef(false);
  const interviewStartedRef = useRef(false);

// // Update the interviewStartedRef sync effect:
// useEffect(() => {
//   interviewStartedRef.current = step === 2;
//   isInterviewActiveRef.current = step === 2;
// }, [step]);


  // Sync state to refs
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    processingAIRef.current = processingAI;
  }, [processingAI]);

  useEffect(() => {
    interviewStartedRef.current = step === 2;
  }, [step]);


// ✅ Check JWT session on mount
useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await api.get("/check-auth");
      if (!res.data.success) {
        navigate("/StudentSignin");
      }
    } catch {
      navigate("/StudentSignin");
    }
  };
  checkAuth();
}, [navigate]);


// // Add this useEffect to monitor fullscreen changes:
// useEffect(() => {
//   const handleFullscreenChange = () => {
//     const isFullscreen = !!(
//       document.fullscreenElement ||
//       document.webkitFullscreenElement ||
//       document.msFullscreenElement
//     );

//     // Only track exits during active interview (step 2)
//     if (!isFullscreen && isInterviewActiveRef.current && step === 2) {
//       setFullscreenExitCount((prev) => {
//         const newCount = prev + 1;
        
//         if (newCount === 1) {
//           // First warning
//           setWarningMessage("⚠️ Warning 1/2: Please stay in fullscreen mode during the interview.");
//           setShowFullscreenWarning(true);
          
//           // Auto-hide warning and re-enter fullscreen
//           setTimeout(() => {
//             setShowFullscreenWarning(false);
//             enterFullscreen();
//           }, 3000);
          
//         } else if (newCount === 2) {
//           // Second warning
//           setWarningMessage("⚠️ Final Warning 2/2: Exiting fullscreen again will end the interview!");
//           setShowFullscreenWarning(true);
          
//           // Auto-hide warning and re-enter fullscreen
//           setTimeout(() => {
//             setShowFullscreenWarning(false);
//             enterFullscreen();
//           }, 3000);
          
//         } else if (newCount >= 3) {
//           // End interview on third exit
//           setWarningMessage("❌ Interview terminated due to multiple fullscreen exits.");
//           setShowFullscreenWarning(true);
          
//           // End the interview
//           stopListening();
//           synthRef.current.cancel();
          
//           setTimeout(async () => {
//             setShowFullscreenWarning(false);
//             await completeSession(sessionIdRef.current);
            
//             // Save a note about early termination
//             const terminationNote = "Interview terminated: Candidate exited fullscreen mode more than 2 times.";
//             conversationHistoryRef.current.push({
//               role: "system",
//               content: terminationNote
//             });
            
//             await generateReport();
//           }, 2000);
//         }
        
//         return newCount;
//       });
//     }
//   };

//   // Add event listeners for fullscreen change
//   document.addEventListener("fullscreenchange", handleFullscreenChange);
//   document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
//   document.addEventListener("msfullscreenchange", handleFullscreenChange);

//   return () => {
//     document.removeEventListener("fullscreenchange", handleFullscreenChange);
//     document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
//     document.removeEventListener("msfullscreenchange", handleFullscreenChange);
//   };
// }, [step]);

// // Add this function to enter fullscreen:
// const enterFullscreen = async () => {
//   try {
//     const elem = document.documentElement;
//     if (elem.requestFullscreen) {
//       await elem.requestFullscreen();
//     } else if (elem.webkitRequestFullscreen) {
//       await elem.webkitRequestFullscreen();
//     } else if (elem.msRequestFullscreen) {
//       await elem.msRequestFullscreen();
//     }
//   } catch (err) {
//     console.error("Error entering fullscreen:", err);
//     setError("Unable to enter fullscreen mode");
//   }
// };

// // Add this function to exit fullscreen:
// const exitFullscreen = () => {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   } else if (document.webkitExitFullscreen) {
//     document.webkitExitFullscreen();
//   } else if (document.msExitFullscreen) {
//     document.msExitFullscreen();
//   }
// };



// ============== UPDATE THIS EFFECT ==============
useEffect(() => {
  interviewStartedRef.current = step === 2;
  isInterviewActiveRef.current = step === 2;
}, [step]);

// ============== ADD FULLSCREEN FUNCTIONS ==============
const enterFullscreen = async () => {
  try {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      await elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      await elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      await elem.msRequestFullscreen();
    }
    setRequiresUserAction(false);
    setShowFullscreenWarning(false);
  } catch (err) {
    console.error("Error entering fullscreen:", err);
    setError("Unable to enter fullscreen mode. Please try clicking the button again.");
  }
};

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

const checkIfFullscreen = () => {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
};
const stopListening = useCallback(() => {
    clearTimeout(silenceTimerRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.log('Stop error:', e);
      }
    }
    setIsListening(false);
  }, []);
// ============== FULLSCREEN MONITORING ==============
useEffect(() => {
  const handleFullscreenChange = () => {
    const isFullscreen = checkIfFullscreen();

    // Only track exits during active interview (step 2)
    if (!isFullscreen && isInterviewActiveRef.current && step === 2) {
      setFullscreenExitCount((prev) => {
        const newCount = prev + 1;
        
        if (newCount === 1) {
          // First warning - require manual re-entry
          setWarningMessage("⚠️ Warning 1/2: You have exited fullscreen mode. Please click the button below to return to fullscreen.");
          setShowFullscreenWarning(true);
          setRequiresUserAction(true);
          
          // Pause the interview
          stopListening();
          
        } else if (newCount === 2) {
          // Second warning - require manual re-entry
          setWarningMessage("⚠️ Final Warning 2/2: This is your last chance. Exiting fullscreen again will terminate the interview!");
          setShowFullscreenWarning(true);
          setRequiresUserAction(true);
          
          // Pause the interview
          stopListening();
          
        } else if (newCount >= 3) {
          // End interview on third exit
          setWarningMessage("❌ Interview Terminated: You have exited fullscreen mode 3 times.");
          setShowFullscreenWarning(true);
          setRequiresUserAction(false);
          
          // End the interview
          stopListening();
          synthRef.current.cancel();
          
          setTimeout(async () => {
            if (sessionIdRef.current) {
              await completeSession(sessionIdRef.current);
            }
            
            // Add termination note to conversation
            const terminationNote = "Interview terminated: Candidate exited fullscreen mode 3 times.";
            conversationHistoryRef.current.push({
              role: "system",
              content: terminationNote
            });
            
            await generateReport();

    //          // ✅ HIDE WARNING AFTER REPORT IS GENERATED
    // setTimeout(() => {
    //   setShowFullscreenWarning(false);
    // }, 500);
          }, 3000);
        }
        
        return newCount;
      });
    }
  };

  // Add event listeners for fullscreen change
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
  document.addEventListener("msfullscreenchange", handleFullscreenChange);

  return () => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.removeEventListener("msfullscreenchange", handleFullscreenChange);
  };
}, [step, stopListening]);

// Handler to resume interview after re-entering fullscreen
const handleResumeInterview = async () => {
  await enterFullscreen();
  
  // Wait for fullscreen to activate, then resume
  setTimeout(() => {
    if (checkIfFullscreen()) {
      setShowFullscreenWarning(false);
      setRequiresUserAction(false);
      
      // Resume listening if not processing
      if (!processingAIRef.current && step === 2) {
        setTimeout(() => startListening(), 500);
      }
    }
  }, 500);
};

// ✅ Logout handler
const handleLogout = async () => {
  try {
    await api.post("/logout");
    localStorage.removeItem("studentId");
    navigate("/StudentSignin");
  } catch (err) {
    console.error("Logout failed:", err);
    alert("Logout failed, please try again.");
  }
};

// Add this useEffect near your other useEffects (around line 200-300)
useEffect(() => {
  // Hide warning modal when moving to report page
  if (step === 3) {
    setShowFullscreenWarning(false);
    setRequiresUserAction(false);
  }
}, [step]);

// Fetch student data from API
  useEffect(() => {
    if (!studentId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const studentResponse = await fetch(
          `http://localhost:8080/students/student-skill/${studentId}`
        );

        if (!studentResponse.ok) {
          throw new Error(`Student fetch failed: ${studentResponse.status}`);
        }

        const studentResult = await studentResponse.json();
        console.log("Student API result:", studentResult.student.skills);

        const skills = studentResult?.student?.skills || [];
        setStudentSkills(skills);
        setData({
          title: "Skill-Based Technical Interview",
          description: "Interview based strictly on candidate skills",
          numberOfQuestions: 3,
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load student data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [studentId]);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // AI Voice
  const speak = useCallback(
    (text) =>
      new Promise((resolve) => {
        if (muteAI) return resolve();
        synthRef.current.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 1;
        utter.onstart = () => setIsSpeaking(true);
        utter.onend = () => {
          setIsSpeaking(false);
          resolve();
        };
        synthRef.current.speak(utter);
      }),
    [muteAI]
  );

  const startListening = useCallback(() => {
    if (!recognitionRef.current || processingAIRef.current || isListeningRef.current) {
      return;
    }

    clearTimeout(silenceTimerRef.current);
    setTranscript("");
    setInterimTranscript("");
    transcriptRef.current = "";
    setIsListening(true);

    try {
      recognitionRef.current.start();
    } catch (e) {
      console.log("Recognition already started:", e);
    }
  }, []);

  

  // Submit Response to AI
const submitResponseWithText = useCallback(async (messageText) => {
  // Prevent concurrent processing
  if (processingAIRef.current) return;

  const message = messageText.trim();
  if (!message) {
    setTimeout(() => startListening(), 500);
    return;
  }

  // Stop speech recognition while processing
  stopListening();
  setProcessingAI(true);

  // Push user message to history and UI
  conversationHistoryRef.current.push({
    role: "user",
    content: message
  });

  setConversation(prev => [...prev, { role: "user", content: message }]);

  try {
    // === 🌐 Call OpenAI API ===
    const res = await fetch("http://localhost:9000/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPromptRef.current },
          ...conversationHistoryRef.current
        ]
      })
    });

    if (!res.ok) {
      throw new Error(`OpenAI API failed: ${res.status}`);
    }

    const json = await res.json();
    const aiMessage = json.choices?.[0]?.message?.content || "I'm sorry, I didn't quite get that. Could you clarify?";

    // Push assistant response to memory and UI
    conversationHistoryRef.current.push({
      role: "assistant",
      content: aiMessage
    });

    setConversation(prev => [...prev, { role: "assistant", content: aiMessage }]);

    // 🎙️ AI Voice Output
    await speak(aiMessage);

    // 🧩 End of interview trigger
    if (aiMessage.includes("INTERVIEW_COMPLETE")) {
      setInterviewComplete(true);
      await completeSession(sessionIdRef.current);
      await generateReport();
      return;
    }

    // ✅ Resume listening for next candidate response
    setProcessingAI(false);
    setTimeout(() => startListening(), 500);

  } catch (err) {
    console.error("❌ AI response error:", err);
    setProcessingAI(false);
    setTimeout(() => startListening(), 1000);
  }
}, [startListening, stopListening, speak]);



  // Speech Recognition Setup
  useEffect(() => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      setError("Speech recognition not supported. Please use Chrome or Edge.");
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();

    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (event) => {
      clearTimeout(silenceTimerRef.current);

      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += text + " ";
        } else {
          interim += text;
        }
      }

      if (final) {
        const newTranscript = transcriptRef.current + final;
        transcriptRef.current = newTranscript;
        setTranscript(newTranscript);
        setInterimTranscript("");
      } else {
        setInterimTranscript(interim);
      }

      silenceTimerRef.current = setTimeout(() => {
        if (transcriptRef.current.trim()) {
          stopListening();
          submitResponseWithText(transcriptRef.current);
        }
      }, 2000);
    };

    rec.onend = () => {
      if (isListeningRef.current && 
          !processingAIRef.current && 
          interviewStartedRef.current) {
        try {
          rec.start();
        } catch (e) {
          console.log("Recognition restart failed:", e);
        }
      }
    };

    rec.onerror = (event) => {
      if (event.error === "no-speech" || event.error === "aborted") {
        return;
      }
      
      setIsListening(false);
      setTimeout(() => {
        if (interviewStartedRef.current && !processingAIRef.current) {
          startListening();
        }
      }, 1000);
    };

    recognitionRef.current = rec;

    return () => {
      clearTimeout(silenceTimerRef.current);
      if (rec) rec.stop();
      if (synthRef.current) synthRef.current.cancel();
    };
  }, [submitResponseWithText, startListening, stopListening]);

// -------------------Start Interview -------------------
const startInterview = async () => {
  console.log("🚀 Starting interview...");
  console.log("Student ID:", studentId);
  console.log("Job ID:", jobId);
  console.log("Extracted skills:", studentSkills);
  console.log("🚀 Starting interview...");


  // Reset fullscreen exit count
  setFullscreenExitCount(0);
  setShowFullscreenWarning(false);
  setRequiresUserAction(false);
  
  // Enter fullscreen before starting
  await enterFullscreen();
  // ✅ Move to interview step
  setStep(2);
  setError(null);

  // ✅ Validation
  if (!data || !Array.isArray(studentSkills) || studentSkills.length === 0) {
    setError("Missing candidate skills or data");
    return;
  }

  // ✅ Format candidate skills for the AI
  const skillsText = studentSkills
    .map((s) => `${s.skill} (${s.level})`)
    .join(", ");

  console.log("Formatted Skills for AI:", skillsText);

  // ✅ Build system prompt
//   const systemPrompt = `
// You are an experienced IIT interview panelist conducting a real-time technical interview.

// CANDIDATE SKILLS (with proficiency level):
// ${skillsText}

// STRICT RULES:
// - Ask questions ONLY from the listed skills
// - Do NOT ask anything outside these skills
// - Adjust question difficulty based on the candidate’s level (Beginner / Intermediate / Expert)
// - Ask ONE question at a time
// - Be conversational and human
// - Ask approximately ${data.numberOfQuestions} questions
// - End with the exact phrase: INTERVIEW_COMPLETE

// INTERVIEW STYLE:
// - Natural, human tone
// - Short acknowledgements between questions
// - Ask follow-up questions only within these skills
// - Do NOT provide solutions unless explicitly requested
// - Keep the tone supportive and engaging

// Begin the interview naturally with a greeting and your first question.
//   `.trim();


const systemPrompt = `You are an experienced IIT interview panelist conducting a real-time, human-like technical and behavioral interview for the position of "${data.title}".

CANDIDATE SKILLS (with proficiency level):
 ${skillsText}

Your goal is to simulate an actual live interview, not a scripted Q&A.

INTERVIEW STYLE & BEHAVIOR:
- Speak naturally, like a human interviewer
- Use short acknowledgments such as "Okay", "I see", "That's interesting", "Hmm", "Got it"
- Ask follow-up questions based on the candidate's previous answer
- Adjust question difficulty dynamically based on how well the candidate responds
- Do NOT ask all questions at once
- Ask only ONE question at a time
- Wait for the candidate's response before continuing
- Keep responses conversational and brief (2-3 sentences max unless explaining something)

INTERVIEW STRUCTURE:
1. Start with a brief, friendly introduction (1-2 sentences)
2. Begin with an easy warm-up question
3. Gradually increase difficulty
4. Mix technical, conceptual, and behavioral questions
5. Ask clarification or probing questions if an answer is vague or incomplete
6. If the candidate struggles, gently guide them instead of immediately moving on
7. Maintain a professional but calm and human tone throughout

HUMANIZATION RULES:
- Avoid robotic phrasing
- Avoid long monologues
- React briefly to answers before asking the next question (e.g., "Interesting. So...")
- Occasionally rephrase or simplify questions like a real interviewer
- Maintain interview pacing similar to a real IIT panel
- Show genuine interest in their answers

IMPORTANT CONSTRAINTS:
- Do NOT reveal evaluation criteria during the interview
- Do NOT give solutions unless explicitly asked
- Do NOT mention that you are an AI
- Do NOT use markdown or formatting
- Keep responses concise and conversational

ENDING THE INTERVIEW:
- Thank the candidate professionally
- End your final message with the exact phrase: INTERVIEW_COMPLETE

Now begin the interview naturally.`;


  console.log("🧾 System Prompt:", systemPrompt);
  systemPromptRef.current = systemPrompt;
  setProcessingAI(true);

  try {
    // ✅ Create backend session for this interview
    const session = await createSession(studentId, jobId);
    sessionIdRef.current = session._id;
    console.log("✅ Session created:", sessionIdRef.current);

    // ✅ Actual AI request to OpenAI
    const res = await fetch("http://localhost:9000/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Hello, I'm ready for the interview." },
        ],
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI API failed with status: ${res.status}`);
    }
    console.log("✅ OpenAI response received");

    // ✅ Extract AI's first message   
    

    const json = await res.json();
    console.log("✅ OpenAI response JSON:", json);
    const aiMessage = json.choices?.[0]?.message?.content
    console.log("🤖 AI Message:", aiMessage);

    // ✅ Save first AI message
    conversationHistoryRef.current = [{ role: "assistant", content: aiMessage }];
    setConversation([{ role: "assistant", content: aiMessage }]);

    // ✅ Speak AI message
    await speak(aiMessage);

    // ✅ Mark interview as started and ready to listen
    setProcessingAI(false);
    setTimeout(() => startListening(), 500);
  } catch (err) {
    console.error("❌ Interview start error:", err);
    setError(err.message || "Failed to start interview");
    setProcessingAI(false);
  }
};

  // Generate Report
const generateReport = async () => {
     setShowFullscreenWarning(false);
  setRequiresUserAction(false);
  
  setProcessingAI(true);

  // ✅ Convert conversation history into a readable transcript
  const conversationText = conversationHistoryRef.current
    .map((msg) => `${msg.role === "assistant" ? "Interviewer" : "Candidate"}: ${msg.content}`)
    .join("\n\n");

  console.log("🧾 Generating AI evaluation for conversation:\n", conversationText);

  try {
    // ✅ Request comprehensive evaluation report from AI
    const res = await fetch("http://localhost:9000/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `
Based on the following interview transcript for the position of "${data?.title || "Intern"}",
generate a professional and comprehensive evaluation.

INTERVIEW TRANSCRIPT:
${conversationText}

Return the response in TWO PARTS:

====================
PART 1: STRUCTURED JSON (for storage)
====================

Return ONLY valid JSON in the following schema:

{
  "overallRating": number (0–10),
  "scores": {
    "technical": number (0–10),
    "communication": number (0–10),
    "problemSolving": number (0–10)
  },
  "strengths": [string],
  "weaknesses": [string],
  "areasForDevelopment": [string],
  "highlights": [string],
  "recommendation": {
    "decision": "Strongly Recommend" | "Recommend" | "Consider" | "Do Not Recommend",
    "confidence": number (0–1)
  }
}

Rules:
- Numbers must be numeric (not strings)
- Arrays must contain concise bullet points
- Do not add extra fields
- Do not include explanations outside JSON

====================
PART 2: HUMAN-READABLE REPORT
====================

Generate a professional evaluation report with the following sections:

1. OVERALL ASSESSMENT (Rating out of 10)
2. TECHNICAL COMPETENCE
3. COMMUNICATION SKILLS
4. PROBLEM-SOLVING ABILITY
5. KEY HIGHLIGHTS
6. AREAS FOR DEVELOPMENT
7. FINAL RECOMMENDATION

Tone:
- Professional
- Constructive
- Specific
- Suitable for hiring managers
            `,
          },
        ],
      }),
    });

    if (!res.ok) throw new Error(`OpenAI API Error: ${res.status}`);

    // ✅ Extract AI response
    const json = await res.json();
    const aiContent = json.choices?.[0]?.message?.content;
    console.log("✅ AI Report Raw Content:", aiContent);

    // ✅ Parse the structured + readable parts
    const { structured, reportText } = extractAIReport(aiContent);
    console.log("📊 Parsed Report:", structured);

    // ✅ Update UI with the readable report
    setReport(reportText || "Error: report formatting issue.");
    setStep(3);

    // ✅ Save to backend
    try {
      const saveRes = await fetch("http://localhost:8080/api/interview-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aiContent,
          structuredReport: structured,
          sessionId: sessionIdRef.current,
          candidateId: studentId,
          jobId,
          jobTitle: data?.title || "Intern",
        }),
      });

      if (!saveRes.ok) {
        console.error("❌ Report save HTTP error:", saveRes.status);
        return;
      }

      const saveResult = await saveRes.json();

      if (saveResult.success) {
        console.log("✅ Interview report saved successfully");
        console.log("🆔 Report ID:", saveResult.reportId);
      } else {
        console.error("⚠️ Report save failed:", saveResult.message);
      }
    } catch (err) {
      console.error("💾 Report saving error:", err);
    }
  } catch (err) {
    console.error("❌ Report generation error:", err);
    setReport("Error generating report. Please try again.");
  } finally {
    setProcessingAI(false);
  }
};

//   const resetInterview = () => {
//     setStep(1);
//     setConversation([]);
//     setInterviewComplete(false);
//     setReport(null);
//     setTranscript("");
//     setInterimTranscript("");
//     transcriptRef.current = "";
//     conversationHistoryRef.current = [];
//     systemPromptRef.current = "";
//     synthRef.current.cancel();
//     stopListening();
//   };

// Update resetInterview to exit fullscreen:
// const resetInterview = () => {
//   exitFullscreen();
//   setFullscreenExitCount(0);
//   setShowFullscreenWarning(false);
//   setWarningMessage("");
//   setStep(1);
//   setConversation([]);
//   setInterviewComplete(false);
//   setReport(null);
//   setTranscript("");
//   setInterimTranscript("");
//   transcriptRef.current = "";
//   conversationHistoryRef.current = [];
//   systemPromptRef.current = "";
//   synthRef.current.cancel();
//   stopListening();
// };

const resetInterview = () => {
  exitFullscreen();
  setFullscreenExitCount(0);
  setShowFullscreenWarning(false);
  setWarningMessage("");
  setRequiresUserAction(false);
  setStep(1);
  setConversation([]);
  setInterviewComplete(false);
  setReport(null);
  setTranscript("");
  setInterimTranscript("");
  transcriptRef.current = "";
  conversationHistoryRef.current = [];
  systemPromptRef.current = "";
  synthRef.current.cancel();
  stopListening();
};

  const handleManualSubmit = () => {
    if (transcriptRef.current.trim()) {
      stopListening();
      submitResponseWithText(transcriptRef.current);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg animate-pulse bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        Loading...
      </div>
    );
  }

  const progressWidth =
    step === 1 ? "33%" : step === 2 ? "66%" : step === 3 ? "100%" : "0%";

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-gray-900"
      } transition-all duration-300`}
    >
      {/* Header buttons */}
      {/* <div className="fixed top-5 right-5 flex gap-3 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {step === 2 && (
          <button
            onClick={() => setMuteAI(!muteAI)}
            className="p-3.5 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
            title={muteAI ? "Unmute AI voice" : "Mute AI voice"}
          >
            {muteAI ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        )}
      </div> */}
{/* Header buttons */}
<div className="fixed top-5 right-5 flex gap-3 z-50">
  {/* Dark Mode */}
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="p-3.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
  >
    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
  </button>

  {/* Mute */}
  {step === 2 && (
    <button
      onClick={() => setMuteAI(!muteAI)}
      className="p-3.5 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
      title={muteAI ? "Unmute AI voice" : "Mute AI voice"}
    >
      {muteAI ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  )}

  {/* ✅ Logout Button */}
  <button
    onClick={handleLogout}
    className="p-3.5 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
    title="Logout"
  >
    <LogOut size={20} />
  </button>
</div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 max-w-md w-full mx-4"
        >
          <div className="p-4 bg-red-100 dark:bg-red-900 rounded-2xl text-center text-red-800 dark:text-red-200 shadow-lg">
            ⚠️ {error}
          </div>
        </motion.div>
      )}

      {/* Fullscreen Warning Modal */}
{/* {showFullscreenWarning && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      className={`max-w-md w-full p-8 rounded-3xl shadow-2xl ${
        fullscreenExitCount >= 3
          ? 'bg-red-500 text-white'
          : 'bg-yellow-500 text-gray-900'
      }`}
    >
      <div className="text-center">
        <div className="text-6xl mb-4">
          {fullscreenExitCount >= 3 ? '❌' : '⚠️'}
        </div>
        <h3 className="text-2xl font-bold mb-4">
          {fullscreenExitCount >= 3 ? 'Interview Terminated' : 'Fullscreen Warning'}
        </h3>
        <p className="text-lg font-semibold mb-2">{warningMessage}</p>
        {fullscreenExitCount < 3 && (
          <p className="text-sm opacity-90">
            Returning to fullscreen in 3 seconds...
          </p>
        )}
      </div>
    </motion.div>
  </motion.div>
)} */}

 {/* Optional: Add a fullscreen indicator badge during interview */}
{/* {step === 2 && (
  <div className="fixed bottom-6 left-6 z-40">
    <div className={`px-4 py-2 rounded-full shadow-lg flex items-center gap-2 ${
      document.fullscreenElement 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`}>
      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
      <span className="text-sm font-semibold">
        {document.fullscreenElement ? 'Fullscreen Active' : 'Exit Count: ' + fullscreenExitCount + '/2'}
      </span>
    </div>
  </div>
)} */}

{showFullscreenWarning && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
    onClick={(e) => e.stopPropagation()}
  >
    <motion.div
      initial={{ scale: 0.8, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className={`max-w-lg w-full p-8 rounded-3xl shadow-2xl ${
        fullscreenExitCount >= 3
          ? 'bg-gradient-to-br from-red-600 to-red-700 text-white'
          : 'bg-gradient-to-br from-yellow-400 to-orange-500 text-gray-900'
      }`}
    >
      <div className="text-center">
        <motion.div 
          className="text-7xl mb-6"
          animate={{ 
            scale: fullscreenExitCount >= 3 ? [1, 1.2, 1] : [1, 1.1, 1],
            rotate: fullscreenExitCount >= 3 ? [0, -10, 10, 0] : 0
          }}
          transition={{ duration: 0.5, repeat: fullscreenExitCount >= 3 ? Infinity : 0, repeatDelay: 1 }}
        >
          {fullscreenExitCount >= 3 ? '❌' : '⚠️'}
        </motion.div>
        
        <h3 className="text-3xl font-extrabold mb-4">
          {fullscreenExitCount >= 3 ? 'Interview Terminated' : 'Fullscreen Required'}
        </h3>
        
        <p className="text-lg font-semibold mb-6 leading-relaxed">
          {warningMessage}
        </p>

        {requiresUserAction && fullscreenExitCount < 3 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResumeInterview}
            className="w-full py-4 px-6 bg-gray-900 text-white font-bold text-lg rounded-2xl shadow-xl hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Return to Fullscreen & Continue
          </motion.button>
        )}

        {fullscreenExitCount >= 3 && (
          <div className="mt-6">
            <p className="text-sm opacity-90">Generating your evaluation report...</p>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-sm font-medium opacity-90">
            Exit Count: {fullscreenExitCount}/3
          </p>
        </div>
      </div>
    </motion.div>
  </motion.div>
)}

{/* Optional: Fullscreen Status Indicator */}
{step === 2 && !showFullscreenWarning && (
  <div className="fixed bottom-6 left-6 z-40">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`px-4 py-2 rounded-full shadow-lg flex items-center gap-2 ${
        checkIfFullscreen()
          ? 'bg-green-500 text-white' 
          : 'bg-red-500 text-white animate-pulse'
      }`}
    >
      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
      <span className="text-xs md:text-sm font-semibold">
        {checkIfFullscreen() 
          ? '✓ Fullscreen Active' 
          : `⚠️ Exits: ${fullscreenExitCount}/2`}
      </span>
    </motion.div>
  </div>
)}

      {/* Page container */}
      <div className="max-w-4xl mx-auto p-5 flex flex-col flex-grow w-full">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="welcome"
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="flex flex-col items-center justify-center text-center flex-grow px-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                AI Voice Interview
              </h1>
              
              {data && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-2xl mb-8`}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{data.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Get ready to begin your interactive technical interview.
                  </p>
                  <span className="inline-block px-5 py-2.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
                    {data.numberOfQuestions} Questions
                  </span>
                </motion.div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startInterview}
                className="w-full max-w-md py-4 md:py-5 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3"
              >
                <Play size={22} />
                Start Interview
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="interview"
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="flex flex-col flex-grow space-y-6"
            >
              <h2 className="text-center text-2xl md:text-3xl font-bold mb-2">
                Interview in Progress
              </h2>
              
              {/* Conversation Area */}
              <div className="flex-grow overflow-y-auto p-4 md:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-h-[400px] md:max-h-[500px]">
                <AnimatePresence>
                  {conversation.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-4 flex ${
                        msg.role === "assistant" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`p-3 md:p-4 rounded-2xl max-w-[85%] md:max-w-[80%] text-sm ${
                          msg.role === "assistant"
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        <p className="text-xs font-semibold mb-1 opacity-80">
                          {msg.role === 'assistant' ? '🎓 Interviewer' : '👤 You'}
                        </p>
                        <p>{msg.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={conversationEndRef} />
              </div>

              {/* Microphone Controls */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8`}>
                <div className="flex flex-col items-center gap-4 md:gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isListening ? stopListening : startListening}
                    disabled={isSpeaking || processingAI}
                    className={`p-8 md:p-10 rounded-full ${
                      isListening
                        ? 'bg-red-500 animate-pulse'
                        : 'bg-blue-500'
                    } text-white disabled:opacity-50 shadow-2xl transition-all duration-200`}
                  >
                    {isListening ? <MicOff size={40} className="md:w-12 md:h-12" /> : <Mic size={40} className="md:w-12 md:h-12" />}
                  </motion.button>

                  <div className="text-center">
                    {isSpeaking && <p className="text-blue-500 font-semibold">🎤 AI is speaking...</p>}
                    {processingAI && !isSpeaking && <p className="text-purple-500 font-semibold">⚡ Processing...</p>}
                    {isListening && !isSpeaking && !processingAI && <p className="text-green-500 font-semibold">🎙️ Listening...</p>}
                    {!isListening && !isSpeaking && !processingAI && <p className="text-gray-500">Click to speak</p>}
                  </div>

                  {(transcript || interimTranscript) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full p-4 md:p-6 bg-gray-100 dark:bg-gray-700 rounded-2xl"
                    >
                      <p className="text-sm mb-3">
                        <span className="font-semibold">You're saying: </span>
                        {transcript}
                        <span className="text-gray-400 italic">{interimTranscript}</span>
                      </p>
                      {transcript && !processingAI && (
                        <button
                          onClick={handleManualSubmit}
                          className="w-full px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                        >
                          ✓ Submit Now
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={generateReport}
                  disabled={processingAI}
                  className="px-6 md:px-8 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  {processingAI ? "Processing..." : "Complete Interview"}
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 3 && (

   <motion.div
              key="report"
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="flex flex-col flex-grow justify-center px-4"
            >
              <div className={`p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <div className="flex flex-col items-center mb-6 md:mb-8">
                  <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-4">
                    <FileText size={48} className="text-blue-600 dark:text-blue-400 md:w-14 md:h-14" />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-center">
                    Interview Evaluation Report
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4"></div>
                </div>
                
              
                <div
  className={`
    ${darkMode
      ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950 border-indigo-700/40'
      : 'bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-indigo-200/60'}
    p-4 md:p-6 lg:p-8 rounded-2xl border-2 overflow-y-auto 
    max-h-[400px] md:max-h-[500px] scrollbar-thin 
    scrollbar-thumb-indigo-300 hover:scrollbar-thumb-indigo-400 
    dark:scrollbar-thumb-indigo-700 dark:hover:scrollbar-thumb-indigo-600
  `}
>
  <pre className="whitespace-pre-wrap font-sans text-xs md:text-sm leading-relaxed 
                  text-gray-800 dark:text-gray-800 m-0">
    {report}
  </pre>
</div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetInterview}
                  className="mt-6 md:mt-8 w-full py-3 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-base md:text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 group"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Start New Interview
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 to-purple-600"
          animate={{ width: progressWidth }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  );
};

export default StudentInterviewPage;