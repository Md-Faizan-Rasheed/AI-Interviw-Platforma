// import { useState,useEffect } from "react";
// import { motion } from "framer-motion";
// import { Sun, Moon } from "lucide-react";
// import {useParams} from "react-router-dom";


// const InterviewPage = () => {
//   const [darkMode, setDarkMode] = useState(false);
//    const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const {id}  = useParams()

  
//   useEffect(() => {
//     if (!id) return; // safety check

//     const fetchJob = async () => {
//       try {
//         const response = await fetch(`http://localhost:9000/jobs/${id}`);

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();

//         // ✅ CONSOLE LOG (what you asked)
//         console.log("Result came at interview page:", result);

//         // ✅ Save in state
//         setData(result);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJob();
//   }, [id]); // 👈 id MUST be dependency
//   return (
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500`}>
//       {/* Background Animation */}
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-30 blur-3xl h-full w-full -z-10 animate-pulse" />
      
//       {/* Theme Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="absolute top-5 right-5 p-2 rounded-full shadow-lg bg-gray-800 text-white hover:scale-110 transition-all"
//       >
//         {darkMode ? <Sun size={24} /> : <Moon size={24} />}
//       </button>
      
//       {/* Interview Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-2xl bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-300"
//       >
//         <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
//           {/* AI-Powered Interview */}
//         </h1>
        
//         <div className="mt-6 space-y-4">
//           <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
//             <p className="font-semibold">AI: "Tell me about yourself."</p>
//           </div>
//           <input
//             type="text"
//             placeholder="Your response..."
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
//           />
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
//           >
//             Submit Answer
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default InterviewPage;

// import { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Sun, Moon, Mic, MicOff, FileText, Play } from "lucide-react";

// const InterviewPage = () => {
//   const { id } = useParams();
//   const [darkMode, setDarkMode] = useState(false);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Interview state
//   const [interviewStarted, setInterviewStarted] = useState(false);
//   const [interviewComplete, setInterviewComplete] = useState(false);
//   const [conversation, setConversation] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [report, setReport] = useState(null);
//   const [processingAI, setProcessingAI] = useState(false);

//   // Refs
//   const recognitionRef = useRef(null);
//   const synthRef = useRef(window.speechSynthesis);
//   const conversationEndRef = useRef(null);

//   /* =========================
//      FETCH JOB DATA (REAL API)
//      ========================= */
//   useEffect(() => {
//     if (!id) return;

//     const fetchJob = async () => {
//       try {
//         const response = await fetch(`http://localhost:9000/jobs/${id}`);
//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("Job data loaded:", result);

//         setData({
//           title: result.title,
//           description: result.description,
//           numberOfQuestions: result.questions?.length || 5,
//           questions: result.questions || []
//         });
//       } catch (err) {
//         console.error("Job fetch error:", err);
//         setError("Failed to load job details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJob();
//   }, [id]);

//   /* =========================
//      SPEECH RECOGNITION
//      ========================= */
//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;

//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.lang = "en-US";
//       recognitionRef.current.interimResults = true;

