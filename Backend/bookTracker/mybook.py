from flask import Flask, request, jsonify, Blueprint
from bookTracker.models import db, Book  # Assuming you have a Book model and db

# Create a Blueprint for 'mybooks'
bp = Blueprint('mybooks', __name__, url_prefix='/mybooks')


@bp.route('/', methods=['GET', 'POST', 'OPTIONS'])
def books():
    if request.method == 'OPTIONS':
        # Handle preflight CORS request
        return jsonify({'status': 'ok'}), 200

    if request.method == 'POST':
        data = request.get_json()
        title = data.get('title')
        author = data.get('author')
        status = data.get('status', 'Want to Read')

        # Create a new book entry
        new_book = Book(title=title, author=author, status=status)
        db.session.add(new_book)
        db.session.commit()

        return jsonify({"message": "Book added successfully!", "book": new_book.id}), 201

    elif request.method == 'GET':
        # Retrieve all books and convert them to JSON
        books = Book.query.all()
        books_json = [book.to_dict() for book in books]  # Assuming each Book model has a to_dict() method
        return jsonify(books_json)
