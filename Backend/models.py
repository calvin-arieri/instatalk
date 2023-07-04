from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from app import bcrypt

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    posts = db.Column()
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    
    posts = db.relationship('Post', backref='user')
    comments = db.relationship('Comment', backref='user')

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

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
    
class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"

    id =db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String, nullable=False)
    likes = db.column(db.Integer)
    dislikes = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    comments= db.relationship('Comment', backref='post')

    def __repr__(self):
        return f'Image: {self.image_url}, Likes: {self.likes}, Dislikes: {self.dislikes}'
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    comment =db.Column(db.String(length=150))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    def __repr__(self):
        return f'Comment: {self.comment}, ID: {self.id}' 
    
