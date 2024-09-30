const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcryptjs')

const { User } = db

router.post('/', async (req, res) => {
    let { password, ...rest } = req.body;
    const user = await User.create({ 
        ...rest, 
        password_digest: await bcrypt.hash(password, 10)
    })
    res.json(user)
})   

// EXPORT
module.exports = router

