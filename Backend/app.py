# server/app.py
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import request, session, jsonify
from flask_restful import Resource, api
from werkzeug.security import check_password_hash
from models import User, _password_hash

db = SQLAlchemy()
# instantiate Bcrypt with app instance
bcrypt = Bcrypt(app)

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user._password_hash, password):
            session['user_id'] = user.id
            return jsonify(user.to_dict())
        else:
            return {'message': 'Invalid username or password'}, 401  
api.add_resource(Login, '/login')

class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return jsonify(user.to_dict()),201
        else:
            return jsonify({'message': '401: Not Authorized'}), 401

api.add_resource(CheckSession, '/check_session')

class Logout(Resource):
    def get(self):
        session['user_id'] = None
        return jsonify({'message': '204: No Content'}), 204
api.add_resource(Logout, '/logout')

class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']

        user = User.query.filter_by(username=username).first()

        if user:
            return{'message': 'Username already in use'}, 401
        else:
            user = User(username=username, password_hash=_password_hash)
            db.session.add(user)
            db.session.commit()

            return {'message': 'User created successfully'}, 201
        
api.add_resource(Signup, '/signup')
