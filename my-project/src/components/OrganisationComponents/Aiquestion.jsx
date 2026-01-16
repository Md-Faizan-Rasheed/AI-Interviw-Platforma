// import React, { useEffect, useState } from 'react';
// import Onavbar from './Onavbar';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AI_PROMPT } from './constants/options';
// import { chatSession } from "./service/ai/chatSession.js";

// const Aiquestion = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [newQuestion, setNewQuestion] = useState({
//     category: "Culture",
//     question: "",
//   });

//   // Load job post data from localStorage or location.state
//   const loadJobPostData = () => {
//     const savedData = localStorage.getItem('jobPostData');
//     const parsedData = savedData ? JSON.parse(savedData) : location.state?.jobData || null;
//     return parsedData?.jobDescription ? parsedData : null;
// };

// const loadInitialQuestions = () => {
//     const savedQuestions = localStorage.getItem('aiQuestions');
//     return savedQuestions && JSON.parse(savedQuestions).length > 0
//         ? JSON.parse(savedQuestions)
//         : [{ id: "1", position: 1, category: "Culture", question: "" }];
// };

// // Use useState with an initializer function
// const [jobPostData, setJobPostData] = useState(() => loadJobPostData());
// const [questions, setQuestions] = useState(() => loadInitialQuestions());

// useEffect(() => {
//     console.log("questions set at time of reload", questions);
//     localStorage.setItem('aiQuestions', JSON.stringify(questions));
// }, [questions]);
//   const dataforAi = JSON.stringify(jobPostData, null, 2);
//   const FINAL_PROMPT = AI_PROMPT.replace("{acutal_data}", dataforAi || "N/A");

//   const generateQuestions = async () => {
//     setIsLoading(true);
//     try {
//       // const result = await chatSession.sendMessage(FINAL_PROMPT);
//       const result = await chatSession(FINAL_PROMPT);
//       // const responseText = result?.response?.text() || "No Response";
//       const responseText = result
//       // const parseData = responseText.replace(/```json|```/g, "");
//       const parseData = responseText
//       const interviewQuestionsData = JSON.parse(parseData);
//       console.log("questions",interviewQuestionsData)
//       // const aiData = interviewQuestionsData.interviewQuestions;
//       const aiData = interviewQuestionsData
//       console.log("questionsai",aiData)


//     const formattedQuestions = Object.entries(aiData).flatMap(([category, items], index) =>
//   items.map((item, i) => ({
//     id: `${category}-${i + 1}`,
//     position: index * 10 + i + 1,
//     category: category.charAt(0).toUpperCase() + category.slice(1),
//     question: item, // Changed: item is now a string directly
//     expectedResponse: "", // Changed: no expectedResponseStructure in new data
//   }))
// );
// console.log("formatted questions", formattedQuestions);
// setQuestions(formattedQuestions);
//     } catch (error) {
//       console.error("Error while generating questions:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSaveAndNext = () => {
//     localStorage.setItem('aiQuestions', JSON.stringify(questions));
//     navigate('/preview-and-publish', { 
//       state: { 
//         jobData: jobPostData, 
//         formattedQuestions: questions 
//       } 
//     });
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Onavbar />
//       <div className="p-8 bg-gray-100 min-h-screen mx-auto">
//         <h1 className="text-2xl font-bold mb-6 text-blue-600">AI Question Generator</h1>

//         {/* Generate AI Questions Section */}
//         <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-bold mb-4 flex items-center">
//             <span className="mr-2">✨</span> Generate AI Questions
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Allow our AI to generate questions for your specific job posting.
//             Generate as many times as you want until you're satisfied.
//           </p>
//           <button
//             onClick={generateQuestions}
//             disabled={isLoading}
//             className={`${isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"} text-white px-6 py-2 rounded-lg`}
//           >
//             {isLoading ? (
//               <div className="flex items-center">
//                 <svg
//                   className="animate-spin h-5 w-5 mr-2 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v8H4zm2 5.292V13h4.708l1.292 1.292H6z"
//                   ></path>
//                 </svg>
//                 Generating Questions...
//               </div>
//             ) : (
//               "Generate Questions"
//             )}
//           </button>
//         </div>

