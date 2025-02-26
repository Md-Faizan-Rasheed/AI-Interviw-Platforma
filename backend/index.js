const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter.Routes');
const ProductRouter = require('./Routes/ProductRouter');
const JobRouter = require('./Routes/JobRoutes');
const cookieParser = require('cookie-parser');
const admin = require("firebase-admin");

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cookieParser());
// app.use(cors());
app.use(cors({
    origin: "http://localhost:5173",  // Allows all domains
    credentials: true, // ✅ Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Initialize Firebase Admin SDK
const serviceAccount = require("./aiintplann-firebase-adminsdk-fbsvc-3c623c12d4.json"); // Replace with your service account file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


// Ping route
app.get('/ping', (req, res) => {
    res.send("Pong");
});

// Routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/jobs', JobRouter);
// app.use('/interview', interviewRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});