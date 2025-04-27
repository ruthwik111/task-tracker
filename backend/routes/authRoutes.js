const express = require('express');
const { login, signup } = require('../controllers/authController');

const router = express.Router();

// Define the login route
router.post('/login', login); // Ensure this matches your API call in api.js

// Define the signup route
router.post('/signup', async (req, res) => {
    try {
        const user = await signup(req.body); // Call your signup logic here
        res.status(201).json(user); // Respond with the created user
    } catch (error) {
        console.error('Signup error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error' }); // Send a generic error response
    }
});

module.exports = router;