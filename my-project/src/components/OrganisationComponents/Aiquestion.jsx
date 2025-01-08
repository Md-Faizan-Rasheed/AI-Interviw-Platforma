import React, { useState } from 'react'
import Onavbar from './Onavbar';
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { FaGripVertical } from "react-icons/fa"; // Importing the drag icon
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AI_PROMPT } from './constants/options';
import { chatSession } from "./service/Aimodel";


const Aiquestion =  () => {
  const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();
    // const { formattedQuestions } = location.state;

    const [newQuestion, setNewQuestion] = useState({
        category: "Culture",
        question: "",
      });
      
 const dataforAi =JSON.stringify(location.state?.jobData, null, 2);

 const FINAL_PROMPT = AI_PROMPT.replace("{acutal_data}",dataforAi|| "N/A");



    
    const generateQuestions = async () => {
      setIsLoading(true); // Show loading indicator
      try {
        // Simulate AI API call
        const result = await chatSession.sendMessage(FINAL_PROMPT); 
        const responseText = result?.response?.text() || "No Response";
  
        console.log("Response from AI:", responseText);
  
        var parseData = responseText.replace(/```json|```/g, "");
        console.log("Parsed Data:", parseData);
  
        const interviewQuestionsData = JSON.parse(parseData);
        const aiData = interviewQuestionsData.interviewQuestions;
  
        // Flatten questions into a single array
        const formattedQuestions = Object.entries(aiData).flatMap(([category, items], index) =>
          items.map((item, i) => ({
            id: `${category}-${i + 1}`,
            position: index * 10 + i + 1,
            category: category.charAt(0).toUpperCase() + category.slice(1),
            question: item.question,
            expectedResponse: item.expectedResponseStructure,
          }))
        );
  
        console.log("Formatted Questions:", formattedQuestions);
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("Error while generating questions:", error);
      } finally {
        setIsLoading(false); // Hide loading indicator
      }
    };

    const [questions, setQuestions] = useState([
        { id: "1", position: 1, category: "Culture", question: "" },
      ]);

      const handleSaveAndNext = () =>{
        navigate('/Preview&Publish',{ state:{ dataforAi, formattedQuestions: questions} });
      }
  return (
    <div className="flex h-screen bg-gray-100">
    <Onavbar/>
     <div className="p-8 bg-gray-100 min-h-screen mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">
        AI Question Generator
      </h1>

      {/* Generate AI Questions Section */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4 flex items-center">
          <span className="mr-2">✨</span> Generate AI Questions
        </h2>
        <p className="text-gray-600 mb-4">
          Allow our AI to generate questions for your specific job posting.
          Generate as many times as you want until you're satisfied.
        </p>
        
         <button
        onClick={generateQuestions}
        disabled={isLoading}
        className={`${
          isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white px-6 py-2 rounded-lg`}
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4zm2 5.292V13h4.708l1.292 1.292H6z"
              ></path>
            </svg>
            Loading...
          </div>
        ) : (
          "Generate Questions"
        )}
      </button>
      </div>

      {/* Advanced Options Section */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Advanced Options</h2>
        <p className="text-gray-600">Coming soon...</p>
      </div>

      {/* Preview Interview Questions */}
      <div className="p-6 bg-gray-100">
  <h2 className="text-lg font-semibold mb-4">Preview Interview Questions</h2>
  <p className="text-sm text-gray-500 mb-6">
    Edit the AI-generated questions or enter your own here.
  </p>

  {/* Questions List */}
  <div className="space-y-4 bg-white p-4 rounded shadow">
    {questions.map((item) => (
      <div
        key={item.id}
        className="grid grid-cols-12 items-center border border-gray-300 rounded p-4"
      >
        {/* Position */}
        <div className="col-span-1 text-center">{item.position}</div>

        {/* Category Dropdown */}
        <select
          value={item.category}
          onChange={(e) =>
            setQuestions((prev) =>
              prev.map((q) =>
                q.id === item.id
                  ? { ...q, category: e.target.value }
                  : q
              )
            )
          }
          className="col-span-2 border border-gray-300 rounded px-2 py-1"
        >
          <option value="Culture">Culture</option>
          <option value="Technical">Technical</option>
          <option value="Leadership">Leadership</option>
          <option value="SoftSkills">SoftSkills</option>
          <option value="XFactor">XFactor</option>
        </select>

        {/* Question Input */}
        <input
          type="text"
          value={item.question}
          onChange={(e) =>
            setQuestions((prev) =>
              prev.map((q) =>
                q.id === item.id
                  ? { ...q, question: e.target.value }
                  : q
              )
            )
          }
          className="col-span-8 border border-gray-300 rounded px-4 py-2 w-full"
        />

        {/* Delete Button */}
        <button
          onClick={() =>
            setQuestions((prev) => prev.filter((q) => q.id !== item.id))
          }
          className="col-span-1 text-red-500 hover:text-red-700"
        >
          🗑
        </button>
      </div>
    ))}
  </div>

  {/* Add New Question */}
  <div className="mt-6 bg-white p-4 rounded shadow">
    <h3 className="text-md font-semibold mb-4">Add New Question</h3>
    <div className="grid grid-cols-12 gap-4 items-center">
      {/* New Question Category */}
      <select
        value={newQuestion.category}
        onChange={(e) =>
          setNewQuestion((prev) => ({
            ...prev,
            category: e.target.value,
          }))
        }
        className="col-span-3 border border-gray-300 rounded px-2 py-1"
      >
        <option value="Culture">Culture</option>
        <option value="Technical">Technical</option>
        <option value="Leadership">Leadership</option>
        <option value="SoftSkills">SoftSkills</option>
        <option value="XFactor">XFactor</option>
      </select>

      {/* New Question Input */}
      <input
        type="text"
        value={newQuestion.question}
        onChange={(e) =>
          setNewQuestion((prev) => ({
            ...prev,
            question: e.target.value,
          }))
        }
        placeholder="Enter your question"
        className="col-span-8 border border-gray-300 rounded px-4 py-2 w-full"
      />

      {/* Add Button */}
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
            setNewQuestion({ category: "Culture", question: "" }); // Reset new question input
          }
        }}
        className="col-span-1 text-green-500 hover:text-green-700"
      >
        ➕
      </button>
    </div>
  </div>
</div>


      {/* Save & Next Button */}
      <div className="mt-8 flex justify-end">
        <button 
        onClick={handleSaveAndNext}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Save & Next
        </button>
      </div>
      
    </div>
   </div>
  )
}

export default Aiquestion