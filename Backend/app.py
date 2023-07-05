# server/app.py
from flask import Flask, jsonify, request, make_response, session

from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from werkzeug.security import check_password_hash
from sqlalchemy_serializer import SerializerMixin
from models import db, User, Post, Comment, bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instatalk.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
# app.json_encoder = SerializerMixin.json_encoder



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

        if user and check_password_hash(user.password_hash, password):
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
        password = data['password']

        user = User.query.filter_by(username=username).first()

        if user:
            return{'message': 'Username already in use'}, 401
        else:
            user = User(username=username)
            user.password_hash = password
            db.session.add(user)
            db.session.commit()

            return {'message': 'User created successfully'}, 201
        
api.add_resource(Signup, '/signup')

class User(Resource):
    def get(self):
        users = User.query.all()
        user_list = [user.to_dict() for user in users]
        response = make_response(jsonify(user_list), 200)
        return response 
        
api.add_resource(User, '/users')

class UserById(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if user:
            response = make_response(jsonify(user.to_dict()), 200)
        else:
            response = make_response(jsonify({'meesage': 'User not found'}), 404)
        return response
    
api.add_resource(UserById, '/user/<int:user_id>')

class Post(Resource):
    def get(self):
        posts = Post.query.all()
        post_list = [post.to_dict() for post in posts]
        response = make_response(jsonify(post_list), 200)
        return response
    
    
    
api.add_resource(Post, '/posts')

class PostById(Resource):
    def get(self, post_id):
        post = Post.query.get(post_id)
        if post:
            response_data = {
                'post': post.to_dict(),
                'comments': [comment.to_dict() for comment in post.comment]
            }
            response = make_response(jsonify(response_data), 200)
        else:
            response = make_response(jsonify({'message': 'Post not found'}), 404)
        return response
    
    def put(self, post_id):
        post = Post.query.get(post_id)
        if post:
            data = request.get_json()
            post.image_url = data.get('image_url', post.image_url)
            post.caption = data.get('caption', post.caption)
            db.session.commit()
            response = make_response(jsonify({'message':'Post updated successfully'}), 200)
        else:
            response =make_response(jsonify({'message':'Post not found'}), 404)
        return response
    
    def delete(self, post_id):
        post = Post.query.get(post_id)
        if post:
            db.session.delete(post)
            db.session.commit()
            response = make_response(jsonify({'message': 'Post deleted successfully'}), 200)
        else:
            response = make_response(jsonify({'message':'Post not found'}), 404)
        return response
    
    def post(self):
        data = request.get_json()
        image_url = data.get('image_url')
        caption = data.get('caption')

        user_id = session.get('user_id')

        if user_id:
            user = User.query.get(user_id)
            if user:
                post = Post(image_url=image_url, caption=caption, user=user)
                db.session.add(post)
                db.session.commit()
                response = make_response(jsonify({'message': 'Post created successfully'}), 201)
            else:
                response = make_response(jsonify({'message':'User does not exist'}), 404)
        else:
            response = make_response(jsonify({'message':'User not authenticated'}), 401)
        return response
    

api.add_resource(PostById, '/post/<int:post_id>')


class CommentById(Resource):
    def put(self, comment_id):
        comment = Comment.query.get(comment_id)
        if comment:
            data = request.get_json()
            comment.comment = data.get('comment', comment.comment)
            db.session.commit()
            response = make_response(jsonify({'message':'Comment updated successfully'}), 200)
        else:
            response = make_response(jsonify({'message':'Comment not found'}), 400)
        return response
    def delete(self,comment_id):
        comment= Comment.query.get(comment_id)
        if comment:
            db.session.delete(comment)
            db.session.commit()
            response = make_response(jsonify({'message':'Comment deleted successfully'}), 200)
        else:
            response = make_response(jsonify({'message':'Comment not found'}), 400)
        return response

    def post(self):
        data = request.get_json()
        comment_text = data.get('comment')

        user_id = session.get('user_id')
        post_id = data.get('post_id')

        if user_id:
            user = User.get.query.get(user_id)
            if user:
                post = Post.query.get(post_id)
                if post:
                    comment = Comment(comment=comment_text, user=user, post=post)
                    db.session.add(comment)
                    db.session.commit()
                    response = make_response(jsonify({'message':'Comment created successfully'}), 200)
                else:
                    response = make_response(jsonify({'message':'Post not found'}), 404)
            else:
                response = make_response(jsonify({'message':'User not found'}), 404)
        else:
            response = make_response(jsonify({'message':'User not authenticated'}), 400)
        return response

api.add_resource(CommentById, '/comment/<int:comment_id>')




if __name__ == '__main__':
    app.run(port=5555, debug=True)# server/app.py





