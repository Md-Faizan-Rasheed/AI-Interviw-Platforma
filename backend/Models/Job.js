
// // models/Job.js
// const mongoose = require('mongoose');

// const jobSchema = new mongoose.Schema({
//     jobTitle: { type: String, required: true },
//     status: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     plainTextJobDescription: { type: String, required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link job to user
// });

// module.exports = mongoose.model('Job', jobSchema);

// Models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    plainTextJobDescription: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Job', jobSchema);
