from datetime import timedelta
from flask import Flask
from flask_login import LoginManager, UserMixin
from flask_sqlalchemy import SQLAlchemy
import ssl

app = Flask(__name__)
login = LoginManager(app)
login.session_protection = 'strong'
login.init_app(app)
app.secret_key = 'U1a2C&5f#kfu#8kU8W5A'
app.permanent_session_lifetime = timedelta(minutes=30)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:asos@localhost/homehub'
db = SQLAlchemy(app)

nixer_ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
nixer_ssl_context.load_cert_chain("/home/nixer/SERVER/ssl/cacert.crt", "/home/nixer/SERVER/ssl/cacert.key")
