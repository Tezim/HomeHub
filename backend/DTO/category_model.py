from backend.app_config import db


class Category(db.Model):
    __tablename__ = 'category'
    category_id = db.Column('category_id', db.Integer, primary_key=True)
    devices = db.relationship('Device', backref='category', lazy=True)
    name = db.Column(db.String(255))


    def to_json(self):
        return {
            "category_id": self.category_id,
            "name": self.name,
            "devices": list(self.devices)
        }
