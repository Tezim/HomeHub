import subprocess

from backend.flaskapp import app, db
import os

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()


