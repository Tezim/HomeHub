from flask import Flask

app = Flask("HomeIO")
app.root_path = "/"
app.secret_key = 'a08f4553ad071a12f7110e2b1d6be691f274d3c96c171097'  # development key
