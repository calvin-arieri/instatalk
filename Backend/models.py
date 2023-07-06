from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.sql import func
from sqlalchemy.orm import validates
from flask_bcrypt import Bcrypt


db = SQLAlchemy()
bcrypt= Bcrypt()

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    first_name = db.Column(db.String, nullable=False, default="FirstName")
    second_name = db.Column(db.String, nullable=False, default="SecondName")
    profile_photo = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable=False)
    
    post = db.relationship('Post', backref='user')
    comment = db.relationship('Comment', backref='user')

    serialize_rules = ("-post.user","-comment.user")

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
    
    def to_dict(self):
        return{
            'id' : self.id,
            'username': self.username,
            'first_name': self.first_name,
            'second_name': self.second_name,
            'profile_photo': self.profile_photo,
            'email': self.email
        }
    @validates('email')
    def validates_email(self, key, users):
        if '@' not in users:
            ValueError("enter a valid email")
        else:
            return users
    
class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"

    id =db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String, nullable=False)
    likes = db.Column(db.Integer, default=0)
    dislikes = db.Column(db.Integer, default=0)
    caption = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default = func.now())
    updated_at = db.Column(db.DateTime, onupdate= func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    comment= db.relationship('Comment', backref='post')

    serialize_rules = ("-user.post", "-comment.post")

    def __repr__(self):
        return f'Image: {self.image_url}, Likes: {self.likes}, Dislikes: {self.dislikes}'
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    comment =db.Column(db.String(length=150))
    created_at = db.Column(db.DateTime, default = func.now())
    updated_at = db.Column(db.DateTime, onupdate = func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    serialize_rules = ("-user.comment", "-post.comment")

    def __repr__(self):
        return f'Comment: {self.comment}, ID: {self.id}' 
    
