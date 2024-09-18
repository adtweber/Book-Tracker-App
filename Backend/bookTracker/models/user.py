from flask_sqlalchemy import SQLAlchemy 

db = SQLAlchemy()

class user(db.Model):
    __tablename__ =  'USER' 
    
    id = db.Column(db.Integer, primary_key = True) 
    password = db.Column(db.String(250)) 
    user_name = db.Column(db.Text) 
    email = db.Column(db.Text) 