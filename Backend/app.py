# config                    
from flask import Flask
app = Flask(__name__)

# index route
@app.route('/')
def index(): 
    return 'Hello, this is the Book-Tracker-App'

# books index route
@app.route('/books')
def books(): 
    return 'These are all the books!'
