const express = require('express');
const cors = require('cors');
//const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the database connection function
const path = require('path');
const bodyParser = require('body-parser');

//dotenv.config();

const app = express();

// Connect to the database
connectDB(); // Use the database connection function

// CORS configuration
const corsOptions = {
    origin: '*', // Allow requests from any origin (for development; restrict in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', require('./Routes/RoutesConfig')); // This line includes your routes

app.use(bodyParser.json()); // For parsing application/json

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
