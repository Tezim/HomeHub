import os
import random

from flask import redirect, url_for, request, session, jsonify, Response
from flask_login import current_user, login_user, logout_user, login_required
import paths
from backend.app_config import app, db, login
from backend import helpers
from backend.DTO.RoomDTO import RoomDTO
from backend.DTO.base_response_model import BaseResponse
from backend.DTO.category_model import Category
from backend.DTO.device_DTO import DeviceDTO
from backend.DTO.goup_model import Group
from backend.DTO.room_model import Room
from backend.DTO.stats_model import Stats
from backend.DTO.user_DTO import UserDTO
from backend.DTO.user_model import User
from backend.DTO.device_model import Device
from threading import Thread, Event

thread = Thread()
thread_stop_event = Event()
thread = None


@login.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


def create_admin():
    admin = User("Admin", "admin@homehub.site", helpers.pwd_hash("admin"))
    admin.phone = "+421xxxxxxxxxx"
    admin.photo = paths.PHOTO_DIRECTORY_DEFAULT
    admin.goups = ""
    admin.is_admin = 1
    admin.two_factor = False

    return admin


with app.app_context():
    #db.drop_all()
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
                    response.status = "Success"
                    response.user = UserDTO(u)
                    login_user(u)
                    return jsonify(response.to_json())
                else:
                    response = BaseResponse()
                    response.status = "Failure"
                    response.description = "Wrong Credentials"
                    return jsonify(response.to_json())
            else:
                return {"error": "failed to login"}
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


@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return {}
    elif request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        phone = request.form.get('phone')
        password = request.form.get('password')
        if username is None or phone is None or email is None or password is None:
            return Response({}, status=500)
        u = User.query.filter_by(name=username).first()
        if u is None:
            if password is not None:
                password = password.strip()
            new_user = User(username, email, helpers.pwd_hash(password))
            new_user.photo = paths.PHOTO_DIRECTORY_DEFAULT
            new_user.is_admin = False
            new_user.two_factor = False
            new_user.groups = ""
            new_user.phone = phone
            db.session.add(new_user)
            user = User.query.filter_by(name=username).first()
            try:
                db.session.commit()
                return jsonify(UserDTO(user).to_json())
            except Exception:
                return Response("{'db_error': 'register_user'}", status=500)
        else:
            return Response("{'error':'username_exists}", status=400)


# profile section
# _____________________________________________________________
@app.route("/profile")
@login_required
def profile():
    return redirect('profile/general')


@app.route("/profile/general", methods=['GET', 'PUT'])
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
                return Response("{'db_error':'profile_genereal'}", status=500, mimetype='application/json')
    elif request.method == 'PUT':
        username = request.form.get('username')
        email = request.form.get('email')
        phone = request.form.get('phone')
        groups = request.form.get('groups')
        photo = request.form.get('photo')
        u = User.query.filter_by(name=username).first()
        if u is not None:
            return Response("{'db_error':'Username already in use'}", status=403)
        user = load_user(current_user.user_id)
        if email is not None:
            user.email = email.strip()
        if phone is not None:
            user.phone = phone.strip()
        if photo is not None:
            user.photo = photo.strip()
        if groups is not None:
            user.groups = groups.strip()
        if username is not None:
            user.name = username.strip()
        db.session.commit()
        return jsonify(UserDTO(user).to_json())
    return {}


def list_groups():
    groups = Group.query.all()
    response = []
    for group in groups:
        if current_user.is_admin == 1:
            response.append(group.to_json())
        else:
            response.append(group.to_json_user())
    return jsonify(response)


@app.route("/profile/security", methods=['GET', 'PUT'])
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
                return Response("{'db_error':'profile_sec'}", status=500, mimetype='application/json')
    elif request.method == 'PUT':
        try:
            two_f = request.form.get('two_factor')
            u = load_user(current_user.user_id)
            if u is not None:
                u.two_factor = eval(two_f.strip())
            db.session.commit()
            return {}
        except Exception:
            return Response("{'db_error': 'turn on 2F'}", status=500)