//       recognitionRef.current.onresult = (event) => {
//         let finalText = "";
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           if (event.results[i].isFinal) {
//             finalText += event.results[i][0].transcript;
//           }
//         }
//         if (finalText) handleUserResponse(finalText.trim());
//       };

//       recognitionRef.current.onend = () => setIsListening(false);
//     }
//   }, []);

//   useEffect(() => {
//     conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [conversation]);

//   const speak = (text) =>
//     new Promise((resolve) => {
//       synthRef.current.cancel();
//       const u = new SpeechSynthesisUtterance(text);
//       u.onstart = () => setIsSpeaking(true);
//       u.onend = () => {
//         setIsSpeaking(false);
//         resolve();
//       };
//       synthRef.current.speak(u);
//     });

//   const startListening = () => {
//     if (!isListening) {
//       recognitionRef.current?.start();
//       setIsListening(true);
//     }
//   };

//   const stopListening = () => {
//     recognitionRef.current?.stop();
//     setIsListening(false);
//   };

//   /* =========================
//      START INTERVIEW
//      ========================= */
//   const startInterview = async () => {
//     setInterviewStarted(true);
//     setProcessingAI(true);
//     console.log("questions",data)
//     console.log("Questions",data.questions)

//     const firstQuestion =
//       data.questions?.[0]?.questionText ||
//       "Tell me about yourself.";

//     setConversation([{ role: "assistant", content: firstQuestion }]);
//     setCurrentQuestion(firstQuestion);

//     await speak(firstQuestion);
//     setProcessingAI(false);
//     setTimeout(startListening, 400);
//   };

//   /* =========================
//      HANDLE ANSWERS
//      ========================= */
//   // const handleUserResponse = async (answer) => {
//   //   stopListening();
//   //   const updated = [...conversation, { role: "user", content: answer }];
//   //   setConversation(updated);
//   //   setProcessingAI(true);

//   //   const nextIndex =
//   //     updated.filter((m) => m.role === "assistant").length;

//   //   const nextQuestion =
//   //     data.questions?.[nextIndex]?.questionText;

//   //   if (!nextQuestion) {
//   //     setInterviewComplete(true);
//   //     generateReport(updated);
//   //     return;
//   //   }

//   //   setConversation([...updated, { role: "assistant", content: nextQuestion }]);
//   //   setCurrentQuestion(nextQuestion);
//   //   await speak(nextQuestion);
//   //   setProcessingAI(false);
//   //   setTimeout(startListening, 400);
//   // };


//   const handleUserResponse = async (userMessage) => {
//   if (!data || !Array.isArray(data.questions)) {
//     console.warn("Job data not ready yet");
//     return;
//   }

//   if (!userMessage.trim() || processingAI) return;

//   stopListening();

//   const updated = [...conversation, { role: "user", content: userMessage }];
//   setConversation(updated);

//   const nextIndex =
//     updated.filter((m) => m.role === "assistant").length;

//   const nextQuestion =
//     data.questions[nextIndex]?.questionText;

//   if (!nextQuestion) {
//     setInterviewComplete(true);
//     generateReport(updated);
//     return;
//   }

//   setConversation([
//     ...updated,
//     { role: "assistant", content: nextQuestion }
//   ]);

//   setCurrentQuestion(nextQuestion);

//   await speak(nextQuestion);
//   // setTimeout(startListening, 400);
//   if (data?.questions?.length) {
//   setTimeout(startListening, 400);
// }
// };

//   /* =========================
//      GENERATE REPORT
//      ========================= */
//   const generateReport = async (conv) => {
//     setReport("Interview completed successfully.\n\nCandidate showed good communication and technical clarity.");
//   };

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center text-xl">Loading job details...</div>;
//   }

//   if (error) {
//     return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
//   }

//   /* =========================
//      UI
//      ========================= */
//   return (
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"} min-h-screen`}>
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="absolute top-5 right-5 p-3 rounded-full bg-blue-600 text-white"
//       >
//         {darkMode ? <Sun /> : <Moon />}
//       </button>

//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-4xl font-bold text-center mb-6">AI </h1>

//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
//           <h2 className="text-2xl font-semibold">{data.title}</h2>
//           <p className="text-sm mt-2">
//             {/* {data.description} */}
//   {data?.description ? (
//     <div
//       dangerouslySetInnerHTML={{ __html: data.description }}
//     />
//   ) : (
//     <p>No description available</p>
//   )}

//           </p>
//           <p className="mt-2 text-sm">Questions: {data.numberOfQuestions}</p>
//         </div>

//         {!interviewStarted && (
//           <button
//             onClick={startInterview}
//             className="w-full py-4 bg-green-500 text-white rounded-xl text-xl font-bold"
//           >
//             <Play className="inline mr-2" /> Start 
//             {/* Interview */}
//           </button>
//         )}

//         {interviewStarted && !interviewComplete && (
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
//             {conversation.map((m, i) => (
//               <p key={i} className="mb-2">
//                 <strong>{m.role === "assistant" ? "AI" : "You"}:</strong> {m.content}
//               </p>
//             ))}
//             <div ref={conversationEndRef} />

//             <button
//               onClick={isListening ? stopListening : startListening}
//               className={`mt-4 p-4 rounded-full text-white ${isListening ? "bg-red-500" : "bg-blue-500"}`}
//             >
//               {isListening ? <MicOff /> : <Mic />}
//             </button>
//           </div>
//         )}

//         {interviewComplete && (
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
//             <h2 className="text-2xl font-bold mb-4 flex items-center">
//               <FileText className="mr-2" /> Interview
//                {/* Report */}
//             </h2>
//             <pre className="whitespace-pre-wrap">{report}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InterviewPage;



//11. ______________________________________--------------------------------_________________________________________________

// import { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Sun, Moon, Mic, MicOff, FileText, Play } from "lucide-react";

// const InterviewPage = () => {
//   const { id } = useParams();

//   const [darkMode, setDarkMode] = useState(false);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Interview state
//   const [interviewStarted, setInterviewStarted] = useState(false);
//   const [interviewComplete, setInterviewComplete] = useState(false);
//   const [conversation, setConversation] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [report, setReport] = useState(null);
//   const [processingAI, setProcessingAI] = useState(false);

//   // Refs (IMPORTANT)
//   const recognitionRef = useRef(null);
//   const synthRef = useRef(window.speechSynthesis);
//   const conversationEndRef = useRef(null);
//   const dataRef = useRef(null);
//   const questionIndexRef = useRef(0);

//   /* =========================
//      FETCH JOB DATA
//      ========================= */
//   useEffect(() => {
//     if (!id) return;

//     const fetchJob = async () => {
//       try {
//         const response = await fetch(`http://localhost:9000/jobs/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch job");

//         const result = await response.json();

//         const normalized = {
//           title: result.title,
//           description: result.description,
//           questions: result.questions || [],
//           numberOfQuestions: result.questions?.length || 0
//         };

//         setData(normalized);
//         dataRef.current = normalized;
//       } catch (err) {
//         setError("Failed to load job details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJob();
//   }, [id]);

//   /* =========================
//      SPEECH RECOGNITION SETUP
//      ========================= */
//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       return;
//     }

//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     recognitionRef.current = new SpeechRecognition();
//     recognitionRef.current.lang = "en-US";
//     recognitionRef.current.interimResults = false;

//     recognitionRef.current.onresult = (event) => {
//       if (!interviewStarted) return;
//       const text = event.results[0][0].transcript.trim();
//       if (text) handleUserResponse(text);
//     };

//     recognitionRef.current.onend = () => setIsListening(false);
//   }, [interviewStarted]);

//   useEffect(() => {
//     conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [conversation]);

//   /* =========================
//      VOICE HELPERS
//      ========================= */
//   const speak = (text) =>
//     new Promise((resolve) => {
//       synthRef.current.cancel();
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.onstart = () => setIsSpeaking(true);
//       utterance.onend = () => {
//         setIsSpeaking(false);
//         resolve();
//       };
//       synthRef.current.speak(utterance);
//     });

//   const startListening = () => {
//     if (!isListening && recognitionRef.current) {
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   const stopListening = () => {
//     recognitionRef.current?.stop();
//     setIsListening(false);
//   };

//   /* =========================
//      START INTERVIEW
//      ========================= */
//   const startInterview = async () => {
//     if (!dataRef.current?.questions?.length) return;

//     setInterviewStarted(true);
//     questionIndexRef.current = 0;

//     const firstQuestion =
//       dataRef.current.questions[0]?.questionText ||
//       "Tell me about yourself.";

//     setConversation([{ role: "assistant", content: firstQuestion }]);
//     setCurrentQuestion(firstQuestion);

//     await speak(firstQuestion);
//     setTimeout(startListening, 400);
//   };

//   /* =========================
//      HANDLE ANSWERS (FIXED)
//      ========================= */
//   const handleUserResponse = async (answer) => {
//     if (!interviewStarted || processingAI) return;

//     const jobData = dataRef.current;
//     if (!jobData?.questions?.length) return;

//     stopListening();

//     const updatedConversation = [
//       ...conversation,
//       { role: "user", content: answer }
//     ];
//     setConversation(updatedConversation);

//     questionIndexRef.current += 1;
//     const nextQuestion =
//       jobData.questions[questionIndexRef.current]?.questionText;

//     if (!nextQuestion) {
//       setInterviewComplete(true);
//       generateReport(updatedConversation);
//       return;
//     }

//     setConversation([
//       ...updatedConversation,
//       { role: "assistant", content: nextQuestion }
//     ]);
//     setCurrentQuestion(nextQuestion);

//     await speak(nextQuestion);
//     setTimeout(startListening, 400);
//   };

//   /* =========================
//      GENERATE REPORT
//      ========================= */
//   const generateReport = async () => {
//     setReport(
//       "Interview completed successfully.\n\nCandidate showed good communication and technical understanding."
//     );
//   };

//   /* =========================
//      UI STATES
//      ========================= */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl">
//         Loading job details...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500">
//         {error}
//       </div>
//     );
//   }

//   /* =========================
//      UI
//      ========================= */
//   return (
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"} min-h-screen`}>
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="absolute top-5 right-5 p-3 rounded-full bg-blue-600 text-white"
//       >
//         {darkMode ? <Sun /> : <Moon />}
//       </button>

//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-4xl font-bold text-center mb-6">AI Interview</h1>

//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
//           <h2 className="text-2xl font-semibold">{data.title}</h2>
//           <div
//             className="text-sm mt-2"
//             dangerouslySetInnerHTML={{ __html: data.description }}
//           />
//           <p className="mt-2 text-sm">Questions: {data.numberOfQuestions}</p>
//         </div>

//         {!interviewStarted && (
//           <button
//             disabled={!data.questions.length}
//             onClick={startInterview}
//             className="w-full py-4 bg-green-500 text-white rounded-xl text-xl font-bold"
//           >
//             <Play className="inline mr-2" /> Start Interview
//           </button>
//         )}

//         {interviewStarted && !interviewComplete && (
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
//             {conversation.map((m, i) => (
//               <p key={i} className="mb-2">
//                 <strong>{m.role === "assistant" ? "AI" : "You"}:</strong>{" "}
//                 {m.content}
//               </p>
//             ))}
//             <div ref={conversationEndRef} />

//             <button
//               onClick={isListening ? stopListening : startListening}
//               className={`mt-4 p-4 rounded-full text-white ${
//                 isListening ? "bg-red-500" : "bg-blue-500"
//               }`}
//             >
//               {isListening ? <MicOff /> : <Mic />}
//             </button>
//           </div>
//         )}

//         {interviewComplete && (
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
//             <h2 className="text-2xl font-bold mb-4 flex items-center">
//               <FileText className="mr-2" /> Interview Report
//             </h2>
//             <pre className="whitespace-pre-wrap">{report}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InterviewPage;



// 22.-------------------------______________________________------------------------------
// -------------------------------______________________________------------------------------

// import { useState, useEffect, useRef } from "react";
// import {useParams} from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion";
// import { Sun, Moon, Mic, MicOff, FileText, Play, Volume2, VolumeX } from "lucide-react";

// const InterviewPage = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Interview state
//   const [interviewStarted, setInterviewStarted] = useState(false);
//   const [interviewComplete, setInterviewComplete] = useState(false);
//   const [conversation, setConversation] = useState([]);
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [interimTranscript, setInterimTranscript] = useState("");
//   const [report, setReport] = useState(null);
//   const [processingAI, setProcessingAI] = useState(false);
//   const [muteAI, setMuteAI] = useState(false);

//   // Refs
//   const recognitionRef = useRef(null);
//   const synthRef = useRef(window.speechSynthesis);
//   const conversationEndRef = useRef(null);
//   const conversationHistoryRef = useRef([]);
//   const { id } = useParams();


//   /* =========================
//      INITIALIZE WITH DEMO DATA
//   //    ========================= */
//   // useEffect(() => {
//   //   // Replace this with your actual API call
//   //   setData({
//   //     title: "Senior Full Stack Developer",
//   //     description: "We are looking for an experienced Full Stack Developer with expertise in React, Node.js, and database design. The candidate should have strong problem-solving skills and be able to work in a fast-paced environment.",
//   //     numberOfQuestions: 5
//   //   });
//   // }, []);


//   useEffect(() => {
//   if (!id) return; // Get id from URL params

//   const fetchJob = async () => {
//     try {
//       const response = await fetch(`http://localhost:9000/jobs/${id}`);
//       const result = await response.json();
      
//       setData({
//         title: result.title,
//         description: result.description,
//         numberOfQuestions: result.questions?.length || 5
//       });
//     } catch (err) {
//       setError("Failed to load job details");
//     }
//   };

//   fetchJob();
// }, []);

//   /* =========================
//      SPEECH RECOGNITION SETUP
//      ========================= */
//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       setError("Speech recognition not supported in this browser. Please use Chrome or Edge.");
//       return;
//     }

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     recognitionRef.current = new SpeechRecognition();
//     recognitionRef.current.lang = "en-US";
//     recognitionRef.current.continuous = true;
//     recognitionRef.current.interimResults = true;

//     recognitionRef.current.onresult = (event) => {
//       let interim = "";
//       let final = "";

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcriptText = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           final += transcriptText + " ";
//         } else {
//           interim += transcriptText;
//         }
//       }

//       if (final) {
//         setTranscript(prev => prev + final);
//         setInterimTranscript("");
//       } else {
//         setInterimTranscript(interim);
//       }
//     };

//     recognitionRef.current.onerror = (event) => {
//       if (event.error === "no-speech") {
//         if (isListening && !processingAI) {
//           setTimeout(() => {
//             if (recognitionRef.current && isListening) {
//               try {
//                 recognitionRef.current.start();
//               } catch (e) {
//                 // Already started
//               }
//             }
//           }, 100);
//         }
//       }
//     };

//     recognitionRef.current.onend = () => {
//       if (isListening && !processingAI && interviewStarted && !interviewComplete) {
//         setTimeout(() => {
//           if (recognitionRef.current) {
//             try {
//               recognitionRef.current.start();
//             } catch (e) {
//               // Already started
//             }
//           }
//         }, 100);
//       }
//     };

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//       if (synthRef.current) {
//         synthRef.current.cancel();
//       }
//     };
//   }, [isListening, processingAI, interviewStarted, interviewComplete]);

//   useEffect(() => {
//     conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [conversation]);

//   /* =========================
//      VOICE HELPERS
//      ========================= */
//   const speak = async (text) => {
//     if (muteAI) return;
    
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
//   };

//   const startListening = () => {
//     if (!isListening && recognitionRef.current && !processingAI) {
//       setTranscript("");
//       setInterimTranscript("");
//       try {
//         recognitionRef.current.start();
//         setIsListening(true);
//       } catch (e) {
//         console.error("Failed to start recognition:", e);
//       }
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsListening(false);
//   };

//   /* =========================
//      START INTERVIEW WITH AI
//      ========================= */
//   const startInterview = async () => {
//     if (!data) return;

//     setInterviewStarted(true);
//     setProcessingAI(true);

//     const jobContext = `
// Position: ${data.title}
// Description: ${data.description}
// Number of Questions: ${data.numberOfQuestions}
//     `.trim();

//     const systemPrompt = `You are an experienced IIT interview panelist conducting a real-time, human-like technical and behavioral interview for the position of "${data.title}".

// JOB CONTEXT:
// ${jobContext}

// Your goal is to simulate an actual live interview, not a scripted Q&A.

// INTERVIEW STYLE & BEHAVIOR:
// - Speak naturally, like a human interviewer
// - Use short acknowledgments such as "Okay", "I see", "That's interesting", "Hmm", "Got it"
// - Ask follow-up questions based on the candidate's previous answer
// - Adjust question difficulty dynamically based on how well the candidate responds
// - Do NOT ask all questions at once
// - Ask only ONE question at a time
// - Wait for the candidate's response before continuing
// - Keep responses conversational and brief (2-3 sentences max unless explaining something)

// INTERVIEW STRUCTURE:
// 1. Start with a brief, friendly introduction (1-2 sentences)
// 2. Begin with an easy warm-up question
// 3. Gradually increase difficulty
// 4. Mix technical, conceptual, and behavioral questions
// 5. Ask clarification or probing questions if an answer is vague or incomplete
// 6. If the candidate struggles, gently guide them instead of immediately moving on
// 7. Maintain a professional but calm and human tone throughout

// HUMANIZATION RULES:
// - Avoid robotic phrasing
// - Avoid long monologues
// - React briefly to answers before asking the next question (e.g., "Interesting. So...")
// - Occasionally rephrase or simplify questions like a real interviewer
// - Maintain interview pacing similar to a real IIT panel
// - Show genuine interest in their answers

// IMPORTANT CONSTRAINTS:
// - Do NOT reveal evaluation criteria during the interview
// - Do NOT give solutions unless explicitly asked
// - Do NOT mention that you are an AI
// - Do NOT use markdown or formatting
// - Keep responses concise and conversational
// - Track approximately ${data.numberOfQuestions} questions total

// ENDING THE INTERVIEW:
// - After asking approximately ${data.numberOfQuestions} questions and getting satisfactory answers, conclude naturally
// - Thank the candidate professionally
// - End your final message with the exact phrase: INTERVIEW_COMPLETE

// Now begin the interview naturally.`;

//     try {
//       const response = await fetch("https://api.anthropic.com/v1/messages", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "claude-sonnet-4-20250514",
//           max_tokens: 500,
//           system: systemPrompt,
//           messages: [{ role: "user", content: "Hello, I'm ready for the interview." }]
//         })
//       });

//       if (!response.ok) {
//         throw new Error("Failed to connect to AI service");
//       }

//       const result = await response.json();
//       const aiMessage = result.content[0].text;

//       conversationHistoryRef.current = [
//         { role: "user", content: "Hello, I'm ready for the interview." },
//         { role: "assistant", content: aiMessage }
//       ];

//       setConversation([{ role: "assistant", content: aiMessage }]);
      
//       await speak(aiMessage);
      
//       setProcessingAI(false);
//       setTimeout(() => startListening(), 500);

//     } catch (err) {
//       console.error("AI Error:", err);
//       setError("Failed to start interview. Please check your connection.");
//       setProcessingAI(false);
//       setInterviewStarted(false);
//     }
//   };

//   /* =========================
//      SUBMIT USER RESPONSE TO AI
//      ========================= */
//   const submitResponse = async () => {
//     const userMessage = transcript.trim();
//     if (!userMessage || processingAI) return;

//     stopListening();
//     setProcessingAI(true);

//     const newConversation = [...conversation, { role: "user", content: userMessage }];
//     setConversation(newConversation);

//     conversationHistoryRef.current.push({ role: "user", content: userMessage });

//     setTranscript("");
//     setInterimTranscript("");

//     try {
//       const response = await fetch("https://api.anthropic.com/v1/messages", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "claude-sonnet-4-20250514",
//           max_tokens: 500,
//           messages: conversationHistoryRef.current
//         })
//       });

//       if (!response.ok) {
//         throw new Error("Failed to get AI response");
//       }

//       const result = await response.json();
//       const aiMessage = result.content[0].text;

//       conversationHistoryRef.current.push({ role: "assistant", content: aiMessage });

//       const updatedConversation = [...newConversation, { role: "assistant", content: aiMessage }];
//       setConversation(updatedConversation);

//       await speak(aiMessage);

//       if (aiMessage.includes("INTERVIEW_COMPLETE")) {
//         setInterviewComplete(true);
//         setProcessingAI(false);
//         await generateReport();
//       } else {
//         setProcessingAI(false);
//         setTimeout(() => startListening(), 500);
//       }

//     } catch (err) {
//       console.error("AI Error:", err);
//       setError("Failed to process response. Please try again.");
//       setProcessingAI(false);
//     }
//   };

//   /* =========================
//      GENERATE DETAILED REPORT
//      ========================= */
//   const generateReport = async () => {
//     setProcessingAI(true);

//     const conversationText = conversationHistoryRef.current
//       .map(msg => `${msg.role === 'assistant' ? 'Interviewer' : 'Candidate'}: ${msg.content}`)
//       .join('\n\n');

//     try {
//       const response = await fetch("https://api.anthropic.com/v1/messages", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "claude-sonnet-4-20250514",
//           max_tokens: 2500,
//           messages: [{
//             role: "user",
//             content: `You are an IIT interview panelist. Based on this interview transcript for the position of "${data?.title}", generate a comprehensive, professional evaluation report.

// INTERVIEW TRANSCRIPT:
// ${conversationText}

// Generate a detailed report with the following structure:

// CANDIDATE EVALUATION REPORT
// Position: ${data?.title}

// 1. OVERALL ASSESSMENT
//    - Overall Rating: [X/10]
//    - Brief Summary: [2-3 sentences about overall performance]

// 2. TECHNICAL COMPETENCE
//    - Rating: [X/10]
//    - Strengths: [List 3-4 specific technical strengths demonstrated]
//    - Weaknesses: [List 2-3 areas needing improvement]

// 3. COMMUNICATION SKILLS
//    - Rating: [X/10]
//    - Clarity of expression
//    - Articulation of technical concepts
//    - Response structure

// 4. PROBLEM-SOLVING ABILITY
//    - Rating: [X/10]
//    - Analytical thinking
//    - Approach to complex questions
//    - Adaptability

// 5. BEHAVIORAL/SOFT SKILLS
//    - Confidence level
//    - Professionalism
//    - Team collaboration indicators

// 6. KEY HIGHLIGHTS
//    - [3-4 notable moments or responses]

// 7. AREAS FOR DEVELOPMENT
//    - [3-4 specific recommendations]

// 8. FINAL RECOMMENDATION
//    - [ ] Strongly Recommend for Hire
//    - [ ] Recommend for Hire
//    - [ ] Consider with Reservations
//    - [ ] Do Not Recommend

// 9. ADDITIONAL COMMENTS
//    - [Any other observations or notes]

// Be honest, specific, and constructive. Use examples from the interview where relevant.`
//           }]
//         })
//       });

//       const result = await response.json();
//       const reportText = result.content[0].text;

//       setReport(reportText);
//       setProcessingAI(false);

//     } catch (err) {
//       console.error("Report generation error:", err);
//       setReport("Error generating report. Please try again.");
//       setProcessingAI(false);
//     }
//   };

//   const resetInterview = () => {
//     setInterviewStarted(false);
//     setInterviewComplete(false);
//     setConversation([]);
//     setReport(null);
//     setTranscript("");
//     setInterimTranscript("");
//     setError(null);
//     conversationHistoryRef.current = [];
//     synthRef.current.cancel();
//     stopListening();
//   };

//   /* =========================
//      UI RENDER
//      ========================= */
//   if (loading) {
//     return (
//       <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"} min-h-screen flex items-center justify-center`}>
//         <div className="text-2xl animate-pulse">Loading interview details...</div>
//       </div>
//     );
//   }

//   return (
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen transition-all duration-300`}>
//       {/* Theme Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="fixed top-5 right-5 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:scale-110 transition-all z-50"
//       >
//         {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//       </button>

//       {/* Mute Toggle */}
//       {interviewStarted && (
//         <button
//           onClick={() => setMuteAI(!muteAI)}
//           className="fixed top-5 right-20 p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:scale-110 transition-all z-50"
//           title={muteAI ? "Unmute AI voice" : "Mute AI voice"}
//         >
//           {muteAI ? <VolumeX size={20} /> : <Volume2 size={20} />}
//         </button>
//       )}

//       <div className="container mx-auto px-4 py-8 max-w-5xl">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
//             AI  
//           </h1>
//           {data && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-2xl shadow-xl border-2 max-w-2xl mx-auto`}
//             >
//               <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
//                 {/* {data.description} */}
// {data?.description ? (
//     <div dangerouslySetInnerHTML={{ __html: data.description }} />
//   ) : (
//     <p>No description available</p>
//   )}

//                 </p>
//               <div className="flex justify-center gap-4 text-sm">
//                 <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
//                   {data.numberOfQuestions} Questions
//                 </span>
//               </div>
//             </motion.div>
//           )}
//         </motion.div>

//         {/* Error Display */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-xl text-center"
//           >
//             {error}
//           </motion.div>
//         )}

//         {/* Pre-Interview */}
//         {!interviewStarted && !interviewComplete && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-center space-y-6"
//           >
//             <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-lg max-w-md mx-auto`}>
//               <h3 className="text-xl font-semibold mb-4">Ready to begin?</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
//                 {/* This is a voice-based AI interview. Make sure your microphone is enabled and you're in a quiet environment. */}

//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={startInterview}
//                 disabled={!data}
//                 className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <Play size={24} />
//                 Start Interview
//               </motion.button>
//             </div>
//           </motion.div>
//         )}

//         {/* Active Interview */}
//         {interviewStarted && !interviewComplete && (
//           <div className="space-y-6">
//             {/* Conversation Display */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 max-h-96 overflow-y-auto`}
//             >
//               <AnimatePresence>
//                 {conversation.map((msg, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div className={`max-w-[75%] px-5 py-3 rounded-2xl ${
//                       msg.role === 'assistant'
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
//                         : 'bg-gray-200 dark:bg-gray-700'
//                     }`}>
//                       <p className="text-xs font-semibold mb-1 opacity-80">
//                         {msg.role === 'assistant' ? '🎓 Interviewer' : '👤 You'}
//                       </p>
//                       <p className="text-sm leading-relaxed">{msg.content}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//               <div ref={conversationEndRef} />
//             </motion.div>

//             {/* Voice Input Control */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}
//             >
//               <div className="flex flex-col items-center gap-4">
//                 {/* Mic Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={isListening ? stopListening : startListening}
//                   disabled={isSpeaking || processingAI}
//                   className={`p-8 rounded-full ${
//                     isListening
//                       ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50'
//                       : 'bg-blue-500 shadow-lg'
//                   } text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
//                 >
//                   {isListening ? <MicOff size={40} /> : <Mic size={40} />}
//                 </motion.button>

//                 {/* Status */}
//                 <div className="text-center">
//                   {isSpeaking && (
//                     <p className="text-blue-500 font-semibold animate-pulse"> is speaking...</p>
//                   )}
//                   {processingAI && !isSpeaking && (
//                     <p className="text-purple-500 font-semibold">⚡ Processing...</p>
//                   )}
//                   {isListening && !isSpeaking && !processingAI && (
//                     <p className="text-green-500 font-semibold animate-pulse">🎙️ Listening...</p>
//                   )}
//                   {!isListening && !isSpeaking && !processingAI && (
//                     <p className="text-gray-500">Click mic to speak</p>
//                   )}
//                 </div>

//                 {/* Transcript Display */}
//                 {(transcript || interimTranscript) && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-xl"
//                   >
//                     <p className="text-sm text-gray-700 dark:text-gray-300">
//                       <span className="font-semibold">You're saying: </span>
//                       {transcript}
//                       <span className="text-gray-400">{interimTranscript}</span>
//                     </p>
//                     {transcript && !processingAI && (
//                       <button
//                         onClick={submitResponse}
//                         className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
//                       >
//                         ✓ Submit Answer
//                       </button>
//                     )}
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {/* Interview Report */}
//         {interviewComplete && report && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8`}
//           >
//             <div className="flex items-center justify-center mb-6">
//               <FileText size={48} className="text-blue-500 mr-4" />
//               <h2 className="text-3xl font-bold"> Evaluation Report</h2>
//             </div>

//             <div className="prose dark:prose-invert max-w-none">
//               <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-gray-50 dark:bg-gray-900 p-6 rounded-xl overflow-auto">
//                 {report}
//               </pre>
//             </div>

//             <div className="mt-8 flex justify-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={resetInterview}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg"
//               >
//                 Start 
                
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InterviewPage;




// 44.___________________________------------------------------------------_____________________
// ---------------------------------__________________________________________---------------------

// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sun, Moon, Mic, MicOff, FileText, Play, Volume2, VolumeX } from "lucide-react";
// import {useParams} from "react-router-dom";

// const InterviewPage = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const silenceTimerRef = useRef(null);


//   // Interview state
//   const [interviewStarted, setInterviewStarted] = useState(false);
//   const [interviewComplete, setInterviewComplete] = useState(false);
//   const [conversation, setConversation] = useState([]);
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [interimTranscript, setInterimTranscript] = useState("");
//   const [report, setReport] = useState(null);
//   const [processingAI, setProcessingAI] = useState(false);
//   const [muteAI, setMuteAI] = useState(false);

//   // Refs
//   const recognitionRef = useRef(null);
//   const synthRef = useRef(window.speechSynthesis);
//   const conversationEndRef = useRef(null);
//   const conversationHistoryRef = useRef([]);
//   const {id} = useParams()

//   /* =========================
//      INITIALIZE WITH DEMO DATA
//      ========================= */
//   // useEffect(() => {
//   //   // Replace this with your actual API call
//   //   setData({
//   //     title: "Senior Full Stack Developer",
//   //     description: "We are looking for an experienced Full Stack Developer with expertise in React, Node.js, and database design. The candidate should have strong problem-solving skills and be able to work in a fast-paced environment.",
//   //     numberOfQuestions: 5
//   //   });
//   // }, []);

//     useEffect(() => {
//     if (!id) return; // safety check

//     const fetchJob = async () => {
//       try {
//         const response = await fetch(`http://localhost:9000/jobs/${id}`);

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();

//         // ✅ CONSOLE LOG (what you asked)
//         console.log("Result came at interview page:", result);

//         // ✅ Save in state
//         setData(result);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJob();
//   }, [id]); // 👈 id MUST be dependency

//   /* =========================
//      SPEECH RECOGNITION SETUP
//      ========================= */
//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       setError("Speech recognition not supported in this browser. Please use Chrome or Edge.");
//       return;
//     }

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     recognitionRef.current = new SpeechRecognition();
//     recognitionRef.current.lang = "en-US";
//     // recognitionRef.current.continuous = true;
//     // recognitionRef.current.interimResults = true;

    
// recognitionRef.current.continuous = false;
// recognitionRef.current.interimResults = true;


//     recognitionRef.current.onresult = (event) => {
//       let interim = "";
//       let final = "";

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcriptText = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           final += transcriptText + " ";
//         } else {
//           interim += transcriptText;
//         }
//       }

//       if (final) {
//         setTranscript(prev => prev + final);
//         setInterimTranscript("");
//       } else {
//         setInterimTranscript(interim);
//       }
//     };

//     recognitionRef.current.onerror = (event) => {
//       if (event.error === "no-speech") {
//         if (isListening && !processingAI) {
//           setTimeout(() => {
//             if (recognitionRef.current && isListening) {
//               try {
//                 recognitionRef.current.start();
//               } catch (e) {
//                 // Already started
//               }
//             }
//           }, 100);
//         }
//       }
//     };

//     recognitionRef.current.onend = () => {
//       if (isListening && !processingAI && interviewStarted && !interviewComplete) {
//         setTimeout(() => {
//           if (recognitionRef.current) {
//             try {
//               recognitionRef.current.start();
//             } catch (e) {
//               // Already started
//             }
//           }
//         }, 100);
//       }
//     };

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//       if (synthRef.current) {
//         synthRef.current.cancel();
//       }
//     };
//   }, [isListening, processingAI, interviewStarted, interviewComplete]);

//   useEffect(() => {
//     conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [conversation]);

//   /* =========================
//      VOICE HELPERS
//      ========================= */
//   const speak = async (text) => {
//     if (muteAI) return;
    
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
//   };

//   const startListening = () => {
//     if (!isListening && recognitionRef.current && !processingAI) {
//       setTranscript("");
//       setInterimTranscript("");
//       try {
//         recognitionRef.current.start();
//         setIsListening(true);
//       } catch (e) {
//         console.error("Failed to start recognition:", e);
//       }
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsListening(false);
//   };

//   /* =========================
//      START INTERVIEW WITH AI
//      ========================= */
//   const startInterview = async () => {
//     if (!data) return;

//     setInterviewStarted(true);
//     setProcessingAI(true);

//     const jobContext = `
// Position: ${data.title}
// Description: ${data.description}
// Number of Questions: ${data.numberOfQuestions}
//     `.trim();

//     const systemPrompt = `You are an experienced IIT interview panelist conducting a real-time, human-like technical and behavioral interview for the position of "${data.title}".

// JOB CONTEXT:
// ${jobContext}

// Your goal is to simulate an actual live interview, not a scripted Q&A.

// INTERVIEW STYLE & BEHAVIOR:
// - Speak naturally, like a human interviewer
// - Use short acknowledgments such as "Okay", "I see", "That's interesting", "Hmm", "Got it"
// - Ask follow-up questions based on the candidate's previous answer
// - Adjust question difficulty dynamically based on how well the candidate responds
// - Do NOT ask all questions at once
// - Ask only ONE question at a time
// - Wait for the candidate's response before continuing
// - Keep responses conversational and brief (2-3 sentences max unless explaining something)

// INTERVIEW STRUCTURE:
// 1. Start with a brief, friendly introduction (1-2 sentences)
// 2. Begin with an easy warm-up question
// 3. Gradually increase difficulty
// 4. Mix technical, conceptual, and behavioral questions
// 5. Ask clarification or probing questions if an answer is vague or incomplete
// 6. If the candidate struggles, gently guide them instead of immediately moving on
// 7. Maintain a professional but calm and human tone throughout

// HUMANIZATION RULES:
// - Avoid robotic phrasing
// - Avoid long monologues
// - React briefly to answers before asking the next question (e.g., "Interesting. So...")
// - Occasionally rephrase or simplify questions like a real interviewer
// - Maintain interview pacing similar to a real IIT panel
// - Show genuine interest in their answers

// IMPORTANT CONSTRAINTS:
// - Do NOT reveal evaluation criteria during the interview
// - Do NOT give solutions unless explicitly asked
// - Do NOT mention that you are an AI
// - Do NOT use markdown or formatting
// - Keep responses concise and conversational
// - Track approximately ${data.numberOfQuestions} questions total

// ENDING THE INTERVIEW:
// - After asking approximately ${data.numberOfQuestions} questions and getting satisfactory answers, conclude naturally
// - Thank the candidate professionally
// - End your final message with the exact phrase: INTERVIEW_COMPLETE

// Now begin the interview naturally.`;

//     try {
//     //   const response = await fetch("http://localhost:9000/api/claude", {
//     //     method: "POST", messages: [
//     //   { role: "system", content: SYSTEM_PROMPT },
//     //   { role: "user", content: "Start the interview." }
//     // ]
//     //     headers: { "Content-Type": "application/json" },
//     //     body: JSON.stringify({
//     //       model: "claude-sonnet-4-20250514",
//     //       max_tokens: 500,
//     //       system: systemPrompt,
//     //       messages: [{ role: "user", content: "Hello, I'm ready for the interview." }]
//     //     })
//     //   });
//    const response  =await fetch("http://localhost:9000/api/openai", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     model: "gpt-4o",
//     max_tokens: 1000,
//     messages: [
//       { role: "system", content: systemPrompt },
//       { role: "user", content: "Hello, I'm ready for the interview." }]

//   })
// });
// console.log("Responses",response)

//       if (!response.ok) {
//         throw new Error("Failed to connect to AI service");
//       }

// const result = await response.json();
// console.log("AI raw response:", result);

// // ✅ OpenAI-compatible parsing
// const aiMessage = result.choices?.[0]?.message?.content;

// if (!aiMessage) {
//   throw new Error("Invalid OpenAI response structure");
// }

// conversationHistoryRef.current = [
//   { role: "user", content: "Hello, I'm ready for the interview." },
//   { role: "assistant", content: aiMessage }
// ];


//       // const result = await response.json();
//       // const aiMessage = result.content[0].text;

//       // conversationHistoryRef.current = [
//       //   { role: "user", content: "Hello, I'm ready for the interview." },
//       //   { role: "assistant", content: aiMessage }
//       // ];

//       setConversation([{ role: "assistant", content: aiMessage }]);
      
//       await speak(aiMessage);
      
//       setProcessingAI(false);
//       setTimeout(() => startListening(), 500);

//     } catch (err) {
//       console.error("AI Error:", err);
//       setError("Failed to start interview. Please check your connection.");
//       setProcessingAI(false);
//       setInterviewStarted(false);
//     }
//   };

//   /* =========================
//      SUBMIT USER RESPONSE TO AI
//      ========================= */
//   const submitResponse = async () => {
//     const userMessage = transcript.trim();
//     if (!userMessage || processingAI) return;

//     stopListening();
//     setProcessingAI(true);

//     const newConversation = [...conversation, { role: "user", content: userMessage }];
//     setConversation(newConversation);

//     conversationHistoryRef.current.push({ role: "user", content: userMessage });

//     setTranscript("");
//     setInterimTranscript("");

//     try {

//       // const response = await fetch("http://localhost:9000/api/claude", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({
//       //     model: "claude-sonnet-4-20250514",
//       //     max_tokens: 500,
//       //     messages: conversationHistoryRef.current
//       //   })
//       // });
// const response = fetch("http://localhost:9000/api/openai", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     model: "gpt-4o",
//     max_tokens: 1000,
//     messages: conversationHistoryRef.current
//   })
// });
      

//       if (!response.ok) {
//         throw new Error("Failed to get AI response");
//       }

//       const result = await response.json();
//       const aiMessage = result.content[0].text;

//       conversationHistoryRef.current.push({ role: "assistant", content: aiMessage });

//       const updatedConversation = [...newConversation, { role: "assistant", content: aiMessage }];
//       setConversation(updatedConversation);

//       await speak(aiMessage);

//       if (aiMessage.includes("INTERVIEW_COMPLETE")) {
//         setInterviewComplete(true);
//         setProcessingAI(false);
//         await generateReport();
//       } else {
//         setProcessingAI(false);
//         setTimeout(() => startListening(), 500);
//       }

//     } catch (err) {
//       console.error("AI Error:", err);
//       setError("Failed to process response. Please try again.");
//       setProcessingAI(false);
//     }
//   };

//   /* =========================
//      GENERATE DETAILED REPORT
//      ========================= */
//   const generateReport = async () => {
//     setProcessingAI(true);

//     const conversationText = conversationHistoryRef.current
//       .map(msg => `${msg.role === 'assistant' ? 'Interviewer' : 'Candidate'}: ${msg.content}`)
//       .join('\n\n');

//     try {
//       const response = await fetch("http://localhost:9000/api/openai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "gpt-4o",
//           max_tokens: 1000,
//           messages: [{
//             role: "user",
//             content: `You are an IIT interview panelist. Based on this interview transcript for the position of "${data?.title}", generate a comprehensive, professional evaluation report.

// INTERVIEW TRANSCRIPT:
// ${conversationText}

// Generate a detailed report with the following structure:

// CANDIDATE EVALUATION REPORT
// Position: ${data?.title}

// 1. OVERALL ASSESSMENT
//    - Overall Rating: [X/10]
//    - Brief Summary: [2-3 sentences about overall performance]

// 2. TECHNICAL COMPETENCE
//    - Rating: [X/10]
//    - Strengths: [List 3-4 specific technical strengths demonstrated]
//    - Weaknesses: [List 2-3 areas needing improvement]

// 3. COMMUNICATION SKILLS
//    - Rating: [X/10]
//    - Clarity of expression
//    - Articulation of technical concepts
//    - Response structure

// 4. PROBLEM-SOLVING ABILITY
//    - Rating: [X/10]
//    - Analytical thinking
//    - Approach to complex questions
//    - Adaptability

// 5. BEHAVIORAL/SOFT SKILLS
//    - Confidence level
//    - Professionalism
//    - Team collaboration indicators

// 6. KEY HIGHLIGHTS
//    - [3-4 notable moments or responses]

// 7. AREAS FOR DEVELOPMENT
//    - [3-4 specific recommendations]

// 8. FINAL RECOMMENDATION
//    - [ ] Strongly Recommend for Hire
//    - [ ] Recommend for Hire
//    - [ ] Consider with Reservations
//    - [ ] Do Not Recommend

// 9. ADDITIONAL COMMENTS
//    - [Any other observations or notes]

// Be honest, specific, and constructive. Use examples from the interview where relevant.`
//           }]
//         })
//       });

//       const result = await response.json();
//       const reportText = result.content[0].text;

//       setReport(reportText);
//       setProcessingAI(false);

//     } catch (err) {
//       console.error("Report generation error:", err);
//       setReport("Error generating report. Please try again.");
//       setProcessingAI(false);
//     }
//   };

//   const resetInterview = () => {
//     setInterviewStarted(false);
//     setInterviewComplete(false);
//     setConversation([]);
//     setReport(null);
//     setTranscript("");
//     setInterimTranscript("");
//     setError(null);
//     conversationHistoryRef.current = [];
//     synthRef.current.cancel();
//     stopListening();
//   };

//   /* =========================
//      UI RENDER
//      ========================= */
//   if (loading) {
//     return (
//       <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"} min-h-screen flex items-center justify-center`}>
//         <div className="text-2xl animate-pulse">Loading interview details...</div>
//       </div>
//     );
//   }

//   return (
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen transition-all duration-300`}>
//       {/* Theme Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="fixed top-5 right-5 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:scale-110 transition-all z-50"
//       >
//         {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//       </button>

//       {/* Mute Toggle */}
//       {interviewStarted && (
//         <button
//           onClick={() => setMuteAI(!muteAI)}
//           className="fixed top-5 right-20 p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:scale-110 transition-all z-50"
//           title={muteAI ? "Unmute AI voice" : "Mute AI voice"}
//         >
//           {muteAI ? <VolumeX size={20} /> : <Volume2 size={20} />}
//         </button>
//       )}

//       <div className="container mx-auto px-4 py-8 max-w-5xl">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
//             AI Interview Simulator
//           </h1>
//           {data && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-2xl shadow-xl border-2 max-w-2xl mx-auto`}
//             >
//               <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
//                 {/* {data.description} */}
//                  {data?.description ? (
//     <div
//       dangerouslySetInnerHTML={{ __html: data.description }}
//     />
//   ) : (
//     <p>No description available</p>
//   )}

                
//                 </p>
//               <div className="flex justify-center gap-4 text-sm">
//                 <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
//                   {data.numberOfQuestions} Questions
//                 </span>
//               </div>
//             </motion.div>
//           )}
//         </motion.div>

