import { useEffect, useState } from 'react';
import Onavbar from './Onavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PreviewAndPublish = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [jobPostData, setJobPostData] = useState(null);
  const [formattedQuestionsData, setFormattedQuestionsData] = useState(null);


  const navigate = useNavigate();
  const location = useLocation();
  const dataforAi = location.state?.jobData;
  const dataforquestion = location.state?.formattedQuestions || []; // Default to empty array
  const { formattedQuestions } = location.state || {};

  // const parsedData = dataforAi ? JSON.parse(dataforAi) : {};
  const parsedData = dataforAi || {};

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    console.log('Logged in user:', user);

    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  console.log('Data on Preview and Publish:', parsedData);

  const handlenavigateAi = () => {
    navigate('/Aiquestion', {
      state: {dataforAi, formattedQuestions },
    });
  };

  const handlenavigateJobinfo=()=>{
    navigate('/jobpost', {
      state: {dataforAi}
    });
  }
  const fetchUserId = async () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    try {
      const response = await fetch('http://localhost:8080/jobs/api/user-id', {
        method: 'POST',
        headers: {
          authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ token }), // Send token in request body
      });

      console.log('Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format: Not JSON');
      }

      const data = await response.json();
      console.log('User Data:', data);

      console.log('User ID:', data.userId);
      return data.userId;
    } catch (error) {
      console.error('Error fetching user ID:', error.message);
      return null;
    }
  };

  const questionsArray = dataforquestion.map(({ question }) => ({
    questionText: question,
  }));
  console.log('Questions Array:', questionsArray);

  const handleSubmit = async (status) => {
    const userId = await fetchUserId();
    if (!userId) {
      console.error('User ID not found, cannot proceed.');
      return;
    }

    const jobData = {
      jobTitle: parsedData.jobTitle,
      status,
      plainTextJobDescription: parsedData.jobDescription,
      questions: questionsArray,
      createdAt: new Date().toISOString(),
      userId,
    };

    console.log('Job Data:', jobData);

    try {
      const response = await fetch('http://localhost:8080/jobs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(jobData),
      });

      const result = await response.json();
      console.log('Server Response:', result);

      if (!response.ok) {
        toast.error(result.error);
        console.error('Error:', result.error);
      } else {
        localStorage.removeItem("aiQuestions");
        localStorage.removeItem("jobPostData");
        toast.success("Job successfully created!");
        navigate('/alljobs');
      }
    } catch (error) {
      console.error('Request failed:', error);
      toast.error('An error occurred. Please try again.');

    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Navbar */}
      <Onavbar />

      {/* Main Content */}
      <div className="flex-grow min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Interview Questions ✨
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Section: Interview Questions */}
            <div className="col-span-2">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
                  Interview Questions
                </h2>
                <ul>
                  {dataforquestion.map((item, index) => (
                    <li key={item.id} className="border-b py-3 space-y-1 md:space-y-0">
                      <span
                        className={`${
                          item.category === 'CultureFit'
                            ? 'text-blue-600'
                            : item.category === 'SoftSkills'
                            ? 'text-purple-600'
                            : item.category === 'TechnicalSkills'
                            ? 'text-green-600'
                            : item.category === 'XFactor'
                            ? 'text-yellow-600'
                            : 'text-gray-600'
                        } font-medium`}
                      >
                        {item.category}
                      </span>
                      <p className="mt-1 text-gray-600">{item.question}</p>
                    </li>
                  ))}
                </ul>

                <div
                  onClick={handlenavigateAi}
                  className="mt-4 font-bold cursor-pointer border-black p-2 w-full flex justify-center align-middle border-dotted border-2"
                >
                  🖉 Edit AI Questions
                </div>
              </div>
            </div>

            {/* Right Section: Job Information */}
            <div className="lg:col-span-1 bg-white shadow-md rounded-lg border border-gray-200 p-6 space-y-4">
              {/* Header with logo and title */}
              <div className="flex items-center space-x-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Company Logo"
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {parsedData.jobTitle || 'Job Title'}
                  </h3>
                  <p className="text-sm text-gray-500">{loggedInUser}</p>
                </div>
              </div>

              {/* Job Information */}
              <div className="space-y-3">
                <h4 className="text-md font-medium text-gray-700">Job Information</h4>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Job Title:</span> {parsedData.jobTitle}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Job Organization:</span> {loggedInUser}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Job Category:</span> {parsedData.category}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Job SubCategory:</span> {parsedData.subcategory}
                </p>
              </div>

              {/* Job Description */}
              <div className="space-y-3">
                <h4 className="text-md font-medium text-gray-700">Job Description</h4>
                <p className="text-sm text-gray-600">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: parsedData.jobDescription
                        ? parsedData.jobDescription.split(/\s+/).slice(0, 30).join(' ') + '...'
                        : 'No job description available.',
                    }}
                  ></div>
                </p>
              </div>

              {/* Additional Details */}
              <div className="space-y-3">
                <h4 className="text-md font-medium text-gray-700">Additional Details</h4>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Job Type:</span>{' '}
                  {parsedData.selectedJobTypes?.join(', ') || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Experience Level:</span>{' '}
                  {parsedData.selectedExperienceLevel}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Schedule:</span>{' '}
                  {parsedData.selectedSchedules?.join(', ') || 'N/A'}
                </p>
              </div>

              {/* Compensation */}
              <div className="space-y-3">
                <h4 className="text-md font-medium text-gray-700">Compensation</h4>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Display Compensation:</span>{' '}
                  {parsedData.showCompensation ? 'Yes' : 'No'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Pay:</span> {parsedData.payRange?.min || 'N/A'} -{' '}
                  {parsedData.payRange?.max || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Benefits:</span>{' '}
                  {parsedData.benefits?.join(', ') || 'N/A'}
                </p>
              </div>
              <div className="mt-4 font-bold cursor-pointer border-black p-2 w-full flex justify-center align-middle border-dotted border-2"
               onClick={handlenavigateJobinfo}
              >
                🖉 Edit Job Information
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
          <button className="invisible">Hidden Element</button>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex gap-2">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={() => handleSubmit('Drafted')}
              >
                Save Job
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                onClick={() => handleSubmit('Published')}
              >
                Publish Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewAndPublish;