// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { deleteJob, fetchJobs } from './service/Api'; // Import APIs for fetching and deleting jobs
// import Onavbar from './Onavbar';
// // import Onavbar from "/src/components/OrganisationComponents/Onavbar.jsx";  // ✅

// const Alljobs = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [jobs, setJobs] = useState([]); // State for storing jobs of the user
//     const [loading, setLoading] = useState(true); // To handle loading state
//     const [userId, setUserId] = useState(null);

//     // Function to fetch user ID
//     const fetchUserId = async () => {
//         const token = localStorage.getItem('token');
//         console.log("Token", token);
//         try {
//             const response = await fetch('http://localhost:8080/jobs/api/user-id', {
//                 method: 'POST',
//                 headers: {
//                     'authorization': `${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                 },
//                 body: JSON.stringify({ token }) // Send token in request body
//             });

//             console.log("Response Status:", response.status);

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Error: ${response.status} - ${errorText}`);
//             }

//             const contentType = response.headers.get('content-type');
//             if (!contentType || !contentType.includes('application/json')) {
//                 throw new Error('Invalid response format: Not JSON');
//             }

//             const data = await response.json();
//             console.log("User Data:", data);
//             console.log('User ID:', data.userId);
//             return data.userId;
//         } catch (error) {
//             console.error('Error fetching user ID:', error.message);
//             return null;
//         }
//     };

//     // Fetch all jobs for the user
//     const fetchJobs = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 console.error("No authentication token found");
//                 return [];
//             }

//             const response = await fetch("http://localhost:8080/jobs/api/all-jobs", {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`, // Sending token in Authorization header
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch jobs: ${response.statusText}`);
//             }

//             const data = await response.json();
//             return data; // Assuming backend returns all jobs in an array
//         } catch (error) {
//             console.error("Failed to fetch jobs:", error);
//             return []; // Returning an empty array on failure
//         }
//     };

//     // Fetch user ID and filter jobs on component mount
//     useEffect(() => {
//         const loadUserAndJobs = async () => {
//             const fetchedUserId = await fetchUserId(); // Fetch user ID

//             if (!fetchedUserId) {
//                 console.log("User ID not found.");
//                 setLoading(false);
//                 return;
//             }
//             setUserId(fetchedUserId); 

//             const allJobs = await fetchJobs(); // Fetch all jobs
//             if (allJobs.length > 0) {
//                 // Filter jobs based on the userId
//                 const userJobs = allJobs.filter((job) => job.userId === fetchedUserId);
//                 setJobs(userJobs); // Store only the user's jobs in state
//                 console.log("Filtered Jobs for User:", fetchedUserId, userJobs);
//             }
//             setLoading(false);
//         };

//         loadUserAndJobs();
//     }, []);

//     const handleCopy = async (url) => {
//         navigator.clipboard
//             .writeText(url)
//             .then(() => alert('Link copied to clipboard!'))
//             .catch((err) => console.error('Failed to copy the text: ', err));
//     };

//     const handleJobClick = (_id) => navigate(`/jobs/${_id}?companyId=${userId}`);


//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this job?')) return;
    
//         try {
//             // Get the token from local storage or wherever it's stored
//             const token = localStorage.getItem('token'); // Adjust according to where you store the token
    
//             // Check if token exists
//             if (!token) {
//                 alert('You need to be logged in to delete a job.');
//                 return;
//             }
    
//             // Send the DELETE request with Authorization header
//             const response = await fetch(`http://localhost:8080/jobs/api/delete-job/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,  // Sending token in Authorization header
//                     'Content-Type': 'application/json',
//                 },
//             });
    
//             if (!response.ok) {
//                 throw new Error(`Failed to delete job: ${response.statusText}`);
//             }
    
//             // If the delete is successful, update the state to reflect the removal
//             setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id)); // Use _id instead of jobId
//             alert('Job deleted successfully!');
//         } catch (error) {
//             console.error('Failed to delete job:', error);
//             alert('Error deleting job. Please try again.');
//         }
//     };
    

//     //Return loading message or the list of jobs
//     if (loading) {
//         return <div>Loading...</div>;
//     }


//     return (
//         <div className="flex h-screen bg-gray-100 mt-12">
//             <Onavbar />
//             <div className="overflow-x-auto p-4">
//                 <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
//                     <thead>
//                         <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                             <th className="py-3 px-6 text-left">Status</th>
//                             <th className="py-3 px-6 text-left">Job Name</th>
//                             <th className="py-3 px-6 text-left">Actions</th>
//                             <th className="py-3 px-6 text-left">Creation Date</th>
//                             <th className="py-3 px-6 text-left">Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody className="text-gray-600 text-sm font-light w-full">
//                         {jobs.map((job) => (
//                             <tr key={job._id} className="border-b border-gray-200 hover:bg-gray-100">
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
//                                     onClick={() => handleJobClick(job._id)}
//                                 >
//                                     {job.jobTitle}
//                                 </td>
//                                 <td className="py-3 px-6 flex items-center space-x-2">
//                                     <a
//                                         href={`/jobs/${job._id}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-500 hover:underline"
//                                     >
//                                         Open
//                                     </a>
//                                     <button
//                                         onClick={() => handleCopy(`${window.location.origin}/jobs/${job._id}`)}
//                                         className="text-gray-500 hover:text-blue-500"
//                                     >
//                                         📋
//                                     </button>
//                                     {/* <button
//                                         onClick={() => handleDelete(job._id)}  // Use job._id here
//                                         className="text-red-500 hover:text-red-700"
//                                     >
//                                         🗑️
//                                     </button> */}
//                                 </td>
//                                 <td className="py-3 px-6">{new Date(job.createdAt).toLocaleDateString()}</td>

