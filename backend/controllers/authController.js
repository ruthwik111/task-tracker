const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens

const signup = async (userData) => {
    const { name, email, password, country } = userData;

    // Check if user already exists
    const existingUser  = await User.findOne({ email });
    if (existingUser ) {
        throw new Error('User  already exists'); // Throw an error if user exists
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser  = new User({ name, email, password: hashedPassword, country });
    
    try {
        await newUser .save(); // Save the user to the database

        // Generate a token (optional)
        const token = jwt.sign({ id: newUser ._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { message: 'User  created successfully', token }; // Return success message and token
    } catch (error) {
        console.error('Error during signup:', error);
        throw error; // Rethrow the error to be caught in the route handler
    }
};

module.exports = { signup };
