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
## Running the Project

1. **Angular:** 
   - Start the Angular development server:
     ```bash
     ng serve
     ```
## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!
