// import { useLocation, useNavigate } from 'react-router-dom';
// import { deleteJob } from './service/Api'; // Import delete API function
// import Onavbar from './Onavbar';

// const Alljobs = () => { // Provide a default value for jobs
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { plainTextJobDescription, jobTitle,status } = location.state;

//     console.log('Job Description:', plainTextJobDescription);
//     console.log('Job Title:', jobTitle);
//     console.log('Job Status:', status);

//     // Function to copy the job link to the clipboard
//     const handleCopy = (url) => {
//         navigator.clipboard.writeText(url)
//             .then(() => {
//                 alert('Link copied to clipboard!');
//             })
//             .catch((err) => {
//                 console.error('Failed to copy the text: ', err);
//             });
//     };

//     // Function to navigate to the job details page
//     const handleJobClick = (jobId) => {
//         navigate(`/jobs/${jobId}`);
//     };

//     // Function to delete a job
//     const handleDelete = async (jobId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this job?');
//         if (!confirmDelete) return;

//         try {
//             console.log(`Deleting job with ID: ${jobId}`); // Debug log
//             await deleteJob(jobId); // Call the API to delete the job
//             setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId)); // Update the UI
//             alert('Job deleted successfully!');
//         } catch (error) {
//             console.error('Failed to delete job:', error);
//             alert('Error deleting job. Please try again.');
//         }
//     };

//     return (
//         <div className="flex h-screen bg-gray-100">
//             <Onavbar />
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
//                     <thead>
//                         <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                             <th className="py-3 px-6 text-left">Status</th>
//                             <th className="py-3 px-6 text-left">Job Name</th>
//                             <th className="py-3 px-6 text-left">Copy Lint to Job Posting</th>
//                             <th className="py-3 px-6 text-left">Date Published</th>
//                         </tr>
//                     </thead>
//                     <tbody className="text-gray-600 text-sm font-light">
//                         {jobs.map((job) => (
//                             <tr
//                                 key={job._id}
//                                 className="border-b border-gray-200 hover:bg-gray-100"
//                             >
//                                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                                     <span
//                                         className={`px-3 py-1 rounded-full text-xs ${
//                                             job.status === 'Published'
//                                                 ? 'bg-green-100 text-green-500'
//                                                 : 'bg-yellow-100 text-yellow-500'
//                                         }`}
//                                     >
//                                         {job.status}
//                                     </span>
//                                 </td>
//                                 <td
//                                     className="py-3 px-6 text-left cursor-pointer text-blue-500 hover:underline"
//                                     onClick={() => handleJobClick(job._id)} // Navigate to job details
//                                 >
//                                     {job.title}
//                                 </td>
//                                 <td className="py-3 px-6 text-left flex items-center space-x-2">
//                                     <a
//                                         href={`/jobs/${job._id}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-500 hover:underline"
//                                         title="Open Job Details"
//                                     >
//                                         Open
//                                     </a>
//                                     <button
//                                         onClick={() => handleCopy(`${window.location.origin}/jobs/${job._id}`)}
//                                         className="text-gray-500 hover:text-blue-500 focus:outline-none"
//                                         title="Copy Link"
//                                     >
//                                         📋
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(job._id)}
//                                         className="text-red-500 hover:text-red-700 focus:outline-none"
//                                         title="Delete Job"
//                                     >
//                                         🗑️
//                                     </button>
//                                 </td>
//                                 <td className="py-3 px-6 text-left">
//                                     {new Date(job.createdAt).toLocaleDateString()}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Alljobs;



// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { deleteJob } from './service/Api'; // Import delete API function
// import Onavbar from './Onavbar';

// const Alljobs = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { plainTextJobDescription, jobTitle, status, createdAt, jobId } = location.state || {};
//     const [jobs, setJobs] = useState([]); // State to hold the list of jobs
// console.log("Job Title",jobTitle);
// console.log("Job Status",status);

//     // Add new job from location.state to the list of jobs
//     useEffect(() => {
//         if (jobId) {
//             setJobs((prevJobs) => [
//                 ...prevJobs,
//                 { plainTextJobDescription, jobTitle, status, createdAt, jobId },
//             ]);
//         }
//     }, [jobId, plainTextJobDescription, jobTitle, status, createdAt]);

//     // Function to copy the job link to the clipboard
//     const handleCopy = (url) => {
//         navigator.clipboard.writeText(url)
//             .then(() => {
//                 alert('Link copied to clipboard!');
//             })
//             .catch((err) => {
//                 console.error('Failed to copy the text: ', err);
//             });
//     };

