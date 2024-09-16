# app.py

from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, auth
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:4200", "*"])

# Initialize Firebase Admin SDK
cred = credentials.Certificate('credentials.json')  # Path to your service account key JSON
firebase_admin.initialize_app(cred)


@app.route('/', methods=['GET'])
def index():
    return "Hello, World!"


# Route to handle POST request
@app.route('/test', methods=['POST'])
def post_data():
    auth_header = request.headers.get('Authorization')

    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'Missing or invalid auth token'}), 401

    id_token = auth_header.split(' ')[1]

    try:
        # Verify the Firebase token
        decoded_token = auth.verify_id_token(id_token)
        user_id = decoded_token['uid']
        print(f"Authenticated user ID: {user_id}")

        # Handle the request
        data = request.get_json()
        return jsonify({'message': 'Data received successfully', 'data': data}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Invalid token'}), 401

if __name__ == '__main__':
    app.run(debug=True)