//         {/* Error Display */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-xl text-center"
//           >
//             {error}
//           </motion.div>
//         )}

//         {/* Pre-Interview */}
//         {!interviewStarted && !interviewComplete && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-center space-y-6"
//           >
//             <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-lg max-w-md mx-auto`}>
//               <h3 className="text-xl font-semibold mb-4">Ready to begin?</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
//                 This is a voice-based AI interview. Make sure your microphone is enabled and you're in a quiet environment.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={startInterview}
//                 disabled={!data}
//                 className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <Play size={24} />
//                 Start Interview
//               </motion.button>
//             </div>
//           </motion.div>
//         )}

//         {/* Active Interview */}
//         {interviewStarted && !interviewComplete && (
//           <div className="space-y-6">
//             {/* Conversation Display */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 max-h-96 overflow-y-auto`}
//             >
//               <AnimatePresence>
//                 {conversation.map((msg, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div className={`max-w-[75%] px-5 py-3 rounded-2xl ${
//                       msg.role === 'assistant'
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
//                         : 'bg-gray-200 dark:bg-gray-700'
//                     }`}>
//                       <p className="text-xs font-semibold mb-1 opacity-80">
//                         {msg.role === 'assistant' ? '🎓 Interviewer' : '👤 You'}
//                       </p>
//                       <p className="text-sm leading-relaxed">{msg.content}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//               <div ref={conversationEndRef} />
//             </motion.div>

