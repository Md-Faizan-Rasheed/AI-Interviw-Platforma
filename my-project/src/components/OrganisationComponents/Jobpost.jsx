import React from 'react'
import Onavbar from './Onavbar'
import  { useState } from 'react';

const Jobpost = () => {
  const [isJobInfoOpen, setJobInfoOpen] = useState(true);
  const [isJobDescriptionOpen, setJobDescriptionOpen] = useState(true);
  const [isAdditionalDetailsOpen, setAdditionalDetailsOpen] = useState(true);
  const [displayOrganization, setDisplayOrganization] = useState(true);
  const [isCompensaion, setCompensaion] = useState(true);


  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(null);
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  const jobTypes = ['Full Time', 'Part Time', 'Contract', 'Temporary', 'Internship', 'Volunteer', 'Freelance'];
  const experienceLevels = ['No experience', 'Less than 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'];
  const schedules = [
    '4 hour shift',
    '8 hour shift',
    '10 hour shift',
    '12 hour shift',
    'Mon-Fri',
    'Day shift',
    'Night shift',
    'No nights',
    'Overnight',
    'On call',
    'Weekends',
  ];

  const [showCompensation, setShowCompensation] = useState(true);
  const [benefits, setBenefits] = useState(["sldkf", "sldkf"]);

  const addBenefit = () => {
    setBenefits([...benefits, "New Benefit"]);
  };

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };


  return (
    <div className="flex h-screen bg-gray-100">
      <Onavbar/>
      
      <div className="max-w-4xl mx-auto p-4">
      {/* Job Information Section */}
      <div className="border border-gray-300 rounded-lg mb-4">
        <div
          className="flex justify-between items-center p-4 bg-blue-500 text-white cursor-pointer"
          onClick={() => setJobInfoOpen(!isJobInfoOpen)}
        >
          <h2 className="text-lg font-bold">Job Information</h2>
          <span>{isJobInfoOpen ? '▲' : '▼'}</span>
        </div>
        {isJobInfoOpen && (
           <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
           {/* Job Title */}
           <div className="mb-6">
             <label className="block text-gray-700 font-medium mb-2" htmlFor="jobTitle">
               Job Title <span className="text-red-500">Required</span>
             </label>
             <input
               type="text"
               id="jobTitle"
               placeholder="Enter a job title for this position"
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             />
             <p className="text-sm text-gray-500 mt-1">Maximum characters 0/70</p>
           </div>
     
           {/* Display Organization */}
           <div className="flex items-center mb-6">
             <input
               type="checkbox"
               id="displayOrganization"
               checked={displayOrganization}
               onChange={() => setDisplayOrganization(!displayOrganization)}
               className="toggle-checkbox hidden"
             />
             <label
               htmlFor="displayOrganization"
               className={`toggle-label bg-gray-200 w-12 h-6 rounded-full flex items-center cursor-pointer ${
                 displayOrganization ? 'bg-blue-500' : ''
               }`}
             >
               <div
                 className={`w-6 h-6 bg-white rounded-full shadow-md transform ${
                   displayOrganization ? 'translate-x-6' : ''
                 }`}
               ></div>
             </label>
             <span className="ml-4 text-gray-700 font-medium">
               {displayOrganization ? 'Display Hiring Organization' : 'Hide Hiring Organization'}
             </span>
           </div>
     
           {/* Category */}
           <div className="mb-6">
             <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
               Category
             </label>
             <select
               id="category"
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             >
               <option value="">Select Category</option>
               <option value="software">Software Development</option>
               <option value="marketing">Marketing</option>
               <option value="design">Design</option>
             </select>
           </div>
     
           {/* Subcategory */}
           <div className="mb-6">
             <label className="block text-gray-700 font-medium mb-2" htmlFor="subcategory">
               Subcategory
             </label>
             <select
               id="subcategory"
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             >
               <option value="">Select Subcategory</option>
               <option value="frontend">Frontend Development</option>
               <option value="backend">Backend Development</option>
               <option value="uiux">UI/UX Design</option>
             </select>
           </div>
     
           {/* Location Type */}
           <div className="mb-6">
             <label className="block text-gray-700 font-medium mb-2">Location Type</label>
             <div className="flex items-center gap-4">
               <label className="flex items-center">
                 <input type="radio" name="locationType" className="mr-2" />
                 In-Person (Precise)
               </label>
               <label className="flex items-center">
                 <input type="radio" name="locationType" className="mr-2" />
                 In-Person (General)
               </label>
               <label className="flex items-center">
                 <input type="radio" name="locationType" className="mr-2" />
                 Remote
               </label>
               <label className="flex items-center">
                 <input type="radio" name="locationType" className="mr-2" />
                 Hybrid
               </label>
             </div>
           </div>
     
           {/* Job Location */}
           <div className="mb-6">
             <label className="block text-gray-700 font-medium mb-2">Job Location</label>
             <div className="grid grid-cols-3 gap-4">
               <input
                 type="text"
                 placeholder="City"
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               <input
                 type="text"
                 placeholder="State"
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               <input
                 type="text"
                 placeholder="Country"
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>
           </div>
         </div>
        )}
      </div>

      {/* Job Description Section */}
      <div className="border border-gray-300 rounded-lg mb-4">
        <div
          className="flex justify-between items-center p-4 bg-blue-500 text-white cursor-pointer"
          onClick={() => setJobDescriptionOpen(!isJobDescriptionOpen)}
        >
          <h2 className="text-lg font-bold">Job Description</h2>
          <span>{isJobDescriptionOpen ? '▲' : '▼'}</span>
        </div>
        {isJobDescriptionOpen && (
          <div className="p-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="5"
              placeholder="Write the job description here..."
            ></textarea>
            <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Generate Description</button>
          </div>
        )}
      </div>

      {/* Additional Details Section */}
      <div className="border border-gray-300 rounded-lg">
        <div
          className="flex justify-between items-center p-4 bg-blue-500 text-white cursor-pointer"
          onClick={() => setAdditionalDetailsOpen(!isAdditionalDetailsOpen)}
        >
          <h2 className="text-lg font-bold">Additional Details</h2>
          <span>{isAdditionalDetailsOpen ? '▲' : '▼'}</span>
        </div>
        {isAdditionalDetailsOpen && (
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
          {/* Job Type */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Job Type</label>
            <p className="text-sm text-gray-500 mb-4">
              Add additional details for your job posting that are relevant to the candidate.
            </p>
            <div className="flex flex-wrap gap-4">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleSelection(type, selectedJobTypes, setSelectedJobTypes)}
                  className={`px-4 py-2 border rounded-full ${
                    selectedJobTypes.includes(type) ? 'bg-blue-500 text-white' : 'border-gray-300 text-gray-700'
                  } hover:border-blue-500 hover:text-blue-500`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
    
          {/* Experience Level */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Experience Level</label>
            <div className="flex flex-wrap gap-4">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedExperienceLevel(level)}
                  className={`px-4 py-2 border rounded-full ${
                    selectedExperienceLevel === level ? 'bg-blue-500 text-white' : 'border-gray-300 text-gray-700'
                  } hover:border-blue-500 hover:text-blue-500`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
    
          {/* Schedule */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Schedule</label>
            <div className="flex flex-wrap gap-4">
              {schedules.map((schedule) => (
                <button
                  key={schedule}
                  onClick={() => toggleSelection(schedule, selectedSchedules, setSelectedSchedules)}
                  className={`px-4 py-2 border rounded-full ${
                    selectedSchedules.includes(schedule) ? 'bg-blue-500 text-white' : 'border-gray-300 text-gray-700'
                  } hover:border-blue-500 hover:text-blue-500`}
                >
                  {schedule}
                </button>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Compensation Section */}
      <div className="border border-gray-300 rounded-lg">
        <div
          className="flex justify-between items-center p-4 bg-blue-500 text-white cursor-pointer"
          onClick={() => setCompensaion(!isCompensaion)}
        >
          <h2 className="text-lg font-bold">Compensation</h2>
          <span>{isCompensaion ? '▲' : '▼'}</span>
        </div>
        {isCompensaion && (
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Compensation</h2>
          
          {/* Display Compensation Toggle */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showCompensation}
                onChange={(e) => setShowCompensation(e.target.checked)}
                className="toggle toggle-primary"
              />
              Show compensation
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Sometimes states require compensation to be made publicly available. 
              Please check your local regulations to comply with compensation awareness.
            </p>
          </div>
    
          {/* Pay Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Pay</label>
            <p className="text-xs text-gray-500 mb-2">
              Review the pay we estimated for your job and adjust as needed. 
              Check your local minimum wage.
            </p>
            <div className="flex gap-2 items-center">
              <select className="border rounded-md p-2 w-28 text-sm bg-white">
                <option>Per Hour</option>
                <option>Per Day</option>
                <option>Per Month</option>
                <option>Per Year</option>
              </select>
              <input
                type="text"
                placeholder="Minimum"
                className="border rounded-md p-2 flex-1 text-sm"
              />
              <span className="text-sm">to</span>
              <input
                type="text"
                placeholder="Maximum"
                className="border rounded-md p-2 flex-1 text-sm"
              />
            </div>
          </div>
    
          {/* Benefits Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Benefits</label>
            <div className="flex flex-wrap gap-2">
              {benefits.map((benefit, index) => (
                <button
                  key={index}
                  className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm"
                >
                  {benefit}
                </button>
              ))}
              <button
                onClick={addBenefit}
                className="border border-dashed px-4 py-1 rounded-md text-sm text-gray-500"
              >
                + Add Benefit
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
 {/* Action Buttons */}
 <div className="flex justify-end gap-4 mt-4 mb-10">
            <button className="px-4 py-2 rounded-md bg-gray-200 text-sm">Cancel</button>
            <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm">
              Save & Next
            </button>
          </div>
    </div>
    </div>
  )
}

export default Jobpost