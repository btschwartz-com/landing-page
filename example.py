from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS  # Add this import

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)

# In-memory users list
users = [
    {'username': 'bob', 'password': '123'},
    {'username': 'alice', 'password': '456'}
]

@app.route('/login', methods=['POST'])
def login():
    print('bruh')
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    user = next((user for user in users if user["username"] == username and user["password"] == password), None)
    print(str(username) + ' ' + str(password))
    if user is None:
        return jsonify({"msg": "Invalid username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

@app.route('/vip', methods=['GET'])
@jwt_required()
def vip():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.after_request
def add_custom_headers(response):
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Download-Options"] = "noopen"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["X-Permitted-Cross-Domain-Policies"] = "none"
    response.headers["X-Xss-Protection"] = "1; mode=block"
    return response

if __name__ == '__main__':
    app.run(debug=True)
