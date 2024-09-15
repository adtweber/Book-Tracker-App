from flask import Blueprint, request, jsonify
# import jwt
import datetime
from bookTracker.models import db, User  # Assuming you have a Book model and db

auth_bp = Blueprint('signup', __name__, url_prefix='/signup')

# Sign-Up Endpoint
@auth_bp.route('/', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if the email is already registered
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    # Create a new user, and the password will be hashed automatically
    new_user = User(email=email, password=password)

    # Add the new user to the session and commit
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


# Login Endpoint
# @auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     user = User.query.filter_by(email=email).first()

#     if user is None or not user.check_password(password):
#         return jsonify({"error": "Invalid email or password"}), 401

#     # Generate a JWT token
#     token = jwt.encode({
#         'user_id': user.id,
#         'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
#     }, app.config['SECRET_KEY'])

#     return jsonify({'token': token}), 200