from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity  # Import JWT utilities
from bookTracker.models import db, Book  # Assuming you have a Book model and db

# Create a Blueprint for 'mybooks'
bp = Blueprint('mybooks', __name__, url_prefix='/mybooks')


@bp.route('/', methods=['GET', 'POST', 'OPTIONS'])
@jwt_required()  # Require JWT authentication
def books():
    if request.method == 'OPTIONS':
        # Handle preflight CORS request
        return jsonify({'status': 'ok'}), 200

    if request.method == 'POST':
        data = request.get_json()
        title = data.get('title')
        author = data.get('author')
        cover = data.get('cover')
        status = data.get('status', 'Want to Read')

        # Get the logged-in user's ID from the JWT token
        current_user_id = get_jwt_identity()

        # Create a new book entry
        new_book = Book(title=title, author=author, cover=cover, status=status)
        db.session.add(new_book)
        db.session.commit()

        return jsonify({"message": "Book added successfully!", "book": new_book.id}), 201

    elif request.method == 'GET':
        #Get the logged-in user's ID from the JWT token
        current_user_id = get_jwt_identity()

        # Retrieve books for the logged-in user only
        user_books = Book.query.filter_by(user_id=current_user_id).all()
        books_json = [book.to_dict() for book in user_books]  # Assuming each Book model has a to_dict() method

        return jsonify(books_json)
