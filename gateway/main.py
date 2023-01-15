from flask import Flask
app = Flask(__name__)


PORT = 3000


@app.route('/users')
def get_users():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(port=PORT, debug=True)
