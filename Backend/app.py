# server/app.py
from flask import Flask, jsonify, request, make_response, session

from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from werkzeug.security import check_password_hash
from models import db, User, Post, Comment, _password_hash,bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instatalk.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True



CORS(app)
migrate = Migrate(app, db)
db.init_app(app)
# instantiate Bcrypt with app instance
bcrypt.init_app(app)

api=Api(app)

class Index(Resource):
    def get(self):

        response_dict = {
            "Index": "Welcome to the Instatalk RESTful API",
        }

        response =  make_response(jsonify(response_dict),
                                  200
                    )
        

        return response

api.add_resource(Index, '/')

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

class User(Resource):
    def get():
        pass
    pass

class UserById(Resource):
    pass

class Post(Resource):
    pass

class PostById(Resource):
    pass




if __name__ == '__main__':
    app.run(port=5555, debug=True)# server/app.py





