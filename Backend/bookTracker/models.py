from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

# Initialize the database
db = SQLAlchemy()

# Define the join table for the many-to-many relationship between users and books
user_books = db.Table('user_books',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('book_id', db.Integer, db.ForeignKey('books.id'), primary_key=True)
)
# Define the Book model
class Book(db.Model):
    __tablename__ = 'books'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(200), nullable=False)
    cover = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Want to Read")
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Link to the User

    def __init__(self, title, author, cover, status, user_id): 
        self.title = title
        self.author = author
        self.cover = cover
        self.status = status
        self.user_id = user_id

    # Method to serialize the model to a dictionary (for JSON responses)
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'cover': self.cover,
            'status': self.status,
            'user_id': self.user_id
        }

# Define the User model
class User(db.Model):
    __tablename__ = 'user'
    
    id = db.Column(db.Integer, primary_key=True)
    # first_name = db.Column(db.String(200), nullable=False)
    # last_name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    password_hash= db.Column(db.String(200), nullable=False)
    # status = db.Column(db.String(50), nullable=False, default="Want to Read")

    # Many-to-Many relationship with books using the join table
    books = db.relationship('Book', secondary=user_books, backref=db.backref('users', lazy=True)) 

    def __init__(self, email, password):
        self.email = email
        self.set_password(password)  # Hash the password when the user is created

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)  # Hash the password

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)  # Verify the password

    # Method to serialize the model to a dictionary (for JSON responses)
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            # Password hash not included for security
        }
