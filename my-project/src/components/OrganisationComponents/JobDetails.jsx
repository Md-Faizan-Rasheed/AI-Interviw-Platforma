import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams , useLocation } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get Job ID from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get('companyId');

  const saveandnext = () => {
    const jobid = id;
    console.log("ComapnyId",companyId)
    navigate(`/studentinfo/${jobid}?companyId=${companyId}`);
  };

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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
        </div>
      </div>
    );

  if (!job)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xl font-semibold text-gray-700">Job not found</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          {/* Title Section with Accent */}
          <div className=" bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {job.jobTitle.charAt(0).toUpperCase() + job.jobTitle.slice(1)}
            </h1>
          </div>

          {/* Content Section */}
          <div className="px-8 py-8">
            {/* Job Description Label */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Job Description
              </h2>
              <div className="h-1 w-16 bg-green-600 rounded-full"></div>
            </div>

            {/* Job Description Content */}
            {job.plainTextJobDescription ? (
              <div
                dangerouslySetInnerHTML={{ __html: job.plainTextJobDescription }}
                className="prose prose-slate max-w-none bg-gray-50 border border-gray-200 rounded-xl p-6 text-gray-700 leading-relaxed"
                style={{
                  minHeight: "200px",
                }}
              />
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-300 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-500 font-medium">
                  No job description available.
                </p>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={saveandnext}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white  bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <span>Start Interview</span>
                <svg
                  className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Optional: Footer Info Card */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl px-6 py-4 text-center">
          <p className="text-sm text-gray-600">
            Ready to begin? Click <span className="font-semibold text-green-600">"Start Interview"</span> when you're prepared.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;