//     // Function to navigate to the job details page
//     const handleJobClick = (id) => {
//         navigate(`/jobs/${id}`);
//     };

//     // Function to delete a job
//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this job?');
//         if (!confirmDelete) return;

//         try {
//             console.log(`Deleting job with ID: ${id}`); // Debug log
//             await deleteJob(id); // Call the API to delete the job
//             setJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== id)); // Remove job from the list
//             alert('Job deleted successfully!');
//         } catch (error) {
//             console.error('Failed to delete job:', error);
//             alert('Error deleting job. Please try again.');
//         }
//     };

//     return (
//         <div className="flex h-screen bg-gray-100">
//             <Onavbar />
//             <div className="overflow-x-auto p-4">
//                 <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
//                     <thead>
//                         <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                             <th className="py-3 px-6 text-left">Status</th>
//                             <th className="py-3 px-6 text-left">Job Name</th>
//                             <th className="py-3 px-6 text-left">Copy Link to Job Posting</th>
//                             <th className="py-3 px-6 text-left">Date Published</th>
//                         </tr>
//                     </thead>
//                     <tbody className="text-gray-600 text-sm font-light">
//                         {jobs.map((job) => (
//                             <tr
//                                 key={job.jobId}
//                                 className="border-b border-gray-200 hover:bg-gray-100"
//                             >
//                                 <td className="py-3 px-6 text-left whitespace-nowrap">
//                                     <span
//                                         className={`px-3 py-1 rounded-full text-xs ${
//                                             job.status === 'Published'
//                                                 ? 'bg-green-100 text-green-500'
//                                                 : 'bg-yellow-100 text-yellow-500'
//                                         }`}
//                                     >
//                                         {job.status}
//                                     </span>
//                                 </td>
//                                 <td
//                                     className="py-3 px-6 text-left cursor-pointer text-blue-500 hover:underline"
//                                     onClick={() => handleJobClick(job.jobId)} // Navigate to job details
//                                 >
//                                     {job.jobTitle}
//                                 </td>
//                                 <td className="py-3 px-6 text-left flex items-center space-x-2">
//                                     <a
//                                         href={`/jobs/${job.jobId}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-500 hover:underline"
//                                         title="Open Job Details"
//                                     >
//                                         Open
//                                     </a>
//                                     <button
//                                         onClick={() => handleCopy(`${window.location.origin}/jobs/${job.jobId}`)}
//                                         className="text-gray-500 hover:text-blue-500 focus:outline-none"
//                                         title="Copy Link"
//                                     >
//                                         📋
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(job.jobId)}
//                                         className="text-red-500 hover:text-red-700 focus:outline-none"
//                                         title="Delete Job"
//                                     >
//                                         🗑️
//                                     </button>
//                                 </td>
//                                 <td className="py-3 px-6 text-left">
//                                     {new Date(job.createdAt).toLocaleDateString()}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Alljobs;


// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { deleteJob } from './service/Api'; // Import delete API function
// import Onavbar from './Onavbar';

// const Alljobs = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { plainTextJobDescription, jobTitle, status, createdAt, jobId } = location.state || {};
//     const [jobs, setJobs] = useState(() => {
//         const savedJobs = localStorage.getItem('jobs');
//         return savedJobs ? JSON.parse(savedJobs) : [];
//     });

//     useEffect(() => {
//         if (jobId) {
//             const newJob = { plainTextJobDescription, jobTitle, status, createdAt, jobId };

//             setJobs((prevJobs) => {
//                 if (prevJobs.some((job) => job.jobId === jobId)) return prevJobs;

//                 const updatedJobs = [...prevJobs, newJob];
//                 localStorage.setItem('jobs', JSON.stringify(updatedJobs));
//                 return updatedJobs;
//             });
//         }
//     }, [jobId, plainTextJobDescription, jobTitle, status, createdAt]);

//     const handleCopy = (url) => {
//         navigator.clipboard
//             .writeText(url)
//             .then(() => alert('Link copied to clipboard!'))
//             .catch((err) => console.error('Failed to copy the text: ', err));
//     };

//     const handleJobClick = (id) => navigate(`/jobs/${id}`);

//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this job?')) return;

//         try {
//             await deleteJob(id);
//             setJobs((prevJobs) => {
//                 const updatedJobs = prevJobs.filter((job) => job.jobId !== id);
//                 localStorage.setItem('jobs', JSON.stringify(updatedJobs));
//                 return updatedJobs;
//             });
//             alert('Job deleted successfully!');
//         } catch (error) {
//             console.error('Failed to delete job:', error);
//             alert('Error deleting job. Please try again.');
//         }
//     };

