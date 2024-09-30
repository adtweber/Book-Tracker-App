const router = require('express').Router();
const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('json-web-token');

const { User } = db;

router.post('/', async (req, res) => {
    try {
        // Find user by email
        let user = await User.findOne({
            where: { email: req.body.email }
        });

        // If no user or password mismatch, return 404
        if (!user || !await bcrypt.compare(req.body.password, user.password_digest)) {
            return res.status(404).json({ 
                message: 'Could not find a user with the provided username and password' 
            });
        }

        // Generate JWT token if user exists and password matches
        jwt.encode(process.env.JWT_SECRET, { id: user.userId }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: 'Error generating token' });
            }
            
            console.log('Token generated:', token);  // Log token after creation

            
            return res.json({ user: user, token: token });
        });

    } catch (error) {
        // Handle unexpected errors
        console.error('Server Error:', error.stack);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Get the user's profile
router.get('/profile', async (req, res) => {
    console.log(req.currenUser)
    res.json(req.currentUser)
})

module.exports = router


