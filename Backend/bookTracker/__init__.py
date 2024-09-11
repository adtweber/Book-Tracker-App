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

    return app
