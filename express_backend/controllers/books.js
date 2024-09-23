const router = require('express').Router();
const db = require('../models');
const Review = require('../models/review');

// INDEX - get all games //
router.get('/', async (req, res) => {
    try {
        const books = await db.Game.find();
        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching games' });
    }
});