@app.route("/profile/groups", methods=['GET', 'POST'])
@login_required
def profile_group():
    if request.method == 'GET':
        return list_groups()


@app.route("/profile/groups/<group_id>", methods=['GET', 'PUT', 'DELETE'])
@login_required
def group_detail(group_id):
    if request.method == 'GET':
        if current_user.is_admin == 1:
            try:
                group = Group.query.get(group_id=group_id).first()
                return jsonify(group.to_json())
            except Exception:
                return Response("{'Db_error' : 'group_detail'}", status=500)
        return Response("{'unauthorized': True}", status=401, mimetype='application/json')
    elif request.method == 'PUT':
        users = request.form.get('users')
        try:
            group = Group.query.get(group_id=group_id).first()
            group.users = users
            db.session.commit()
        except Exception:
            return Response("{'Db_error' : 'group_update'}", status=500)
    else:
        try:
            group = Group.query.get(group_id=group_id).first()
            db.session.delete(group)
            db.session.commit()
            return Response("{'status': 'success'}", status=200)
        except Exception:
            return Response("{'Db_error' : 'group_delete'}", status=500)


@app.route("/profile/groups/add", methods=['POST'])
@login_required
def add_group():
    if current_user.is_authenticated:
        if current_user.is_admin == 1:
            name = request.form.get('name')
            users = request.form.get('users')
            if name is None or users is None:
                return Response("{'db_error':'groups_add'}", status=500)
            try:
                g = Group.query.get(group_name=name).firt()
                if g is not None:
                    return Response("{'db_error':'Group name exists'}", status=403)
                new_group = Group(name, users)
                db.session.add(new_group)
                db.session.commit()
                g = Group.query.get(group_name=name).firt()
                return jsonify(g.to_json())
            except Exception:
                return Response("{'Db_error' : 'add_group'}", status=500)
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


@app.route("/profile/pwd-reset", methods=['GET', 'POST'])
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
@login_required
def dashboard():
    return {"dahboard": "working"}


# __________________________________________________________________________
# ______________________ devices____________________________________________

@app.route("/devices")
@login_required
def devices_redirect():
    return redirect("devices/all")


@app.route("/devices/all")
@login_required
def devices_all():
    try:
        devices = Device.query.all()
        response = []
        for device in devices:
            response.append(DeviceDTO(device).to_json())
        return jsonify(response)
    except Exception:
        return Response("{'db_error':'device_all}", status=500)


@app.route("/devices/add", methods=['GET', 'POST'])
@login_required
def devices_add():
    if request.method == 'GET':
        return {}
    else:
        new_dev = Device()
        new_dev.name = request.form.get("name")
        new_dev.room_id = request.form.get("room_id")
        # new_dev.status = request.form["status"].strip()
        new_dev.ip_address = request.form.get("ip_address")
        new_dev.mac_address = request.form.get("mac_address")
        new_dev.more_info = request.form.get("more_info")
        category_id = request.form.get("category")
        new_dev.category_id = category_id
        new_dev.usage = request.form.get("usage")
        new_dev.owner = current_user.user_id
        stats = Stats()
        try:
            cat = Category.query.filter_by(category_id = category_id).first()
            if cat.name == "Weather_station":
                stats.temperature = ",".join([str(random.randint(10, 25)) for _ in range(24)])
        except Exception:
            pass
        stats.usage = ",".join([str(random.randint(0, 150)) for _ in range(24)])
        try :
            db.session.add(stats)
            db.session.commit()
        except Exception:
            return Response("{'db_error':'device_add_stats_creation}", status=500)
        new_dev.statistics = stats.stats_id
        try:
            db.session.add(new_dev)
            db.session.commit()
            new_dev = Device.query.filter_by(device_id=new_dev.device_id).first()
            return jsonify(DeviceDTO(new_dev).to_json()) if current_user.is_admin \
                else jsonify(DeviceDTO(new_dev).to_json_user())
        except Exception as e:
            print(e)
            return Response("{'db_error':'device_add}", status=500)


