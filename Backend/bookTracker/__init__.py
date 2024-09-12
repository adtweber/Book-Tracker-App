#config
from flask import Flask 
from flask_migrate import Migrate 

#factory
def create_app(): 
    app = Flask(__name__)

    #database config
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/Book-Tracker'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False    

    from . import models
    models.db.init_app(app)
    migrate = Migrate(app, models.db)

    @app.route('/')
    def hello(): 
        return 'Hello, BookWorms!'

    # books index route
    @app.route('/books')
    def books(): 
        return 'These are all the books!'

    # register user sblueprint 
    from . import users
    app.register_blueprint(users.bp)

    # return the app 
    return app



