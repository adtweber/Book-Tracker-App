// DEPENDENCIES
const books = require('express').Router()
const db = require('../models')

const { Book, User} = db 

// FIND ALL MY BOOKS
books.get('/', async (req, res) => {
    try {
        // Ensure that `req.currentUser` exists (set by your middleware)
        if (!req.currentUser) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // Fetch books associated with the current user
        const userWithBooks = await User.findOne({
            where: { userId: req.currentUser.userId }, // Use current logged-in userId
            include: [{
                model: Book,
                as: 'books', // Alias used in association
                through: { attributes: [] } // Optionally exclude the join table data
            }]
        });

        res.status(200).json(userWithBooks.books); // Return the user's books
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json(error);
    }
});

// CREATE A BOOK AND ASSOCIATE IT WITH THE CURRENT USER
books.post('/', async (req, res) => {
    try {
        // Ensure that `req.currentUser` exists (set by your middleware)
        if (!req.currentUser) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // Create a new book
        const newBook = await Book.create(req.body);

        // Associate the new book with the current user
        await req.currentUser.addBook(newBook);

        res.status(200).json({
            message: 'Successfully inserted a new book',
            data: newBook
        });
    } catch (err) {
        console.error('Error saving book:', err); // Log the actual error
        res.status(500).json(err);
    }
});

// FIND A SPECIFIC BOOK
books.get('/:id', async (req, res) => {
    try {
        const foundBook = await books.findOne({
            where: { bookId: req.params.id }
        })
        res.status(200).json(foundBook)
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A BOOK
books.put('/:id', async (req, res) => {
    try {
        const updatedBooks = await Book.update(req.body, {
            where: {
                bookId: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBooks} book(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A BOOK
books.delete('/:id', async (req, res) => {
    try {
        const deletedBooks = await Book.destroy({
            where: {
                bookId: req.params.id //
            }
        });

        if (deletedBooks) {
            res.status(200).json({ message: `Successfully deleted book with id ${req.params.id}` });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        console.error('Error deleting book:', err);
        res.status(500).json({ message: 'Error deleting book', error: err });
    }
});


// EXPORT
module.exports = books