//             {/* Voice Input Control */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}
//             >
//               <div className="flex flex-col items-center gap-4">
//                 {/* Mic Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={isListening ? stopListening : startListening}
//                   disabled={isSpeaking || processingAI}
//                   className={`p-8 rounded-full ${
//                     isListening
//                       ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50'
//                       : 'bg-blue-500 shadow-lg'
//                   } text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
//                 >
//                   {isListening ? <MicOff size={40} /> : <Mic size={40} />}
//                 </motion.button>

//                 {/* Status */}
//                 <div className="text-center">
//                   {isSpeaking && (
//                     <p className="text-blue-500 font-semibold animate-pulse">🎤 AI is speaking...</p>
//                   )}
//                   {processingAI && !isSpeaking && (
//                     <p className="text-purple-500 font-semibold">⚡ Processing...</p>
//                   )}
//                   {isListening && !isSpeaking && !processingAI && (
//                     <p className="text-green-500 font-semibold animate-pulse">🎙️ Listening...</p>
//                   )}
//                   {!isListening && !isSpeaking && !processingAI && (
//                     <p className="text-gray-500">Click mic to speak</p>
//                   )}
//                 </div>

//                 {/* Transcript Display */}
//                 {(transcript || interimTranscript) && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-xl"
//                   >
//                     <p className="text-sm text-gray-700 dark:text-gray-300">
//                       <span className="font-semibold">You're saying: </span>
//                       {transcript}
//                       <span className="text-gray-400">{interimTranscript}</span>
//                     </p>
//                     {transcript && !processingAI && (
//                       <button
//                         onClick={submitResponse}
//                         className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
//                       >
//                         ✓ Submit Answer
//                       </button>
//                     )}
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {/* Interview Report */}
//         {interviewComplete && report && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8`}
//           >
//             <div className="flex items-center justify-center mb-6">
//               <FileText size={48} className="text-blue-500 mr-4" />
//               <h2 className="text-3xl font-bold">Interview Evaluation Report</h2>
//             </div>

//             <div className="prose dark:prose-invert max-w-none">
//               <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-gray-50 dark:bg-gray-900 p-6 rounded-xl overflow-auto">
//                 {report}
//               </pre>
//             </div>

//             <div className="mt-8 flex justify-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={resetInterview}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg"
//               >
//                 Start New Interview
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InterviewPage;



//55/ ________________________________-----------------------------------____________________________________________
// --------------------------------------___________________________________--------------------------------------------



// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sun, Moon, Mic, MicOff, FileText, Play, Volume2, VolumeX } from "lucide-react";
// import { useParams } from "react-router-dom";

// const InterviewPage = () => {
//   const { id } = useParams();

//   /* ================= STATE ================= */
//   const [darkMode, setDarkMode] = useState(false);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
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
//   const conversationHistoryRef = useRef([]);

//   /* ================= FETCH JOB ================= */
//   useEffect(() => {
//     if (!id) return;

//     const fetchJob = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`http://localhost:9000/jobs/${id}`);
//         const result = await res.json();
//         setData(result);
//       } catch {
//         setError("Failed to load job");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJob();
//   }, [id]);

//   /* ================= SPEECH SETUP ================= */
//   useEffect(() => {
//     if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
//       setError("Speech recognition not supported");
//       return;
//     }

//     const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const rec = new SR();

//     rec.lang = "en-US";
//     rec.continuous = false;         
//     rec.interimResults = true;

//     // rec.onresult = (event) => {
//     //   clearTimeout(silenceTimerRef.current);

//     //   let interim = "";
//     //   let final = "";

//     //   for (let i = event.resultIndex; i < event.results.length; i++) {
//     //     const text = event.results[i][0].transcript;
//     //     if (event.results[i].isFinal) final += text + " ";
//     //     else interim += text;
//     //   }

//     //   if (final) {
//     //     setTranscript(prev => prev + final);
//     //     setInterimTranscript("");
//     //   } else {
//     //     setInterimTranscript(interim);
//     //   }

//     //   // Restart silence timer after speech
//     //   silenceTimerRef.current = setTimeout(() => {
//     //     stopListening();
//     //     submitResponse(true);
//     //   }, 1000);
//     // };


//     rec.onresult = (event) => {
//   clearTimeout(silenceTimerRef.current);

//   let interim = "";
//   let final = "";

//   for (let i = event.resultIndex; i < event.results.length; i++) {
//     const text = event.results[i][0].transcript;
//     if (event.results[i].isFinal) final += text + " ";
//     else interim += text;
//   }

//   if (final) {
//     setTranscript(prev => prev + final);
//     setInterimTranscript("");
//   } else {
//     setInterimTranscript(interim);
//   }

//   // ✅ restart silence countdown AFTER speech
//   silenceTimerRef.current = setTimeout(() => {
//     stopListening();
//     submitResponse(false);
//   }, 6000);
// };


//     recognitionRef.current = rec;

//     return () => {
//       rec.stop();
//       synthRef.current.cancel();
//     };
//   }, []);

//   useEffect(() => {
//     conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [conversation]);

//   /* ================= VOICE ================= */
//   const speak = (text) => {
//     if (muteAI) return Promise.resolve();

