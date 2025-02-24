
const express = require('express');
const router = express.Router();
const Job = require('../Models/Job');
const ensureAuthenticated = require('../Middlewares/Auth');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const User = require('../Models/User.Models'); // ✅ Import User model
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');


const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware for validation error handling
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Add a new job
router.post('/add',async (req, res) => {
    const { jobTitle, status, plainTextJobDescription, questions, userId } = req.body;


    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }
    if (!jobTitle || !status || !plainTextJobDescription) {
        return res.status(400).json({ error: "Missing required fields (jobTitle, status, plainTextJobDescription)." });
    }
    if (!Array.isArray(questions) || questions.some(q => !q.questionText)) {
        return res.status(400).json({ error: "Each question must have a 'questionText' property." });
    }

        try {
            const newJob = new Job({
                jobTitle,
                status,
                plainTextJobDescription,
                questions,
                userId,
                createdAt: new Date()
            });

            await newJob.save();
            res.status(201).json({ message: 'Job created successfully!', job: newJob });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message || 'Error adding job' });
        }
    }
);


// Generate a unique link for a job
router.post(
    '/api/jobs/generate-link',
    ensureAuthenticated,
    [body('jobDescription').notEmpty().withMessage('Job description is required')],
    validateRequest,
    async (req, res) => {
        const { jobDescription } = req.body;
        const userId = req.userId;

        try {
            const uniqueId = uuidv4();
            const newJob = new Job({
                jobTitle: `Generated Job - ${uniqueId}`,
                status: 'Active',
                plainTextJobDescription: jobDescription,
                userId,
            });

            await newJob.save();
            res.status(201).json({
                message: 'Job link generated successfully!',
                link: `${FRONTEND_URL}/jobs/${uniqueId}`,
                job: newJob,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message || 'Error generating job link' });
        }
    }
);


// Get all jobs for a logged-in user
router.get('/api/all-jobs', ensureAuthenticated, async (req, res) => {
    const userId = req.userId;
    try {
        const jobs = await Job.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Error fetching jobs' });
    }
});


router.post('/api/user-id', async (req, res) => {
    // const token = localStorage.getItem('token');
    // console.log("BackedToken",token)
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
console.log("Backendtoken",token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded User:", decoded);

        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ userId: user._id });
    } catch (error) {
        console.error("Error in /jobs/api/user-id:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Route for deleting a job
router.delete('/api/delete-job/:id', ensureAuthenticated, async (req, res) => {
    const { id } = req.params;  // Get the job ID from the URL parameter
console.log("Backend Side job Id",id)
    try {
        // Find the job by ID and delete it
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Optionally check if the user owns the job (if userId is stored in job)
        if (job.userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this job' });
        }

        await Job.findByIdAndDelete(id);  // Delete the job from the database

        return res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting job', error: error.message });
    }
});

// get user details
router.get('/api/users/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user data" });
    }
  });


//   Update User Details 
 router.put('/api/users/:userId', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user data" });
    }
  });

// Reset Passsword api
router.post("/api/reset-password", async (req, res) => {
    const { email , resetToken} = req.body;
  
    // Simulated check if the email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }
    // Generate a reset token (In production, store it in DB)
    // const resetToken = Math.random().toString(36).substr(2);
  
    // Send reset link via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: "mdfaizanrasheed123@gmail.com", pass: "lmrr kqvl vsux rwbm" },
    });
  
    const mailOptions = {
        from: "mdfaizanrasheed123@gmail.com",
        to: email,
        subject: "Password Reset Request",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      width: 100%;
                      max-width: 600px;
                      margin: 20px auto;
                      background: #ffffff;
                      border-radius: 10px;
                      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                      overflow: hidden;
                  }
                  .header {
                      background: linear-gradient(90deg, #003366, #006699);
                      padding: 20px;
                      text-align: center;
                  }
                  .header h1 {
                      color: #fff;
                      margin: 0;
                      font-size: 24px;
                  }
                  .content {
                      padding: 20px;
                      text-align: center;
                      color: #333;
                  }
                  .content h2 {
                      margin: 0;
                      font-size: 22px;
                  }
                  .content p {
                      font-size: 16px;
                      line-height: 1.5;
                  }
                  .button {
                      display: inline-block;
                      padding: 12px 24px;
                      margin: 20px auto;
                      font-size: 18px;
                      color: #ffffff;
                      background: #005A9E;
                      text-decoration: none;
                      border-radius: 8px;
                      transition: background 0.3s ease;
                  }
                a{
                color: #fff;
                }
                  .button:hover {
                      background: #00457c;
                  }
                  .footer {
                      padding: 15px;
                      text-align: center;
                      font-size: 14px;
                      color: #777;
                      background-color: #f4f4f4;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1>Password Reset Request</h1>
                  </div>
                  <div class="content">
                      <h2>Hello,</h2>
                      <p>Someone has requested a link to change your password. Click the button below to reset your password.</p>
                      <a href="http://localhost:5173/reset-password/${resetToken}" class="button">Reset My Password</a>
                      <p>If you didn’t request this, please ignore this email.</p>
                      <p>Your password won’t change until you access the link above and create a new one.</p>
                  </div>
                  <div class="footer">
                      &copy; 2025 Your Company. All rights reserved.
                  </div>
              </div>
          </body>
          </html>
        `
      };
      
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).json({ message: "Error sending email" });
      res.json({ message: "Reset link sent! Check your email." });
    });
  });


//   Update Password in DB api
router.post("/api/update-password", async (req, res) => {
    const SECRET_KEY = process.env.JWT_SECRET; // Use environment variables in production
    try {
      const { resetToken, password } = req.body;
  
      if (!resetToken || !password) {
        return res.status(400).json({ message: "Invalid request" });
      }
  console.log("SECRETE KEY",SECRET_KEY)
      // Verify the token
      let decoded;
      try {
        decoded = jwt.verify(resetToken, SECRET_KEY);
      } catch (error) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
  
      // Find user by ID from token
      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Update user's password
      user.password = hashedPassword;
      await user.save();
  
      return res.json({ message: "Password updated successfully!" });
    } catch (error) {
      console.error("Error updating password:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

//   for Preserving after Refresh 
// router.get('/refresh-token', (req, res) => {
//     const token = req.cookies.token;
//     console.log("Headers:", req.headers);
//     console.log("Cookies received:", req.cookies); // Debugging line
//     if (!token) return res.status(401).json({ message: "Not authenticated" });

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ message: "Token expired" });

//         const newToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.cookie("token", newToken, {
//             httpOnly: true,
//             secure: true,
//             sameSite: "Strict",
//         });

//         res.json({ message: "Token refreshed", user });
//     });
// });

// router.get('/refresh-token', (req, res) => {
//     const token = req.cookies.token; // Ensure cookies are sent properly
//     console.log("Headers:", req.headers);
//     console.log("Cookies received at bd:", req.cookies);

//     if (!token) return res.status(401).json({ message: "Not authenticated" });

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) return res.status(403).json({ message: "Token expired" });

//         const newToken = jwt.sign({ id: decoded.id, username: decoded.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.cookie("token", newToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//             sameSite: "Strict",
//         });

//         res.json({ message: "Token refreshed", user: { id: decoded.id, username: decoded.username } });
//     });
// });

// Fetch job details by ID
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id); // Find job by ID
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
