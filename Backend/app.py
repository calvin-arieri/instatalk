# server/app.py
from flask import Flask, jsonify, request, make_response
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS

from models import db, User, Post, Comment

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instatalk.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

# instantiate Bcrypt with app instance
bcrypt = Bcrypt(app)

CORS(app)
migrate = Migrate(app, db)
db.init_app(app)

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

class User(Resource):
    def get():
        pass
    pass

class UserById(Resource):
    pass




if __name__ == '__main__':
    app.run(port=5555, debug=True)