//     return new Promise((resolve) => {
//       synthRef.current.cancel();
//       const u = new SpeechSynthesisUtterance(text);
//       u.onstart = () => setIsSpeaking(true);
//       u.onend = () => {
//         setIsSpeaking(false);
//         resolve();
//       };
//       synthRef.current.speak(u);
//     });
//   };

//   const startListening = () => {
//     if (!recognitionRef.current || processingAI) return;

//     clearTimeout(silenceTimerRef.current);
//     setTranscript("");
//     setInterimTranscript("");
//     setIsListening(true);

//     recognitionRef.current.start();

//     silenceTimerRef.current = setTimeout(() => {
//       stopListening();
//       submitResponse(true);
//     }, 6000);
//   };

//   const stopListening = () => {
//     clearTimeout(silenceTimerRef.current);
//     recognitionRef.current?.stop();
//     setIsListening(false);
//   };

//   /* ================= START INTERVIEW ================= */
//   const startInterview = async () => {
//     if (!data) return;
//      const jobContext = `
// Position: ${data.title}
// Description: ${data.description}
// Number of Questions: ${data.numberOfQuestions}
//     `.trim();


//     setInterviewStarted(true);
//     setProcessingAI(true);

//    const systemPrompt = `You are an experienced IIT interview panelist conducting a real-time, human-like technical and behavioral interview for the position of "${data.title}".

// JOB CONTEXT:
// ${jobContext}

// Your goal is to simulate an actual live interview, not a scripted Q&A.

// INTERVIEW STYLE & BEHAVIOR:
// - Speak naturally, like a human interviewer
// - Use short acknowledgments such as "Okay", "I see", "That's interesting", "Hmm", "Got it"
// - Ask follow-up questions based on the candidate's previous answer
// - Adjust question difficulty dynamically based on how well the candidate responds
// - Do NOT ask all questions at once
// - Ask only ONE question at a time
// - Wait for the candidate's response before continuing
// - Keep responses conversational and brief (2-3 sentences max unless explaining something)

// INTERVIEW STRUCTURE:
// 1. Start with a brief, friendly introduction (1-2 sentences)
// 2. Begin with an easy warm-up question
// 3. Gradually increase difficulty
// 4. Mix technical, conceptual, and behavioral questions
// 5. Ask clarification or probing questions if an answer is vague or incomplete
// 6. If the candidate struggles, gently guide them instead of immediately moving on
// 7. Maintain a professional but calm and human tone throughout

// HUMANIZATION RULES:
// - Avoid robotic phrasing
// - Avoid long monologues
// - React briefly to answers before asking the next question (e.g., "Interesting. So...")
// - Occasionally rephrase or simplify questions like a real interviewer
// - Maintain interview pacing similar to a real IIT panel
// - Show genuine interest in their answers

// IMPORTANT CONSTRAINTS:
// - Do NOT reveal evaluation criteria during the interview
// - Do NOT give solutions unless explicitly asked
// - Do NOT mention that you are an AI
// - Do NOT use markdown or formatting
// - Keep responses concise and conversational
// - Track approximately ${data.numberOfQuestions} questions total

// ENDING THE INTERVIEW:
// - After asking approximately ${data.numberOfQuestions} questions and getting satisfactory answers, conclude naturally
// - Thank the candidate professionally
// - End your final message with the exact phrase: INTERVIEW_COMPLETE

// Now begin the interview naturally.`;

//     try {
//       const res = await fetch("http://localhost:9000/api/openai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "gpt-4o",
//           max_tokens: 600,
//           messages: [
//             { role: "system", content: systemPrompt },
//             { role: "user", content: "Start the interview." }
//           ]
//         })
//       });

//       const json = await res.json();
//       const aiMessage = json.choices[0].message.content;

//       conversationHistoryRef.current = [
//         { role: "assistant", content: aiMessage }
//       ];

//       setConversation([{ role: "assistant", content: aiMessage }]);

//       await speak(aiMessage);
//       setProcessingAI(false);
//       startListening();
//     } catch {
//       setError("Failed to start interview");
//       setInterviewStarted(false);
//       setProcessingAI(false);
//     }
//   };

//   /* ================= SUBMIT ANSWER ================= */
//   const submitResponse = async (auto = false) => {
//   if (processingAI) return;

//   stopListening();
//   setProcessingAI(true);

//   console.log("transcript", transcript);

//   // const message = transcript.trim() || (auto ? "No response provided." : "");
//   let message = transcript.trim();

//   if (!message && auto) {
//     message = "No response provided.";
//   }

//   if (!message) {
//     setProcessingAI(false);
//     return;
//   }

//   // ✅ SAFETY: ensure ref exists
//   if (!conversationHistoryRef.current) {
//     conversationHistoryRef.current = [];
//   }

//   // ✅ FIXED
//   conversationHistoryRef.current.push({
//     role: "user",
//     content: message
//   });

//   setConversation(prev => [
//     ...prev,
//     { role: "user", content: message }
//   ]);

//   setTranscript("");
//   setInterimTranscript("");

//   try {
//     const res = await fetch("http://localhost:9000/api/openai", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         model: "gpt-4o",
//         max_tokens: 600,
//         messages: conversationHistoryRef.current
//       })
//     });

//     const json = await res.json();
//     const aiMessage = json.choices?.[0]?.message?.content;

//     if (!aiMessage) {
//       throw new Error("Invalid AI response");
//     }

//     conversationHistoryRef.current.push({
//       role: "assistant",
//       content: aiMessage
//     });

//     setConversation(prev => [
//       ...prev,
//       { role: "assistant", content: aiMessage }
//     ]);

//     await speak(aiMessage);

//     if (aiMessage.includes("INTERVIEW_COMPLETE")) {
//       setInterviewComplete(true);
//       setProcessingAI(false);
//       return;
//     }

//     setProcessingAI(false);
//     startListening();
//   } catch (err) {
//     console.error("AI error:", err);
//     setError("AI error");
//     setProcessingAI(false);
//   }
// };


//   /* ================= UI ================= */
//   if (loading) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;

//   return (
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"} min-h-screen`}>
//       <button onClick={() => setDarkMode(!darkMode)} className="fixed top-4 right-4">
//         {darkMode ? <Sun /> : <Moon />}
//       </button>

//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-4xl font-bold text-center mb-6">AI Interview</h1>

//         {!interviewStarted && (
//           <button onClick={startInterview} className="w-full bg-green-500 p-4 text-white rounded-xl">
//             <Play className="inline mr-2" /> Start Interview
//           </button>
//         )}

//         {interviewStarted && !interviewComplete && (
//           <>
//             <div className="bg-white p-6 rounded-xl shadow max-h-96 overflow-y-auto">
//               {conversation.map((m, i) => (
//                 <p key={i}><b>{m.role === "assistant" ? "AI" : "You"}:</b> {m.content}</p>
//               ))}
//               <div ref={conversationEndRef} />
//             </div>

//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={isListening ? stopListening : startListening}
//                 className={`p-6 rounded-full ${isListening ? "bg-red-500" : "bg-blue-500"} text-white`}
//               >
//                 {isListening ? <MicOff /> : <Mic />}
//               </button>
//             </div>

//             {(transcript || interimTranscript) && (
//               <div className="mt-4 p-4 bg-gray-200 rounded">
//                 {transcript}
//                 <span className="opacity-50">{interimTranscript}</span>
//               </div>
//             )}
//           </>
//         )}

//         {interviewComplete && (
//           <div className="bg-white p-6 rounded-xl shadow mt-6">
//             <h2 className="text-2xl font-bold mb-2">Interview Complete</h2>
//             <FileText />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InterviewPage;


// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sun, Moon, Mic, MicOff, FileText, Play, Volume2, VolumeX } from "lucide-react";
// import {useParams} from "react-router-dom"
// const InterviewPage = () => {
//   // For demo - replace with useParams() in your actual code
//   const id = useParams()

//   /* ================= STATE ================= */
//   const [darkMode, setDarkMode] = useState(false);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
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

//   // /* ================= FETCH JOB ================= */
//    useEffect(() => {
//   if (!id) return; // Get id from URL params

//   const fetchJob = async () => {
//     try {
//       const response = await fetch(`http://localhost:9000/jobs/${id}`);
//       const result = await response.json();
      
//       setData({
//         title: result.title,
//         description: result.description,
//         numberOfQuestions: result.questions?.length || 5
//       });
//     } catch (err) {
//       setError("Failed to load job details");
//     }
//   };

//   fetchJob();
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
//     rec.continuous = true; // ✅ Keep listening continuously
//     rec.interimResults = true;

//     rec.onresult = (event) => {
//       // Clear any existing silence timer
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
//         setTranscript(prev => prev + final);
//         setInterimTranscript("");
//       } else {
//         setInterimTranscript(interim);
//       }

//       // ✅ Start silence timer ONLY after detecting speech
//       silenceTimerRef.current = setTimeout(() => {
//         const currentTranscript = transcript + final;
//         if (currentTranscript.trim()) {
//           stopListening();
//           submitResponse();
//         }
//       }, 2000); // 2 seconds of silence after speech
//     };

//     rec.onend = () => {
//       // ✅ Auto-restart if still in listening mode
//       if (isListening && !processingAI && interviewStarted && !interviewComplete) {
//         try {
//           rec.start();
//         } catch (e) {
//           console.log("Recognition restart failed:", e);
//         }
//       }
//     };

//     rec.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       if (event.error === "no-speech") {
//         // Ignore no-speech errors, will auto-restart
//         return;
//       }
//       if (event.error === "aborted") {
//         // Normal abort, ignore
//         return;
//       }
//       setIsListening(false);
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
//   }, [isListening, processingAI, interviewStarted, interviewComplete, transcript]);

//   useEffect(() => {
//     conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [conversation]);

//   /* ================= VOICE HELPERS ================= */
//   const speak = (text) => {
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
//   };

//   const startListening = () => {
//     if (!recognitionRef.current || processingAI || isListening) return;

//     clearTimeout(silenceTimerRef.current);
//     setTranscript("");
//     setInterimTranscript("");
//     setIsListening(true);

//     try {
//       recognitionRef.current.start();
//     } catch (e) {
//       console.log("Recognition already started:", e);
//     }
//   };

//   const stopListening = () => {
//     clearTimeout(silenceTimerRef.current);
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsListening(false);
//   };

//   /* ================= START INTERVIEW ================= */
//   const startInterview = async () => {
//     if (!data) return;

//     const jobContext = `
// Position: ${data.title}
// Description: ${data.description}
// Number of Questions: ${data.numberOfQuestions}
//     `.trim();

//     const systemPrompt = `You are an experienced IIT interview panelist conducting a real-time, human-like technical and behavioral interview for the position of "${data.title}".

// JOB CONTEXT:
// ${jobContext}

// Your goal is to simulate an actual live interview, not a scripted Q&A.

// INTERVIEW STYLE & BEHAVIOR:
// - Speak naturally, like a human interviewer
// - Use short acknowledgments such as "Okay", "I see", "That's interesting", "Hmm", "Got it"
// - Ask follow-up questions based on the candidate's previous answer
// - Adjust question difficulty dynamically based on how well the candidate responds
// - Do NOT ask all questions at once
// - Ask only ONE question at a time
// - Wait for the candidate's response before continuing
// - Keep responses conversational and brief (2-3 sentences max unless explaining something)

// INTERVIEW STRUCTURE:
// 1. Start with a brief, friendly introduction (1-2 sentences)
// 2. Begin with an easy warm-up question
// 3. Gradually increase difficulty
// 4. Mix technical, conceptual, and behavioral questions
// 5. Ask clarification or probing questions if an answer is vague or incomplete
// 6. If the candidate struggles, gently guide them instead of immediately moving on
// 7. Maintain a professional but calm and human tone throughout

// HUMANIZATION RULES:
// - Avoid robotic phrasing
// - Avoid long monologues
// - React briefly to answers before asking the next question (e.g., "Interesting. So...")
// - Occasionally rephrase or simplify questions like a real interviewer
// - Maintain interview pacing similar to a real IIT panel
// - Show genuine interest in their answers

// IMPORTANT CONSTRAINTS:
// - Do NOT reveal evaluation criteria during the interview
// - Do NOT give solutions unless explicitly asked
// - Do NOT mention that you are an AI
// - Do NOT use markdown or formatting
// - Keep responses concise and conversational
// - Track approximately ${data.numberOfQuestions} questions total

// ENDING THE INTERVIEW:
// - After asking approximately ${data.numberOfQuestions} questions and getting satisfactory answers, conclude naturally
// - Thank the candidate professionally
// - End your final message with the exact phrase: INTERVIEW_COMPLETE

// Now begin the interview naturally.`;

//     // ✅ Store system prompt
//     systemPromptRef.current = systemPrompt;

//     setInterviewStarted(true);
//     setProcessingAI(true);

//     try {
//       const res = await fetch("http://localhost:9000/api/openai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "gpt-4o",
//           messages: [
//             { role: "system", content: systemPrompt },
//             { role: "user", content: "Hello, I'm ready for the interview." }
//           ]
//         })
//       });

//       if (!res.ok) {
//         throw new Error(`API Error: ${res.status}`);
//       }

//       const json = await res.json();
//       const aiMessage = json.choices?.[0]?.message?.content;

//       if (!aiMessage) {
//         throw new Error("No AI response received");
//       }

//       // ✅ Initialize conversation history (without system prompt for API calls)
//       conversationHistoryRef.current = [
//         { role: "user", content: "Hello, I'm ready for the interview." },
//         { role: "assistant", content: aiMessage }
//       ];

