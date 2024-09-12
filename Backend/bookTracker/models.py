from flask_sqlalchemy import SQLAlchemy 

db = SQLAlchemy()

class comment(db.Model):
    __tablename__ =  'comments' 
    
    id = db.Column(db.Integer, primary_key = True) 
    submitter = db.Column(db.String(250)) 
    comment = db.Column(db.Text) 