//         {/* Advanced Options Section */}
//         <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-bold mb-4">Advanced Options</h2>
//           <p className="text-gray-600">Coming soon...</p>
//         </div>

//         {/* Preview Interview Questions */}
//         <div className="p-6 bg-gray-100">
//           <h2 className="text-lg font-semibold mb-4">Preview Interview Questions</h2>
//           <p className="text-sm text-gray-500 mb-6">
//             Edit the AI-generated questions or enter your own here.
//           </p>

//           {/* Questions List */}
//           <div className="space-y-4 bg-white p-4 rounded shadow">
//             {questions.map((item) => (
//               <div key={item.id} className="grid grid-cols-12 items-center border border-gray-300 rounded p-4">
//                 <div className="col-span-1 text-center">{item.position}</div>
//                 <select
//                   value={item.category}
//                   onChange={(e) =>
//                     setQuestions((prev) =>
//                       prev.map((q) =>
//                         q.id === item.id ? { ...q, category: e.target.value } : q
//                       )
//                     )
//                   }
//                   className="col-span-2 border border-gray-300 rounded px-2 py-1"
//                 >
//                   <option value="Culture">Culture</option>
//                   <option value="Technical">Technical</option>
//                   <option value="Leadership">Leadership</option>
//                   <option value="SoftSkills">SoftSkills</option>
//                   <option value="XFactor">XFactor</option>
//                 </select>
//                 <input
//                   type="text"
//                   value={item.question}
//                   onChange={(e) =>
//                     setQuestions((prev) =>
//                       prev.map((q) =>
//                         q.id === item.id ? { ...q, question: e.target.value } : q
//                       )
//                     )
//                   }
//                   className="col-span-8 border border-gray-300 rounded px-4 py-2 w-full"
//                 />
//                 <button
//                   onClick={() => setQuestions((prev) => prev.filter((q) => q.id !== item.id))}
//                   className="col-span-1 text-red-500 hover:text-red-700"
//                 >
//                   🗑
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Add New Question */}
//           <div className="mt-6 bg-white p-4 rounded shadow">
//             <h3 className="text-md font-semibold mb-4">Add New Question</h3>
//             <div className="grid grid-cols-12 gap-4 items-center">
//               <select
//                 value={newQuestion.category}
//                 onChange={(e) =>
//                   setNewQuestion((prev) => ({
//                     ...prev,
//                     category: e.target.value,
//                   }))
//                 }
//                 className="col-span-3 border border-gray-300 rounded px-2 py-1"
//               >
//                 <option value="Culture">Culture</option>
//                 <option value="Technical">Technical</option>
//                 <option value="Leadership">Leadership</option>
//                 <option value="SoftSkills">SoftSkills</option>
//                 <option value="XFactor">XFactor</option>
//               </select>
//               <input
//                 type="text"
//                 value={newQuestion.question}
//                 onChange={(e) =>
//                   setNewQuestion((prev) => ({
//                     ...prev,
//                     question: e.target.value,
//                   }))
//                 }
//                 placeholder="Enter your question"
//                 className="col-span-8 border border-gray-300 rounded px-4 py-2 w-full"
//               />
//               <button
//                 onClick={() => {
//                   if (newQuestion.question.trim()) {
//                     setQuestions((prev) => [
//                       ...prev,
//                       {
//                         id: `${newQuestion.category}-${prev.length + 1}`,
//                         position: prev.length + 1,
//                         category: newQuestion.category,
//                         question: newQuestion.question.trim(),
//                       },
//                     ]);
//                     setNewQuestion({ category: "Culture", question: "" });
//                   }
//                 }}
//                 className="col-span-1 text-green-500 hover:text-green-700"
//               >
//                 ➕
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Save & Next Button */}
//         <div className="mt-8 flex justify-end">
//           <button
//             onClick={handleSaveAndNext}
//             className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
//           >
//             Save & Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Aiquestion;



// import React, { useEffect, useState } from 'react';
// import Onavbar from './Onavbar';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Sparkles, Loader2, Trash2, Plus, Save, Edit3, MessageSquare, ChevronDown } from 'lucide-react';
// import { AI_PROMPT } from './constants/options';
// import { chatSession } from "./service/ai/chatSession.js";

