from flask import Flask, request, jsonify, Blueprint, session
from bookTracker.models import db, Book 

# Create a Blueprint for 'mybooks'
bp = Blueprint('mybooks', __name__, url_prefix='/mybooks')


@bp.route('/', methods=['GET', 'POST', 'OPTIONS'])
def mybooks():
    if request.method == 'OPTIONS':
        # CORS preflight response
        return '', 200

    # Get the current user's ID from the session
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401

    if request.method == 'POST':
        # Ensure the user is logged in
        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401

        # Extract book data from the request body
        data = request.get_json()
        title = data.get('title')
        author = data.get('author')
        cover = data.get('cover')
        status = data.get('status', 'Want to Read')  # Default status is "Want to Read"

        if not title or not author:
            return jsonify({"error": "Title and author are required"}), 400

        # Create a new book entry associated with the logged-in user
        new_book = Book(title=title, author=author, cover=cover, status=status, user_id=user_id)
        db.session.add(new_book)
        db.session.commit()

        # Return success response with book info
        return jsonify({
            "message": "Book added successfully!",
            "book": new_book.to_dict()
        }), 201

    elif request.method == 'GET':
        # Retrieve books for the logged-in user
        user_books = Book.query.filter_by(user_id=user_id).all()
        books_json = [book.to_dict() for book in user_books]
        return jsonify(books_json), 200
    