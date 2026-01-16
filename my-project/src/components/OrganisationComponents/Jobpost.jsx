// import  { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { renderToStaticMarkup } from 'react-dom/server';
// import { AI_PROMPTSEC } from './constants/options';
// import { chatSessionSecond } from "./service/ai/chatSessionSecond.js";
// import { FaTimes } from 'react-icons/fa';
// import Onavbar from './Onavbar';

// const Jobpost = () => {
//   const navigate = useNavigate();
//   const loadInitialState = () => {
//     const savedData = localStorage.getItem('jobPostData');
//     if (savedData) {
//       return JSON.parse(savedData);
//     }
//     return null;
//   };
  
//   const initialState = loadInitialState();

//   const handleContentChange = (e) => {
//     setJobDescription(e.target.innerHTML);
//   };

// // State for input fields
// const [jobTitle, setJobTitle] = useState(initialState?.jobTitle || '');
// const [category, setCategory] = useState(initialState?.category || '');
// const [subcategory, setSubcategory] = useState(initialState?.subcategory || '');
// const [locationType, setLocationType] = useState(initialState?.locationType || '');
// const [city, setCity] = useState(initialState?.city || '');
// const [state, setState] = useState(initialState?.state || '');
// const [country, setCountry] = useState(initialState?.country || '');
// const [jobDescription, setJobDescription] = useState(initialState?.jobDescription || '');
// const [selectedJobTypes, setSelectedJobTypes] = useState(initialState?.selectedJobTypes || []);
// const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(initialState?.selectedExperienceLevel || null);
// const [selectedSchedules, setSelectedSchedules] = useState(initialState?.selectedSchedules || []);
// const [payRange, setPayRange] = useState(initialState?.payRange || { min: '', max: '' });
// const [benefits, setBenefits] = useState(initialState?.benefits || []);
// const [isJobInfoOpen, setJobInfoOpen] = useState(true);
// const [isJobDescriptionOpen, setJobDescriptionOpen]=useState(true);
// const [isCompensaion, setCompensaion]=useState(true);
// const [showModal, setShowModal]=useState(false);
// const [newBenefit, setNewBenefit]=useState('');
// const [displayOrganization, setDisplayOrganization]=useState(true);
// const [isAdditionalDetailsOpen, setAdditionalDetailsOpen]=useState();


//   // Function to add a new benefit
//   const handleAddBenefit = () => {
//     if (newBenefit.trim()) {
//       setBenefits([...benefits, newBenefit.trim()]);
//       setNewBenefit('');
//       setShowModal(false);
//     }
//   };

//   useEffect(() => {
//     const dataToSave = {
//       jobTitle,
//       category,
//       subcategory,
//       locationType,
//       city,
//       state,
//       country,
//       jobDescription,
//       selectedJobTypes,
//       selectedExperienceLevel,
//       selectedSchedules,
//       payRange,
//       benefits,
//     };

//     localStorage.setItem("jobPostData", JSON.stringify(dataToSave));
//     console.log("DATa to save is shown here",dataToSave);
//   }, [
//     jobTitle,
//     category,
//     subcategory,
//     locationType,
//     city,
//     state,
//     country,
//     jobDescription,
//     selectedJobTypes,
//     selectedExperienceLevel,
//     selectedSchedules,
//     payRange,
//     benefits,
//   ]);




//   // Function to remove a benefit
//   const handleRemoveBenefit = (index) => {
//     const updatedBenefits = benefits.filter((_, i) => i !== index);
//     setBenefits(updatedBenefits);
//   };

//   const schedules = [
//     '4 hour shift',
//     '8 hour shift',
//     '10 hour shift',
//     '12 hour shift',
//     'Mon-Fri',
//     'Day shift',
//     'Night shift',
//     'No nights',
//     'Overnight',
//     'On call',
//     'Weekends',
//   ];

//   const [showCompensation, setShowCompensation] = useState(true);
//   // const [benefits, setBenefits] = useState(["sldkf", "sldkf"]);
//   const [loggedInUser, setLoggedInUser] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // const addBenefit = () => {
//   //   setBenefits([...benefits, "New Benefit"]);
//   // };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPayRange((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const toggleSelection = (item, list, setList) => {
//     if (list.includes(item)) {
//       setList(list.filter((i) => i !== item));
//     } else {
//       setList([...list, item]);
//     }
//   };

