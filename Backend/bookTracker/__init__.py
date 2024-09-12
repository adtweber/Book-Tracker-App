from flask import Flask 

def create_app(): 
    app = Flask(__name__)

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