//       setConversation([{ role: "assistant", content: aiMessage }]);

//       await speak(aiMessage);
//       setProcessingAI(false);
      
//       // Start listening after AI finishes speaking
//       setTimeout(() => startListening(), 500);

//     } catch (err) {
//       console.error("Start interview error:", err);
//       setError(`Failed to start interview: ${err.message}`);
//       setInterviewStarted(false);
//       setProcessingAI(false);
//     }
//   };

//   /* ================= SUBMIT ANSWER ================= */
//   const submitResponse = async () => {
//     if (processingAI) return;

//     const message = transcript.trim();

//     // If no speech detected, ignore
//     if (!message) {
//       console.log("No transcript to submit");
//       setProcessingAI(false);
//       // Restart listening
//       setTimeout(() => startListening(), 500);
//       return;
//     }

//     stopListening();
//     setProcessingAI(true);

//     console.log("Submitting transcript:", message);

//     // ✅ Add user message to history
//     conversationHistoryRef.current.push({
//       role: "user",
//       content: message
//     });

//     // ✅ Update UI conversation
//     setConversation(prev => [
//       ...prev,
//       { role: "user", content: message }
//     ]);

//     // Clear transcripts
//     setTranscript("");
//     setInterimTranscript("");

//     try {
//       // ✅ Send with system prompt + full history
//       const res = await fetch("http://localhost:9000/api/openai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "gpt-4o",
//           messages: [
//             { role: "system", content: systemPromptRef.current },
//             ...conversationHistoryRef.current
//           ]
//         })
//       });

//       if (!res.ok) {
//         throw new Error(`API Error: ${res.status}`);
//       }

//       const json = await res.json();
//       const aiMessage = json.choices?.[0]?.message?.content;

//       if (!aiMessage) {
//         throw new Error("No AI response received");
//       }

//       // ✅ Add AI response to history
//       conversationHistoryRef.current.push({
//         role: "assistant",
//         content: aiMessage
//       });

//       setConversation(prev => [
//         ...prev,
//         { role: "assistant", content: aiMessage }
//       ]);

//       await speak(aiMessage);

//       // ✅ Check if interview is complete
//       if (aiMessage.includes("INTERVIEW_COMPLETE")) {
//         setInterviewComplete(true);
//         setProcessingAI(false);
//         await generateReport();
//         return;
//       }

//       setProcessingAI(false);
      
//       // Resume listening after AI finishes speaking
//       setTimeout(() => startListening(), 500);

//     } catch (err) {
//       console.error("Submit response error:", err);
//       setError(`AI error: ${err.message}`);
//       setProcessingAI(false);
      
//       // Try to resume listening even after error
//       setTimeout(() => startListening(), 1000);
//     }
//   };

//   /* ================= GENERATE REPORT ================= */
//   const generateReport = async () => {
//     setProcessingAI(true);

//     const conversationText = conversationHistoryRef.current
//       .map(msg => `${msg.role === 'assistant' ? 'Interviewer' : 'Candidate'}: ${msg.content}`)
//       .join('\n\n');

//     try {
//       const res = await fetch("http://localhost:9000/api/openai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "gpt-4o",
//           messages: [{
//             role: "user",
//             content: `Based on this interview transcript for the position of "${data?.title}", generate a comprehensive evaluation report.

// INTERVIEW TRANSCRIPT:
// ${conversationText}

// Generate a detailed report with:
// 1. OVERALL ASSESSMENT (Rating out of 10)
// 2. TECHNICAL COMPETENCE
// 3. COMMUNICATION SKILLS
// 4. PROBLEM-SOLVING ABILITY
// 5. KEY HIGHLIGHTS
// 6. AREAS FOR DEVELOPMENT
// 7. FINAL RECOMMENDATION (Strongly Recommend/Recommend/Consider/Do Not Recommend)

// Be specific and constructive.`
//           }]
//         })
//       });

//       const json = await res.json();
//       const reportText = json.choices?.[0]?.message?.content;

//       setReport(reportText || "Report generation failed");
//       setProcessingAI(false);

//     } catch (err) {
//       console.error("Report generation error:", err);
//       setReport("Error generating report. Please try again.");
//       setProcessingAI(false);
//     }
//   };

//   const resetInterview = () => {
//     setInterviewStarted(false);
//     setInterviewComplete(false);
//     setConversation([]);
//     setReport(null);
//     setTranscript("");
//     setInterimTranscript("");
//     setError(null);
//     conversationHistoryRef.current = [];
//     systemPromptRef.current = "";
//     synthRef.current.cancel();
//     stopListening();
//   };

//   /* ================= MANUAL SUBMIT BUTTON ================= */
//   const handleManualSubmit = () => {
//     if (transcript.trim()) {
//       stopListening();
//       submitResponse();
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
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen transition-all`}>
//       {/* Theme Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="fixed top-5 right-5 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:scale-110 transition-all z-50"
//       >
//         {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//       </button>

//       {/* Mute Toggle */}
//       {interviewStarted && (
//         <button
//           onClick={() => setMuteAI(!muteAI)}
//           className="fixed top-5 right-20 p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:scale-110 transition-all z-50"
//           title={muteAI ? "Unmute AI voice" : "Mute AI voice"}
//         >
//           {muteAI ? <VolumeX size={20} /> : <Volume2 size={20} />}
//         </button>
//       )}

//       <div className="container mx-auto px-4 py-8 max-w-5xl">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
//             AI Voice Interview
//           </h1>
//           {data && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl shadow-xl max-w-2xl mx-auto`}
//             >
//               <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{data.description}</p>
//               <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
//                 {data.numberOfQuestions} Questions
//               </span>
//             </motion.div>
//           )}
//         </motion.div>

//         {/* Error Display */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-xl text-center"
//           >
//             ⚠️ {error}
//           </motion.div>
//         )}

//         {/* Pre-Interview */}
//         {!interviewStarted && !interviewComplete && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-center"
//           >
//             <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-lg max-w-md mx-auto`}>
//               <h3 className="text-xl font-semibold mb-4">Ready to begin?</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
//                 Enable your microphone and speak clearly. The interview will be conversational and adaptive.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={startInterview}
//                 disabled={!data}
//                 className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
//               >
//                 <Play size={24} />
//                 Start Interview
//               </motion.button>
//             </div>
//           </motion.div>
//         )}

//         {/* Active Interview */}
//         {interviewStarted && !interviewComplete && (
//           <div className="space-y-6">
//             {/* Conversation Display */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 max-h-96 overflow-y-auto`}
//             >
//               <AnimatePresence>
//                 {conversation.map((msg, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div className={`max-w-[75%] px-5 py-3 rounded-2xl ${
//                       msg.role === 'assistant'
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
//                         : 'bg-gray-200 dark:bg-gray-700'
//                     }`}>
//                       <p className="text-xs font-semibold mb-1 opacity-80">
//                         {msg.role === 'assistant' ? '🎓 Interviewer' : '👤 You'}
//                       </p>
//                       <p className="text-sm leading-relaxed">{msg.content}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//               <div ref={conversationEndRef} />
//             </motion.div>

//             {/* Voice Control */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}
//             >
//               <div className="flex flex-col items-center gap-4">
//                 {/* Mic Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={isListening ? stopListening : startListening}
//                   disabled={isSpeaking || processingAI}
//                   className={`p-8 rounded-full ${
//                     isListening
//                       ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50'
//                       : 'bg-blue-500 shadow-lg'
//                   } text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
//                 >
//                   {isListening ? <MicOff size={40} /> : <Mic size={40} />}
//                 </motion.button>

//                 {/* Status */}
//                 <div className="text-center min-h-[24px]">
//                   {isSpeaking && (
//                     <p className="text-blue-500 font-semibold animate-pulse">🎤 AI is speaking...</p>
//                   )}
//                   {processingAI && !isSpeaking && (
//                     <p className="text-purple-500 font-semibold">⚡ Processing...</p>
//                   )}
//                   {isListening && !isSpeaking && !processingAI && (
//                     <p className="text-green-500 font-semibold animate-pulse">🎙️ Listening... Speak now!</p>
//                   )}
//                   {!isListening && !isSpeaking && !processingAI && (
//                     <p className="text-gray-500">Click microphone to speak</p>
//                   )}
//                 </div>

//                 {/* Transcript Display */}
//                 {(transcript || interimTranscript) && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-xl"
//                   >
//                     <p className="text-sm text-gray-700 dark:text-gray-300">
//                       <span className="font-semibold">You're saying: </span>
//                       {transcript}
//                       <span className="text-gray-400 italic">{interimTranscript}</span>
//                     </p>
//                     {transcript && !processingAI && (
//                       <button
//                         onClick={handleManualSubmit}
//                         className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
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

//         {/* Interview Report */}
//         {interviewComplete && report && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8`}
//           >
//             <div className="flex items-center justify-center mb-6">
//               <FileText size={48} className="text-blue-500 mr-4" />
//               <h2 className="text-3xl font-bold">Interview Evaluation Report</h2>
//             </div>

//             <div className="prose dark:prose-invert max-w-none">
//               <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
//                 {report}
//               </pre>
//             </div>

//             <div className="mt-8 flex justify-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={resetInterview}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg"
//               >
//                 Start New Interview
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InterviewPage;

// -----------------------------------------------------------------------------------
// __________________________________________________________________________________

// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sun, Moon, Mic, MicOff, FileText, Play, Volume2, VolumeX } from "lucide-react";
// import {useParams} from "react-router-dom";


// const InterviewPage = () => {
//   // For demo - replace with actual data fetching
//   // const mockData = {
//   //   title: "Senior Software Engineer",
//   //   description: "Full-stack development position with focus on React and Node.js",
//   //   numberOfQuestions: 5
//   // };

//   /* ================= STATE ================= */
//   const [darkMode, setDarkMode] = useState(false);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
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
//   const transcriptRef = useRef(""); // ✅ NEW: For immediate access to current transcript
//   const {id}  = useParams()
//   /* ================= FETCH JOB (Demo version) ================= */
//   // useEffect(() => {
//   //   // In production, uncomment this and use actual API:
//   //   const fetchJob = async () => {
//   //     try {
//   //       console.log("Came to fetch job")
//   //       const response = await fetch(`http://localhost:9000/jobs/${id}`);
//   //       console.log("Came to fetch job")

//   //       console.log("Response",response)
//   //       const result = await response.json();
//   //       console.log("result",result)
        
//   //       setData({
//   //         title: result.title,
//   //         description: result.description,
//   //         numberOfQuestions: result.questions?.length || 5
//   //       });
//   //       console.log("data",data)
//   //     } catch (err) {
//   //       setError("Failed to load job details");
//   //     }
//   //   };
//   //   fetchJob();
//   // }, []);



//   useEffect(() => {
//   if (!id) return; // ✅ safety check

//   const fetchJob = async () => {
//     try {
//       console.log("Fetching job with id:", id);

//       const response = await fetch(`http://localhost:9000/jobs/${id}`);

//       // ✅ VERY IMPORTANT
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("Job API result:", result);

//       setData({
//         title: result?.title || "",
//         description: result?.description || "",
//         numberOfQuestions: result?.questions?.length ?? 5,
//       });

//     } catch (err) {
//       console.error("Fetch job error:", err);
//       setError("Failed to load job details");
//     }
//   };

//   fetchJob();
// }, [id]); // ✅ add id here

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
//         // ✅ Update both state AND ref immediately
//         const newTranscript = transcriptRef.current + final;
//         transcriptRef.current = newTranscript;
//         setTranscript(newTranscript);
//         setInterimTranscript("");
//       } else {
//         setInterimTranscript(interim);
//       }

//       // ✅ Start silence timer using ref value
//       silenceTimerRef.current = setTimeout(() => {
//         if (transcriptRef.current.trim()) {
//           stopListening();
//           submitResponseWithText(transcriptRef.current);
//         }
//       }, 2000);
//     };

//     rec.onend = () => {
//       // ✅ Auto-restart if still in listening mode
//       if (isListening && !processingAI && interviewStarted && !interviewComplete) {
//         try {
//           rec.start();
//         } catch (e) {
//           console.log("Recognition restart failed:", e);
//         }
//       }
//     };

//     rec.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
      
//       if (event.error === "no-speech" || event.error === "aborted") {
//         return; // Ignore these errors
//       }
      
//       // ✅ Try to recover from errors
//       setIsListening(false);
//       setTimeout(() => {
//         if (interviewStarted && !interviewComplete && !processingAI) {
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
//   }, [isListening, processingAI, interviewStarted, interviewComplete]); // ✅ Removed 'transcript' dependency

//   useEffect(() => {
//     conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [conversation]);

//   /* ================= VOICE HELPERS ================= */
//   const speak = (text) => {
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
//   };

//   const startListening = () => {
//     if (!recognitionRef.current || processingAI || isListening) return;

//     clearTimeout(silenceTimerRef.current);
//     setTranscript("");
//     setInterimTranscript("");
//     transcriptRef.current = ""; // ✅ Clear ref
//     setIsListening(true);

//     try {
//       recognitionRef.current.start();
//     } catch (e) {
//       console.log("Recognition already started:", e);
//     }
//   };

//   const stopListening = () => {
//     clearTimeout(silenceTimerRef.current);
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsListening(false);
//   };

