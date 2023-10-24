import os
from flask import redirect, url_for, render_template, request, flash, send_file, session, make_response
from flask_login import current_user, login_user, logout_user, login_required
from app_config import app, db, login
from DTO.user_model import User
from threading import Thread, Event
thread = Thread()
thread_stop_event = Event()
thread = None

@login.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


with app.app_context():
    db.create_all()

@app.route("/")
def home():
    if current_user.is_authenticated:
        return {}
    else:
        return redirect('login')

@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        session.permanent = True
        user = request.form["username"].strip()
        password = request.form["password"]
        u = User.query.filter_by(name=user).first()
        return {}



@app.route("/logout")
@login_required
def logout():
    logout_user()
    session.pop('id', None)
    return redirect(url_for('login'))

@app.errorhandler(401)
def unauthorized(e):
    return {}

@app.route("/nope")
def nope():
    return "I give up :("

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.debug = True
    #app.run(host='0.0.0.0')
