from flask import jsonify


class DeviceDTO():
    device_id = 0
    name = ""
    room_id = ""
    status = 0
    ip_address = ""
    mac_address = ""
    date_created = ""
    last_modified = ""
    owner = None
    usage = 0
    more_info = {}
    category_id = ""

    def __init__(self, device):
        self.device_id = device.device_id
        self.name = device.name
        self.room_id = device.room_id
        self.status = device.status
        self.ip_address = device.ip_address
        self.mac_address = device.mac_address
        self.more_info = device.more_info
        self.last_modified = device.date_modified
        self.date_created = device.date_created
        self.owner = device.owner
        self.category_id = device.category_id
        self.usage = device.usage


    def to_json(self):
        return {
            "device_id": self.device_id,
            "name": self.name,
            "room_id": self.room_id,
            "status": self.status,
            "IP_address": self.ip_address,
            "MAC_address": self.mac_address,
            "add_info": self.more_info,
            "created": self.date_created,
            "modified": self.last_modified,
            "category": self.category_id,
            "usage" : self.usage,
            "owner": self.owner
        }

    def to_json_user(self):
        return {
            "device_id": self.device_id,
            "name": self.name,
            "room_id": self.room_id,
            "status": self.status,
            "IP_address": self.ip_address,
            "MAC_address": self.mac_address,
            "add_info": self.more_info,
            "created": self.date_created,
            "category": self.category_id,
            "modified": self.last_modified,
            "usage": self.usage
        }
