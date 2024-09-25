const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    try {
        let user = await User.findOne({
            where: { email: req.body.email }
        });

        if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
            return res.status(404).json({ 
                message: 'Could not find a user with the provided username and password' 
            });
        }

        // If the user is authenticated
        req.session.userId = user.userId;
        return res.json({ user });
    } catch (error) {
        // Handle any unexpected errors
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/profile', async (req, res) => {
    console.log(req.session.userId);
    try {
        let user = await User.findOne({
            where: {
                userId: req.session.userId
            }
        })
        res.json(user)
    } catch {
        res.json(null)
    }
})


module.exports = router