def delete_device(id):
    device = Device.query.filter_by(device_id=id).first()
    if device is not None:
        try:
            db.session.delete(device)
            db.session.commit()
            return 0
        except Exception:
            return -1


@app.route("/devices/room/<name>", defaults={'id': None})
@app.route("/devices/room/<name>/<id>", methods=['GET', 'PUT', 'DELETE'])
@login_required
def devices_rooms(name, id):
    if id is None:
        devices = Device.query.filter_by(room_id=name)
        response = []
        for device in devices:
            if current_user.is_admin:
                response.append(DeviceDTO(device).to_json())
            else:
                response.append(DeviceDTO(device).to_json_user())
        return jsonify(response)
    else:
        if request.method == 'GET':
            try:
                device = Device.query.filter_by(device_id=id).first()
                return jsonify(DeviceDTO(device).to_json()) if current_user.is_admin \
                    else jsonify(DeviceDTO(device).to_json_user())
            except Exception:
                return Response("{'db_error':'device does not exist'}", status=500)
        elif request.method == 'PUT':
            try:
                device = Device.query.filter_by(device_id=id).first()
                name = request.form.get('name')
                if name is not None:
                    device.name = name.strip()
                room_id = request.form.get('room_id')
                if room_id is not None:
                    device.room_id = room_id.strip()
                status = request.form.get('status')
                if status is not None:
                    device.status = status.strip()
                ip = request.form.get('ip_address')
                if ip is not None:
                    device.ip_address = ip.strip()
                mac = request.form.get('mac_address')
                if mac is not None:
                    device.mac_address = mac.strip()
                more = request.form.get('more_info')
                if more is not None:
                    device.more_info = more.strip()
                category = request.form.get('category')
                if category is not None:
                    device.category_id = category.strip()
                try:
                    db.session.commit()
                    return jsonify(DeviceDTO(device).to_json()) if current_user.is_admin \
                        else jsonify(DeviceDTO(device).to_json_user())
                except Exception:
                    ##db.session.rollback()
                    return Response("{'db_error':'device_update'}", status=500)
            except Exception:
                return Response("{'db_error':'device_update'}", status=500)
        else:
            status = delete_device(id)
            if status == 0:
                return Response("{'status': 'success'}", status=200)
            else:
                return Response("{'status': 'delete failure'}", status=500)


@app.route("/devices/category/<name>", defaults={'id': None})
@app.route("/devices/category/<name>/<id>", methods=['GET', 'PUT', 'DELETE'])
@login_required
def devices_type(name, id):
    if id is None:
        devices = Device.query.filter_by(category_id=name)
        response = []
        for device in devices:
            if current_user.is_admin:
                response.append(DeviceDTO(device).to_json())
            else:
                response.append(DeviceDTO(device).to_json_user())
        return jsonify(response)
    else:
        if request.method == 'GET':
            try:
                device = Device.query.filter_by(device_id=id).first()
                return jsonify(DeviceDTO(device).to_json()) if current_user.is_admin \
                    else jsonify(DeviceDTO(device).to_json_user())
            except Exception:
                return Response("{'db_error':'device does not exist'}", status=404)
        elif request.method == 'PUT':
            try:
                device = Device.query.filter_by(device_id=id).first()
                name = request.form.get('name')
                if name is not None:
                    device.name = name
                room_id = request.form.get('room_id')
                if room_id is not None:
                    device.room_id = room_id
                status = request.form.get('status')
                if status is not None:
                    device.status = status
                ip = request.form.get('ip_address')
                if ip is not None:
                    device.ip_address = ip
                mac = request.form.get('mac_address')
                if mac is not None:
                    device.mac_address = mac
                more = request.form.get('more_info')
                if more is not None:
                    device.more_info = more
                category = request.form.get('category')
                if category is not None:
                    device.category_id = category
                try:
                    db.session.commit()
                    return jsonify(DeviceDTO(device).to_json()) if current_user.is_admin \
                        else jsonify(DeviceDTO(device).to_json_user())
                except Exception:
                    ##db.session.rollback()
                    return Response("{'db_error':'device_update'}", status=500)
            except Exception:
                return Response("{'db_error':'device_update'}", status=500)
        else:
            status = delete_device(id)
            if status == 0:
                return Response("{'status': 'success'}", status=200)
            else:
                return Response("{'status': 'delete failure'}", status=500)