// const Aiquestion = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [newQuestion, setNewQuestion] = useState({
//     category: "Culture",
//     question: "",
//   });

//   // Load job post data from localStorage or location.state
//   const loadJobPostData = () => {
//     const savedData = localStorage.getItem('jobPostData');
//     const parsedData = savedData ? JSON.parse(savedData) : location.state?.jobData || null;
//     return parsedData?.jobDescription ? parsedData : null;
//   };

//   const loadInitialQuestions = () => {
//     const savedQuestions = localStorage.getItem('aiQuestions');
//     return savedQuestions && JSON.parse(savedQuestions).length > 0
//       ? JSON.parse(savedQuestions)
//       : [{ id: "1", position: 1, category: "Culture", question: "" }];
//   };

//   const [jobPostData, setJobPostData] = useState(() => loadJobPostData());
//   const [questions, setQuestions] = useState(() => loadInitialQuestions());

//   useEffect(() => {
//     localStorage.setItem('aiQuestions', JSON.stringify(questions));
//   }, [questions]);

//   const dataforAi = JSON.stringify(jobPostData, null, 2);
//   const FINAL_PROMPT = AI_PROMPT.replace("{acutal_data}", dataforAi || "N/A");

//   const generateQuestions = async () => {
//     setIsLoading(true);
//     try {
//       const result = await chatSession(FINAL_PROMPT);
//       const responseText = result;
//       const parseData = responseText;
//       const interviewQuestionsData = JSON.parse(parseData);
//       const aiData = interviewQuestionsData;

//       const formattedQuestions = Object.entries(aiData).flatMap(([category, items], index) =>
//         items.map((item, i) => ({
//           id: `${category}-${i + 1}`,
//           position: index * 10 + i + 1,
//           category: category.charAt(0).toUpperCase() + category.slice(1),
//           question: item,
//           expectedResponse: "",
//         }))
//       );
      
//       setQuestions(formattedQuestions);
//     } catch (error) {
//       console.error("Error while generating questions:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSaveAndNext = () => {
//     localStorage.setItem('aiQuestions', JSON.stringify(questions));
//     navigate('/preview-and-publish', { 
//       state: { 
//         jobData: jobPostData, 
//         formattedQuestions: questions 
//       } 
//     });
//   };

//   const categoryColors = {
//     Culture: "from-blue-100 to-cyan-100 text-blue-700",
//     Technical: "from-purple-100 to-pink-100 text-purple-700",
//     Leadership: "from-orange-100 to-amber-100 text-orange-700",
//     SoftSkills: "from-green-100 to-emerald-100 text-green-700",
//     XFactor: "from-rose-100 to-red-100 text-rose-700"
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-lime-50/20">
//       <Onavbar />

//       <div className="flex-1 overflow-y-auto">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//           {/* Header */}
//           <div className="mb-6 sm:mb-8">
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
//               <MessageSquare className="w-4 h-4 text-green-500" />
//               <span className="text-sm font-medium text-gray-700">AI-Powered Interview Builder</span>
//             </div>
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
//               Generate Interview Questions
//             </h1>
//             <p className="text-gray-600">Let AI create tailored questions based on your job posting</p>
//           </div>

//           {/* Generate AI Questions Card */}
//           <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-8 mb-6">
//             <div className="flex items-start gap-4 mb-6">
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center flex-shrink-0">
//                 <Sparkles className="w-6 h-6 text-green-600" />
//               </div>
//               <div className="flex-1">
//                 <h2 className="text-xl font-bold text-gray-900 mb-2">Generate AI Questions</h2>
//                 <p className="text-gray-600 text-sm sm:text-base">
//                   Our AI analyzes your job description and creates relevant interview questions across multiple categories.
//                   Generate as many times as needed until you're satisfied.
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={generateQuestions}
//               disabled={isLoading}
//               className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   Generating Questions...
//                 </>
//               ) : (
//                 <>
//                   <Sparkles className="w-5 h-5" />
//                   Generate Questions
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Preview Questions Section */}
//           <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900 mb-1">Interview Questions</h2>
//                 <p className="text-sm text-gray-600">
//                   Edit AI-generated questions or add your own
//                 </p>
//               </div>
//               <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-lime-100 text-green-700 rounded-full text-sm font-semibold">
//                 {questions.length} {questions.length === 1 ? 'Question' : 'Questions'}
//               </span>
//             </div>

