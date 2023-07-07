# server/app.py
from flask import Flask, jsonify, request, make_response, session
from werkzeug.exceptions import HTTPException, NotFound
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from werkzeug.security import check_password_hash
from models import db, User, Post, Comment, bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instatalk.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
# app.json_encoder = SerializerMixin.json_encoder
app.secret_key= b'm{\xf9\xec\xa0\xa7Gv\x98\x07\xa9\xfb\xdb\xe2\x8d\x86'


CORS(app)
migrate = Migrate(app, db)
api = Api(app)
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

class ClearSession(Resource):
    def delete(self):
        session['page_views'] = None
        session['user_id'] = None

        return {}, 204

api.add_resource(ClearSession, '/clear')

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    user = User.query.filter_by(username=username).first()

    if user and password:
        return jsonify(user={"id": user.id, "username": user.username})
    else:
        return jsonify(message="Invalid username or password"), 401  
        

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
        user.password = password
        db.session.add(user)
        db.session.commit()

        return {'message': 'User created successfully'}, 201
    
@app.errorhandler(NotFound)
def handle_notfound(e):
    response = make_response("Not found:System under maintenance check back later", 404)
    return response

@app.errorhandler(HTTPException)
def handle_server_error(e):
    response = make_response(
        "Server Error: System server under maintenance check back later",
        500

    )
    return response

class ShowSession(Resource):
    def get(self, key):
        session["home"] = session.get("home")

        response = make_response(jsonify({
            "session":{
                'session_key': key,
                'session_value': session[key],
                'session_accessible': session.accessed,
            },
            'cookies':[{cookie: request.cookies[cookie]}
                       for cookie in request.cookies],
        }), 200
        )
        response.set_cookie('mouse', 'Cookie')
        return response 

api.add_resource(ShowSession, '/sessions/<string:key>')

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [user.to_dict() for user in users]
    response = make_response(jsonify(user_list), 200)
    return response

@app.route('/user/<int:user_id>', methods=['GET', 'PATCH'])
def get_user(user_id):
    if request.method=='GET':
        user = User.query.get(user_id)
        if user:
            response = make_response(jsonify(user.to_dict()), 200)
        else:
            response = make_response(jsonify({'message': 'User not found'}), 404)
        return response
    if request.method=='PATCH':
        user = User.query.filter_by(id=id).first()

        for attr in request.form:
            setattr(User, attr, request.form.get(attr))

        db.session.add(user)
        db.session.commit()
        
@app.route('/posts', methods=['GET'])
def get_posts():
    if request.method=="GET":
        posts = Post.query.all()
        post_list = [post.to_dict() for post in posts]
        response = make_response(jsonify(post_list), 200)
        return response
    
   

@app.route('/posts', methods=['POST'])
def create_post():
    image_url = request.form.get('image_url')
    caption = request.form.get('caption')
    user_id=request.form.get('user_id')
    
    if not image_url:
        response = make_response(jsonify({'message':'Image URL is required'}), 400)
        return 
    

    
    user = User.query.get(user_id)

    if not user:
        response = make_response(jsonify({'message': 'User not found'}), 404)

        return response
    
    post = Post(image_url=image_url,caption=caption, user_id=user_id)
    db.session.add(post)
    db.session.commit()

    response = make_response(jsonify({'message': 'Post created successfully', 'post': post.to_dict()}), 201)

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





