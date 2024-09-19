# Event Management System

## Project Overview

This project is an Event Management System built using Angular and Firebase Realtime Database. The application enables users to manage events, send reminders, and handle RSVPs. It also supports role-based access control, allowing different levels of access for Admins, Organizers, and Users. Additionally, the system tracks user activity and can send in-app notifications.

- [**Angular Live ↗**](https://event-management-system-da757.web.app)
- [**Flask API Live ↗**](https://ems-r7a4.onrender.com/)

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
    - Add Firebase configuration to `src/environments/environment.ts` Local.
        ``` export const environment = {
            production: false,
            apiUrl: 'http://127.0.0.1:5000/api',
            firebaseConfig: {
                apiKey: "AIzaSyCfVXutIRBAZCdMOhkOt_fDtRl6crtByKk",
                authDomain: "event-management-system-da757.firebaseapp.com",
                databaseURL: "https://event-management-system-da757-default-rtdb.firebaseio.com",
                projectId: "event-management-system-da757",
                storageBucket: "event-management-system-da757.appspot.com",
                messagingSenderId: "436067414791",
                appId: "1:436067414791:web:53f173fdd721c7bacfcba2",
                measurementId: "G-RSVTBY8JW0"
            }
        }; 
        ```
    - Add Firebase configuration to `src/environments/environment.prod.ts` Production.
        ``` export const environment = {
            production: true,
            apiUrl: 'http://server-address.here/api',
            firebaseConfig: {
                apiKey: "AIzaSyCfVXutIRBAZCdMOhkOt_fDtghh6ciPByKk",
                authDomain: "event-management-system-da757.firebaseapp.com",
                databaseURL: "https://event-management-system-da757-default-rtdb.firebaseio.com",
                projectId: "event-management-system-da757",
                storageBucket: "event-management-system-da757.appspot.com",
                messagingSenderId: "436067414791",
                appId: "1:436067414791:web:53f173fdd721c7bacfcba2",
                measurementId: "G-RSVTBY8JW0"
            }
        };
        ```
    - Configure Firebase authentication in your Angular app.

3. Firebase Realtime Database:
    ```base
    {
    "events": {
        "cZPh70PBM7N3LhTI41nv9KMe8cq1": {
        "-O73d-QB8QGi5znCd2Sv": {
            "createdAt": "2024-09-18T10:18:32.802Z",
            "description": "Event of the day Event of the day Event of the day Event of the day Event of the day Event of the day Event of the day Event of the day Event of the day ",
            "endDate": "2024-09-28",
            "endTime": "15:52",
            "organizer": "cZPh70PBM7N3LhTI41nv9KMe8cq1",
            "organizerName": "Organizer",
            "startDate": "2024-09-28",
            "startTime": "15:52",
            "title": "Event"
        },
        "-O74Lz-shbTPptDLvojh": {
            "createdAt": "2024-09-18T13:39:25.743Z",
            "description": "bjhbkujh",
            "endDate": "2024-09-21",
            "endTime": "19:13",
            "organizer": "cZPh70PBM7N3LhTI41nv9KMe8cq1",
            "organizerName": "Organizer",
            "startDate": "2024-09-20",
            "startTime": "22:09",
            "title": "test"
        },
        "-O74O3Cxq_sNwcb9DzOu": {
            "createdAt": "2024-09-18T13:48:31.352Z",
            "description": "New event notification test New event notification test New event notification test New event notification test ",
            "endDate": "2024-10-02",
            "endTime": "19:23",
            "organizer": "cZPh70PBM7N3LhTI41nv9KMe8cq1",
            "organizerName": "Organizer",
            "startDate": "2024-09-21",
            "startTime": "19:23",
            "title": "New event notification test "
        },
        "-O762Y1NCsRNeL6yxWxq": {
            "createdAt": "2024-09-18T21:33:44.055Z",
            "description": "ABC event TestABC event TestABC event TestABC event TestABC event Test",
            "endDate": "2024-09-26",
            "endTime": "03:06",
            "organizer": "cZPh70PBM7N3LhTI41nv9KMe8cq1",
            "organizerName": "Organizer",
            "participants": {
            "AN9wf3tpPwWeQPjQselVxpQ9yMj1": true
            },
            "startDate": "2024-09-20",
            "startTime": "07:03",
            "title": "ABC event Test"
        },
        "-O7649tfO9yX1c4QQuQJ": {
            "createdAt": "2024-09-18T21:40:49.460Z",
            "description": "ABCD Event test ABCD Event test ABCD Event test ABCD Event test ABCD Event test ABCD Event test ",
            "endDate": "2024-09-27",
            "endTime": "03:13",
            "organizer": "cZPh70PBM7N3LhTI41nv9KMe8cq1",
            "organizerName": "Organizer",
            "participants": {
            "AN9wf3tpPwWeQPjQselVxpQ9yMj1": true
            },
            "startDate": "2024-09-20",
            "startTime": "03:13",
            "title": "ABCD Event test "
        }
        },
        "uIOxOLE8SrZB5n9yiQnhrAbGqb22": {
        "-O6lXvL9pS4J8RfbpbCI": {
            "createdAt": "2024-09-14T17:19:11.535Z",
            "description": "Hacker House event",
            "endDate": "2024-09-30",
            "endTime": "00:00",
            "organizer": "uIOxOLE8SrZB5n9yiQnhrAbGqb22",
            "participants": {
            "734KGqVrAEeKRRiUrxg8EezjyDq2": true,
            "AN9wf3tpPwWeQPjQselVxpQ9yMj1": true,
            "uIOxOLE8SrZB5n9yiQnhrAbGqb22": true,
            "vNyYgCS4CwhKcMsgnBBGCGqJLMn1": true
            },
            "startDate": "2024-09-23",
            "startTime": "00:00",
            "title": "HH GOA"
        },
        "-O6lZ6KMeilXakZ4lu-S": {
            "createdAt": "2024-09-14T17:24:22.753Z",
            "description": "dvdvdv",
            "endDate": "2024-09-29",
            "endTime": "22:59",
            "organizer": "uIOxOLE8SrZB5n9yiQnhrAbGqb22",
            "participants": {
            "734KGqVrAEeKRRiUrxg8EezjyDq2": true,
            "AN9wf3tpPwWeQPjQselVxpQ9yMj1": true
            },
            "startDate": "2024-09-15",
            "startTime": "22:57",
            "title": "csdcsdc"
        }
        },
        "vNyYgCS4CwhKcMsgnBBGCGqJLMn1": {
        "-O6rvj0L1doFDR7GrHCZ": {
            "createdAt": "2024-09-15T23:05:17.522Z",
            "description": "sgrgrg",
            "endDate": "2024-09-28",
            "endTime": "04:40",
            "organizer": "vNyYgCS4CwhKcMsgnBBGCGqJLMn1",
            "organizerName": "Avinash",
            "participants": {
            "734KGqVrAEeKRRiUrxg8EezjyDq2": true,
            "AN9wf3tpPwWeQPjQselVxpQ9yMj1": true
            },
            "startDate": "2024-09-17",
            "startTime": "08:35",
            "title": "aada"
        },
        "-O6rvlfcZV9r2HcNHfyT": {
            "createdAt": "2024-09-15T23:05:28.421Z",
            "description": "sgrgrg",
            "endDate": "2024-09-28",
            "endTime": "04:40",
            "organizer": "vNyYgCS4CwhKcMsgnBBGCGqJLMn1",
            "startDate": "2024-09-17",
            "startTime": "08:35",
            "title": "fesgsg"
        }
        }
    },
    "notifications": {
        "-O7649y7pCH2W-_buDFF": {
        "icon": "bi bi-calendar-event",
        "message": "You have successfully created the event: ABCD Event test .",
        "timestamp": "2024-09-18T21:40:49.748Z",
        "title": "ABCD Event test ",
        "uid": "cZPh70PBM7N3LhTI41nv9KMe8cq1"
        }
    },
    "users": {
        "AN9wf3tpPwWeQPjQselVxpQ9yMj1": {
        "info": {
            "displayName": "User",
            "email": "user@user.com",
            "emailVerified": true,
            "joinAt": "2024-09-16 17:23:13",
            "role": "user",
            "uid": "AN9wf3tpPwWeQPjQselVxpQ9yMj1"
        }
        },
        "RjhXYBOeufaf7DsjWgwiiemVbK53": {
        "Logs": {
            "-O7BPRBYItjOSyPUruq8": {
            "timestamp": "2024-09-19T22:31:50.819Z",
            "url": "https://event-management-system-da757.web.app/"
            },
            "-O7BPXRUXLYaSg7YCj5k": {
            "timestamp": "2024-09-19T22:32:16.708Z",
            "url": "https://event-management-system-da757.web.app/contact"
            }
        },
        "info": {
            "displayName": "Admin",
            "email": "admin@admin.com",
            "emailVerified": true,
            "joinAt": "2024-09-16 17:34:09",
            "role": "admin",
            "uid": "RjhXYBOeufaf7DsjWgwiiemVbK53"
        }
        },
        "cZPh70PBM7N3LhTI41nv9KMe8cq1": {
        "info": {
            "displayName": "Organizer",
            "email": "organizer@organizer.com",
            "emailVerified": true,
            "joinAt": "2024-09-16 17:40:47",
            "role": "organizer",
            "uid": "cZPh70PBM7N3LhTI41nv9KMe8cq1"
        }
        }
    }
    }
    ```

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
        ```bash
        MAIL_USERNAME=your_gmail_username@gmail.com
        MAIL_PASSWORD=your_gmail_password
        ```
4. API Documentation:
    1. **/created**
        - *Request:*
            curl -X POST https://ems-r7a4.onrender.com/created \
            -H "Content-Type: application/json" \
            -d '{
            "email": "recipient@example.com",
            "name": "John Doe",
            "event_title": "Annual Conference",
            "event_date": "2024-09-30",
            "event_location": "New York City"
            }'
        - *Response:* 
            {
                "message": "Event created email sent"
            }

    2. **/participated**
        - *Request:*
                curl -X POST https://ems-r7a4.onrender.com/participated \
                -H "Content-Type: application/json" \
                -d '{
                "email": "recipient@example.com",
                "name": "John Doe",
                "event_title": "Annual Conference",
                "event_date": "2024-09-30"
                }'
        - *Response:* 
            {
                "message": "Event created email sent"
            }

    3. **/new**
        - *Request:*
            curl -X POST https://ems-r7a4.onrender.com/new \
            -H "Content-Type: application/json" \
            -d '{
            "email": "recipient@example.com",
            "name": "John Doe",
            "event_title": "Tech Expo 2024",
            "event_date": "2024-11-10",
            "event_location": "San Francisco"
            }'
        - *Response:* 
            {
                "message": "Event created email sent"
            }



## Running the Project

1. **Angular:** 
   - Start the Angular development server:
        ```bash
        ng serve
        ```
     
    - Local Run With Production Config:
        ```bash
        ng serve --configuration production
        ```
    
    - Production Build:
        ```bash
        ng build --configuration production
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

## Video

-  https://github.com/rock12231/Event-Management-System/tree/master/Video/Admin.mp4
-  https://github.com/rock12231/Event-Management-System/tree/master/Video/Organizer.mp4
-  https://github.com/rock12231/Event-Management-System/tree/master/Video/User.mp4

## UML & Flow

<img src="https://github.com/rock12231/Event-Management-System/blob/master/Doc/UML.jpeg" height="640">
<img src="https://github.com/rock12231/Event-Management-System/blob/master/Doc/UserFlow.jpeg" height="640">


## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!
