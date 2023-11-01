import datetime

from backend.DTO.category_model import Category
from backend.app_config import db
from backend.DTO.room_model import Room


class Device(db.Model):
    __tablename__ = "device"
    device_id = db.Column('device_id', db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    room_id = db.Column(db.Integer, db.ForeignKey(Room.room_id))
    status = db.Column(db.Integer)
    ip_address = db.Column(db.String(255))
    mac_address = db.Column(db.String(255))
    more_info = db.Column(db.String(255))
    category_id = db.Column(db.Integer, db.ForeignKey(Category.category_id))
    date_created = db.Column(db.DateTime(timezone=True),default=datetime.datetime.now())
    date_modified = db.Column(db.DateTime(timezone=True),default=datetime.datetime.now(), onupdate=datetime.datetime.now())
    owner = db.Column(db.Integer)