//   const handleSaveAndNext = () => {

//     if(jobTitle && jobDescription){
//     const jobData = {
//       jobTitle,
//       category,
//       subcategory,
//       locationType,
//       location: { city, state, country },
//       jobDescription,
//       selectedJobTypes,
//       selectedExperienceLevel,
//       selectedSchedules,
//       showCompensation,
//       payRange,
//       benefits,
//     };
    
// console.log(jobData);
//     // Navigate to the next component and pass the jobData
//     navigate('/Aiquestion', { state: { jobData } });
//   }

//   };


//   const jobtoggleSelection = (type) => {
//     setSelectedJobTypes((prevSelected) =>
//       prevSelected.includes(type)
//         ? prevSelected.filter((jobType) => jobType !== type) // Remove if already selected
//         : [...prevSelected, type] // Add if not selected
//     );
//   };

//   const [error, setError] = useState(false);

//   // const handleDescriptionChange = (e) => {
//   //   setJobDescription(e.target.value);
//   //   if (e.target.value.trim()) {
//   //     setError(false);
//   //   }
//   // };

//   useEffect(() => {
//   var user = localStorage.getItem('loggedInUser');
//   console.log('Logged in user:', user);

//   if (user) {
//     setLoggedInUser(user);
//   }
// }, []);

// const FINAL_PROMPT = AI_PROMPTSEC
//   .replace("{role}",jobTitle || "N/A")
//   .replace("{comapany_name}", loggedInUser || "N/A");

//   const handleGenerateDescription = async () => {
//     setIsLoading(true);
//     try {
//       // Placeholder logic for generating a description
//       console.log("Final prompt goes to AI:", FINAL_PROMPT);
  
//       if (jobTitle) {
//         const result = await chatSessionSecond(FINAL_PROMPT);
        
//         const responseText = result;


// const jobDescriptionData = JSON.parse(responseText);

// console.log("Parsed Data:", jobDescriptionData);
  
//         // console.log("Parsed Data:", jobDescriptionData);
//       const formattedDescriptionJSX = (
//         <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
          
//           {/* About the Company */}
//           <p>
//             {/* <strong style={{ fontSize: "20px", display: "block", marginBottom: "10px" }}>About the Company:</strong> */}
//             <span style={{ marginLeft: "20px", display: "block",marginBottom: "15px",marginTop: "10px" }}>
//               {jobDescriptionData.Company || "N/A"}
//             </span>
//           </p>
      
//           {/* Job Description */}

      
//           {/* Responsibilities */}
//           <p>
//             <strong style={{ fontSize: "18px", marginBottom: "5px" }}>Responsibilities:</strong>
//             <ul style={{ marginLeft: "40px", marginTop: "5px" }}>
//               {(jobDescriptionData.Responsibilities || ["No responsibilities listed"]).map(
//                 (item, index) => (
//                   <li key={index} style={{ marginBottom: "8px" }}>{item}</li>
//                 )
//               )}
//             </ul>
//           </p>
      
//           {/* Qualifications */}
//           <p>
//             <strong style={{ fontSize: "18px", marginBottom: "5px" }}>Qualifications:</strong>
//             <ul style={{ marginLeft: "40px", marginTop: "5px" }}>
//               {(jobDescriptionData.Qualifications || ["No qualifications listed"]).map(
//                 (item, index) => (
//                   <li key={index} style={{ marginBottom: "8px" }}>{item}</li>
//                 )
//               )}
//             </ul>
//           </p>
      
//           {/* Benefits */}
//           <p>
//             <strong style={{ fontSize: "18px", marginBottom: "5px" }}>Benefits:</strong>
//             <ul style={{ marginLeft: "40px", marginTop: "5px" }}>
//               {(jobDescriptionData.Benefits || ["No benefits listed"]).map(
//                 (item, index) => (
//                   <li key={index} style={{ marginBottom: "8px" }}>{item}</li>
//                 )
//               )}
//             </ul>
//           </p>
      
