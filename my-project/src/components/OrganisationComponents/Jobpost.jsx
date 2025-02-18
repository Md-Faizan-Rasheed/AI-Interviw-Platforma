import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { AI_PROMPTSEC } from './constants/options';
import { chatSessionsecond } from "./service/Aimodel";
import { FaTimes } from 'react-icons/fa';
import Onavbar from './Onavbar';

const Jobpost = () => {
  const navigate = useNavigate();
  const loadInitialState = () => {
    const savedData = localStorage.getItem('jobPostData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  };
  
  const initialState = loadInitialState();

  const handleContentChange = (e) => {
    setJobDescription(e.target.innerHTML);
  };

  
// State for input field
// const [jobTitle, setJobTitle] = useState('');
// const [category, setCategory] = useState('');
// const [subcategory, setSubcategory] = useState('');
//   const [locationType, setLocationType] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [country, setCountry] = useState('');
//   const [isJobInfoOpen, setJobInfoOpen] = useState(true);
//   const [isJobDescriptionOpen, setJobDescriptionOpen] = useState(true);
//   const [isAdditionalDetailsOpen, setAdditionalDetailsOpen] = useState(true);
//   const [displayOrganization, setDisplayOrganization] = useState(true);
//   const [isCompensaion, setCompensaion] = useState(true);
//   const [payRange, setPayRange] = useState({ min: '', max: '' });
//   const [jobDescription, setJobDescription] = useState('');


//   const [selectedJobTypes, setSelectedJobTypes] = useState([]);
//   const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(null);
//   const [selectedSchedules, setSelectedSchedules] = useState([]);

//   const jobTypes = ['Full Time', 'Part Time', 'Contract', 'Temporary', 'Internship', 'Volunteer', 'Freelance'];
//   const experienceLevels = ['No experience', 'Less than 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'];
//   const [benefits, setBenefits] = useState(['sldkf', 'sldkf', 'New Benefit']);
//   const [showModal, setShowModal] = useState(false);
//   const [newBenefit, setNewBenefit] = useState('');





// State for input fields
const [jobTitle, setJobTitle] = useState(initialState?.jobTitle || '');
const [category, setCategory] = useState(initialState?.category || '');
const [subcategory, setSubcategory] = useState(initialState?.subcategory || '');
const [locationType, setLocationType] = useState(initialState?.locationType || '');
const [city, setCity] = useState(initialState?.city || '');
const [state, setState] = useState(initialState?.state || '');
const [country, setCountry] = useState(initialState?.country || '');
const [jobDescription, setJobDescription] = useState(initialState?.jobDescription || '');
const [selectedJobTypes, setSelectedJobTypes] = useState(initialState?.selectedJobTypes || []);
const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(initialState?.selectedExperienceLevel || null);
const [selectedSchedules, setSelectedSchedules] = useState(initialState?.selectedSchedules || []);
const [payRange, setPayRange] = useState(initialState?.payRange || { min: '', max: '' });
const [benefits, setBenefits] = useState(initialState?.benefits || []);
const [isJobInfoOpen, setJobInfoOpen] = useState(true);
const [isJobDescriptionOpen, setJobDescriptionOpen]=useState(true);
const [isCompensaion, setCompensaion]=useState(true);
const [showModal, setShowModal]=useState(false);
const [newBenefit, setNewBenefit]=useState('');
const [displayOrganization, setDisplayOrganization]=useState(true);
const [isAdditionalDetailsOpen, setAdditionalDetailsOpen]=useState();


  // Function to add a new benefit
  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit('');
      setShowModal(false);
    }
  };

  useEffect(() => {
    const dataToSave = {
      jobTitle,
      category,
      subcategory,
      locationType,
      city,
      state,
      country,
      jobDescription,
      selectedJobTypes,
      selectedExperienceLevel,
      selectedSchedules,
      payRange,
      benefits,
    };

    localStorage.setItem("jobPostData", JSON.stringify(dataToSave));
    console.log("DATa to save is shown here",dataToSave);
  }, [
    jobTitle,
    category,
    subcategory,
    locationType,
    city,
    state,
    country,
    jobDescription,
    selectedJobTypes,
    selectedExperienceLevel,
    selectedSchedules,
    payRange,
    benefits,
  ]);




  // Function to remove a benefit
  const handleRemoveBenefit = (index) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
  };

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
  // const [benefits, setBenefits] = useState(["sldkf", "sldkf"]);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addBenefit = () => {
    setBenefits([...benefits, "New Benefit"]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSaveAndNext = () => {

    if(jobTitle && jobDescription){
    const jobData = {
      jobTitle,
      category,
      subcategory,
      locationType,
      location: { city, state, country },
      jobDescription,
      selectedJobTypes,
      selectedExperienceLevel,
      selectedSchedules,
      showCompensation,
      payRange,
      benefits,
    };
    
console.log(jobData);
    // Navigate to the next component and pass the jobData
    navigate('/Aiquestion', { state: { jobData } });
  }

  };


  const jobtoggleSelection = (type) => {
    setSelectedJobTypes((prevSelected) =>
      prevSelected.includes(type)
        ? prevSelected.filter((jobType) => jobType !== type) // Remove if already selected
        : [...prevSelected, type] // Add if not selected
    );
  };

  const [error, setError] = useState(false);

  const handleDescriptionChange = (e) => {
    setJobDescription(e.target.value);
    if (e.target.value.trim()) {
      setError(false);
    }
  };

  useEffect(() => {
  var user = localStorage.getItem('loggedInUser');
  console.log('Logged in user:', user);

  if (user) {
    setLoggedInUser(user);
  }
}, []);

const FINAL_PROMPT = AI_PROMPTSEC
  .replace("{role}",jobTitle || "N/A")
  .replace("{comapany_name}", loggedInUser || "N/A");

  const handleGenerateDescription = async () => {
    setIsLoading(true);
    try {
      // Placeholder logic for generating a description
      console.log("Final prompt goes to AI:", FINAL_PROMPT);
  
      if (jobTitle) {
        const result = await chatSessionsecond.sendMessage(FINAL_PROMPT);
        const responseText = result?.response?.text() || "No Response";
  
        console.log("Response from AI:", responseText);
  
        // Parse the response and remove code block indicators
        var parseData = responseText.replace(/```json|```/g, "");
        var jobDescriptionData = JSON.parse(parseData);
  
        console.log("Parsed Data:", jobDescriptionData);
      const formattedDescriptionJSX = (
        <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
          {/* Job Title */}
          {/* <p>
            <strong style={{ fontSize: "20px", display: "block", marginBottom: "10px" }}>Job Title:</strong>
            {jobDescriptionData.job_title || "N/A"}
          </p> */}
      
          {/* Company Name */}
          {/* <p>
            <strong style={{ fontSize: "20px", display: "block", marginBottom: "10px" }}>Company Name:</strong>
            {jobDescriptionData.company_name || "N/A"}
          </p> */}
      
          {/* About the Company */}
          <p>
            {/* <strong style={{ fontSize: "20px", display: "block", marginBottom: "10px" }}>About the Company:</strong> */}
            <span style={{ marginLeft: "20px", display: "block",marginBottom: "15px",marginTop: "10px" }}>
              {jobDescriptionData.company_about || "N/A"}
            </span>
          </p>
      
          {/* Job Description */}
          <p>
            {/* <strong style={{ fontSize: "20px", display: "block", marginBottom: "10px" }}>Job Description:</strong> */}
          </p>
      
          {/* Responsibilities */}
          <p>
            <strong style={{ fontSize: "18px", marginBottom: "5px" }}>Responsibilities:</strong>
            <ul style={{ marginLeft: "40px", marginTop: "5px" }}>
              {(jobDescriptionData.job_description?.Responsibilities || ["No responsibilities listed"]).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>{item}</li>
                )
              )}
            </ul>
          </p>
      
          {/* Qualifications */}
          <p>
            <strong style={{ fontSize: "18px", marginBottom: "5px" }}>Qualifications:</strong>
            <ul style={{ marginLeft: "40px", marginTop: "5px" }}>
              {(jobDescriptionData.job_description?.Qualifications || ["No qualifications listed"]).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>{item}</li>
                )
              )}
            </ul>
          </p>
      
          {/* Benefits */}
          <p>
            <strong style={{ fontSize: "18px", marginBottom: "5px" }}>Benefits:</strong>
            <ul style={{ marginLeft: "40px", marginTop: "5px" }}>
              {(jobDescriptionData.job_description?.Benefits || ["No benefits listed"]).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>{item}</li>
                )
              )}
            </ul>
          </p>
      
          {/* Requirements */}
          <p>
            <strong style={{ fontSize: "18px", marginBottom: "5px" }}>Requirements:</strong>
            <ul style={{ marginLeft: "40px", marginTop: "5px" }}>
              {(jobDescriptionData.job_description?.Requirements || ["No requirements listed"]).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>{item}</li>
                )
              )}
            </ul>
          </p>
      
          {/* How to Apply */}
          {/* <p>
            <strong style={{ fontSize: "20px", display: "block", marginBottom: "10px" }}>How to Apply:</strong>
            <span style={{ marginLeft: "20px", display: "block" }}>
              {jobDescriptionData.how_to_apply || "No application instructions provided"}
            </span>
          </p> */}
      
          {/* Equal Opportunity Statement */}
          {/* <p>
            <strong style={{ fontSize: "20px", display: "block", marginBottom: "10px" }}>Equal Opportunity Statement:</strong>
            <span style={{ marginLeft: "20px", display: "block" }}>
              {jobDescriptionData.equal_opportunity_statement || "No equal opportunity statement provided."}
            </span>
          </p> */}
        </div>
      );


      const formattedDescriptionString = renderToStaticMarkup(
        formattedDescriptionJSX
      );

      // Set the job description state
      setJobDescription(formattedDescriptionString);
    }
  } catch (error) {
    console.log("Failed to generate description:", error);
  } finally {
    setIsLoading(false);
  }
};

  const handleBlur = () => {
    if (!jobDescription.trim()) {
      setError(true);
    }
  };
  // const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        // const interval = setInterval(() => 
        //     setSeconds((s) => s + 1), 1000);
        // return () => clearInterval(interval); 
        console.log("console.logfor how many tiesm");
    }, []);

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
               value={jobTitle}
               onChange={(e) => setJobTitle(e.target.value)}
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
             value={category}
             onChange={(e) => setCategory(e.target.value)}
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
             value={subcategory}
             onChange={(e) => setSubcategory(e.target.value)}
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
    <input
      type="radio"
      name="locationType"
      value="In-Person (Precise)"
      className="mr-2"
      onChange={(e) => setLocationType(e.target.value)}
    />
    In-Person (Precise)
  </label>
  <label className="flex items-center">
    <input
      type="radio"
      name="locationType"
      value="In-Person (General)"
      className="mr-2"
      onChange={(e) => setLocationType(e.target.value)}
    />
    In-Person (General)
  </label>
  <label className="flex items-center">
    <input
      type="radio"
      name="locationType"
      value="Remote"
      className="mr-2"
      onChange={(e) => setLocationType(e.target.value)}
    />
    Remote
  </label>
  <label className="flex items-center">
    <input
      type="radio"
      name="locationType"
      value="Hybrid"
      className="mr-2"
      onChange={(e) => setLocationType(e.target.value)}
    />
    Hybrid
  </label>
