from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from app import bcrypt

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    posts = db.Column()
    username = db.Column(db.String, unique=True)
    _password_hash = db.column(db.String, nullable=False)
    
    posts = db.relationship('Post', backref='user')

    def __repr__(self):
        return f'User: {self.username}, ID: {self.id}'

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authwnticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
    
class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"

    id =db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String, nullable=False)
    likes = db.column(db.Integer)
    dislikes = db.Column(db.Integer)
    comments =db.Column(db.String)