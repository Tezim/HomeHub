from backend.app_config import db


class Stats(db.Model):
    __tablename__ = "stats"
    stats_id = db.Column('stats_id', db.Integer, primary_key=True)
    devs = db.relationship('Device', backref='stats', uselist=False)
    temperature = db.Column(db.String(255))
    usage = db.Column(db.String(255))

    def to_json(self):
        return {
            "temperature": list(self.temperature.split(',')) if self.temperature is not None else "",
            "usage": list(self.usage.split(',')) if self.usage is not None else ""
        }