//   /* ================= START INTERVIEW ================= */
//   const startInterview = async () => {
//     if (!data) return;

//     const jobContext = `
// Position: ${data.title}
// Description: ${data.description}
// Number of Questions: ${data.numberOfQuestions}
//     `.trim();

//     const systemPrompt = `You are an experienced IIT interview panelist conducting a real-time, human-like technical and behavioral interview for the position of "${data.title}".

// JOB CONTEXT:
// ${jobContext}

// Your goal is to simulate an actual live interview, not a scripted Q&A.

// INTERVIEW STYLE & BEHAVIOR:
// - Speak naturally, like a human interviewer
// - Use short acknowledgments such as "Okay", "I see", "That's interesting", "Hmm", "Got it"
// - Ask follow-up questions based on the candidate's previous answer
// - Adjust question difficulty dynamically based on how well the candidate responds
// - Do NOT ask all questions at once
// - Ask only ONE question at a time
// - Wait for the candidate's response before continuing
// - Keep responses conversational and brief (2-3 sentences max unless explaining something)

// INTERVIEW STRUCTURE:
// 1. Start with a brief, friendly introduction (1-2 sentences)
// 2. Begin with an easy warm-up question
// 3. Gradually increase difficulty
// 4. Mix technical, conceptual, and behavioral questions
// 5. Ask clarification or probing questions if an answer is vague or incomplete
// 6. If the candidate struggles, gently guide them instead of immediately moving on
// 7. Maintain a professional but calm and human tone throughout

// HUMANIZATION RULES:
// - Avoid robotic phrasing
// - Avoid long monologues
// - React briefly to answers before asking the next question (e.g., "Interesting. So...")
// - Occasionally rephrase or simplify questions like a real interviewer
// - Maintain interview pacing similar to a real IIT panel
// - Show genuine interest in their answers

// IMPORTANT CONSTRAINTS:
// - Do NOT reveal evaluation criteria during the interview
// - Do NOT give solutions unless explicitly asked
// - Do NOT mention that you are an AI
// - Do NOT use markdown or formatting
// - Keep responses concise and conversational
// - Track approximately ${data.numberOfQuestions} questions total

// ENDING THE INTERVIEW:
// - After asking approximately ${data.numberOfQuestions} questions and getting satisfactory answers, conclude naturally
// - Thank the candidate professionally
// - End your final message with the exact phrase: INTERVIEW_COMPLETE

// Now begin the interview naturally.`;

//     systemPromptRef.current = systemPrompt;

//     setInterviewStarted(true);
//     setProcessingAI(true);

//     try {
//       // ✅ Demo: Simulated AI response
//       // const mockAIResponse = "Hello! Thanks for joining today. Let's start with a quick warm-up question. Can you tell me about your experience with React and what you find most interesting about it?";
      
//       // In production, use this:
      
//       const res = await fetch("http://localhost:9000/api/openai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "gpt-4o",
//           messages: [
//             { role: "system", content: systemPrompt },
//             { role: "user", content: "Hello, I'm ready for the interview." }
//           ]
//         })
//       });

//       if (!res.ok) {
//         throw new Error(`API Error: ${res.status}`);
//       }

//       const json = await res.json();
//       const aiMessage = json.choices?.[0]?.message?.content;
    

//       // const aiMessage = mockAIResponse;

//       if (!aiMessage) {
//         throw new Error("No AI response received");
//       }

//       conversationHistoryRef.current = [
//         { role: "user", content: "Hello, I'm ready for the interview." },
//         { role: "assistant", content: aiMessage }
//       ];

//       setConversation([{ role: "assistant", content: aiMessage }]);

//       await speak(aiMessage);
//       setProcessingAI(false);
      
//       // Start listening after AI finishes speaking
//       setTimeout(() => startListening(), 500);

//     } catch (err) {
//       console.error("Start interview error:", err);
//       setError(`Failed to start interview: ${err.message}`);
//       setInterviewStarted(false);
//       setProcessingAI(false);
//     }
//   };

//   /* ================= SUBMIT ANSWER (NEW VERSION) ================= */
//   const submitResponseWithText = async (messageText) => {
//     if (processingAI) return;

//     const message = messageText.trim();

//     if (!message) {
//       console.log("No transcript to submit");
//       setProcessingAI(false);
//       setTimeout(() => startListening(), 500);
//       return;
//     }

//     stopListening();
//     setProcessingAI(true);

//     console.log("Submitting transcript:", message);

//     conversationHistoryRef.current.push({
//       role: "user",
//       content: message
//     });

//     setConversation(prev => [
//       ...prev,
//       { role: "user", content: message }
//     ]);

//     // ✅ Clear both state and ref
//     setTranscript("");
//     setInterimTranscript("");
//     transcriptRef.current = "";

//     try {
//       // ✅ Demo: Simulated AI responses
//       // const responses = [
//       //   "I see. Can you explain how you handle state management in large React applications?",
//       //   "That's interesting. What about performance optimization? How do you approach that?",
//       //   "Good point. Tell me about a challenging bug you've encountered and how you solved it.",
//       //   "Excellent. One last question - where do you see yourself in 5 years? INTERVIEW_COMPLETE"
//       // ];
      
//       // const responseIndex = Math.min(
//       //   conversationHistoryRef.current.filter(m => m.role === "assistant").length - 1,
//       //   responses.length - 1
//       // );
      
//       // const aiMessage = responses[responseIndex];
      
//       // In production, use this:
      
//       const res = await fetch("http://localhost:9000/api/openai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "gpt-4o",
//           messages: [
//             { role: "system", content: systemPromptRef.current },
//             ...conversationHistoryRef.current
//           ]
//         })
//       });

//       if (!res.ok) {
//         throw new Error(`API Error: ${res.status}`);
//       }

//       const json = await res.json();
//       const aiMessage = json.choices?.[0]?.message?.content;

//       if (!aiMessage) {
//         throw new Error("No AI response received");
//       }

//       conversationHistoryRef.current.push({
//         role: "assistant",
//         content: aiMessage
//       });

//       setConversation(prev => [
//         ...prev,
//         { role: "assistant", content: aiMessage }
//       ]);

//       await speak(aiMessage);

//       // ✅ Check if interview is complete
//       if (aiMessage.includes("INTERVIEW_COMPLETE")) {
//         setInterviewComplete(true);
//         setProcessingAI(false);
//         await generateReport();
//         return;
//       }

//       setProcessingAI(false);
      
//       // Resume listening after AI finishes speaking
//       setTimeout(() => startListening(), 500);

//     } catch (err) {
//       console.error("Submit response error:", err);
//       setError(`AI error: ${err.message}`);
//       setProcessingAI(false);
      
//       // Try to resume listening even after error
//       setTimeout(() => startListening(), 1000);
//     }
//   };

//   // ✅ Wrapper for manual submit button
//   const submitResponse = () => {
//     submitResponseWithText(transcriptRef.current);
//   };

//   /* ================= GENERATE REPORT ================= */
//   const generateReport = async () => {
//     setProcessingAI(true);

//     const conversationText = conversationHistoryRef.current
//       .map(msg => `${msg.role === 'assistant' ? 'Interviewer' : 'Candidate'}: ${msg.content}`)
//       .join('\n\n');

//     try {
//       // ✅ Demo: Mock report
// //       const mockReport = `
// // INTERVIEW EVALUATION REPORT
// // Position: ${data?.title}

// // 1. OVERALL ASSESSMENT: 8/10
// //    Strong technical knowledge with good communication skills.

// // 2. TECHNICAL COMPETENCE: 8.5/10
// //    - Demonstrated solid understanding of React fundamentals
// //    - Good grasp of state management patterns
// //    - Practical experience with performance optimization

// // 3. COMMUNICATION SKILLS: 8/10
// //    - Clear and articulate responses
// //    - Good structure in explanations
// //    - Could improve on providing more specific examples

// // 4. PROBLEM-SOLVING ABILITY: 7.5/10
// //    - Methodical approach to debugging
// //    - Good analytical thinking
// //    - Would benefit from more discussion of edge cases

// // 5. KEY HIGHLIGHTS:
// //    - Strong React ecosystem knowledge
// //    - Practical real-world experience
// //    - Enthusiastic and engaged throughout

// // 6. AREAS FOR DEVELOPMENT:
// //    - Deeper dive into advanced patterns
// //    - More emphasis on testing strategies
// //    - System design considerations

// // 7. FINAL RECOMMENDATION: Recommend
// //    Candidate shows strong potential and would be a good fit for the role.
// //    Recommend proceeding to next round.
// //       `;

//       // In production, use this:
//       const res = await fetch("http://localhost:9000/api/openai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "gpt-4o",
//           messages: [{
//             role: "user",
//             content: `Based on this interview transcript for the position of "${data?.title}", generate a comprehensive evaluation report.

// INTERVIEW TRANSCRIPT:
// ${conversationText}

// Generate a detailed report with:
// 1. OVERALL ASSESSMENT (Rating out of 10)
// 2. TECHNICAL COMPETENCE
// 3. COMMUNICATION SKILLS
// 4. PROBLEM-SOLVING ABILITY
// 5. KEY HIGHLIGHTS
// 6. AREAS FOR DEVELOPMENT
// 7. FINAL RECOMMENDATION (Strongly Recommend/Recommend/Consider/Do Not Recommend)

// Be specific and constructive.`
//           }]
//         })
//       });

//       const json = await res.json();
//       const reportText = json.choices?.[0]?.message?.content;
      

//       setReport(reportText || "Report generation failed");
//       setProcessingAI(false);

//     } catch (err) {
//       console.error("Report generation error:", err);
//       setReport("Error generating report. Please try again.");
//       setProcessingAI(false);
//     }
//   };

//   const resetInterview = () => {
//     setInterviewStarted(false);
//     setInterviewComplete(false);
//     setConversation([]);
//     setReport(null);
//     setTranscript("");
//     setInterimTranscript("");
//     transcriptRef.current = ""; // ✅ Clear ref
//     setError(null);
//     conversationHistoryRef.current = [];
//     systemPromptRef.current = "";
//     synthRef.current.cancel();
//     stopListening();
//   };

//   /* ================= MANUAL SUBMIT BUTTON ================= */
//   const handleManualSubmit = () => {
//     if (transcriptRef.current.trim()) {
//       stopListening();
//       submitResponse();
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
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen transition-all`}>
//       {/* Theme Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="fixed top-5 right-5 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:scale-110 transition-all z-50"
//       >
//         {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//       </button>

//       {/* Mute Toggle */}
//       {interviewStarted && (
//         <button
//           onClick={() => setMuteAI(!muteAI)}
//           className="fixed top-5 right-20 p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:scale-110 transition-all z-50"
//           title={muteAI ? "Unmute AI voice" : "Mute AI voice"}
//         >
//           {muteAI ? <VolumeX size={20} /> : <Volume2 size={20} />}
//         </button>
//       )}

//       <div className="container mx-auto px-4 py-8 max-w-5xl">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
//             AI Voice Interview
//           </h1>
//           {data && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl shadow-xl max-w-2xl mx-auto`}
//             >
//               <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
//                 {/* {data.description} */}
                
//  {data?.description ? (
//     <div
//        dangerouslySetInnerHTML={{ __html: data.description }}
//      />
//    ) : (
//      <p>No description available</p>
//    )}
                
//                 </p>
//               <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
//                 {data.numberOfQuestions} Questions
//               </span>
//             </motion.div>
//           )}
//         </motion.div>

//         {/* Error Display */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-xl text-center"
//           >
//             ⚠️ {error}
//           </motion.div>
//         )}

//         {/* Pre-Interview */}
//         {!interviewStarted && !interviewComplete && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-center"
//           >
//             <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-lg max-w-md mx-auto`}>
//               <h3 className="text-xl font-semibold mb-4">Ready to begin?</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
//                 Enable your microphone and speak clearly. The interview will be conversational and adaptive.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={startInterview}
//                 disabled={!data}
//                 className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
//               >
//                 <Play size={24} />
//                 Start Interview
//               </motion.button>
//             </div>
//           </motion.div>
//         )}

//         {/* Active Interview */}
//         {interviewStarted && !interviewComplete && (
//           <div className="space-y-6">
//             {/* Conversation Display */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 max-h-96 overflow-y-auto`}
//             >
//               <AnimatePresence>
//                 {conversation.map((msg, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div className={`max-w-[75%] px-5 py-3 rounded-2xl ${
//                       msg.role === 'assistant'
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
//                         : 'bg-gray-200 dark:bg-gray-700'
//                     }`}>
//                       <p className="text-xs font-semibold mb-1 opacity-80">
//                         {msg.role === 'assistant' ? '🎓 Interviewer' : '👤 You'}
//                       </p>
//                       <p className="text-sm leading-relaxed">{msg.content}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//               <div ref={conversationEndRef} />
//             </motion.div>

//             {/* Voice Control */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}
//             >
//               <div className="flex flex-col items-center gap-4">
//                 {/* Mic Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={isListening ? stopListening : startListening}
//                   disabled={isSpeaking || processingAI}
//                   className={`p-8 rounded-full ${
//                     isListening
//                       ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50'
//                       : 'bg-blue-500 shadow-lg'
//                   } text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
//                 >
//                   {isListening ? <MicOff size={40} /> : <Mic size={40} />}
//                 </motion.button>

