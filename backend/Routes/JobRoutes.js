// const express = require('express');
// const router = express.Router();
// const Job = require('../Models/Job');
// const ensureAuthenticated = require('../middleware/ensureAuthenticated'); // Import the middleware

// // Add a new job
// router.post('/api/jobs/add', ensureAuthenticated, async (req, res) => {
//     const { jobTitle, status, plainTextJobDescription } = req.body;
//     const userId = req.userId; // UserId from the token

//     try {
//         const newJob = new Job({
//             jobTitle,
//             status,
//             plainTextJobDescription,
//             userId // Save userId to associate job with the user
//         });

//         await newJob.save();
//         res.status(201).json({ message: 'Job created successfully!' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error adding job' });
//     }
// });

// // Get all jobs for a logged-in user
// router.get('/my-jobs', ensureAuthenticated, async (req, res) => {
//     const userId = req.userId; // Get the userId from the request

//     try {
//         const jobs = await Job.find({ userId }).sort({ createdAt: -1 }); // Fetch only the user's jobs
//         res.status(200).json(jobs);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching jobs' });
//     }
// });

// module.exports = router;


// Routes/JobRoutes.js
const express = require('express');
const router = express.Router();
const Job = require('../Models/Job');
const ensureAuthenticated = require('../Middlewares/Auth');

// Add a new job
router.post('/add', ensureAuthenticated, async (req, res) => {
    const { jobTitle, status, plainTextJobDescription } = req.body;
    const userId = req.userId;

    try {
        const newJob = new Job({
            jobTitle,
            status,
            plainTextJobDescription,
            userId
        });

        await newJob.save();
        res.status(201).json({ message: 'Job created successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding job' });
    }
});

// Generate a unique link for a job
router.post('/api/jobs/generate-link', ensureAuthenticated, async (req, res) => {
    const { jobDescription } = req.body;
    const userId = req.userId; // Get user ID from the authenticated request

    try {
        const uniqueId = uuidv4(); // Generate a unique ID
        const newJob = new Job({
            jobTitle: `Job Link: ${uniqueId}`,
            status: 'Active',
            plainTextJobDescription: jobDescription,
            userId,
        });

        await newJob.save();
        res.status(201).json({ link: `http://localhost:5173/${uniqueId}` });
    } catch (error) {
        res.status(500).json({ error: 'Error generating job link' });
    }
});

// Get all jobs for a logged-in user
router.get('/my-jobs', ensureAuthenticated, async (req, res) => {
    const userId = req.userId;

    try {
        const jobs = await Job.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching jobs' });
    }
});

module.exports = router;