import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Mic, MicOff, FileText, Play, Volume2, VolumeX } from "lucide-react";
import { useParams } from "react-router-dom";

const InterviewPage = () => {
  /* ================= STATE ================= */
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [conversation, setConversation] = useState([]);

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [processingAI, setProcessingAI] = useState(false);

  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [report, setReport] = useState(null);
  const [muteAI, setMuteAI] = useState(false);

  /* ================= REFS ================= */
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const silenceTimerRef = useRef(null);
  const conversationEndRef = useRef(null);
  const systemPromptRef = useRef("");
  const conversationHistoryRef = useRef([]);
  const transcriptRef = useRef("");
  
  // ✅ NEW: State refs for callbacks (prevents stale closures)
  const isListeningRef = useRef(false);
  const processingAIRef = useRef(false);
  const interviewStartedRef = useRef(false);
  const interviewCompleteRef = useRef(false);
  const [sessionId, setSessionId] = useState(null);


  const { id } = useParams();

  /* ================= SYNC STATE TO REFS ================= */
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    processingAIRef.current = processingAI;
  }, [processingAI]);

  useEffect(() => {
    interviewStartedRef.current = interviewStarted;
  }, [interviewStarted]);

  useEffect(() => {
    interviewCompleteRef.current = interviewComplete;
  }, [interviewComplete]);

  /* ================= FETCH JOB FROM API ================= */
  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      setLoading(true);
      try {
        console.log("Fetching job with id:", id);

        const response = await fetch(`http://localhost:9000/jobs/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Job API result:", result);

        setData({
          title: result?.title || "",
          description: result?.description || "",
          // numberOfQuestions: result?.questions?.length ?? 5,
          numberOfQuestions:3,
        });

        setLoading(false);
      } catch (err) {
        console.error("Fetch job error:", err);
        setError("Failed to load job details");
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  /* ================= VOICE HELPERS ================= */
  const speak = useCallback((text) => {
    if (muteAI) return Promise.resolve();

    return new Promise((resolve) => {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        resolve();
      };
      
      synthRef.current.speak(utterance);
    });
  }, [muteAI]);

  const startListening = useCallback(() => {
    console.log('👂 Attempting to start listening...', {
      hasRecognition: !!recognitionRef.current,
      processingAI: processingAIRef.current,
      isListening: isListeningRef.current
    });

    if (!recognitionRef.current || processingAIRef.current || isListeningRef.current) {
      console.log('❌ Cannot start listening:', {
        noRecognition: !recognitionRef.current,
        processing: processingAIRef.current,
        alreadyListening: isListeningRef.current
      });
      return;
    }

    clearTimeout(silenceTimerRef.current);
    setTranscript("");
    setInterimTranscript("");
    transcriptRef.current = "";
    setIsListening(true);

    try {
      recognitionRef.current.start();
      console.log('✅ Recognition started successfully');
    } catch (e) {
      console.log("⚠️ Recognition already started:", e);
    }
  }, []);

  const stopListening = useCallback(() => {
    console.log('🛑 Stopping listening...');
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

  /* ================= SUBMIT ANSWER WITH REAL API ================= */
  const submitResponseWithText = useCallback(async (messageText) => {
    console.log('📤 submitResponseWithText called with:', messageText);
    console.log('Current state:', {
      processingAI: processingAIRef.current,
      interviewComplete: interviewCompleteRef.current
    });

    if (processingAIRef.current) {
      console.log('⚠️ Already processing, skipping...');
      return;
    }

    const message = messageText.trim();

    if (!message) {
      console.log("⚠️ No transcript to submit, restarting listening...");
      setTimeout(() => startListening(), 500);
      return;
    }

    stopListening();
    setProcessingAI(true);

    console.log("✅ Submitting transcript:", message);

    conversationHistoryRef.current.push({
      role: "user",
      content: message
    });

    setConversation(prev => [
      ...prev,
      { role: "user", content: message }
    ]);

    setTranscript("");
    setInterimTranscript("");
    transcriptRef.current = "";

    try {
      // ✅ REAL API CALL TO OPENAI
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
        throw new Error(`API Error: ${res.status}`);
      }

      const json = await res.json();
      const aiMessage = json.choices?.[0]?.message?.content;

      console.log('🤖 AI Response:', aiMessage);

      if (!aiMessage) {
        throw new Error("No AI response received");
      }

      conversationHistoryRef.current.push({
        role: "assistant",
        content: aiMessage
      });

      setConversation(prev => [
        ...prev,
        { role: "assistant", content: aiMessage }
      ]);

      await speak(aiMessage);

      // ✅ Check if interview is complete
      if (aiMessage.includes("INTERVIEW_COMPLETE")) {
        console.log('✅ Interview complete!');
        setInterviewComplete(true);
        setProcessingAI(false);
        await generateReport();
        return;
      }

      setProcessingAI(false);
      
      console.log('🎤 Resuming listening after AI response...');
      setTimeout(() => startListening(), 500);

    } catch (err) {
      console.error("❌ Submit response error:", err);
      setError(`AI error: ${err.message}`);
      setProcessingAI(false);
      
      setTimeout(() => startListening(), 1000);
    }
  }, [speak, startListening, stopListening]);

  /* ================= SPEECH RECOGNITION SETUP ================= */
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
      console.log('🎤 Speech result received');
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
        console.log('✅ Final transcript:', newTranscript);
      } else {
        setInterimTranscript(interim);
      }

      // ✅ Start silence timer
      silenceTimerRef.current = setTimeout(() => {
        console.log('⏱️ Silence detected, submitting...');
        if (transcriptRef.current.trim()) {
          stopListening();
          submitResponseWithText(transcriptRef.current);
        }
      }, 2000);
    };

    rec.onend = () => {
      console.log('🔚 Recognition ended', {
        isListening: isListeningRef.current,
        processingAI: processingAIRef.current,
        interviewStarted: interviewStartedRef.current,
        interviewComplete: interviewCompleteRef.current
      });

      // ✅ Auto-restart using refs (NOT state!)
      if (isListeningRef.current && 
          !processingAIRef.current && 
          interviewStartedRef.current && 
          !interviewCompleteRef.current) {
        console.log('🔄 Auto-restarting recognition...');
        try {
          rec.start();
        } catch (e) {
          console.log("⚠️ Recognition restart failed:", e);
        }
      }
    };

    rec.onerror = (event) => {
      console.error("❌ Speech recognition error:", event.error);
      
      if (event.error === "no-speech" || event.error === "aborted") {
        return;
      }
      
      setIsListening(false);
      setTimeout(() => {
        if (interviewStartedRef.current && 
            !interviewCompleteRef.current && 
            !processingAIRef.current) {
          startListening();
        }
      }, 1000);
    };

    recognitionRef.current = rec;

    return () => {
      clearTimeout(silenceTimerRef.current);
      if (rec) {
        rec.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [submitResponseWithText, startListening, stopListening]); // ✅ CRITICAL: Include callbacks in deps

  /* ================= START INTERVIEW WITH REAL API ================= */
  const startInterview = async () => {
    if (!data) return;

    const jobContext = `
Position: ${data.title}
Description: ${data.description}
Number of Questions: ${data.numberOfQuestions}
    `.trim();

    const systemPrompt = `You are an experienced IIT interview panelist conducting a real-time, human-like technical and behavioral interview for the position of "${data.title}".

JOB CONTEXT:
${jobContext}

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
- Track approximately ${data.numberOfQuestions} questions total

ENDING THE INTERVIEW:
- After asking approximately ${data.numberOfQuestions} questions and getting satisfactory answers, conclude naturally
- Thank the candidate professionally
- End your final message with the exact phrase: INTERVIEW_COMPLETE

Now begin the interview naturally.`;


    systemPromptRef.current = systemPrompt;
    setInterviewStarted(true);
    setProcessingAI(true);

    try {
      // ✅ REAL API CALL TO START INTERVIEW
      const res = await fetch("http://localhost:9000/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: "Hello, I'm ready for the interview." }
          ]
        })
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const json = await res.json();
      const aiMessage = json.choices?.[0]?.message?.content;

      if (!aiMessage) {
        throw new Error("No AI response received");
      }

      conversationHistoryRef.current = [
        { role: "user", content: "Hello, I'm ready for the interview." },
        { role: "assistant", content: aiMessage }
      ];

      setConversation([{ role: "assistant", content: aiMessage }]);

      await speak(aiMessage);
      setProcessingAI(false);
      
      console.log('🎯 Starting listening after initial question...');
      setTimeout(() => startListening(), 500);

    } catch (err) {
      console.error("Start interview error:", err);
      setError(`Failed to start interview: ${err.message}`);
      setInterviewStarted(false);
      setProcessingAI(false);
    }
  };

  /* ================= GENERATE REPORT WITH REAL API ================= */
  const generateReport = async () => {
    setProcessingAI(true);

    const conversationText = conversationHistoryRef.current
      .map(msg => `${msg.role === 'assistant' ? 'Interviewer' : 'Candidate'}: ${msg.content}`)
      .join('\n\n');
     

    console.log("conversationText",conversationText)
    try {
      // ✅ REAL API CALL FOR REPORT
      const res = await fetch("http://localhost:9000/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{
            role: "user",
            content: `Based on this interview transcript for the position of "${data?.title}", generate a comprehensive evaluation report.

INTERVIEW TRANSCRIPT:
${conversationText}

Generate a detailed report with:
1. OVERALL ASSESSMENT (Rating out of 10)
2. TECHNICAL COMPETENCE
3. COMMUNICATION SKILLS
4. PROBLEM-SOLVING ABILITY
5. KEY HIGHLIGHTS
6. AREAS FOR DEVELOPMENT
7. FINAL RECOMMENDATION (Strongly Recommend/Recommend/Consider/Do Not Recommend)

Be specific and constructive.`
          }]
        })
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const json = await res.json();
      const reportText = json.choices?.[0]?.message?.content;

      setReport(reportText || "Report generation failed");
      setProcessingAI(false);

    } catch (err) {
      console.error("Report generation error:", err);
      setReport("Error generating report. Please try again.");
      setProcessingAI(false);
    }
  };

  const resetInterview = () => {
    setInterviewStarted(false);
    setInterviewComplete(false);
    setConversation([]);
    setReport(null);
    setTranscript("");
    setInterimTranscript("");
    transcriptRef.current = "";
    setError(null);
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

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl animate-pulse">Loading interview details...</div>
      </div>
    );
  }
return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-gray-900"} min-h-screen transition-all duration-300`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 p-3.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 z-50 backdrop-blur-sm"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <Sun size={22} /> : <Moon size={22} />}
      </button>

      {/* Mute/Unmute AI Toggle */}
      {interviewStarted && (
        <button
          onClick={() => setMuteAI(!muteAI)}
          className="fixed top-6 right-24 p-3.5 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 z-50 backdrop-blur-sm"
          title={muteAI ? "Unmute AI voice" : "Mute AI voice"}
          aria-label={muteAI ? "Unmute AI voice" : "Mute AI voice"}
        >
          {muteAI ? <VolumeX size={22} /> : <Volume2 size={22} />}
        </button>
      )}

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-tight">
            AI Voice Interview
          </h1>
          
          {data && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto border backdrop-blur-sm`}
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {data.title}
              </h2>
              {/* <div className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-5 leading-relaxed`}>
                {data?.description ? (
                  <div dangerouslySetInnerHTML={{ __html: data.description }} />
                ) : (
                  <p>No description available</p>
                )}
              </div> */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {data.numberOfQuestions} Questions
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`mb-8 p-5 ${darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'} border-2 rounded-2xl text-center`}
          >
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className={`text-base font-semibold ${darkMode ? 'text-red-200' : 'text-red-800'}`}>
                {error}
              </span>
            </div>
          </motion.div>
        )}

        {/* Pre-Interview Screen */}
        {!interviewStarted && !interviewComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-10 rounded-3xl shadow-2xl max-w-xl mx-auto border`}>
              <div className="mb-6 inline-flex p-4 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
                <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Ready to begin?</h3>
              <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 leading-relaxed max-w-md mx-auto`}>
                Enable your microphone and speak clearly. The interview will be conversational and adaptive.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startInterview}
                disabled={!data}
                className="w-full px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <Play size={26} className="group-hover:scale-110 transition-transform" />
                Start Interview
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Active Interview Screen */}
        {interviewStarted && !interviewComplete && (
          <div className="space-y-8">
            {/* Conversation Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-3xl shadow-2xl p-8 max-h-[500px] overflow-y-auto border`}
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Conversation</h3>
              </div>

              <AnimatePresence>
                {conversation.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-6 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] px-6 py-4 rounded-2xl shadow-md ${
                      msg.role === 'assistant'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tl-sm'
                        : darkMode 
                          ? 'bg-gray-700 text-gray-100 rounded-tr-sm' 
                          : 'bg-gray-100 text-gray-900 rounded-tr-sm'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {msg.role === 'assistant' ? (
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">🎓</div>
                        ) : (
                          <div className={`w-6 h-6 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center text-xs`}>👤</div>
                        )}
                        <p className="text-xs font-semibold opacity-90">
                          {msg.role === 'assistant' ? 'Interviewer' : 'You'}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={conversationEndRef} />
            </motion.div>

            {/* Voice Control Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-3xl shadow-2xl p-10 border`}
            >
              <div className="flex flex-col items-center gap-6">
                {/* Microphone Button */}
                <div className="relative">
                  {isListening && (
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30"></div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isListening ? stopListening : startListening}
                    disabled={isSpeaking || processingAI}
                    className={`relative p-10 rounded-full ${
                      isListening
                        ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-2xl shadow-red-500/50'
                        : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl shadow-blue-500/30'
                    } text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-3xl`}
                    aria-label={isListening ? "Stop listening" : "Start listening"}
                  >
                    {isListening ? <MicOff size={48} /> : <Mic size={48} />}
                  </motion.button>
                </div>

                {/* Status Indicator */}
                <div className="text-center min-h-[32px] flex items-center justify-center">
                  {isSpeaking && (
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      </div>
                      <p className="text-blue-700 dark:text-blue-300 font-semibold text-sm">AI is speaking...</p>
                    </div>
                  )}
                  {processingAI && !isSpeaking && (
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <svg className="animate-spin h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-purple-700 dark:text-purple-300 font-semibold text-sm">Processing...</p>
                    </div>
                  )}
                  {isListening && !isSpeaking && !processingAI && (
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-100 dark:bg-green-900/30 animate-pulse">
                      <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                      <p className="text-green-700 dark:text-green-300 font-semibold text-sm">Listening... Speak now!</p>
                    </div>
                  )}
                  {!isListening && !isSpeaking && !processingAI && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Click microphone to speak</p>
                  )}
                </div>

                {/* Transcript Display */}
                {(transcript || interimTranscript) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`w-full p-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl border-2 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <svg className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">You're saying:</p>
                        <p className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-800'} leading-relaxed`}>
                          {transcript}
                          <span className="text-gray-400 dark:text-gray-500 italic ml-1">{interimTranscript}</span>
                        </p>
                      </div>
                    </div>
                    {transcript && !processingAI && (
                      <button
                        onClick={handleManualSubmit}
                        className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 group"
                      >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Submit Now
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Interview Complete - Report */}
        {interviewComplete && report && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-3xl shadow-2xl p-10 border`}
          >
            <div className="flex flex-col items-center mb-8">
              <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-4">
                <FileText size={56} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
                Interview Evaluation Report
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4"></div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} p-8 rounded-2xl border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-green-600 dark:text-green-400 m-0">
                  {report}
                </pre>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetInterview}
                className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-200 flex items-center gap-3 group"
              >
                <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Start New Interview
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;


// ------------------------------------------------------------------------------------------

// import { useState, useEffect, useRef, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sun, Moon, Mic, MicOff, FileText, Play, Volume2, VolumeX } from "lucide-react";
// import { useParams } from "react-router-dom";
// import { createSession,pushTranscript,completeSession }  from "./helpers.js"

// const InterviewPage = () => {
//   /* ================= STATE ================= */
//   const [darkMode, setDarkMode] = useState(false);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const sessionIdRef = useRef(null);


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
  
//   // ✅ NEW: State refs for callbacks (prevents stale closures)
//   const isListeningRef = useRef(false);
//   const processingAIRef = useRef(false);
//   const interviewStartedRef = useRef(false);
//   const interviewCompleteRef = useRef(false);
//   const [sessionId, setSessionId] = useState(null);


//   const { id } = useParams();

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
//   useEffect(() => {
//     if (!id) return;

//     const fetchJob = async () => {
//       setLoading(true);
//       try {
//         console.log("Fetching job with id:", id);

//         const response = await fetch(`http://localhost:9000/jobs/${id}`);

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("Job API result:", result);

//         setData({
//           title: result?.title || "",
//           description: result?.description || "",
//           // numberOfQuestions: result?.questions?.length ?? 5,
//           numberOfQuestions:3,
//         });

//         setLoading(false);
//       } catch (err) {
//         console.error("Fetch job error:", err);
//         setError("Failed to load job details");
//         setLoading(false);
//       }
//     };

//     fetchJob();
//   }, [id]);

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

//   /* ================= SUBMIT ANSWER WITH REAL API ================= */
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

  
// await pushTranscript(sessionIdRef.current, "candidate", message);



//     setConversation(prev => [
//       ...prev,
//       { role: "user", content: message }
//     ]);

//     setTranscript("");
//     setInterimTranscript("");
//     transcriptRef.current = "";

//     try {
//       // ✅ REAL API CALL TO OPENAI
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


//       await pushTranscript(sessionId, "interviewer", aiMessage);
//       await completeSession(sessionIdRef.current);


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
//         await completeSession(sessionId);
//         return;
//       }

//       setProcessingAI(false);
      
//       console.log('🎤 Resuming listening after AI response...');
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

//       // ✅ Start silence timer
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

//       // ✅ Auto-restart using refs (NOT state!)
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
//   }, [submitResponseWithText, startListening, stopListening]); // ✅ CRITICAL: Include callbacks in deps

//   /* ================= START INTERVIEW WITH REAL API ================= */
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
     
//     // ✅ CREATE INTERVIEW SESSION IN DB
// const session = await createSession(id);
// sessionIdRef.current = session._id;
// setSessionId(session._id);
//     try {
//       // ✅ REAL API CALL TO START INTERVIEW
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

//       console.log("Saving transcript", {
//   sessionIdFromState: sessionId,
//   sessionIdFromRef: sessionIdRef.current,
// });

//       await pushTranscript(sessionIdRef.current, "candidate", message);


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
      
//       console.log('🎯 Starting listening after initial question...');
//       setTimeout(() => startListening(), 500);

//     } catch (err) {
//       console.error("Start interview error:", err);
//       setError(`Failed to start interview: ${err.message}`);
//       setInterviewStarted(false);
//       setProcessingAI(false);
//     }
//   };

//   /* ================= GENERATE REPORT WITH REAL API ================= */
//   const generateReport = async () => {
//     setProcessingAI(true);

//     const conversationText = conversationHistoryRef.current
//       .map(msg => `${msg.role === 'assistant' ? 'Interviewer' : 'Candidate'}: ${msg.content}`)
//       .join('\n\n');
     

//     console.log("conversationText",conversationText)
//     try {
//       // ✅ REAL API CALL FOR REPORT
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

//       if (!res.ok) {
//         throw new Error(`API Error: ${res.status}`);
//       }

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
//     transcriptRef.current = "";
//     setError(null);
//     conversationHistoryRef.current = [];
//     systemPromptRef.current = "";
//     synthRef.current.cancel();
//     stopListening();
//     setSessionId(null);

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
// return (
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-gray-900"} min-h-screen transition-all duration-300`}>
//       {/* Dark Mode Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="fixed top-6 right-6 p-3.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 z-50 backdrop-blur-sm"
//         aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//       >
//         {darkMode ? <Sun size={22} /> : <Moon size={22} />}
//       </button>

//       {/* Mute/Unmute AI Toggle */}
//       {interviewStarted && (
//         <button
//           onClick={() => setMuteAI(!muteAI)}
//           className="fixed top-6 right-24 p-3.5 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 z-50 backdrop-blur-sm"
//           title={muteAI ? "Unmute AI voice" : "Mute AI voice"}
//           aria-label={muteAI ? "Unmute AI voice" : "Mute AI voice"}
//         >
//           {muteAI ? <VolumeX size={22} /> : <Volume2 size={22} />}
//         </button>
//       )}

//       <div className="container mx-auto px-4 py-12 max-w-6xl">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-tight">
//             {/* AI  */}
//             {/* Voice Interview */}import { useState, useEffect, useRef, useCallback } from "react";



// import { useState, useEffect, useRef, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import { createSession, pushTranscript, completeSession } from "./helpers.js";

// const InterviewPage = () => {
//   /* ================= STATE ================= */
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [interviewStarted, setInterviewStarted] = useState(false);
//   const [interviewComplete, setInterviewComplete] = useState(false);
//   const [conversation, setConversation] = useState([]);

//   const [isListening, setIsListening] = useState(false);
//   const [processingAI, setProcessingAI] = useState(false);

//   const [transcript, setTranscript] = useState("");
//   const [interimTranscript, setInterimTranscript] = useState("");
//   const [report, setReport] = useState(null);

//   /* ================= REFS ================= */
//   const sessionIdRef = useRef(null);
//   const recognitionRef = useRef(null);
//   const transcriptRef = useRef("");
//   const silenceTimerRef = useRef(null);
//   const systemPromptRef = useRef("");
//   const conversationHistoryRef = useRef([]);

//   const processingAIRef = useRef(false);
//   const interviewStartedRef = useRef(false);
//   const interviewCompleteRef = useRef(false);

//   const { id } = useParams();

//   /* ================= SYNC STATE TO REFS ================= */
//   useEffect(() => { processingAIRef.current = processingAI; }, [processingAI]);
//   useEffect(() => { interviewStartedRef.current = interviewStarted; }, [interviewStarted]);
//   useEffect(() => { interviewCompleteRef.current = interviewComplete; }, [interviewComplete]);

//   /* ================= FETCH JOB ================= */
//   useEffect(() => {
//     if (!id) return;

//     (async () => {
//       try {
//         const res = await fetch(`http://localhost:9000/jobs/${id}`);
//         const result = await res.json();

//         setData({
//           title: result.title,
//           description: result.description,
//           numberOfQuestions: 3
//         });
//         setLoading(false);
//       } catch {
//         setError("Failed to load job");
//         setLoading(false);
//       }
//     })();
//   }, [id]);

//   /* ================= START INTERVIEW ================= */
//   const startInterview = async () => {
//     if (!data) return;

//     setInterviewStarted(true);
//     setProcessingAI(true);

//     const session = await createSession(id);
//     sessionIdRef.current = session._id;

//     systemPromptRef.current = `You are an experienced IIT interview panelist conducting a real-time, human-like technical and behavioral interview for the position of "${data.title}".
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
//           messages: [
//             { role: "system", content: systemPromptRef.current },
//             { role: "user", content: "Hello, I'm ready for the interview." }
//           ]
//         })
//       });

//       const json = await res.json();
//       const aiMessage = json.choices?.[0]?.message?.content;

//       if (!aiMessage || !sessionIdRef.current) return;

//       // ✅ SAVE FIRST AI MESSAGE
//       await pushTranscript(sessionIdRef.current, "interviewer", aiMessage);

//       conversationHistoryRef.current = [
//         { role: "assistant", content: aiMessage }
//       ];

//       setConversation([{ role: "assistant", content: aiMessage }]);
//       setProcessingAI(false);

//     } catch (err) {
//       setError("Failed to start interview");
//       setProcessingAI(false);
//     }
//   };

//   /* ================= SUBMIT RESPONSE ================= */
//   const submitResponseWithText = useCallback(async (text) => {
//     if (!text.trim() || processingAIRef.current) return;
//     if (!sessionIdRef.current) return;

//     setProcessingAI(true);

//     const userMessage = text.trim();
//     transcriptRef.current = "";

//     try {
//       const res = await fetch("http://localhost:9000/api/openai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           model: "gpt-4o",
//           messages: [
//             { role: "system", content: systemPromptRef.current },
//             ...conversationHistoryRef.current,
//             { role: "user", content: userMessage }
//           ]
//         })
//       });

//       const json = await res.json();
//       const aiMessage = json.choices?.[0]?.message?.content;

//       if (!aiMessage) throw new Error("AI failed");

//       // ✅ SAVE BOTH TO DB (CONSISTENT)
//       await pushTranscript(sessionIdRef.current, "candidate", userMessage);
//       await pushTranscript(sessionIdRef.current, "interviewer", aiMessage);

//       conversationHistoryRef.current.push(
//         { role: "user", content: userMessage },
//         { role: "assistant", content: aiMessage }
//       );

//       setConversation(prev => [
//         ...prev,
//         { role: "user", content: userMessage },
//         { role: "assistant", content: aiMessage }
//       ]);

//       if (aiMessage.includes("INTERVIEW_COMPLETE")) {
//         setInterviewComplete(true);
//         await completeSession(sessionIdRef.current);
//       }

//       setProcessingAI(false);
//     } catch (err) {
//       setError("AI error");
//       setProcessingAI(false);
//     }
//   }, []);

//   /* ================= SPEECH RECOGNITION ================= */
//   useEffect(() => {
//     const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SR) return;

//     const rec = new SR();
//     rec.continuous = true;
//     rec.interimResults = true;

//     rec.onresult = (e) => {
//       clearTimeout(silenceTimerRef.current);

//       let final = "";
//       for (let i = e.resultIndex; i < e.results.length; i++) {
//         if (e.results[i].isFinal) {
//           final += e.results[i][0].transcript;
//         }
//       }

//       if (final) {
//         transcriptRef.current += final;
//         setTranscript(transcriptRef.current);
//       }

//       silenceTimerRef.current = setTimeout(() => {
//         submitResponseWithText(transcriptRef.current);
//       }, 2000);
//     };

//     recognitionRef.current = rec;
//     return () => rec.stop();
//   }, [submitResponseWithText]);


//   /* ================= UI ================= */
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       {!interviewStarted && (
//         <button onClick={startInterview}>Start Interview</button>
//       )}

//       {interviewStarted && !interviewComplete && (
//         <div>
//           {conversation.map((c, i) => (
//             <p key={i}><b>{c.role}:</b> {c.content}</p>
//           ))}
//           <p>{transcript}</p>
//         </div>
//       )}

//       {interviewComplete && <pre>{report}</pre>}
//     </div>
//   );
// };

// export default InterviewPage;
