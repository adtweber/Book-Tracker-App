from flask import Blueprint, request, jsonify, current_app, session
# from flask_jwt_extended import create_access_token
# import datetime
from bookTracker.models import db, User 

auth_bp = Blueprint('login', __name__, url_prefix='/login')

# Login Endpoint
@auth_bp.route('/', methods=['OPTIONS','POST'])
def login():
    if request.method == 'OPTIONS':
        # CORS preflight response
        return '', 200

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user is None or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Store user info in session 
    session['user_id'] = user.id
    session['user_email'] = user.email

    return jsonify({
        'user': {
            'id': user.id,
            'email': user.email
        }
    }), 200