from flask import (Blueprint, request,redirect)

bp = Blueprint('mybook', __name__, url_prefix="/mybooks")

@bp.route('/', methods=['GET', 'POST'])
def index(): 
    if request.method == 'POST':
        submitter = request.form['submitter']
        fact = request.form['fact']

        new_fact = models.Fact(submitter=submitter, fact=fact) 
        models.db.session.add(new_fact)
        models.db.session.commit()

        return ('fact')
    return 'get'