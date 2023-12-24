import os
import pathlib
import flask
from flask import request
import requests
from flask_cors import CORS

app = flask.Flask(__name__)


app.secret_key = os.urandom(24)


app.static_folder = 'static'

CORS(app, resources={r"/*": {"origins": ["http://test.btschwartz.com", 
                                         "https://test.btschwartz.com",
                                         "http://localhost:3000",
                                         "http://127.0.0.1:5000"
                                         
                                         ]}})


@app.route("/static/<path:path>")
def serve_static(path):
    return flask.send_from_directory('static', path)


@app.route('/resume.pdf')
def resume():
    return flask.redirect("https://btschwartz.com/api/resume.pdf")

@app.route('/')
@app.route('/more')
def index():

    return flask.render_template('index.html')


@app.route('/saul', methods=['POST'])
def saul():

    # see if there is a form value of 'saul' attached
    action = request.form.get('saul', "")

    print('action: ' + action)

    client_ip = None
    if request.headers.get('X-Real-IP'):
        client_ip = request.headers.get('X-Real-IP')
    elif request.headers.get('X-Forwarded-For'):
        client_ip = request.headers.get('X-Forwarded-For').split(',')[0].strip()
    else:
        client_ip = request.remote_addr
    if client_ip == None:
        client_ip = 'unknown'

    resp = requests.get(
        'https://btschwartz.com/api/v1/funfact/random', 
        data={'saul': client_ip, 'kim': ('home @ ' + action)}, 
        timeout=5)
    
    data = {
        'saul': 'kim'
    }

    return data

@app.route('/vip')
def vip():
    token = flask.session.get('token', None)
    if token is None:
        return flask.redirect(flask.url_for('index'))
    
    print(token)

    headers = {'Authorization': 'Bearer ' + token}

    endpoint = 'https://btschwartz.com/api/v1/protected'

    response = requests.get(endpoint, headers=headers)
    
    print(response.status_code)
    
    if response.status_code == 200:
        return flask.render_template('vip.html')
    else:
        return flask.redirect(flask.url_for('index'))


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


@app.route('/swaggerui/<path:path>')
def send_swaggerui_assets(path):
    path = pathlib.Path(path)
    path = 'swaggerui' / path
    return flask.send_from_directory(app.static_folder, path)



@app.route('/login', methods=['POST'])
def login():
    data = flask.request.get_json()
    token = data.get('token')

    headers = {'Authorization': 'Bearer ' + token}

    endpoint = 'https://btschwartz.com/api/v1/protected'

    response = requests.get(endpoint, headers=headers)
    
    print(response.status_code)
    
    if response.status_code == 200:
        flask.session['token'] = token
        return flask.jsonify({'result': 'success'}), 200
    else:
        return flask.jsonify({'result': 'error', 'message': 'Invalid token'}), 401
    

@app.route('/is_logged_in')
def is_logged_in():
    # username = None
    username = logged_in_user()
    if username is None:
        return flask.jsonify({'result': 'error', 'message': 'Not logged in'}), 401
    else:
        return flask.jsonify({'result': 'success'}), 200


if __name__ == "__main__":
    app.run()