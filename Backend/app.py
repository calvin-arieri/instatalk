# server/app.py
from flask.ext.bcrypt import Bcrypt
# instantiate Bcrypt with app instance
bcrypt = Bcrypt(app)