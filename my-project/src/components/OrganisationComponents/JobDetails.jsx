import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams(); // Get Job ID from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  if (!job) return <div className="text-center mt-5">Job not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800">
      {job.jobTitle.charAt(0).toUpperCase() + job.jobTitle.slice(1)}
      </h1>

      {/* Job Description (Safe HTML rendering) */}
      {job.plainTextJobDescription ? (
        <div
          dangerouslySetInnerHTML={{ __html: job.plainTextJobDescription }}
          className="w-full border p-3 bg-white text-gray-800 outline-none"
          style={{
            minHeight: "150px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        />
      ) : (
        <p className="text-gray-600 mt-4">No job description available.</p>
      )}

      {/* Job Details (Uncomment if needed) */}
      {/* <p className="text-gray-700 mt-2"><strong>Location:</strong> {job.location}</p> */}
      {/* <p className="text-gray-700 mt-2"><strong>Salary:</strong> {job.salary}</p> */}

      {/* Start Interview Button */}
      <button
        onClick={() => alert("Starting interview...")} // Add actual functionality
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Start Interview
      </button>
    </div>
  );
};

export default JobDetails;
