from flask_server_config import app
import database_handle


@app.route("/")
def home():
    success = database_handle.test_insert()
    if success:
        return "I'm working"
    else:
        return "It's Britney Bitch!"


@app.route("/login")
def login_page():
    return {}


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=3000)