//             {/* Questions List */}
//             <div className="space-y-4 mb-6">
//               {questions.map((item, index) => (
//                 <div 
//                   key={item.id} 
//                   className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-4 sm:p-5 hover:border-green-200 hover:shadow-sm transition-all duration-300"
//                 >
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     {/* Position Badge */}
//                     <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-700 font-bold text-sm">
//                       {index + 1}
//                     </div>

//                     <div className="flex-1 space-y-3">
//                       {/* Category Selector */}
//                       <div className="relative">
//                         <select
//                           value={item.category}
//                           onChange={(e) =>
//                             setQuestions((prev) =>
//                               prev.map((q) =>
//                                 q.id === item.id ? { ...q, category: e.target.value } : q
//                               )
//                             )
//                           }
//                           className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r ${categoryColors[item.category]} rounded-lg font-semibold text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
//                         >
//                           <option value="Culture">Culture</option>
//                           <option value="Technical">Technical</option>
//                           <option value="Leadership">Leadership</option>
//                           <option value="SoftSkills">Soft Skills</option>
//                           <option value="XFactor">X-Factor</option>
//                         </select>
//                         <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
//                       </div>

//                       {/* Question Input */}
//                       <div className="relative">
//                         <Edit3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           type="text"
//                           value={item.question}
//                           onChange={(e) =>
//                             setQuestions((prev) =>
//                               prev.map((q) =>
//                                 q.id === item.id ? { ...q, question: e.target.value } : q
//                               )
//                             )
//                           }
//                           placeholder="Enter your question"
//                           className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-gray-900"
//                         />
//                       </div>
//                     </div>

//                     {/* Delete Button */}
//                     <button
//                       onClick={() => setQuestions((prev) => prev.filter((q) => q.id !== item.id))}
//                       className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all flex items-center justify-center self-start sm:self-center"
//                       title="Delete question"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Add New Question */}
//             <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 hover:border-green-400 transition-all">
//               <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Plus className="w-4 h-4" />
//                 Add Custom Question
//               </h3>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <div className="relative sm:w-48">
//                   <select
//                     value={newQuestion.category}
//                     onChange={(e) =>
//                       setNewQuestion((prev) => ({
//                         ...prev,
//                         category: e.target.value,
//                       }))
//                     }
//                     className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none appearance-none cursor-pointer"
//                   >
//                     <option value="Culture">Culture</option>
//                     <option value="Technical">Technical</option>
//                     <option value="Leadership">Leadership</option>
//                     <option value="SoftSkills">Soft Skills</option>
//                     <option value="XFactor">X-Factor</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//                 </div>

//                 <input
//                   type="text"
//                   value={newQuestion.question}
//                   onChange={(e) =>
//                     setNewQuestion((prev) => ({
//                       ...prev,
//                       question: e.target.value,
//                     }))
//                   }
//                   placeholder="Type your custom question here..."
//                   className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none"
//                 />

//                 <button
//                   onClick={() => {
//                     if (newQuestion.question.trim()) {
//                       setQuestions((prev) => [
//                         ...prev,
//                         {
//                           id: `${newQuestion.category}-${prev.length + 1}`,
//                           position: prev.length + 1,
//                           category: newQuestion.category,
//                           question: newQuestion.question.trim(),
//                         },
//                       ]);
//                       setNewQuestion({ category: "Culture", question: "" });
//                     }
//                   }}
//                   className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row justify-end gap-3 pb-8">
//             <button
//               onClick={() => navigate(-1)}
//               className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
//             >
//               Back
//             </button>
//             <button
//               onClick={handleSaveAndNext}
//               disabled={questions.length === 0}
//               className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Save className="w-5 h-5" />
//               Save & Continue
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Aiquestion;



