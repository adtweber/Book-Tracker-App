// DEPENDENCIES
const books = require('express').Router()
const db = require('../models')
const { Book } = db 

// FIND ALL BOOKS
books.get('/', async (req, res) => {
    try {
        const foundBooks = await Book.findAll()
        res.status(200).json(foundBooks)
    } catch (error) {
        res.status(500).json(error)
    }
})

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

// CREATE A BOOK
books.post('/', async (req, res) => {
    try {
        const newBook = await Book.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new book',
            data: newBook
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A BAND
books.put('/:id', async (req, res) => {
    try {
        const updatedBooks = await Book.update(req.body, {
            where: {
                bookID: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBooks} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND
books.delete('/:id', async (req, res) => {
    try {
        const deletedBooks = await Book.destroy({
            where: {
                bookID: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBooks} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = books
