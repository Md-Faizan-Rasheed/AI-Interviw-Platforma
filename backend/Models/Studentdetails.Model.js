
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentDetailsSchema = new Schema({
     companyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
      index: true,
    },
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