import React, { useEffect, useState } from 'react';
import Onavbar from './Onavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, Trash2, Plus, Save, Edit3, MessageSquare, ChevronDown, ArrowRight, Check, Zap } from 'lucide-react';
import { AI_PROMPT } from './constants/options';
import { chatSession } from "./service/ai/chatSession.js";

const Aiquestion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [newQuestion, setNewQuestion] = useState({
    category: "Culture",
    question: "",
  });

  const loadJobPostData = () => {
    const savedData = localStorage.getItem('jobPostData');
    const parsedData = savedData ? JSON.parse(savedData) : location.state?.jobData || null;
    return parsedData?.jobDescription ? parsedData : null;
  };

  const loadInitialQuestions = () => {
    const savedQuestions = localStorage.getItem('aiQuestions');
    return savedQuestions && JSON.parse(savedQuestions).length > 0
      ? JSON.parse(savedQuestions)
      : [{ id: "1", position: 1, category: "Culture", question: "" }];
  };

  const [jobPostData, setJobPostData] = useState(() => loadJobPostData());
  const [questions, setQuestions] = useState(() => loadInitialQuestions());

  useEffect(() => {
    localStorage.setItem('aiQuestions', JSON.stringify(questions));
  }, [questions]);

  const dataforAi = JSON.stringify(jobPostData, null, 2);
  const FINAL_PROMPT = AI_PROMPT.replace("{acutal_data}", dataforAi || "N/A");

  const generateQuestions = async () => {
    setIsLoading(true);
    try {
      const result = await chatSession(FINAL_PROMPT);
      const responseText = result;
      const parseData = responseText;
      const interviewQuestionsData = JSON.parse(parseData);
      const aiData = interviewQuestionsData;

      const formattedQuestions = Object.entries(aiData).flatMap(([category, items], index) =>
        items.map((item, i) => ({
          id: `${category}-${i + 1}`,
          position: index * 10 + i + 1,
          category: category.charAt(0).toUpperCase() + category.slice(1),
          question: item,
          expectedResponse: "",
        }))
      );
      
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error while generating questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAndNext = () => {
    localStorage.setItem('aiQuestions', JSON.stringify(questions));
    navigate('/preview-and-publish', { 
      state: { 
        jobData: jobPostData, 
        formattedQuestions: questions 
      } 
    });
  };

  const categoryConfig = {
    Culture: { 
      gradient: "from-emerald-50 to-teal-50",
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      icon: "🌱"
    },
    Technical: { 
      gradient: "from-blue-50 to-cyan-50",
      text: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "⚡"
    },
    Leadership: { 
      gradient: "from-violet-50 to-purple-50",
      text: "text-violet-700",
      bg: "bg-violet-50",
      border: "border-violet-200",
      icon: "👑"
    },
    SoftSkills: { 
      gradient: "from-amber-50 to-yellow-50",
      text: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: "💡"
    },
    XFactor: { 
      gradient: "from-rose-50 to-pink-50",
      text: "text-rose-700",
      bg: "bg-rose-50",
      border: "border-rose-200",
      icon: "✨"
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      <Onavbar />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Header Section */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-green-50 to-lime-50 border border-green-100 rounded-full mb-4 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-green-700 tracking-wide uppercase">AI Interview Builder</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
              Generate Interview Questions
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
              Let our AI analyze your job posting and create tailored questions across multiple categories
            </p>
          </div>

          {/* AI Generator Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6 hover:shadow-md transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-lime-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/20">
                <Sparkles className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                  AI-Powered Question Generation
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  Our advanced AI analyzes your job requirements and generates relevant interview questions tailored to your needs. Generate multiple times to explore different question sets.
                </p>

                <button
                  onClick={generateQuestions}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} />
                      <span>Generating Questions...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" strokeWidth={2.5} />
                      <span>Generate Questions with AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Questions Management Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 tracking-tight">
                  Interview Questions
                </h2>
                <p className="text-sm text-gray-600">
                  Review, edit, or customize AI-generated questions
                </p>
              </div>
              
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-green-50 to-lime-50 border border-green-100 rounded-xl">
                <Check className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                <span className="text-sm font-bold text-green-700">
                  {questions.length} {questions.length === 1 ? 'Question' : 'Questions'}
                </span>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4 mb-8">
              {questions.map((item, index) => {
                const config = categoryConfig[item.category] || categoryConfig.Culture;
                
                return (
                  <div 
                    key={item.id} 
                    className="group bg-gradient-to-br from-gray-50/50 to-white rounded-2xl border border-gray-200 p-5 sm:p-6 hover:border-green-200 hover:shadow-md hover:shadow-green-500/5 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      
                      {/* Position Badge */}
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-700 font-bold text-base shadow-sm">
                        {index + 1}
                      </div>

                      <div className="flex-1 space-y-4">
                        
                        {/* Category Selector */}
                        <div className="relative">
                          <select
                            value={item.category}
                            onChange={(e) =>
                              setQuestions((prev) =>
                                prev.map((q) =>
                                  q.id === item.id ? { ...q, category: e.target.value } : q
                                )
                              )
                            }
                            className={`w-full sm:w-auto pl-10 pr-10 py-2.5 bg-gradient-to-r ${config.gradient} ${config.text} border ${config.border} rounded-xl font-semibold text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all shadow-sm`}
                          >
                            <option value="Culture">Culture</option>
                            <option value="Technical">Technical</option>
                            <option value="Leadership">Leadership</option>
                            <option value="SoftSkills">Soft Skills</option>
                            <option value="XFactor">X-Factor</option>
                          </select>
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base">
                            {config.icon}
                          </span>
                          <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${config.text} pointer-events-none`} strokeWidth={2.5} />
                        </div>

                        {/* Question Input */}
                        <div className="relative">
                          <Edit3 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
                          <input
                            type="text"
                            value={item.question}
                            onChange={(e) =>
                              setQuestions((prev) =>
                                prev.map((q) =>
                                  q.id === item.id ? { ...q, question: e.target.value } : q
                                )
                              )
                            }
                            placeholder="Enter your question here..."
                            className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => setQuestions((prev) => prev.filter((q) => q.id !== item.id))}
                        className="flex-shrink-0 w-11 h-11 rounded-xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 hover:border-red-200 hover:text-red-600 transition-all flex items-center justify-center self-start sm:self-center shadow-sm"
                        title="Delete question"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Custom Question Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-5 sm:p-6 hover:border-green-400 hover:bg-green-50/30 transition-all duration-300">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 tracking-wide uppercase">
                <Plus className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                <span className="text-green-700">Add Custom Question</span>
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative sm:w-52">
                  <select
                    value={newQuestion.category}
                    onChange={(e) =>
                      setNewQuestion((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-10 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium text-sm focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none appearance-none cursor-pointer shadow-sm"
                  >
                    <option value="Culture">🌱 Culture</option>
                    <option value="Technical">⚡ Technical</option>
                    <option value="Leadership">👑 Leadership</option>
                    <option value="SoftSkills">💡 Soft Skills</option>
                    <option value="XFactor">✨ X-Factor</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" strokeWidth={2} />
                </div>

                <input
                  type="text"
                  value={newQuestion.question}
                  onChange={(e) =>
                    setNewQuestion((prev) => ({
                      ...prev,
                      question: e.target.value,
                    }))
                  }
                  placeholder="Type your custom question here..."
                  className="flex-1 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-sm sm:text-base shadow-sm"
                />

                <button
                  onClick={() => {
                    if (newQuestion.question.trim()) {
                      setQuestions((prev) => [
                        ...prev,
                        {
                          id: `${newQuestion.category}-${prev.length + 1}`,
                          position: prev.length + 1,
                          category: newQuestion.category,
                          question: newQuestion.question.trim(),
                        },
                      ]);
                      setNewQuestion({ category: "Culture", question: "" });
                    }
                  }}
                  className="flex-shrink-0 px-6 py-3.5 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" strokeWidth={2.5} />
                  <span className="hidden sm:inline">Add Question</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pb-8">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
            >
              Back
            </button>
            <button
              onClick={handleSaveAndNext}
              disabled={questions.length === 0}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Save className="w-5 h-5" strokeWidth={2.5} />
              <span>Save & Continue</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aiquestion;