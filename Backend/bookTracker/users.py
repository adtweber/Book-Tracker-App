from flask import (Blueprint, render_template)

bp = Blueprint('users', __name__, url_prefix="/users")

@bp.route('/')
def index(): 
    return render_template('index.html')
