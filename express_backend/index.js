require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const defineCurrentUser = require('./middleware/defineCurrentUser')

// Express Settings
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// Middleware for parsing incoming requests
// app.use(express.json());  // Parse JSON bodies

// Middleware for parsing incoming requests
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(defineCurrentUser)

// CONTROLLERS 
app.use('/books', require('./controllers/books')); 
app.use('/users', require('./controllers/users')); 
app.use('/authentication', require('./controllers/authentication'));

// CONTROLLERS 
app.use(express.urlencoded({ extended: true }))

app.use('/books', require('./controllers/books'))
app.use('/users', require('./controllers/users'))
app.use('/authentication', require('./controllers/authentication'))


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