//           {/* Requirements */}
//           <p>
//             <strong style={{ fontSize: "18px", marginBottom: "5px" }}>Requirements:</strong>
//             <ul style={{ marginLeft: "40px", marginTop: "5px" }}>
//               {(jobDescriptionData.Requirements || ["No requirements listed"]).map(
//                 (item, index) => (
//                   <li key={index} style={{ marginBottom: "8px" }}>{item}</li>
//                 )
//               )}
//             </ul>
//           </p>
      
//         </div>
//       );


//       const formattedDescriptionString = renderToStaticMarkup(
//         formattedDescriptionJSX
//       );

//       // Set the job description state
//       setJobDescription(formattedDescriptionString);
//     }
//   } catch (error) {
//     console.log("Failed to generate description:", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

//   const handleBlur = () => {
//     if (!jobDescription.trim()) {
//       setError(true);
//     }
//   };
// return (
//   <div className="flex min-h-screen bg-gradient-to-br from-[#a8edea] to-[#fed6e3] font-abel">
//     {/* Sidebar */}
//     <Onavbar />

//     {/* Main Content */}
//     <div className="flex-1 overflow-y-auto">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

//         {/* JOB INFO */}
//         <section className="bg-white/80 backdrop-blur rounded-lg shadow mb-6">
//           <header
//             className="flex justify-between items-center p-4 bg-blue-500 text-white cursor-pointer rounded-t-lg"
//             onClick={() => setJobInfoOpen(!isJobInfoOpen)}
//           >
//             <h2 className="font-bold">Job Information</h2>
//             <span>{isJobInfoOpen ? "▲" : "▼"}</span>
//           </header>

//           {isJobInfoOpen && (
//             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-2">
//                 <label className="font-medium">
//                   Job Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   value={jobTitle}
//                   onChange={(e) => setJobTitle(e.target.value)}
//                   className="w-full mt-1 p-2 border rounded-md"
//                 />
//               </div>

//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="p-2 border rounded-md"
//               >
//                 <option value="">Category</option>
//                 <option value="software">Software</option>
//                 <option value="design">Design</option>
//               </select>

//               <select
//                 value={subcategory}
//                 onChange={(e) => setSubcategory(e.target.value)}
//                 className="p-2 border rounded-md"
//               >
//                 <option value="">Subcategory</option>
//                 <option value="frontend">Frontend</option>
//                 <option value="backend">Backend</option>
//               </select>

//               <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <input
//                   placeholder="City"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   className="p-2 border rounded-md"
//                 />
//                 <input
//                   placeholder="State"
//                   value={state}
//                   onChange={(e) => setState(e.target.value)}
//                   className="p-2 border rounded-md"
//                 />
//                 <input
//                   placeholder="Country"
//                   value={country}
//                   onChange={(e) => setCountry(e.target.value)}
//                   className="p-2 border rounded-md"
//                 />
//               </div>
//             </div>
//           )}
//         </section>

//         {/* JOB DESCRIPTION */}
//         <section className="bg-white/80 backdrop-blur rounded-lg shadow mb-6">
//           <header
//             className="flex justify-between items-center p-4 bg-blue-500 text-white cursor-pointer rounded-t-lg"
//             onClick={() => setJobDescriptionOpen(!isJobDescriptionOpen)}
//           >
//             <h2 className="font-bold">Job Description</h2>
//             <span>{isJobDescriptionOpen ? "▲" : "▼"}</span>
//           </header>

//           {isJobDescriptionOpen && (
//             <div className="p-6 space-y-4">
//               <button
//                 onClick={handleGenerateDescription}
//                 disabled={isLoading}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-md"
//               >
//                 {isLoading ? "Generating..." : "🖉 Generate Description"}
//               </button>

//               <div
//                 contentEditable
//                 onInput={handleContentChange}
//                 dangerouslySetInnerHTML={{ __html: jobDescription }}
//                 className="min-h-[200px] border p-4 rounded-md bg-white overflow-y-auto"
//               />
//             </div>
//           )}
//         </section>

