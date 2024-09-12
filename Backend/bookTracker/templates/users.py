from flask import (Blueprint, render_template)
import json 

users = json.load(open('users.json'))
print(users)

bp = Blueprint('users', __name__, url_prefix="/users")

@bp.route('/')
def index(): 
    return render_template('index.html',users=users)
