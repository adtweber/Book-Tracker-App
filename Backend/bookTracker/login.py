from flask import Blueprint, request, jsonify, current_app
import jwt
import datetime
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

    # Generate a JWT token
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, current_app.config['SECRET_KEY'], algorithm='HS256')

    # Return the token and user information
    return jsonify({
        'token': token,
        'user': {
            'id': user.id,
            'email': user.email
        }
    }), 200