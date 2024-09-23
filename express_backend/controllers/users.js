const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('GET /users')
})

router.post('/', (req, res) => {
    res.send('post /users')
})

module.exports = router