# ______ room subset _______________________

@app.route("/rooms/<id>", methods=['GET', 'PUT', 'DELETE'])
@login_required
def update_room(id):
    if request.method == 'GET':
        try:
            room = Room.query.filter_by(room_id=id).first()
            if room is not None:
                return jsonify(RoomDTO(room).to_json())
        except Exception as e:
            return Response("{'db_error':'room_get'}", status=500)
    elif request.method == 'PUT':
        try:
            room = Room.query.filter_by(room_id=id).first()
            if room is None:
                return Response("Room not found", status=404)
            else:
                name = request.form.get('name')
                if name is not None:
                    room.name = name.strip()
                size = request.form.get('size')
                if size is not None:
                    room.size = size.strip()
                story = request.form.get('story')
                if story is not None:
                    room.story = story.strip()
                db.session.commit()
                return jsonify(RoomDTO(room).to_json())
        except Exception:
            return Response("{'db_error':'room_update'}", status=500)
    else:
        try:
            room = Room.query.filter_by(room_id=id).first()
            if room is not None:
                db.session.delete(room)
                db.session.commit()
                return "Deleted"
        except Exception as e:
            return Response("{'db_error':'room_delete'}", status=404)


@app.route("/rooms/add", methods=['POST'])
@login_required
def add_room():
    name = request.form['name'].strip()
    story = request.form['story'].strip()
    size = request.form['size'].strip()

    new_room = Room()
    new_room.name = name
    new_room.story = story
    new_room.size = size

    try:
        db.session.add(new_room)
        db.session.commit()
        return jsonify(new_room.to_json())
    except Exception:
        return Response("{'db_error':'add_room'}", status=500)


@app.route("/rooms")
@login_required
def get_rooms():
    try:
        rooms = Room.query.all()
        response = []
        for room in rooms:
            response.append(room.to_json())
        return jsonify(response)
    except Exception:
        return Response("{'db_error': 'get_rooms'}", status=500)


# ______________________category subset______________________

@app.route("/categories/add", methods=['POST'])
@login_required
def add_cat():
    name = request.form['name'].strip()
    new_category = Category()
    new_category.name = name
    try:
        db.session.add(new_category)
        db.session.commit()
        return jsonify(new_category.to_json())
    except Exception:
        return Response("{'db_error':'add_category'}", status=500)


@app.route("/categories")
@login_required
def get_categories():
    try:
        categories = Category.query.all()
        response = []
        for category in categories:
            response.append(category.to_json())
        return jsonify(response)
    except Exception:
        return {'db_error': 'get_categories'}


@app.route("/categories/<id>", methods=['GET', 'DELETE'])
@login_required
def get_categories_byID(id):
    if request.method == 'GET':
        try:
            categories = Category.query.filter_by(category_id=id)
            return jsonify(categories.to_json())
        except Exception:
            return {'db_error': 'get_category_byID'}
    elif request.method == 'DELETE':
        try:
            categories = Category.query.filter_by(category_id=id)
            db.session.delete(categories)
            db.session.commit()
            return Response("{'status': 'success'}")
        except Exception:
            return {'db_error': 'delete_category_byID'}


# _________________________________________________________________________
# _____________________________available devices ___________________________




# ___________________stats__________________________________________________

# ! stats endpointy

@app.route("/stats", methods=['GET'], defaults={'id': None})
@app.route("/stats/<id>")
@login_required
def stats(id):
    if id is None:
        return {}
    else:
        try:
            device = Device.query.filter_by(device_id=id).first()
            st = Stats.query.filter_by(stats_id=device.statistics).first()
            if st is not None:
                return jsonify(st.to_json())
            else:
                return Response("{'db_error': 'no_stats_available'}", status=404)
        except Exception:
            return Response("{'db_error': 'stats_getDev_no_device'}", status=500)




# _____________________________________________________________________________
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
