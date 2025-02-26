const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentDetailsSchema = new Schema({
    phoneNumber: {
        type: Number, // Changed to Number for better validation
        required: true,
        min: 0, // Ensures the number is non-negative
    },
    studentName: {
        type: String,
        required: true,
        trim: true, // Removes leading and trailing spaces
    },
    adharNumber:{
        type:Number,
        required:true,
    },
    
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

const Student = mongoose.model("Student", StudentDetailsSchema);
module.exports = Student; // Export the model
