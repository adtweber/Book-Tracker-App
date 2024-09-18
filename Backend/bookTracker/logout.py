from flask import Blueprint, session, redirect, url_for, request

auth_bp = Blueprint('logout', __name__, url_prefix='/logout')

@auth_bp.route('/' , methods=['POST', 'OPTIONS'])
def logout():
    if request.method == 'OPTIONS':
        # CORS preflight response
        return '', 200
    session.clear()  # Clears all session data
    return 'logout successfull'
