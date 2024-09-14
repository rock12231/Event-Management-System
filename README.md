# Angular to Flask Secure API Request With Firebase Auth

This project demonstrates how to integrate Firebase authentication with an Angular frontend and a Flask backend. It enables secure API requests from the Angular application to the Flask API using Firebase authentication tokens.

## Features

- **Firebase Authentication:** Uses Firebase to manage user authentication and retrieve Firebase ID tokens.
- **Angular Frontend:** Handles user sign-in and includes a service to make authenticated API requests.
- **Flask Backend:** Validates Firebase ID tokens to authenticate API requests.
- **Secure Communication:** Ensures that API requests are authorized and secure.

## Prerequisites

- Firebase account and project
- Angular CLI
- Flask environment setup
- Python and `pip` installed

## Getting Started

### 1. Set Up Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Generate a Firebase configuration file and add it to your Angular project.
3. Create a service account and download the credentials JSON file for Flask.

### 2. Angular Setup

1. Install Angular Firebase packages:
    ```bash
    npm install @angular/fire firebase
    ```

2. Set up Firebase in your Angular project:
    - Add Firebase configuration to `src/environments/environment.ts`.
        ``` export const environment = {
            production: true,
            firebaseConfig: {
                    apiKey: "",
                    authDomain: "",
                    databaseURL: "",
                    projectId: "",
                    messagingSenderId: "",
                    appId: "",
                    measurementId: ""
                }
            }; 
        ```
    - Configure Firebase authentication in your Angular app.

3. Create the `AuthService` to handle user sign-in and token retrieval:
    ```typescript
    import { Injectable } from '@angular/core';
    import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

    @Injectable({
      providedIn: 'root',
    })
    export class AuthService {
      constructor(private afAuth: Auth) {}

      async signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(this.afAuth, provider);
        return result.user;
      }

      async getAuthToken(): Promise<string | null> {
        const user = this.afAuth.currentUser;
        if (user) {
          return user.getIdToken();
        }
        return null;
      }
    }
    ```

4. Implement an API service to make authenticated requests:
    ```typescript
    import { Injectable } from '@angular/core';
    import { HttpClient, HttpHeaders } from '@angular/common/http';
    import { AuthService } from './auth.service';

    @Injectable({
      providedIn: 'root',
    })
    export class ApiService {
      private flaskApiUrl = 'https://your-flask-api-url.com/your-post-endpoint';

      constructor(private http: HttpClient, private authService: AuthService) {}

      async postData(data: any) {
        const token = await this.authService.getAuthToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.post(this.flaskApiUrl, data, { headers }).toPromise();
      }
    }
    ```

### 3. Flask Setup

1. Install Flask and Firebase Admin SDK:
    ```bash
    pip install Flask firebase-admin flask-cors
    ```

2. Set up Flask to verify Firebase tokens:
    ```python
    from flask import Flask, request, jsonify
    import firebase_admin
    from firebase_admin import credentials, auth
    from flask_cors import CORS

    app = Flask(__name__)
    CORS(app, origins=["http://localhost:4200", "https://your-angular-app-domain"])

    cred = credentials.Certificate('path/to/your/firebase-adminsdk.json')
    firebase_admin.initialize_app(cred)

    @app.route('/your-post-endpoint', methods=['POST'])
    def post_data():
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Missing or invalid auth token'}), 401

        id_token = auth_header.split(' ')[1]
        try:
            decoded_token = auth.verify_id_token(id_token)
            user_id = decoded_token['uid']
            data = request.get_json()
            return jsonify({'message': 'Data received successfully', 'data': data}), 200
        except Exception as e:
            return jsonify({'error': 'Invalid token'}), 401

    if __name__ == '__main__':
        app.run(debug=True)
    ```
3. Add Firebase Admin SDK Configuration File:
   - Place the `firebase-adminsdk.json` file (downloaded from Firebase) in your project directory.
   - Ensure the path to the JSON file in `credentials.Certificate('path/to/your/firebase-adminsdk.json')` matches the location of your file.

## Running the Project

1. **Angular:** 
   - Start the Angular development server:
     ```bash
     ng serve
     ```

2. **Flask:** 
   - Run the Flask server:
     ```bash
     python app.py
     ```

## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!
