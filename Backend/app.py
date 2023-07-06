# server/app.py
from flask import Flask, jsonify, request, make_response, session

from flask_migrate import Migrate
from flask_cors import CORS
from werkzeug.security import check_password_hash
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


@app.route('/')
def index():

    response_dict = {
        "Index": "Welcome to the Instatalk RESTful API",
    }

    response =  make_response(jsonify(response_dict),
                                200
                )
        

    return response


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        session['user_id'] = user.id
        return jsonify(user.to_dict())
    else:
        return {'message': 'Invalid username or password'}, 401  
        

@app.route('/check_session')
def check_session():
    user = User.query.filter(User.id == session.get('user_id')).first()
    if user:
        return jsonify(user.to_dict()), 201
    else:
        return jsonify({'message': '401: Not Authorized'}), 401

@app.route('/logout')
def logout():
    session['user_id'] = None
    return jsonify({'message': '204: No Content'}), 204


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user:
        return {'message': 'Username already in use'}, 401
    else:
        user = User(username=username)
        user.password_hash = password
        db.session.add(user)
        db.session.commit()

        return {'message': 'User created successfully'}, 201

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [user.to_dict() for user in users]
    response = make_response(jsonify(user_list), 200)
    return response

@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        response = make_response(jsonify(user.to_dict()), 200)
    else:
        response = make_response(jsonify({'message': 'User not found'}), 404)
    return response

@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    post_list = [post.to_dict() for post in posts]
    response = make_response(jsonify(post_list), 200)
    return response

@app.route('/post/<int:post_id>', methods=['GET', 'PUT', 'DELETE'])
def post_operations(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'message': 'Post not found'}), 404

    if request.method == 'GET':
        response_data = {
            'post': post.to_dict(),
            'comments': [comment.to_dict() for comment in post.comment]
        }
        return jsonify(response_data), 200

    if request.method == 'PUT':
        data = request.get_json()
        post.image_url = data.get('image_url', post.image_url)
        post.caption = data.get('caption', post.caption)
        db.session.commit()
        return jsonify({'message': 'Post updated successfully'}), 200

    if request.method == 'DELETE':
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Post deleted successfully'}), 200


@app.route('/comment/<int:comment_id>', methods=['PUT', 'DELETE'])
def comment_operations(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({'message': 'Comment not found'}), 400

    if request.method == 'PUT':
        data = request.get_json()
        comment.comment = data.get('comment', comment.comment)
        db.session.commit()
        return jsonify({'message': 'Comment updated successfully'}), 200

    if request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        return jsonify({'message': 'Comment deleted successfully'}), 200

@app.route('/comment', methods=['POST'])
def create_comment():
    data = request.get_json()
    comment_text = data.get('comment')

    user_id = session.get('user_id')
    post_id = data.get('post_id')

    if user_id:
        user = User.query.get(user_id)
        if user:
            post = Post.query.get(post_id)
            if post:
                comment = Comment(comment=comment_text, user=user, post=post)
                db.session.add(comment)
                db.session.commit()
                response = make_response(jsonify({'message':'Comment created successfully'}), 201)
            else:
                response = make_response(jsonify({'message':'Post not found'}), 404)
        else:
            response = make_response(jsonify({'message': 'User not found authenticated'}), 401)
        return response



if __name__ == '__main__':
    app.run(port=5555, debug=True)# server/app.py





