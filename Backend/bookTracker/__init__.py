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
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
        return response
        
    @app.route('/')
    def hello(): 
        return 'Hello, BookWorms!'

    # books index route
    @app.route('/books')
    def books(): 
        return 'These are all the books!'

    # register user sblueprint 
    # from . import users
    # app.register_blueprint(users.bp)

    from . import mybook
    app.register_blueprint(mybook.bp)

    # return the app 
    return app