//         {/* COMPENSATION */}
//         <section className="bg-white/80 backdrop-blur rounded-lg shadow mb-6">
//           <header
//             className="flex justify-between items-center p-4 bg-blue-500 text-white cursor-pointer rounded-t-lg"
//             onClick={() => setCompensaion(!isCompensaion)}
//           >
//             <h2 className="font-bold">Compensation</h2>
//             <span>{isCompensaion ? "▲" : "▼"}</span>
//           </header>

//           {isCompensaion && (
//             <div className="p-6 space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <input
//                   name="min"
//                   placeholder="Min Pay"
//                   value={payRange.min}
//                   onChange={handleInputChange}
//                   className="p-2 border rounded-md"
//                 />
//                 <input
//                   name="max"
//                   placeholder="Max Pay"
//                   value={payRange.max}
//                   onChange={handleInputChange}
//                   className="p-2 border rounded-md"
//                 />
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 {benefits.map((b, i) => (
//                   <span
//                     key={i}
//                     className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-2"
//                   >
//                     {b}
//                     <FaTimes onClick={() => handleRemoveBenefit(i)} />
//                   </span>
//                 ))}
//                 <button
//                   onClick={() => setShowModal(true)}
//                   className="border-dashed border px-4 py-1 rounded-full"
//                 >
//                   + Add Benefit
//                 </button>
//               </div>
//             </div>
//           )}
//         </section>

//         {/* ACTIONS */}
//         <div className="flex justify-end gap-3 pb-10">
//           <button className="px-4 py-2 bg-gray-200 rounded-md">
//             Cancel
//           </button>
//           <button
//             onClick={handleSaveAndNext}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md"
//           >
//             Save & Next
//           </button>
//         </div>

//       </div>
//     </div>
//   </div>
// );
// }

// export default Jobpost


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { X, Sparkles, ChevronDown, ChevronUp, Plus, DollarSign, MapPin, Briefcase, FileText, Save } from 'lucide-react';
import { AI_PROMPTSEC } from './constants/options';
import { chatSessionSecond } from "./service/ai/chatSessionSecond.js";
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
  
  // UI State
  const [isJobInfoOpen, setJobInfoOpen] = useState(true);
  const [isJobDescriptionOpen, setJobDescriptionOpen] = useState(true);
  const [isCompensationOpen, setCompensationOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newBenefit, setNewBenefit] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleContentChange = (e) => {
    setJobDescription(e.target.innerHTML);
  };

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
  }, [jobTitle, category, subcategory, locationType, city, state, country, jobDescription, selectedJobTypes, selectedExperienceLevel, selectedSchedules, payRange, benefits]);

  const handleRemoveBenefit = (index) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAndNext = () => {
    if (jobTitle && jobDescription) {
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
        payRange,
        benefits,
      };
      navigate('/Aiquestion', { state: { jobData } });
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const FINAL_PROMPT = AI_PROMPTSEC
    .replace("{role}", jobTitle || "N/A")
    .replace("{comapany_name}", loggedInUser || "N/A");

  const handleGenerateDescription = async () => {
    setIsLoading(true);
    try {
      if (jobTitle) {
        const result = await chatSessionSecond(FINAL_PROMPT);
        const jobDescriptionData = JSON.parse(result);

        const formattedDescriptionJSX = (
          <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", lineHeight: "1.6" }}>
            <p style={{ marginBottom: "15px", marginTop: "10px", color: "#4b5563" }}>
              {jobDescriptionData.Company || "N/A"}
            </p>
            <p>
              <strong style={{ fontSize: "16px", marginBottom: "8px", display: "block", color: "#111827" }}>Responsibilities:</strong>
              <ul style={{ marginLeft: "20px", marginTop: "5px", color: "#4b5563" }}>
                {(jobDescriptionData.Responsibilities || []).map((item, index) => (
                  <li key={index} style={{ marginBottom: "6px" }}>{item}</li>
                ))}
              </ul>
            </p>
            <p>
              <strong style={{ fontSize: "16px", marginBottom: "8px", display: "block", color: "#111827" }}>Qualifications:</strong>
              <ul style={{ marginLeft: "20px", marginTop: "5px", color: "#4b5563" }}>
                {(jobDescriptionData.Qualifications || []).map((item, index) => (
                  <li key={index} style={{ marginBottom: "6px" }}>{item}</li>
                ))}
              </ul>
            </p>
            <p>
              <strong style={{ fontSize: "16px", marginBottom: "8px", display: "block", color: "#111827" }}>Benefits:</strong>
              <ul style={{ marginLeft: "20px", marginTop: "5px", color: "#4b5563" }}>
                {(jobDescriptionData.Benefits || []).map((item, index) => (
                  <li key={index} style={{ marginBottom: "6px" }}>{item}</li>
                ))}
              </ul>
            </p>
            <p>
              <strong style={{ fontSize: "16px", marginBottom: "8px", display: "block", color: "#111827" }}>Requirements:</strong>
              <ul style={{ marginLeft: "20px", marginTop: "5px", color: "#4b5563" }}>
                {(jobDescriptionData.Requirements || []).map((item, index) => (
                  <li key={index} style={{ marginBottom: "6px" }}>{item}</li>
                ))}
              </ul>
            </p>
          </div>
        );

        const formattedDescriptionString = renderToStaticMarkup(formattedDescriptionJSX);
        setJobDescription(formattedDescriptionString);
      }
    } catch (error) {
      console.log("Failed to generate description:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const SectionCard = ({ title, icon: Icon, isOpen, toggle, children }) => (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-green-500 to-lime-500 text-white hover:from-green-600 hover:to-lime-600 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-base sm:text-lg">{title}</h2>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="p-4 sm:p-6">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-lime-50/20">
      <Onavbar />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
              <Sparkles className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Create Job Posting</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Post a New Position
            </h1>
            <p className="text-gray-600 mt-2">Fill in the details to attract the best candidates</p>
          </div>

          <div className="space-y-6">
            {/* Job Information */}
            <SectionCard title="Job Information" icon={Briefcase} isOpen={isJobInfoOpen} toggle={() => setJobInfoOpen(!isJobInfoOpen)}>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-gray-900"
                    >
                      <option value="">Select category</option>
                      <option value="software">Software</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Subcategory</label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-gray-900"
                    >
                      <option value="">Select subcategory</option>
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="fullstack">Full Stack</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                    />
                    <input
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                    />
                    <input
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Job Description */}
            <SectionCard title="Job Description" icon={FileText} isOpen={isJobDescriptionOpen} toggle={() => setJobDescriptionOpen(!isJobDescriptionOpen)}>
              <div className="space-y-4">
                <button
                  onClick={handleGenerateDescription}
                  disabled={isLoading || !jobTitle}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-5 h-5" />
                  {isLoading ? "Generating..." : "Generate with AI"}
                </button>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div
                    contentEditable
                    onInput={handleContentChange}
                    dangerouslySetInnerHTML={{ __html: jobDescription || '<p class="text-gray-400">Click "Generate with AI" or start typing...</p>' }}
                    className="min-h-[300px] max-h-[500px] border-2 border-gray-200 p-4 rounded-xl bg-white overflow-y-auto focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none"
                  />
                </div>
              </div>
            </SectionCard>

            {/* Compensation */}
            <SectionCard title="Compensation & Benefits" icon={DollarSign} isOpen={isCompensationOpen} toggle={() => setCompensationOpen(!isCompensationOpen)}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Salary Range (USD)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      name="min"
                      type="number"
                      placeholder="Minimum"
                      value={payRange.min}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                    />
                    <input
                      name="max"
                      type="number"
                      placeholder="Maximum"
                      value={payRange.max}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Benefits</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {benefits.map((b, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-lime-100 text-green-700 rounded-full text-sm font-medium"
                      >
                        {b}
                        <button
                          onClick={() => handleRemoveBenefit(i)}
                          className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-500 hover:text-green-600 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add Benefit
                  </button>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pb-8">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAndNext}
              disabled={!jobTitle || !jobDescription}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              Save & Continue
            </button>
          </div>
        </div>
      </div>

      {/* Add Benefit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Benefit</h3>
            <input
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              placeholder="e.g., Health Insurance"
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-gray-900 placeholder-gray-400 mb-6"
              onKeyPress={(e) => e.key === 'Enter' && handleAddBenefit()}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBenefit}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobpost;