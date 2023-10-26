from backend.app_config import db


class Group(db.Model):
    __tablename__ = 'group'
    group_id = db.Column('group_id', db.Integer, primary_key=True)
    group_name = db.Column(db.String(255))
    users = db.Column(db.String(255))

    def __init__(self, name, users):
        self.group_name = name
        self.users = users

    def to_json_user(self):
        return {
            "ID" : self.group_id,
            "Name" : self.group_name
        }

    def to_json(self):
        return {
            "ID": self.group_id,
            "Name": self.group_name,
            "Users": self.users
        }

