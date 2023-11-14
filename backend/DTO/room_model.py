from backend.app_config import db

class Room(db.Model):
    __tablename__ = 'room'
    room_id = db.Column('room_id', db.Integer, primary_key = True)
    devices = db.relationship('Device', backref='room', lazy = True)
    name = db.Column(db.String(255))
    story = db.Column(db.Integer)
    size = db.Column(db.Float)


    def to_json(self):
        return {
            "room_id": self.room_id,
            "name": self.name,
            "story": self.story,
            "size": self.size
        }
