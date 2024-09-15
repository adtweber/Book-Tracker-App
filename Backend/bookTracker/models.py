from flask_sqlalchemy import SQLAlchemy

# Initialize the database
db = SQLAlchemy()

# Define the Book model
class Book(db.Model):
    __tablename__ = 'books'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(200), nullable=False)
    cover = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Want to Read")

    def __init__(self, title, author, cover, status):
        self.title = title
        self.author = author
        self.cover = cover
        self.status = status

    # Method to serialize the model to a dictionary (for JSON responses)
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'cover': self.cover,
            'status': self.status
        }

# Define the User model
class User(db.Model):
    __tablename__ = 'User'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(200), nullable=False)
    last_name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    password_digest = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Want to Read")

    # def __init__(self, title, author, cover, status="Want to Read"):
    #     self.title = title
    #     self.author = author
    #     self.cover = cover
    #     self.status = status

    # # Method to serialize the model to a dictionary (for JSON responses)
    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'title': self.title,
    #         'author': self.author,
    #         'cover': self.cover,
    #         'status': self.status
    #     }