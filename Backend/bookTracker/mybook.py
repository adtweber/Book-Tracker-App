from flask import Flask, request, jsonify, Blueprint
from bookTracker.models import db, Book  # Assuming you have a Book model and db
from flask_jwt_extended import jwt_required, get_jwt_identity

# Create a Blueprint for 'mybooks'
bp = Blueprint('mybooks', __name__, url_prefix='/mybooks')


@bp.route('/', methods=['GET', 'POST', 'OPTIONS'])
@jwt_required()
def books():
    if request.method == 'OPTIONS':
        # Handle preflight CORS request
        return jsonify({'status': 'ok'}), 200
    
    # Get the current user's ID from the JWT token
    user_id = get_jwt_identity()
    
    if request.method == 'POST':
        data = request.get_json()
        title = data.get('title')
        author = data.get('author')
        cover = data.get('cover')
        status = data.get('status', 'Want to Read')

        # Create a new book entry
        new_book = Book(title=title, author=author, cover=cover, status=status, user_id=user_id)
        db.session.add(new_book)
        db.session.commit()

        return jsonify({"message": "Book added successfully!", "book": new_book.id}), 201

    elif request.method == 'GET':
        # Retrieve all books and convert them to JSON
        user_books = Book.query.filter_by(user_id=user_id).all()
        books_json = [book.to_dict() for book in user_books]
        return jsonify(books_json), 200
