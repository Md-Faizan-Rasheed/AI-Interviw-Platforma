import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetails = () => {
    const { id } = useParams(); // Extract the job ID from the URL
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/jobs/${id}`);
                setJob(response.data);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };
        fetchJobDetails();
    }, [id]);

    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
            <p className="text-gray-600 mt-4">{job.description}</p>
            <button
                onClick={() => alert('Starting interview...')} // Replace with interview functionality
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
                Start Interview
            </button>
        </div>
    );
};

export default JobDetails;
