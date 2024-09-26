const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const jwt = require('json-web-token');

const { User } = db

router.post('/', async (req, res) => {

    try {
        let user = await User.findOne({
            where: { email: req.body.email }
        });

        if (!user || !await bcrypt.compare(req.body.password, user.password_digest)) {
            return res.status(404).json({ 
                message: 'Could not find a user with the provided username and password' 
            });
        } else {
            jwt.encode(process.env.JWT_SECRET, { id: user.userId }, (err, token) => {
                if (err) {
                    return res.status(500).json({ message: 'Error generating token' });
                }
                
                console.log('Token generated:', token);  // Log token after creation
                return res.json({ user: user, token: token });
            });
        }
        // console.log('Token generated:', result); 
        // If the user is authenticated
        // req.session.userId = user.userId;
        // return res.json({ user });
    } catch (error) {
        // Handle any unexpected errors
        console.error('Server Error:', error.stack);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

    
    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ 
            message: `Could not find a user with the provided username and password` 
        })
    } else {
        req.session.userId = user.userId
        res.json({ user })                                       
    }
})

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