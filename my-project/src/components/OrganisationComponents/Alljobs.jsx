import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteJob, fetchJobs } from './service/Api'; // Import APIs for fetching and deleting jobs
import Onavbar from './Onavbar';
// import Onavbar from "/src/components/OrganisationComponents/Onavbar.jsx";  // ✅

const Alljobs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [jobs, setJobs] = useState([]); // State for storing jobs of the user
    const [loading, setLoading] = useState(true); // To handle loading state

    // Function to fetch user ID
    const fetchUserId = async () => {
        const token = localStorage.getItem('token');
        console.log("Token", token);
        try {
            const response = await fetch('http://localhost:8080/jobs/api/user-id', {
                method: 'POST',
                headers: {
                    'authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ token }) // Send token in request body
            });

            console.log("Response Status:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response format: Not JSON');
            }

            const data = await response.json();
            console.log("User Data:", data);
            console.log('User ID:', data.userId);
            return data.userId;
        } catch (error) {
            console.error('Error fetching user ID:', error.message);
            return null;
        }
    };

    // Fetch all jobs for the user
    const fetchJobs = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No authentication token found");
                return [];
            }

            const response = await fetch("http://localhost:8080/jobs/api/all-jobs", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Sending token in Authorization header
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch jobs: ${response.statusText}`);
            }

            const data = await response.json();
            return data; // Assuming backend returns all jobs in an array
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
            return []; // Returning an empty array on failure
        }
    };

    // Fetch user ID and filter jobs on component mount
    useEffect(() => {
        const loadUserAndJobs = async () => {
            const fetchedUserId = await fetchUserId(); // Fetch user ID

            if (!fetchedUserId) {
                console.log("User ID not found.");
                setLoading(false);
                return;
            }

            const allJobs = await fetchJobs(); // Fetch all jobs
            if (allJobs.length > 0) {
                // Filter jobs based on the userId
                const userJobs = allJobs.filter((job) => job.userId === fetchedUserId);
                setJobs(userJobs); // Store only the user's jobs in state
                console.log("Filtered Jobs for User:", fetchedUserId, userJobs);
            }
            setLoading(false);
        };

        loadUserAndJobs();
    }, []);

    const handleCopy = (url) => {
        navigator.clipboard
            .writeText(url)
            .then(() => alert('Link copied to clipboard!'))
            .catch((err) => console.error('Failed to copy the text: ', err));
    };

    const handleJobClick = (_id) => navigate(`/jobs/${_id}`);


    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;
    
        try {
            // Get the token from local storage or wherever it's stored
            const token = localStorage.getItem('token'); // Adjust according to where you store the token
    
            // Check if token exists
            if (!token) {
                alert('You need to be logged in to delete a job.');
                return;
            }
    
            // Send the DELETE request with Authorization header
            const response = await fetch(`http://localhost:8080/jobs/api/delete-job/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Sending token in Authorization header
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`Failed to delete job: ${response.statusText}`);
            }
    
            // If the delete is successful, update the state to reflect the removal
            setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id)); // Use _id instead of jobId
            alert('Job deleted successfully!');
        } catch (error) {
            console.error('Failed to delete job:', error);
            alert('Error deleting job. Please try again.');
        }
    };
    

    //Return loading message or the list of jobs
    if (loading) {
        return <div>Loading...</div>;
    }


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
                            <th className="py-3 px-6 text-left">Creation Date</th>
                            <th className="py-3 px-6 text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light w-full">
                        {jobs.map((job) => (
                            <tr key={job._id} className="border-b border-gray-200 hover:bg-gray-100">
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
                                    onClick={() => handleJobClick(job._id)}
                                >
                                    {job.jobTitle}
                                </td>
                                <td className="py-3 px-6 flex items-center space-x-2">
                                    <a
                                        href={`/jobs/${job._id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Open
                                    </a>
                                    <button
                                        onClick={() => handleCopy(`${window.location.origin}/jobs/${job._id}`)}
                                        className="text-gray-500 hover:text-blue-500"
                                    >
                                        📋
                                    </button>
                                    {/* <button
                                        onClick={() => handleDelete(job._id)}  // Use job._id here
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        🗑️
                                    </button> */}
                                </td>
                                <td className="py-3 px-6">{new Date(job.createdAt).toLocaleDateString()}</td>

                                <td className="py-3 px-6 flex items-center space-x-2">
                                <button
                                        onClick={() => handleDelete(job._id)}  // Use job._id here
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Alljobs;




