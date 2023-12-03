from datetime import timedelta
from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# import tinydb

import paths

PEPPER = "bullshit"
app = Flask(__name__)
CORS(app, supports_credentials=True)
login = LoginManager(app)
login.session_protection = 'strong'
login.init_app(app)
app.secret_key = 'U1a2C&5f#kfu#8kU8W5A'
app.permanent_session_lifetime = timedelta(minutes=30)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:asos@db/homehub'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True 
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
db = SQLAlchemy(app)