//     return (
//         <div className="flex h-screen bg-gray-100">
//             <Onavbar />
//             <div className="overflow-x-auto p-4">
//                 <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
//                     <thead>
//                         <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                             <th className="py-3 px-6 text-left">Status</th>
//                             <th className="py-3 px-6 text-left">Job Name</th>
//                             <th className="py-3 px-6 text-left">Actions</th>
//                             <th className="py-3 px-6 text-left">Date Published</th>
//                         </tr>
//                     </thead>
//                     <tbody className="text-gray-600 text-sm font-light">
//                         {jobs.map((job) => (
//                             <tr key={job.jobId} className="border-b border-gray-200 hover:bg-gray-100">
//                                 <td className="py-3 px-6">
//                                     <span
//                                         className={`px-3 py-1 rounded-full text-xs ${
//                                             job.status === 'Published'
//                                                 ? 'bg-green-100 text-green-500'
//                                                 : 'bg-yellow-100 text-yellow-500'
//                                         }`}
//                                     >
//                                         {job.status}
//                                     </span>
//                                 </td>
//                                 <td
//                                     className="py-3 px-6 cursor-pointer text-blue-500 hover:underline"
//                                     onClick={() => handleJobClick(job.jobId)}
//                                 >
//                                     {job.jobTitle}
//                                 </td>
//                                 <td className="py-3 px-6 flex items-center space-x-2">
//                                     <a
//                                         href={`/jobs/${job.jobId}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-500 hover:underline"
//                                     >
//                                         Open
//                                     </a>
//                                     <button
//                                         onClick={() => handleCopy(`${window.location.origin}/jobs/${job.jobId}`)}
//                                         className="text-gray-500 hover:text-blue-500"
//                                     >
//                                         📋
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(job.jobId)}
//                                         className="text-red-500 hover:text-red-700"
//                                     >
//                                         🗑️
//                                     </button>
//                                 </td>
//                                 <td className="py-3 px-6">{new Date(job.createdAt).toLocaleDateString()}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Alljobs;


import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteJob, fetchJobs } from './service/Api'; // Import APIs for fetching and deleting jobs
import Onavbar from './Onavbar';

const Alljobs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [jobs, setJobs] = useState([]);

    // Fetch all jobs on component mount
    useEffect(() => {
        const loadJobs = async () => {
            try {
                const response = await fetchJobs(); // Fetch jobs from the backend
                setJobs(response.data); // Assuming backend returns jobs in `response.data`
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
                alert('Error loading jobs. Please try again.');
            }
        };

        loadJobs();
    }, []);

    const handleCopy = (url) => {
        navigator.clipboard
            .writeText(url)
            .then(() => alert('Link copied to clipboard!'))
            .catch((err) => console.error('Failed to copy the text: ', err));
    };

    const handleJobClick = (id) => navigate(`/jobs/${id}`);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;

        try {
            await deleteJob(id); // Delete job through API
            setJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== id));
            alert('Job deleted successfully!');
        } catch (error) {
            console.error('Failed to delete job:', error);
            alert('Error deleting job. Please try again.');
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Onavbar />
            <div className="overflow-x-auto p-4">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-left">Job Name</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                            <th className="py-3 px-6 text-left">Date Published</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {jobs.map((job) => (
                            <tr key={job.jobId} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs ${
                                            job.status === 'Published'
                                                ? 'bg-green-100 text-green-500'
                                                : 'bg-yellow-100 text-yellow-500'
                                        }`}
                                    >
                                        {job.status}
                                    </span>
                                </td>
                                <td
                                    className="py-3 px-6 cursor-pointer text-blue-500 hover:underline"
                                    onClick={() => handleJobClick(job.jobId)}
                                >
                                    {job.jobTitle}
                                </td>
                                <td className="py-3 px-6 flex items-center space-x-2">
                                    <a
                                        href={`/jobs/${job.jobId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Open
                                    </a>
                                    <button
                                        onClick={() => handleCopy(`${window.location.origin}/jobs/${job.jobId}`)}
                                        className="text-gray-500 hover:text-blue-500"
                                    >
                                        📋
                                    </button>
                                    <button
                                        onClick={() => handleDelete(job.jobId)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        🗑️
                                    </button>
                                </td>
                                <td className="py-3 px-6">{new Date(job.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Alljobs;

