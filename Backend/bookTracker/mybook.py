from flask import (Flask, request, jsonify, Blueprint)
from bookTracker.models import db, Book  # Assuming you have a Book model and db

# Create a Blueprint for 'mybooks'
bp = Blueprint('mybooks', __name__, url_prefix='/mybooks')


@bp.route('/')
def index(): 
    return 'This is the pets index'

@bp.route('/', methods=['GET','POST'])
def add_book():
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

    # Assuming you have a Book model and a method to serialize it to JSON
    books = Book.query.all()
    books_json = [book.to_dict() for book in books]  # Assuming each Book model has a to_dict() method
    return jsonify(books_json)