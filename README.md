# Event Management System

## Project Overview

This project is an Event Management System built using Angular and Firebase Realtime Database. The application enables users to manage events, send reminders, and handle RSVPs. It also supports role-based access control, allowing different levels of access for Admins, Organizers, and Users. Additionally, the system tracks user activity and can send in-app notifications.

## Features

- **Event Management:** Create, view, update, and delete events.
- **RSVP Management:** Attendees can RSVP for events.
- **User Roles:**
    - Admin: Manages all events and users.
    - Organizer: Creates and manages their own events.
    - User: Views events and RSVPs.
- **Notifications:** Send reminders for events.
- **QR Code Generation:** Automatically generate a QR code for each event.
- **Activity Tracking:** Track user activity such as logins, RSVPs, and event creation.
- **Firebase Authentication:** Google-based authentication for users.

- **Firebase Authentication:** Uses Firebase to manage user authentication and retrieve Firebase ID tokens.
- **Angular Frontend:** Handles user sign-in and includes a service to make authenticated API requests.
- **Flask Backend:** Validates Firebase ID tokens to authenticate API requests.
- **Secure Communication:** Ensures that API requests are authorized and secure.

## Prerequisites

- Firebase account and project with Auth Realtime database Storage
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

### 3. Flask Setup

1. Install Flask and Firebase Admin SDK:
    ```bash
    pip install Flask firebase-admin flask-cors
    ```
2. Add Firebase Admin SDK Configuration File:
   - Place the `firebase-adminsdk.json` file (downloaded from Firebase) in your project directory.
   - Ensure the path to the JSON file in `credentials.Certificate('path/to/your/firebase-adminsdk.json')` matches the location of your file.

3. Add .env Configuration File for Email:
    - `.env` at root of the folder with
    ```MAIL_USERNAME=your_gmail_username@gmail.com                                                          MAIL_PASSWORD=your_gmail_password```

## Running the Project

1. **Angular:** 
   - Start the Angular development server:
     ```bash
     ng serve
     ```
   - Global Link: `https://event-management-system-da757.web.app/`

2. **Flask:** 
   - Run the Flask server:
     ```bash
     python app.py
     ```
   - Global Link: `https://ems-r7a4.onrender.com/`
        - *Note* : Firts api hit take 50 sec to start the server , `Render.com` Policy


## Project Structure 

1. **Angular:** 

    ```bash
    📂 event-management-system/
    │
    ├── 📂 src/
    │   ├── 📂 app/
    │   │   ├── 📄 app.component.css
    │   │   ├── 📄 app.component.html
    │   │   ├── 📄 app.component.ts
    │   │   ├── 📄 app.config.ts
    │   │   ├── 📄 app.routes.ts
    │   │   ├── 📄 auth.service.ts
    │   │   ├── 📂 components/
    │   │   │   ├── 📂 about/
    │   │   │   ├── 📂 Admin-EMS/
    │   │   │   ├── 📂 base/
    │   │   │   ├── 📂 contact/
    │   │   │   ├── 📂 footer/
    │   │   │   ├── 📂 home/
    │   │   │   ├── 📂 login/
    │   │   │   ├── 📂 nav/
    │   │   │   ├── 📂 Organizer-EMS/
    │   │   │   ├── 📂 profile/
    │   │   │   └── 📂 User-EMS/
    │   │   ├── 📂 shared/
    │   │   │    ├── 📂 guard/
    │   │   │    │   └── 📄 auth.guard.ts
    │   │   │    └── 📂 services/
    │   │   │        ├── 📄 admin.service.ts
    │   │   │        ├── 📄 api.service.ts
    │   │   │        ├── 📄 event.service.ts
    │   │   │        ├── 📄 file-upload.service.ts
    │   │   │        ├── 📄 firebase.service.ts
    │   │   │        ├── 📄 mail.service.ts
    │   │   │        ├── 📄 toast-alert.service.ts
    │   │   │        └── 📄 user.ts
    │   │   ├──📂 assets/
    │   │   │   ├── 📂 css/
    │   │   │   ├── 📂 images/
    │   │   │   └── 📂 js/
    │   │   └──📂 environments/
    │   │       ├── 📄 environment.prod.ts
    │   │       └── 📄 environment.ts
    │   ├── 📄 favicon.ico
    │   ├── 📄 index.html
    │   ├── 📄 main.ts
    │   └── 📄 styles.css
    ├── 📄 .editorconfig
    ├── 📄 .firebaserc
    ├── 📄 .gitignore
    ├── 📄 angular.json
    ├── 📄 database.rules.json
    ├── 📄 firebase.json
    ├── 📄 package.json
    ├── 📄 package-lock.json
    ├── 📄 proxy.local.json
    ├── 📄 proxy.prod.json
    ├── 📄 storage.rules
    ├── 📄 tsconfig.app.json
    ├── 📄 tsconfig.json
    └── 📄 tsconfig.spec.json
    ```

1. **Flask API:**
    ```bash
    📂 Flask API/
    │
    ├── 📂 venv/
    ├── 📂 app/
    │    ├── 📄 main.py
    │    ├── 📄 config.py
    │    ├── 📄 email_templates.py
    │    └── 📄 requirements.txt
    ├── 📄 README.md
    └── 📄 .gitignore 
    ```



## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!
