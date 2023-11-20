from flask_login import UserMixin

from backend.app_config import db


class User(db.Model, UserMixin):
    __tablename__ = 'user'
    user_id = db.Column('user_id', db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(255))
    psswd = db.Column(db.String(255))
    phone = db.Column(db.String(255))
    goups = db.Column(db.String(255))
    photo = db.Column(db.String(255))
    is_admin = db.Column(db.Integer, default=False)
    two_factor = db.Column(db.Boolean, default=False)


    def __init__(self, name, email, psswd):
        self.name = name
        self.email = email
        self.psswd = psswd


    def is_authenticated(self):
        return self.is_active()

    def is_active(self):
        return True

    def get_id(self):
        return str(self.user_id)

    def is_anonymous(self):
        """False, as anonymous users aren't supported."""
        return False

    def getUserNameById(id):
        return User.query.get(id).name

    def getIdByUserName(name):
        try:
            return User.query.filter_by(name=name).first().user_id
        except:
            return None

    def getIdByEmail(email):
        try:
            return User.query.filter_by(email=email).first()
        except:
            return None

    def getUserbyId(id):
        try:
            return User.query.filter_by(user_id=id).first()
        except:
            return None
