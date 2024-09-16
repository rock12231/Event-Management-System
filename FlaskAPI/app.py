from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, auth
from flask_cors import CORS
from flask_mail import Mail, Message
from config import Config
from email_templates import EVENT_CREATED_TEMPLATE, EVENT_PARTICIPATED_TEMPLATE, NEW_EVENT_TEMPLATE

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, origins=["http://localhost:4200", "*"])

# Initialize Firebase Admin SDK
cred = credentials.Certificate('credentials.json')  # Path to your service account key JSON
firebase_admin.initialize_app(cred)

# Initialize Flask-Mail
mail = Mail(app)

@app.route('/', methods=['GET'])
def index():
    return "Hello, World!"

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
        send_email('recipient@example.com', 'Subject', 'Body of the email')
        return jsonify({'message': 'Data received successfully', 'data': data}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Invalid token'}), 401

@app.route('/created', methods=['POST'])
def event_created():
    data = request.get_json()
    to = data.get('email')
    subject = "Event Created"
    body = EVENT_CREATED_TEMPLATE.format(
        name=data.get('name'),
        event_title=data.get('event_title'),
        event_date=data.get('event_date'),
        event_location=data.get('event_location')
    )
    send_email(to, subject, body)
    return jsonify({'message': 'Event created email sent'}), 200

@app.route('/participated', methods=['POST'])
def event_participated():
    data = request.get_json()
    to = data.get('email')
    subject = "Thank You for Participating"
    body = EVENT_PARTICIPATED_TEMPLATE.format(
        name=data.get('name'),
        event_title=data.get('event_title'),
        event_date=data.get('event_date')
    )
    send_email(to, subject, body)
    return jsonify({'message': 'Event participated email sent'}), 200

@app.route('/new', methods=['POST'])
def new_event():
    data = request.get_json()
    to = data.get('email')
    subject = "New Event Announcement"
    body = NEW_EVENT_TEMPLATE.format(
        name=data.get('name'),
        event_title=data.get('event_title'),
        event_date=data.get('event_date'),
        event_location=data.get('event_location')
    )
    send_email(to, subject, body)
    return jsonify({'message': 'New event email sent'}), 200

def send_email(to, subject, body):
    msg = Message(subject=subject,
                  recipients=[to],
                  html=body,
                  sender=app.config['MAIL_USERNAME'])
    try:
        mail.send(msg)
        print(f'Email sent to {to}')
    except Exception as e:
        print(f'Error sending email: {e}')

if __name__ == '__main__':
    app.run(debug=True)
