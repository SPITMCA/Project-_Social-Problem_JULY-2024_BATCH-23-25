const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../Models/User');
const fundraiser = require('../Models/Fundraiser');
const dotenv = require('dotenv');

dotenv.config();

exports.signup = async (req, res) => {
    const { firstName, lastName, email, password, userType } = req.body; // Include userType
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ firstName, lastName, email, password: hashedPassword, userType }); // Include userType

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ message: error.message });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { id: user._id, email: user.email, userType: user.userType }; // Include userType in payload
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: user.userType // Include userType in response
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
};

// exports.getMe = async (req, res) => {
//     try {
//         // `req.user` should be set by the authMiddleware
//         res.json(req.user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
exports.getUserFundraisers = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Bearer TOKEN'
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Debugging line to check extracted token
        console.log('Token:', token);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Debugging line to check extracted user ID
        console.log('User ID:', userId);

        // Fetch fundraisers created by this user
        const fundraisers = await fundraiser.find({ requestedUserId: userId });
        // const fundraisers = await fundraiser.find({ targetAmount: 12344546 });

        // Send the filtered fundraisers as a response
        res.status(200).json(fundraisers);
    } catch (error) {
        console.error('Error fetching user fundraisers:', error);
        res.status(500).json({ message: 'Error fetching user fundraisers' });
    }
};

