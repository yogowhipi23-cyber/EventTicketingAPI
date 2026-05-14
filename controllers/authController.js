const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.create({ name, email, password, role });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email/password exists
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }

        // Find user & include password (since we set select: false in model)
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Helper to create token and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.status(statusCode).json({
        success: true,
        token
    });
};