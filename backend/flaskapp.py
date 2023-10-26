import os
from flask import redirect, url_for, request, session, jsonify, Response
from flask_login import current_user, login_user, logout_user, login_required

import paths
from backend import helpers
from backend.DTO.base_response_model import BaseResponse
from backend.DTO.goup_model import Group
from backend.DTO.user_DTO import UserDTO
from backend.app_config import app, db, login
from backend.DTO.user_model import User
from threading import Thread, Event

thread = Thread()
thread_stop_event = Event()
thread = None


@login.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))






def create_admin():
    admin = User("Admin", "admin@homehub.site",helpers.pwd_hash("admin") )
    admin.phone = "+421xxxxxxxxxx"
    admin.photo = paths.PHOTO_DIRECTORY_DEFAULT
    admin.goups = ""
    admin.is_admin = 1
    admin.two_factor = False

    return admin

with app.app_context():
    db.drop_all()
    db.create_all()
    db.session.add(create_admin())
    db.session.commit()



@app.route("/")
def home():
    if current_user.is_authenticated:
        return redirect('dashboard')
    else:
        return redirect('login')


@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        session.permanent = True
        user = request.form["username"].strip()
        password = request.form["password"].strip()
        try:
            u = User.query.filter_by(name=user).first()
            if u is not None:
                if helpers.pwd_hash_check(password, u.psswd):
                    response = BaseResponse()
                    response.status = "Sucess"
                    response.user = UserDTO(u)
                    login_user(u)
                    return jsonify(response.to_json())
                else:
                    response = BaseResponse()
                    response.status = "Failure"
                    response.description = "Wrong Credentials"
                    return jsonify(response.to_json())
            else:
                response = BaseResponse()
                response.status = "Failure"
                response.description = "User does not exist"
                return jsonify(response.to_json())
        except Exception as e:
            print(e)
            return {}
    else:
        return {}


@app.route("/logout")
@login_required
def logout():
    logout_user()
    session.pop('id', None)
    return redirect(url_for('login'))


# profile section
# _____________________________________________________________
@app.route("/profile")
@login_required
def profile():
    return redirect('profile/general')


@app.route("/profile/general", methods = ['GET','POST'])
@login_required
def profile_gen():
    if request.method == 'GET':
        if current_user.is_authenticated:
            try:
                user = load_user(current_user.user_id)
                response = UserDTO(user)
                return jsonify(response.to_json())
            except Exception as e:
                print(e)
                return Response("{'db_error':'progile_gen'}", status=404, mimetype='application/json')
    elif request.method == 'POST':
        username = request.form["username"].strip()
        email = request.form["email"].strip()
        phone = request.form["phone"].strip()
        groups = request.form["groups"].strip()
        photo = request.form["photo"].strip()
        u = User.query.filter_by(name=username).first()
        if u is not None:
            return Response("{'db_error':'Username already in use'}", status=403)
        user = load_user(current_user.user_id)
        if email != "":
            user.email = email
        if phone != "":
            user.phone = phone
        if photo != "":
            user.photo = photo
        if groups != "":
            user.groups = groups
        if username != "":
            user.name = username
        db.session.commit()
        return jsonify(UserDTO(user).to_json())
    return {}

def  list_groups():
    groups = Group.query.all()
    response = []
    for group in groups:
        if current_user.is_admin == 1:
            response.append(group.to_json())
        else:
            response.append(group.to_json_user())
    return jsonify(response)


@app.route("/profile/security")
@login_required
def profile_sec():
    if request.method == 'GET':
        if current_user.is_authenticated:
            try:
                user = load_user(current_user.user_id)
                response = UserDTO(user)
                return jsonify(response.to_json())
            except Exception as e:
                print(e)
                return Response("{'db_error':'progile_sec'}", status=404, mimetype='application/json')
    elif request.method == 'POST':
        try:
            two_f = request.form["two_factor"].strip()
            u = load_user(current_user.user_id)
            if u is not None:
                u.two_factor = eval(two_f)
            db.session.commit()
            return {}
        except Exception:
            return Response("{'db_error': 'turn on 2F'}", status=400)

@app.route("/profile/groups", methods=['GET', 'POST'])
@login_required
def profile_group():
    if request.method == 'GET':
        return list_groups()

@app.route("/profile/groups<group_id>")
@login_required
def group_detail(group_id):
    if current_user.is_admin == 1:
        try:
            group = Group.query.get(group_id = group_id).first()
            return jsonify(group.to_json())
        except Exception:
            return Response("{'Db_error' : 'group_detail'}",status=400)
    return Response("{'unauthorized': True}", status=401, mimetype='application/json')

@app.route("/profile/groups/add", methods = ['POST'])
@login_required
def add_group(group_data):
    if current_user.is_authenticated:
        if current_user.is_admin == 1:
            name = group_data['name']
            users = group_data['users']
            try:
                g = Group.query.get(group_name = name).firt()
                if g is not None:
                    return Response("{'db_error':'Group name exists'}", status=403)
                new_group = Group(name, users)
                db.session.add(new_group)
                db.session.commit()
                g = Group.query.get(group_name=name).firt()
                return jsonify(g.to_json())
            except Exception:
                return Response("{'Db_error' : 'add_group'}",status=400)
    return Response("{'unauthorized': True}", status=401, mimetype='application/json')


def get_users():
    if current_user.is_authenticated:
        if current_user.is_admin == 1:
            users = User.query.all()
            response = []
            for user in users:
                response.append(UserDTO(user).to_json())
            return jsonify(response)
    return Response("{'unauthorized': True}", status=401, mimetype='application/json')

@app.route("/profile/reminders")
@login_required
def profile_rem():
    return {"reminders": "working"}

@app.route("/profile/pwd-reset", methods=['GET','POST'])
@login_required
def reset_password():
    if request.method == "POST":
        password = request.form["password"].strip()
        try:
            u = User.query.filter_by(name=current_user.name).first()
            u.psswd = helpers.pwd_hash(password)
            db.session.commit()
            return Response("{}", status=200)
        except Exception:
            return Response("{}", status=400)
    else:
        return {}

# _________________________________________________________________________
@app.route("/dashboard")
def dashboard():
    return {"dahboard": "working"}


@app.errorhandler(401)
def unauthorized(e):
    return Response("{'unauthorized': True}", status=401, mimetype='application/json')


@app.errorhandler(500)
def crash(e):
    print(e)


@app.route("/nope")
def nope():
    print("I never gonna ")
    return "I give up :("


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.debug = True