//                 {/* Status */}
//                 <div className="text-center min-h-[24px]">
//                   {isSpeaking && (
//                     <p className="text-blue-500 font-semibold animate-pulse">🎤 AI is speaking...</p>
//                   )}
//                   {processingAI && !isSpeaking && (
//                     <p className="text-purple-500 font-semibold">⚡ Processing...</p>
//                   )}
//                   {isListening && !isSpeaking && !processingAI && (
//                     <p className="text-green-500 font-semibold animate-pulse">🎙️ Listening... Speak now!</p>
//                   )}
//                   {!isListening && !isSpeaking && !processingAI && (
//                     <p className="text-gray-500">Click microphone to speak</p>
//                   )}
//                 </div>

//                 {/* Transcript Display */}
//                 {(transcript || interimTranscript) && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-xl"
//                   >
//                     <p className="text-sm text-gray-700 dark:text-gray-300">
//                       <span className="font-semibold">You're saying: </span>
//                       {transcript}
//                       <span className="text-gray-400 italic">{interimTranscript}</span>
//                     </p>
//                     {transcript && !processingAI && (
//                       <button
//                         onClick={handleManualSubmit}
//                         className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
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

//         {/* Interview Report */}
//         {interviewComplete && report && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8`}
//           >
//             <div className="flex items-center justify-center mb-6">
//               <FileText size={48} className="text-blue-500 mr-4" />
//               <h2 className="text-3xl font-bold">Interview Evaluation Report</h2>
//             </div>

//             <div className="prose dark:prose-invert max-w-none">
//               <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
//                 {report}
//               </pre>
//             </div>

//             <div className="mt-8 flex justify-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={resetInterview}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg"
//               >
//                 Start New Interview
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InterviewPage;




// -----------------------------------------------------------------------------
// -------------------Helpfull one----------------------------------------------------------

// import { useState, useEffect, useRef, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sun, Moon, Mic, MicOff, FileText, Play, Volume2, VolumeX } from "lucide-react";

// const InterviewPage = () => {
//   /* ================= STATE ================= */
//   const [darkMode, setDarkMode] = useState(false);
//   const [data, setData] = useState({
//     title: "Senior Software Engineer",
//     description: "Full-stack development position with focus on React and Node.js",
//     numberOfQuestions: 5
//   });
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

//   /* ================= REFS (Including state refs for callbacks) ================= */
//   const recognitionRef = useRef(null);
//   const synthRef = useRef(window.speechSynthesis);
//   const silenceTimerRef = useRef(null);
//   const conversationEndRef = useRef(null);
//   const systemPromptRef = useRef("");
//   const conversationHistoryRef = useRef([]);
//   const transcriptRef = useRef("");
  
//   // ✅ NEW: Refs for state values that need to be accessed in callbacks
//   const isListeningRef = useRef(false);
//   const processingAIRef = useRef(false);
//   const interviewStartedRef = useRef(false);
//   const interviewCompleteRef = useRef(false);

//   // ✅ Sync refs with state
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
//       console.log('❌ Cannot start listening:', {
//         noRecognition: !recognitionRef.current,
//         processing: processingAIRef.current,
//         alreadyListening: isListeningRef.current
//       });
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
//   const submitResponseWithText = useCallback(async (messageText) => {
//     console.log('📤 submitResponseWithText called with:', messageText);
//     console.log('Current state:', {
//       processingAI: processingAIRef.current,
//       interviewComplete: interviewCompleteRef.current
//     });

//     if (processingAIRef.current) {
//       console.log('⚠️ Already processing, skipping...');
//       return;
//     }

//     const message = messageText.trim();

//     if (!message) {
//       console.log("⚠️ No transcript to submit, restarting listening...");
//       setTimeout(() => startListening(), 500);
//       return;
//     }

//     stopListening();
//     setProcessingAI(true);

//     console.log("✅ Submitting transcript:", message);

//     conversationHistoryRef.current.push({
//       role: "user",
//       content: message
//     });

//     setConversation(prev => [
//       ...prev,
//       { role: "user", content: message }
//     ]);

//     setTranscript("");
//     setInterimTranscript("");
//     transcriptRef.current = "";

//     try {
//       // ✅ Simulated AI response for demo
//       const responses = [
//         "I see. Can you explain how you handle state management in large React applications?",
//         "That's interesting. What about performance optimization? How do you approach that?",
//         "Good point. Tell me about a challenging bug you've encountered and how you solved it.",
//         "Excellent. One last question - where do you see yourself in 5 years? INTERVIEW_COMPLETE"
//       ];
      
//       const responseIndex = Math.min(
//         conversationHistoryRef.current.filter(m => m.role === "assistant").length - 1,
//         responses.length - 1
//       );
      
//       // Simulate network delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const aiMessage = responses[responseIndex];

//       console.log('🤖 AI Response:', aiMessage);

//       if (!aiMessage) {
//         throw new Error("No AI response received");
//       }

//       conversationHistoryRef.current.push({
//         role: "assistant",
//         content: aiMessage
//       });

//       setConversation(prev => [
//         ...prev,
//         { role: "assistant", content: aiMessage }
//       ]);

//       await speak(aiMessage);

//       // ✅ Check if interview is complete
//       if (aiMessage.includes("INTERVIEW_COMPLETE")) {
//         console.log('✅ Interview complete!');
//         setInterviewComplete(true);
//         setProcessingAI(false);
//         await generateReport();
//         return;
//       }

//       setProcessingAI(false);
      
//       console.log('🎤 Resuming listening after AI response...');
//       // Resume listening after AI finishes speaking
//       setTimeout(() => startListening(), 500);

//     } catch (err) {
//       console.error("❌ Submit response error:", err);
//       setError(`AI error: ${err.message}`);
//       setProcessingAI(false);
      
//       setTimeout(() => startListening(), 1000);
//     }
//   }, [speak, startListening, stopListening]);

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

//       // ✅ Start silence timer using ref value
//       silenceTimerRef.current = setTimeout(() => {
//         console.log('⏱️ Silence detected, submitting...');
//         if (transcriptRef.current.trim()) {
//           stopListening();
//           submitResponseWithText(transcriptRef.current);
//         }
//       }, 2000);
//     };

//     rec.onend = () => {
//       console.log('🔚 Recognition ended', {
//         isListening: isListeningRef.current,
//         processingAI: processingAIRef.current,
//         interviewStarted: interviewStartedRef.current,
//         interviewComplete: interviewCompleteRef.current
//       });

//       // ✅ Auto-restart using refs
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
//   }, [submitResponseWithText, startListening, stopListening]); // ✅ Include callbacks in dependencies

//   /* ================= START INTERVIEW ================= */
//   const startInterview = async () => {
//     if (!data) return;

//     const jobContext = `
// Position: ${data.title}
// Description: ${data.description}
// Number of Questions: ${data.numberOfQuestions}
//     `.trim();

//     const systemPrompt = `You are an experienced interview panelist conducting a real-time technical interview.

// JOB CONTEXT:
// ${jobContext}

// Keep responses brief and conversational. Ask ONE question at a time.`;

//     systemPromptRef.current = systemPrompt;
//     setInterviewStarted(true);
//     setProcessingAI(true);

//     try {
//       // Demo response
//       const aiMessage = "Hello! Thanks for joining today. Let's start with a quick warm-up question. Can you tell me about your experience with React and what you find most interesting about it?";

//       conversationHistoryRef.current = [
//         { role: "user", content: "Hello, I'm ready for the interview." },
//         { role: "assistant", content: aiMessage }
//       ];

//       setConversation([{ role: "assistant", content: aiMessage }]);

//       await speak(aiMessage);
//       setProcessingAI(false);
      
//       console.log('🎯 Starting listening after initial question...');
//       setTimeout(() => startListening(), 500);

//     } catch (err) {
//       console.error("Start interview error:", err);
//       setError(`Failed to start interview: ${err.message}`);
//       setInterviewStarted(false);
//       setProcessingAI(false);
//     }
//   };

//   /* ================= GENERATE REPORT ================= */
//   const generateReport = async () => {
//     setProcessingAI(true);

//     const conversationText = conversationHistoryRef.current
//       .map(msg => `${msg.role === 'assistant' ? 'Interviewer' : 'Candidate'}: ${msg.content}`)
//       .join('\n\n');

//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       const mockReport = `
// INTERVIEW EVALUATION REPORT
// Position: ${data?.title}

// 1. OVERALL ASSESSMENT: 8/10
//    Strong technical knowledge with good communication skills.

// 2. TECHNICAL COMPETENCE: 8.5/10
//    - Demonstrated solid understanding of React fundamentals
//    - Good grasp of state management patterns
//    - Practical experience with performance optimization

// 3. COMMUNICATION SKILLS: 8/10
//    - Clear and articulate responses
//    - Good structure in explanations

// 4. FINAL RECOMMENDATION: Recommend
//    Candidate shows strong potential and would be a good fit for the role.
//       `;

//       setReport(mockReport);
//       setProcessingAI(false);

//     } catch (err) {
//       console.error("Report generation error:", err);
//       setReport("Error generating report. Please try again.");
//       setProcessingAI(false);
//     }
//   };

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
//   return (
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen transition-all`}>
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="fixed top-5 right-5 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:scale-110 transition-all z-50"
//       >
//         {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//       </button>

//       {interviewStarted && (
//         <button
//           onClick={() => setMuteAI(!muteAI)}
//           className="fixed top-5 right-20 p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:scale-110 transition-all z-50"
//           title={muteAI ? "Unmute AI voice" : "Mute AI voice"}
//         >
//           {muteAI ? <VolumeX size={20} /> : <Volume2 size={20} />}
//         </button>
//       )}

//       <div className="container mx-auto px-4 py-8 max-w-5xl">
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
//             AI Voice Interview
//           </h1>
//           {data && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl shadow-xl max-w-2xl mx-auto`}
//             >
//               <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
//                 {data.description}
//               </p>
//               <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
//                 {data.numberOfQuestions} Questions
//               </span>
//             </motion.div>
//           )}
//         </motion.div>

//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-xl text-center"
//           >
//             ⚠️ {error}
//           </motion.div>
//         )}

//         {!interviewStarted && !interviewComplete && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-center"
//           >
//             <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-lg max-w-md mx-auto`}>
//               <h3 className="text-xl font-semibold mb-4">Ready to begin?</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
//                 Enable your microphone and speak clearly. Check the browser console for debugging logs.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={startInterview}
//                 className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-3"
//               >
//                 <Play size={24} />
//                 Start Interview
//               </motion.button>
//             </div>
//           </motion.div>
//         )}

//         {interviewStarted && !interviewComplete && (
//           <div className="space-y-6">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 max-h-96 overflow-y-auto`}
//             >
//               <AnimatePresence>
//                 {conversation.map((msg, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div className={`max-w-[75%] px-5 py-3 rounded-2xl ${
//                       msg.role === 'assistant'
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
//                         : 'bg-gray-200 dark:bg-gray-700'
//                     }`}>
//                       <p className="text-xs font-semibold mb-1 opacity-80">
//                         {msg.role === 'assistant' ? '🎓 Interviewer' : '👤 You'}
//                       </p>
//                       <p className="text-sm leading-relaxed">{msg.content}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//               <div ref={conversationEndRef} />
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}
//             >
//               <div className="flex flex-col items-center gap-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={isListening ? stopListening : startListening}
//                   disabled={isSpeaking || processingAI}
//                   className={`p-8 rounded-full ${
//                     isListening
//                       ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50'
//                       : 'bg-blue-500 shadow-lg'
//                   } text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
//                 >
//                   {isListening ? <MicOff size={40} /> : <Mic size={40} />}
//                 </motion.button>

//                 <div className="text-center min-h-[24px]">
//                   {isSpeaking && (
//                     <p className="text-blue-500 font-semibold animate-pulse">🎤 AI is speaking...</p>
//                   )}
//                   {processingAI && !isSpeaking && (
//                     <p className="text-purple-500 font-semibold">⚡ Processing...</p>
//                   )}
//                   {isListening && !isSpeaking && !processingAI && (
//                     <p className="text-green-500 font-semibold animate-pulse">🎙️ Listening... Speak now!</p>
//                   )}
//                   {!isListening && !isSpeaking && !processingAI && (
//                     <p className="text-gray-500">Click microphone to speak</p>
//                   )}
//                 </div>

//                 {(transcript || interimTranscript) && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-xl"
//                   >
//                     <p className="text-sm text-gray-700 dark:text-gray-300">
//                       <span className="font-semibold">You're saying: </span>
//                       {transcript}
//                       <span className="text-gray-400 italic">{interimTranscript}</span>
//                     </p>
//                     {transcript && !processingAI && (
//                       <button
//                         onClick={handleManualSubmit}
//                         className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
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

//         {interviewComplete && report && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8`}
//           >
//             <div className="flex items-center justify-center mb-6">
//               <FileText size={48} className="text-blue-500 mr-4" />
//               <h2 className="text-3xl font-bold">Interview Evaluation Report</h2>
//             </div>

//             <div className="prose dark:prose-invert max-w-none">
//               <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
//                 {report}
//               </pre>
//             </div>

//             <div className="mt-8 flex justify-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={resetInterview}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg"
//               >
//                 Start New Interview
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InterviewPage;



