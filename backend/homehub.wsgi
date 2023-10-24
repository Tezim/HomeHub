import sys
sys.path.insert(0, '/srv/homehub/HomeHub/backend/')
from flaskapp import app
from app_config import nixer_ssl_context

application = app


if __name__ == "__main__":
    #app.debug = True
    app.run(ssl_context=nixer_ssl_context, port=3000)
