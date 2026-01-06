import axios from 'axios';

// Create an axios instance with a base URL
const API = axios.create({ baseURL:'http://localhost:8080/api' });

// Add an interceptor to attach the auth token to every request
API.interceptors.request.use((req) => {
    // Retrieve the token from localStorage or any secure storage
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`; // Attach token as Bearer
    }
    return req;
});

// API to create a new job (associated with the logged-in user)
export const createJob = (jobData) => API.post('/jobs', jobData);

// API to fetch all jobs (specific to the logged-in user)
export const fetchJobs = () => API.get('/jobs');

// API to fetch a specific job by ID
export const fetchJobById = (id) => API.get(`/jobs/${id}`);

// API to delete a job (only if it belongs to the logged-in user)
export const deleteJob = (jobId) => API.delete(`/jobs/${jobId}`);

// Optional: Add a login API function to authenticate users
export const loginUser = (userData) => API.post('/auth/login', userData);

// Optional: Add a signup API function to register users
export const signupUser = (userData) => API.post('/auth/signup', userData);
