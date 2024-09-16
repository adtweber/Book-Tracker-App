#config
from flask import Flask 
from flask_migrate import Migrate 
from flask_cors import CORS

#factory
def create_app(): 
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    #database config
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/Book-Tracker'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False    

    from . import models
    models.db.init_app(app)
    migrate = Migrate(app, models.db)

    # CORS and Preflight request handling
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000') 
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
        return response

    from . import mybook
    app.register_blueprint(mybook.bp)

    from . import routes
    app.register_blueprint(routes.auth_bp)

    from . import login
    app.register_blueprint(login.auth_bp)

    # return the app 
    return app




