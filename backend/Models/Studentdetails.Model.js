// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const StudentDetailsSchema = new Schema({
//     phoneNumber: {
//         type: Number, // Changed to Number for better validation
//         required: true,
//         min: 0, // Ensures the number is non-negative
//     },
//     studentName: {
//         type: String,
//         required: true,
//         trim: true, // Removes leading and trailing spaces
//     },
//     adharNumber:{
//         type:Number,
//         required:true,
//     },
    
// }, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

// const Student = mongoose.model("Student", StudentDetailsSchema);
// module.exports = Student; // Export the model



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentDetailsSchema = new Schema({
    phoneNumber: {
        type: Number,
        required: true,
        min: 0,
    },
    studentName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    adharNumber: {
        type: Number,
        required: true,
    },
    otp: {
        type: String, // keep as String to preserve leading zeros
        required: false,
    },
    resumeUrl: {
        type: String,
        required: false,
        trim: true,
    },
}, { timestamps: true });

const Student = mongoose.model("Student", StudentDetailsSchema);
module.exports = Student;