//                                 <td className="py-3 px-6 flex items-center space-x-2">
//                                 <button
//                                         onClick={() => handleDelete(job._id)}  // Use job._id here
//                                         className="text-red-500 hover:text-red-700"
//                                     >
//                                         🗑️
//                                     </button>
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





import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, ExternalLink, Copy, Trash2, Plus, Search, Filter, Calendar, CheckCircle, Clock, Eye } from 'lucide-react';
import Onavbar from './Onavbar';

const Alljobs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const fetchUserId = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8080/jobs/api/user-id', {
                method: 'POST',
                headers: {
                    'authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ token })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response format: Not JSON');
            }

            const data = await response.json();
            return data.userId;
        } catch (error) {
            console.error('Error fetching user ID:', error.message);
            return null;
        }
    };

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
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch jobs: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
            return [];
        }
    };

    useEffect(() => {
        const loadUserAndJobs = async () => {
            const fetchedUserId = await fetchUserId();

            if (!fetchedUserId) {
                setLoading(false);
                return;
            }
            setUserId(fetchedUserId);

            const allJobs = await fetchJobs();
            if (allJobs.length > 0) {
                const userJobs = allJobs.filter((job) => job.userId === fetchedUserId);
                setJobs(userJobs);
            }
            setLoading(false);
        };

        loadUserAndJobs();
    }, []);

    const handleCopy = async (url) => {
        navigator.clipboard
            .writeText(url)
            .then(() => alert('Link copied to clipboard!'))
            .catch((err) => console.error('Failed to copy the text: ', err));
    };
    console.log("user id , company id",userId)
    const handleJobClick = (_id) => navigate(`/jobs/${_id}?companyId=${userId}`);
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('You need to be logged in to delete a job.');
                return;
            }

            const response = await fetch(`http://localhost:8080/jobs/api/delete-job/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete job: ${response.statusText}`);
            }

            setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
            alert('Job deleted successfully!');
        } catch (error) {
            console.error('Failed to delete job:', error);
            alert('Error deleting job. Please try again.');
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || job.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading your jobs...</p>
                </div>
            </div>
        );
    }

    return (
        // <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="flex min-h-screen bg-gray-100">

            <Onavbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-0">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-lime-100 rounded-xl flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Total Jobs</p>
                                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-lime-100 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Published</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {jobs.filter(j => j.status === 'Published').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Draft</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {jobs.filter(j => j.status !== 'Published').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                            >
                                <option value="all">All Status</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Jobs List - Desktop Table View */}
                <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Job Title
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredJobs.map((job) => (
                                    <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                                                job.status === 'Published'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {job.status === 'Published' ? (
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                ) : (
                                                    <Clock className="w-3.5 h-3.5" />
                                                )}
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleJobClick(job._id)}
                                                className="text-gray-900 font-medium hover:text-green-600 transition-colors text-left"
                                            >
                                                {job.jobTitle}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(job.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleJobClick(job._id)}
                                                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="View Job"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <a
                                                    href={`/jobs/${job._id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Open in New Tab"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                                <button
                                                    onClick={() => handleCopy(`${window.location.origin}/jobs/${job._id}?companyId=${userId}`)}
                                                    className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                    title="Copy Link"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(job._id)}
                                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Job"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Jobs List - Mobile Card View */}
                <div className="lg:hidden space-y-4">
                    {filteredJobs.map((job) => (
                        <div key={job._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <button
                                        onClick={() => handleJobClick(job._id)}
                                        className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors text-left mb-2"
                                    >
                                        {job.jobTitle}
                                    </button>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(job.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </div>
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                                    job.status === 'Published'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {job.status === 'Published' ? (
                                        <CheckCircle className="w-3.5 h-3.5" />
                                    ) : (
                                        <Clock className="w-3.5 h-3.5" />
                                    )}
                                    {job.status}
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleJobClick(job._id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm"
                                >
                                    <Eye className="w-4 h-4" />
                                    View
                                </button>
                                <a
                                    href={`/jobs/${job._id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                <button
                                    onClick={() => handleCopy(`${window.location.origin}/jobs/${job._id}`)}
                                    className="flex items-center justify-center p-2.5 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(job._id)}
                                    className="flex items-center justify-center p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredJobs.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm || filterStatus !== 'all' 
                                ? 'Try adjusting your filters or search term'
                                : 'Get started by posting your first job'}
                        </p>
                        {!searchTerm && filterStatus === 'all' && (
                            <button 
                                onClick={() => navigate('/post-job')}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-lime-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                            >
                                <Plus className="w-5 h-5" />
                                Post Your First Job
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alljobs;