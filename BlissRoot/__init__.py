import os
import flask
import requests

app = flask.Flask(__name__)


app.secret_key = os.urandom(24)


app.static_folder = 'static'


@app.route("/static/<path:path>")
def serve_static(path):
    return flask.send_from_directory('static', path)

@app.route('/')
def index():
    return flask.render_template('index.html')

@app.route('/vip')
def vip():
    username = logged_in_user()
    if username is None:
        return flask.redirect(flask.url_for('index'))

    return flask.render_template('vip.html')

@app.errorhandler(404)
def page_not_found(e):
    return flask.render_template('404.html'), 404



def logged_in_user():
    """Check login."""
    # Check if username is in session
    username = flask.session.get('username', None)
    # Check if username is in cookies
    if username is None:
        return None
    return username



@app.route('/login', methods=['POST'])
def login():
    data = flask.request.get_json()
    username = data.get('username')
    password = data.get('password')

    response = requests.post('https://btschwartz.com/api/v1/login', 
                             json={'username': username, 'password': password})
    
    print(response.status_code)
    
    if response.status_code == 200:
        flask.session['username'] = username
        return flask.jsonify({'result': 'success'}), 200
    else:
        return flask.jsonify({'result': 'error', 'message': 'Invalid username or password'}), 401


if __name__ == "__main__":
    app.run()