require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

// middleware to parse JSON bodies //
app.use(express.json());
app.use(cors());

// CONTROLLERS 
const booksController = require('./controllers/books')
app.use('/books', booksController)

// home page //
app.get('/', (req, res) => {
    res.send('Hello Team!');
});

// 404 page for undefined routes //
app.get('*', (req, res) => {
    res.status(404).send('<h1>404 Page Not Found</h1>');
});

// error handling middleware //
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke -_- !');
});

// start the server //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));