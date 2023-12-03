from backend.flaskapp import app as application

with application.app_context():
    from backend.flaskapp import db
    db.create_all()

if __name__ == '__main__':
    application.run()


