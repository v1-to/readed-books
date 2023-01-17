from flask import Flask
from blueprints import users_blueprint

app = Flask(__name__)

app.register_blueprint(users_blueprint)

if __name__ == '__main__':
    app.run(port=3000, debug=True)
