import tinydb

from backend import app_data

application = tinydb.TinyDB(app_data.DATABASE_PATH_APP)
house = tinydb.TinyDB(app_data.DATABASE_PATH_HOME)
devices = tinydb.TinyDB(app_data.DATABASE_PATH_DEVICES)


def test_insert():
    application.insert({'test':'test'})
    return True