</div>

     
           {/* Job Location */}
           <div className="mb-6">
             <label className="block text-gray-700 font-medium mb-2">Job Location</label>
             <div className="grid grid-cols-3 gap-4">
    <input
      type="text"
      placeholder="City"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="text"
      placeholder="State"
      value={state}
      onChange={(e) => setState(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="text"
      placeholder="Country"
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
           </div>
         </div>
       
      </div>
 )}
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
          <div className=" w-full mx-auto p-6 border rounded-lg shadow-lg bg-white">
          <label className="block text-lg font-medium text-gray-700 mb-2">Job Description <span className="text-red-500">*</span></label>
          <p className="text-sm text-gray-500 mb-4">Craft a comprehensive description that highlights the unique features, benefits, and specifications of your open position.</p>

          {error && <p className="text-red-500 mt-2">Job description is required.</p>}
          <button
        onClick={handleGenerateDescription}
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
          "🖉 Generate Description"
        )}
      </button>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 focus-within:border-blue-500 mt-4">

      {/* Rendered Job Description */}
      <div>
        {/* <h2>Job Description</h2> */}
        <div
        contentEditable
        dangerouslySetInnerHTML={{ __html: jobDescription }}
        onInput={handleContentChange}
        className="w-full border p-2 bg-white text-gray-800 outline-none"
        style={{
          minHeight: '150px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      ></div>     
       </div>

      </div>
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

                  onClick={() => jobtoggleSelection(type)}
          className={`px-4 py-2 border rounded-full ${
            selectedJobTypes.includes(type)
              ? 'bg-blue-500 text-white'
              : 'border-gray-300 text-gray-700'
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
        name="min"
        placeholder="Minimum"
        className="border rounded-md p-2 flex-1 text-sm"
        value={payRange.min}
        onChange={handleInputChange}
      />
      <span className="text-sm">to</span>
      <input
        type="text"
        name="max"
        placeholder="Maximum"
        className="border rounded-md p-2 flex-1 text-sm"
        value={payRange.max}
        onChange={handleInputChange}
      />
            </div>
          </div>
    
          {/* Benefits Section */}
         
<div className="p- max-w-xl ">
      <h2 className="text-lg font-bold mb-4">Benefits</h2>
      <div className="flex flex-wrap gap-3">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
            {benefit}
            <button
              className="ml-2 text-white hover:text-gray-300"
              onClick={() => handleRemoveBenefit(index)}
            >
              <FaTimes />
            </button>
          </div>
        ))}
        <button
          className="border border-dashed border-gray-400 px-4 py-2 rounded-full text-gray-500 hover:bg-gray-100"
          onClick={() => setShowModal(true)}
        >
          + Add Benefit
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Add New Benefit</h3>
            <input
              type="text"
              placeholder="Enter benefit"
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              className="border w-full p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={handleAddBenefit}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
        </div>
        )}
      </div>
 {/* Action Buttons */}
 <div className="flex justify-end gap-4 mt-4 mb-16">
            <button className="px-4 py-2 rounded-md bg-gray-200 text-sm">Cancel</button>
            <button 
            onClick={handleSaveAndNext}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm">
              Save & Next
            </button>
          </div>
    </div>
    </div>
  </div>
  )
}

export default Jobpost